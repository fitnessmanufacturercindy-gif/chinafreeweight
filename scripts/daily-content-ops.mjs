const command = process.argv[2];
if (!["acquire", "release", "init", "qa", "record"].includes(command)) {
  throw new Error("Usage: node scripts/daily-content-ops.mjs <acquire|release|init|qa|record>");
}
const runner = "C:/Users/Kloe/Documents/fitness-content-ops-registry/scripts/content-ops-runner.mjs";
process.argv = [process.argv[0], runner, command, "chinafreeweight", process.cwd()];
await import(pathToFileURL(runner).href);
import { pathToFileURL } from "node:url";
