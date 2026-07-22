import type { ContentEntity, LocalizedContentVersion } from "../lib/content/types";

export type SourceEvidence = {
  url: string;
  title: string;
  publisher: string;
  publishedAt?: string;
  accessedAt: string;
  supports: string;
  confidence: "primary" | "high" | "medium";
};

export type AssetEvidence = {
  src: string;
  sourceUrl: string;
  licenseOrOwner: string;
  checksum: string;
  width: number;
  height: number;
  bytes: number;
  httpStatus: number;
  verifiedAt: string;
};

export type ResearchMetrics = {
  keyword: string;
  intent: string;
  searchVolume?: number;
  cpc?: number;
  competition?: number;
  trend?: number[];
  locationCode: number;
  languageCode: string;
  capturedAt: string;
  source: "dataforseo" | "gsc" | "ga4" | "public-source";
};

export type AutomatedContentDocument = {
  schemaVersion: 1;
  runDate: string;
  entity: ContentEntity;
  sources: SourceEvidence[];
  assets: AssetEvidence[];
  research: ResearchMetrics[];
  realCaseEvidence?: {
    authorized: boolean;
    projectReference: string;
    photoAssetChecksums: string[];
  };
  approval?: {
    approvedBy: string;
    approvedAt: string;
    pullRequest: string;
  };
};

export type QualityIssue = {
  code: string;
  message: string;
  field?: string;
  hard: boolean;
};

export type VersionQualityResult = {
  locale: LocalizedContentVersion["locale"];
  publicPath: string;
  score: number;
  passed: boolean;
  issues: QualityIssue[];
};

export type DocumentQualityResult = {
  entityId: string;
  passed: boolean;
  versions: VersionQualityResult[];
};

export type DailyRunManifest = {
  schemaVersion: 1;
  date: string;
  siteUrl: string;
  timeZone: string;
  publicLocales: string[];
  candidateUrlLimit: number;
  mode: "research-only" | "generate";
  openDailyPullRequest?: string;
  apiSpendUsd: { daily: number; monthly: number };
  createdAt: string;
};

export type TopicCandidate = {
  id: string;
  type: "blog" | "case";
  locale: string;
  keyword: string;
  intent: string;
  scores: {
    purchaseIntent: number;
    siteGap: number;
    gscOpportunity: number;
    productFit: number;
    evidenceAssets: number;
    competitionOpportunity: number;
  };
  weightedScore?: number;
};
