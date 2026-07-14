const apiBase = "https://api.github.com";

export function getGithubContext() {
  const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
  const repository = process.env.GITHUB_REPOSITORY;
  if (!token || !repository) return null;
  const [owner, repo] = repository.split("/");
  if (!owner || !repo) return null;
  return { token, owner, repo };
}

async function githubFetch(ctx, apiPath, options = {}) {
  const response = await fetch(`${apiBase}${apiPath}`, {
    ...options,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${ctx.token}`,
      "X-GitHub-Api-Version": "2022-11-28",
      ...(options.headers || {})
    }
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`GitHub API ${response.status}: ${body}`);
  }

  if (response.status === 204) return null;
  return response.json();
}

export async function ensureLabels(ctx, labels) {
  for (const label of labels) {
    try {
      await githubFetch(ctx, `/repos/${ctx.owner}/${ctx.repo}/labels`, {
        method: "POST",
        body: JSON.stringify({
          name: label,
          color: label.includes("approved") ? "0e8a16" : label === "failed" ? "b60205" : "5319e7"
        })
      });
    } catch (error) {
      if (!String(error.message).includes("already_exists")) throw error;
    }
  }
}

export async function createIssue(ctx, { title, body, labels }) {
  return githubFetch(ctx, `/repos/${ctx.owner}/${ctx.repo}/issues`, {
    method: "POST",
    body: JSON.stringify({ title, body, labels })
  });
}

export async function addIssueComment(ctx, issueNumber, body) {
  return githubFetch(ctx, `/repos/${ctx.owner}/${ctx.repo}/issues/${issueNumber}/comments`, {
    method: "POST",
    body: JSON.stringify({ body })
  });
}

export async function listOpenSeoIssues(ctx) {
  return githubFetch(ctx, `/repos/${ctx.owner}/${ctx.repo}/issues?state=open&labels=seo-recommended&per_page=100`);
}
