import { FunctionDeclaration, Type, Symbol } from "ts-morph";
import { FactoryFunction } from "./FactoryFunction";
import { NodeProperty } from "./NodeProperty";
import { Node } from "./Node";

export class Factory {
    private readonly factoryFunctions = new Map<FunctionDeclaration, FactoryFunction>();
    private readonly nodes = new Map<Type, Node>();
    private readonly nodeProperties = new Map<Symbol, NodeProperty>();

    getFactoryFunction(declaration: FunctionDeclaration) {
        let func = this.factoryFunctions.get(declaration);
        if (func == null) {
            func = new FactoryFunction(this, declaration);
            this.factoryFunctions.set(declaration, func);
        }
        return func;
    }

    getNode(type: Type) {
        let node = this.nodes.get(type);
        if (node == null) {
            node = new Node(this, type);
            this.nodes.set(type, node);
        }
        return node;
    }

    hasNode(type: Type) {
        return this.nodes.has(type);
    }

    getNodeProperty(symbol: Symbol) {
        let prop = this.nodeProperties.get(symbol);
        if (prop == null) {
            prop = new NodeProperty(this, symbol);
            this.nodeProperties.set(symbol, prop);
        }
        return prop;
    }
}
