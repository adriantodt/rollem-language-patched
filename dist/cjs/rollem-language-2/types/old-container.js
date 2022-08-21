"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OldContainer = void 0;
const lodash_1 = __importDefault(require("lodash"));
class OldContainer {
    value;
    pretties;
    parentValues;
    constructor(input) {
        this.value = input.value;
        this.pretties = input.pretties;
        this.parentValues = input.parentValues;
    }
    depth() {
        return Math.max(0, ...this.parentValues.map(parent => parent.depth())) + 1;
    }
    dice() {
        return this.dicePassthru();
    }
    dicePassthru() {
        return lodash_1.default.sum([0, ...this.parentValues.map(parent => parent.dice())]);
    }
}
exports.OldContainer = OldContainer;
