import * as fs from "fs";
import * as path from "path";
import { expect } from "chai";
import { Project } from "ts-morph";
import { generateCode } from "../generateCode";

describe(nameof(generateCode), () => {
    it("should equal the spec", () => {
        const specFileName = path.join(__dirname, "specs/code-generation.spec.ts");
        const specText = fs.readFileSync(specFileName, { encoding: "utf8" });
        const result = generateCode("typescript-3.5.3");

        // ensure no diagnostics
        const project = new Project({ compilerOptions: { strictNullChecks: true } });
        const sourceFile = project.createSourceFile("__test__.ts", result);
        expect(sourceFile.getPreEmitDiagnostics()).to.deep.equal([]);

        // overwrite
        fs.writeFileSync(specFileName, result, { encoding: "utf8" });
        expect(result).to.equal(specText);
    });
});
