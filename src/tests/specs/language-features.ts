export interface Interface {
    prop: string;
    readonly readonlyProp: string;
    [test: string]: string;
}

interface OtherInterface {
    method(p: string): string;
    new(p: number): string;
}

class Class {
    prop!: string;
    constructor(testing: string) {
    }
    method() {
        return 5;
    }
}

declare class Class2 {
    readonly other: string;
    method(p: string): string;
}

const myVar = 6;
let myVar2 = 6, myVar3: string | undefined;
var otherVar = 4;

function Function(p: string): number {
    return 5;
}
