"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Integer = void 0;
const value_1 = require("./value");
/** A singluar integer value. */
class Integer extends value_1.Value {
    constructor(input) {
        super(input);
    }
    static fromNumber(input) {
        const decimal = input - Math.floor(input);
        if (decimal > 0)
            throw `Cannot create integer with number ${input}`;
        return new Integer({
            pretties: `${input}`,
            value: input,
            parentValues: [],
        });
    }
}
exports.Integer = Integer;
