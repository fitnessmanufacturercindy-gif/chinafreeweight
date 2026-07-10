const { test, expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");
const { runSiteHealthCheck } = require("../scripts/site-health-check");

function latestReportPath() {
  const reportDir = path.join(process.cwd(), "reports", "daily-site-health");
  if (!fs.existsSync(reportDir)) return null;
  return fs
    .readdirSync(reportDir)
    .filter((name) => name.endsWith("site-health-report.json"))
    .sort()
    .map((name) => path.join(reportDir, name))
    .pop();
}

test("daily site health has no Critical or High issues", async () => {
  test.setTimeout(300000);
  const reportPath = latestReportPath();
  const report = reportPath
    ? JSON.parse(fs.readFileSync(reportPath, "utf8"))
    : (await runSiteHealthCheck()).report;

  expect(report.summary.severityCounts.Critical, "Critical site health issues").toBe(0);
  expect(report.summary.severityCounts.High, "High site health issues").toBe(0);
});
