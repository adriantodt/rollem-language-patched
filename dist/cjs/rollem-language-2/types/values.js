"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Values = void 0;
const lodash_1 = __importDefault(require("lodash"));
const value_1 = require("./value");
/** A multi-value container with no constraints and no extras. */
class Values extends value_1.Value {
    values;
    constructor(input) {
        super(input);
        this.values = input.values;
    }
    depth() {
        return Math.max(0, ...this.parentValues.map(parent => parent.depth())) + 1;
    }
    dice() {
        return this.dicePassthru();
    }
    static fromNumbers(inputs) {
        return new Values({
            pretties: `[${inputs.join(", ")}]`,
            value: lodash_1.default.sum(inputs),
            values: inputs,
            parentValues: [],
        });
    }
}
exports.Values = Values;
