import { Type, Symbol, InterfaceDeclaration, TypeGuards, ts, SyntaxKind } from "ts-morph";
import { compareTwoStrings } from "string-similarity";
import { Factory } from "./Factory";
import { Parameter } from "./Parameter";

export class Node {
    private readonly declaration: InterfaceDeclaration;

    constructor(private readonly factory: Factory, private readonly type: Type) {
        const symbol = getSymbol();
        const dec = symbol.getDeclarations()[0]; // this does return more than one for Node, but don't care...

        if (!TypeGuards.isInterfaceDeclaration(dec))
            throw new Error(`Expected the type ${type.getText()} to be of an interface declaration.`)

        this.declaration = dec;

        function getSymbol() {
            if (type.isIntersection())
                return type.getIntersectionTypes()[0].getSymbolOrThrow();
            const symbol = type.getSymbol();
            if (symbol == null)
                throw new Error(`Could not find symbol for type ${type.getText()}`);
            return symbol;
        }
    }

    getName() {
        return this.declaration.getName();
    }

    getPropertyForParam(param: Parameter) {
        let highestScore = 0;
        let foundProp: Symbol | undefined;
        for (const prop of this.type.getProperties()) {
            // todo: if score is below say 0.9 then this should throw or have some custom behaviour
            const score = compareTwoStrings(prop.getName(), param.getName());
            if (score > highestScore) {
                highestScore = score;
                foundProp = prop;
            }
        }

        return this.factory.getNodeProperty(foundProp!);
    }

    getKindNames() {
        if (this.getName() === nameof<ts.JsxAttributes>())
            return [nameof(SyntaxKind.JsxAttributes)];

        const kindType = this.type.getProperty("kind")!.getTypeAtLocation(this.declaration);
        if (kindType.isUnion()) {
            return kindType.getUnionTypes().map(t => sanitizeName(t.getText(this.declaration)));
        }
        return [sanitizeName(kindType.getText(this.declaration))];

        function sanitizeName(name: string) {
            return name.replace(/SyntaxKind\./g, "");
        }
    }
}
