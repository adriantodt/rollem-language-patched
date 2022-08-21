"use strict";
// references
// on conditional subtypes https://medium.com/dailyjs/typescript-create-a-condition-based-subset-types-9d902cea5b8c
// on readonly detection https://stackoverflow.com/questions/49579094/typescript-conditional-types-filter-out-readonly-properties-pick-only-requir
Object.defineProperty(exports, "__esModule", { value: true });
/** A test class. */
class Test {
    one = "one";
    depth = 2;
    dice() { return 5; }
    constructor(input) {
        this.one = input.one;
        this.depth = input.depth;
    }
    static test() {
        return new Test({
            depth: 2,
            one: "one",
        });
    }
}
