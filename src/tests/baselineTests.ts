import { expect } from "chai";
import * as fs from "fs";
import * as path from "path";
import { Project } from "ts-morph";
import * as ts363 from "typescript-3.6.3";
import * as ts494 from "typescript-4.9.4";
import { generateCode } from "../generateCode";
import { generateFactoryCode as generateFactoryCodeTs363 } from "./baselines/code-generation/typescript-3.6.3.baseline";
import { generateFactoryCode as generateFactoryCodeTs494 } from "./baselines/code-generation/typescript-4.9.4.baseline";

describe(nameof(generateCode), () => {
  it("should equal the baseline for 3.2.1", () => {
    runBaseLineForPackage("typescript-3.2.1");
  });

  it("should equal the baseline for 3.6.3", () => {
    runBaseLineForPackage("typescript-3.6.3");
  });

  // uses NodeFactory at this point
  it("should equal the baseline for 4.8.3", () => {
    runBaseLineForPackage("typescript-4.8.3");
  });

  it("should equal the baseline for 4.9.4", () => {
    runBaseLineForPackage("typescript-4.9.4");
  });

  it("should equal the baseline for @next", () => {
    runBaseLineForPackage("typescript-next");
  });

  function runBaseLineForPackage(packageName: string) {
    // get generated code
    const result = generateCode(packageName);

    // ensure no diagnostics
    ensureNoDiagnostics(result);

    // compare
    const specFileName = path.join(__dirname, `baselines/code-generation/${packageName}.baseline.ts`);
    const specText = fs.readFileSync(specFileName, { encoding: "utf8" });
    fs.writeFileSync(specFileName, result, { encoding: "utf8" }); // overwrite
    expect(result).to.equal(specText);
  }
});

describe(nameof(generateFactoryCodeTs494), () => {
  it("should generate factory code from the provided source file", () => {
    // get generated code
    const languageFeaturesFileName = path.join(__dirname, "baselines/language-features.ts");
    const languageFeaturesText = fs.readFileSync(languageFeaturesFileName, { encoding: "utf8" });
    const languageFeaturesSourceFile = ts494.createSourceFile("languageFeatures.ts", languageFeaturesText, ts494.ScriptTarget.Latest, false);
    const result = `import * as ts from "typescript-4.9.4";\n\n`
      + "const factory = ts.factory;\n"
      + generateFactoryCodeTs494(ts494, languageFeaturesSourceFile);

    // ensure no diagnostics
    ensureNoDiagnostics(result);

    // compare
    const specFileName = path.join(__dirname, "baselines/factory-code-generation-4.9.4.baseline.ts");
    const specText = fs.readFileSync(specFileName, { encoding: "utf8" });
    fs.writeFileSync(specFileName, result, { encoding: "utf8" }); // overwrite
    expect(result).to.equal(specText);
  });
});

describe(nameof(generateFactoryCodeTs363), () => {
  it("should generate factory code from the provided source file", () => {
    // get generated code
    const languageFeaturesFileName = path.join(__dirname, "baselines/language-features.ts");
    const languageFeaturesText = fs.readFileSync(languageFeaturesFileName, { encoding: "utf8" });
    const languageFeaturesSourceFile = ts363.createSourceFile("languageFeatures.ts", languageFeaturesText, ts363.ScriptTarget.Latest, false);
    const result = `import * as ts from "typescript-3.6.3";\n\n` + generateFactoryCodeTs363(ts363, languageFeaturesSourceFile);

    // ensure no diagnostics
    ensureNoDiagnostics(result);

    // compare
    const specFileName = path.join(__dirname, "baselines/factory-code-generation-3.6.3.baseline.ts");
    const specText = fs.readFileSync(specFileName, { encoding: "utf8" });
    fs.writeFileSync(specFileName, result, { encoding: "utf8" }); // overwrite
    expect(result).to.equal(specText);
  });
});

function ensureNoDiagnostics(fileText: string) {
  const project = new Project({ compilerOptions: { strictNullChecks: true } });
  const sourceFile = project.createSourceFile("__test__.ts", fileText);
  const diagnostics = sourceFile.getPreEmitDiagnostics();
  if (diagnostics.length > 0) {
    console.log(project.formatDiagnosticsWithColorAndContext(diagnostics));
    throw "ERROR";
  }
}
