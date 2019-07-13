import * as fs from "fs";
import * as path from "path";
import { expect } from "chai";
import { Project } from "ts-morph";
import * as ts from "typescript-3.5.3";
import { generateCode } from "../generateCode";
import { generateFactoryCode } from "./specs/code-generation.spec";

describe(nameof(generateCode), () => {
    it("should equal the spec", () => {
        // get generated code
        const result = generateCode("typescript-3.5.3");

        // ensure no diagnostics
        //ensureNoDiagnostics(result);

        // compare
        const specFileName = path.join(__dirname, "specs/code-generation.spec.ts");
        const specText = fs.readFileSync(specFileName, { encoding: "utf8" });
        fs.writeFileSync(specFileName, result, { encoding: "utf8" }); // overwrite
        expect(result).to.equal(specText);
    });
});

describe(nameof(generateFactoryCode), () => {
    it("should generate factory code from the provided source file", () => {
        // get generated code
        const languageFeaturesFileName = path.join(__dirname, "specs/language-features.ts");
        const languageFeaturesText = fs.readFileSync(languageFeaturesFileName, { encoding: "utf8" });
        const languageFeaturesSourceFile = ts.createSourceFile("languageFeatures.ts", languageFeaturesText, ts.ScriptTarget.Latest, false);
        const result = `import * as ts from "typescript-3.5.3";\n\n` + generateFactoryCode(ts, languageFeaturesSourceFile);

        // ensure no diagnostics
        //ensureNoDiagnostics(result);

        // compare
        const specFileName = path.join(__dirname, "specs/factory-code-generation.spec.ts");
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
