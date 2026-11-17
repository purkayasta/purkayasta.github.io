import assert from "node:assert/strict";
import fs from "node:fs";
import { createRequire } from "node:module";
import test from "node:test";
import ts from "typescript";

const require = createRequire(import.meta.url);
function loadTypeScript(file, DateConstructor = Date) {
  const exports = {};
  const { outputText } = ts.transpileModule(fs.readFileSync(file, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  });
  new Function("exports", "require", "Date", outputText)(
    exports,
    require,
    DateConstructor,
  );
  return exports;
}
const { resolveTheme } = loadTypeScript("src/hooks/useTheme.ts");
const { profile, experience, duration } = loadTypeScript(
  "src/data/portfolio.ts",
);

test("automatic themes follow seasonal and release boundaries", () => {
  for (const [year, month, day, expected] of [
    [2026, 9, 31, "default"],
    [2026, 10, 1, "thanksgiving"],
    [2026, 10, 30, "thanksgiving"],
    [2026, 11, 1, "christmas"],
    [2026, 11, 17, "christmas"],
    [2026, 11, 18, "doomsday"],
    [2026, 11, 19, "doomsday"],
    [2026, 11, 20, "christmas"],
    [2026, 11, 31, "christmas"],
    [2027, 0, 1, "default"],
    [2027, 11, 18, "christmas"],
  ])
    assert.equal(resolveTheme("auto", new Date(year, month, day)), expected);
});

test("every manual theme overrides seasonal defaults", () => {
  for (const theme of ["default", "christmas", "thanksgiving", "doomsday"]) {
    assert.equal(resolveTheme(theme, new Date(2026, 11, 18)), theme);
  }
});

test("career dates work without browser string-date parsing", () => {
  class StrictDate extends Date {
    constructor(...args) {
      if (typeof args[0] === "string")
        throw new Error("String date parsing is not portable");
      super(...args);
    }
  }
  const strict = loadTypeScript("src/data/portfolio.ts", StrictDate);
  assert.ok(Number.isFinite(strict.profile.years));
  assert.ok(Number.isFinite(profile.years));
  assert.equal(duration("Feb 2022 – Nov 2026"), "4 yrs 10 mos");
  for (const job of experience) {
    assert.ok(duration(job.period));
    for (const role of job.roles) assert.ok(duration(role.period));
  }
});
