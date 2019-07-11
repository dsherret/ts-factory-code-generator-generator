import * as fs from "fs";
import * as path from "path";
import { expect } from "chai";
import { generateCode } from "../generateCode";

describe(nameof(generateCode), () => {
    it("should equal the spec", () => {
        const specFileName = path.join(__dirname, "spec.txt");
        const specText = fs.readFileSync(specFileName, { encoding: "utf8" });
        const result = generateCode("typescript-3.5.3");
        // overwrite
        // fs.writeFileSync(specFileName, result, { encoding: "utf8" });
        expect(result).to.equal(specText);
    });
});
