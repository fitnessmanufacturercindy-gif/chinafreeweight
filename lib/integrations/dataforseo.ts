const DEFAULT_BASE_URL = "https://api.dataforseo.com/v3";

type DataForSeoTask<TResult> = {
  id?: string;
  status_code: number;
  status_message: string;
  cost?: number;
  result?: TResult;
};

type DataForSeoEnvelope<TResult> = {
  status_code: number;
  status_message: string;
  cost?: number;
  tasks_count?: number;
  tasks_error?: number;
  tasks?: Array<DataForSeoTask<TResult>>;
};

export type DataForSeoKeywordRequest = {
  keyword: string;
  locationCode: number;
  languageCode: string;
  limit?: number;
};

export type DataForSeoKeywordOverviewRequest = {
  keywords: string[];
  locationCode: number;
  languageCode: string;
};

export class DataForSeoError extends Error {
  constructor(
    message: string,
    public readonly statusCode?: number,
  ) {
    super(message);
    this.name = "DataForSeoError";
  }
}

function credentials() {
  const login = process.env.DATAFORSEO_LOGIN?.trim();
  const password = process.env.DATAFORSEO_PASSWORD?.trim();

  if (!login || !password) {
    throw new DataForSeoError(
      "DATAFORSEO_LOGIN and DATAFORSEO_PASSWORD must be configured.",
    );
  }

  return { login, password };
}

function baseUrl() {
  return (process.env.DATAFORSEO_BASE_URL || DEFAULT_BASE_URL).replace(/\/$/, "");
}

function validateEnvelope<TResult>(
  envelope: DataForSeoEnvelope<TResult>,
  endpoint: string,
) {
  if (envelope.status_code !== 20000) {
    throw new DataForSeoError(
      `DataForSEO ${endpoint} failed: ${envelope.status_message}`,
      envelope.status_code,
    );
  }

  const failedTask = envelope.tasks?.find((task) => task.status_code !== 20000);
  if (failedTask) {
    throw new DataForSeoError(
      `DataForSEO task failed: ${failedTask.status_message}`,
      failedTask.status_code,
    );
  }

  return envelope;
}

async function request<TResult>(
  endpoint: string,
  options: { method?: "GET" | "POST"; body?: unknown } = {},
) {
  const { login, password } = credentials();
  const authorization = Buffer.from(`${login}:${password}`, "utf8").toString(
    "base64",
  );
  const response = await fetch(`${baseUrl()}${endpoint}`, {
    method: options.method || "GET",
    headers: {
      Authorization: `Basic ${authorization}`,
      Accept: "application/json",
      ...(options.body ? { "Content-Type": "application/json" } : {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
    cache: "no-store",
  });

  const envelope = (await response.json()) as DataForSeoEnvelope<TResult>;
  if (!response.ok) {
    throw new DataForSeoError(
      `DataForSEO HTTP ${response.status}: ${envelope.status_message || response.statusText}`,
      envelope.status_code || response.status,
    );
  }

  return validateEnvelope(envelope, endpoint);
}

export const dataForSeoClient = {
  getUserData() {
    return request<Array<Record<string, unknown>>>("/appendix/user_data");
  },

  keywordSuggestions(input: DataForSeoKeywordRequest) {
    return request<Array<Record<string, unknown>>>(
      "/dataforseo_labs/google/keyword_suggestions/live",
      {
        method: "POST",
        body: [
          {
            keyword: input.keyword,
            location_code: input.locationCode,
            language_code: input.languageCode,
            limit: input.limit || 100,
            include_seed_keyword: true,
          },
        ],
      },
    );
  },

  keywordOverview(input: DataForSeoKeywordOverviewRequest) {
    return request<Array<Record<string, unknown>>>(
      "/dataforseo_labs/google/keyword_overview/live",
      {
        method: "POST",
        body: [
          {
            keywords: input.keywords,
            location_code: input.locationCode,
            language_code: input.languageCode,
          },
        ],
      },
    );
  },
};
