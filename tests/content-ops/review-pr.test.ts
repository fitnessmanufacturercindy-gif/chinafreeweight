import assert from "node:assert/strict";
import test from "node:test";
import { qualifiesAsPendingContentReview } from "../../content-ops/review-pr";

test("accepts a dated content PR only when generated documents exist", () => {
  assert.equal(qualifiesAsPendingContentReview({
    pullRequest: "https://github.com/example/site/pull/12",
    branch: "codex/daily-content-2026-07-23",
    generatedDocumentCount: 10,
  }), true);
});

test("does not mistake the automation framework PR for content review", () => {
  assert.equal(qualifiesAsPendingContentReview({
    pullRequest: "https://github.com/example/site/pull/9",
    branch: "codex/daily-content-automation",
    generatedDocumentCount: 0,
  }), false);
});

test("rejects dated PRs that contain no generated pages", () => {
  assert.equal(qualifiesAsPendingContentReview({
    pullRequest: "https://github.com/example/site/pull/13",
    branch: "codex/daily-content-2026-07-24",
    generatedDocumentCount: 0,
  }), false);
});
