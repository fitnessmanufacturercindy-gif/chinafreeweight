import type { TopicCandidate } from "./types";

const weights = {
  purchaseIntent: 0.30,
  siteGap: 0.25,
  gscOpportunity: 0.20,
  productFit: 0.10,
  evidenceAssets: 0.10,
  competitionOpportunity: 0.05,
} as const;

export function scoreCandidate(candidate: TopicCandidate) {
  const score = Object.entries(weights).reduce((total, [key, weight]) => {
    const value = candidate.scores[key as keyof TopicCandidate["scores"]];
    if (!Number.isFinite(value) || value < 0 || value > 100) throw new Error(`Candidate score ${key} must be between 0 and 100.`);
    return total + value * weight;
  }, 0);
  return { ...candidate, weightedScore: Number(score.toFixed(2)) };
}

export function rankCandidates(candidates: TopicCandidate[]) {
  return candidates.map(scoreCandidate).sort((a, b) => b.weightedScore - a.weightedScore);
}
