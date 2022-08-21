"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dice = void 0;
const values_1 = require("./values");
class Dice extends values_1.Values {
    $howMany;
    $dieSize;
    constructor(input) {
        super(input);
        this.$howMany = input.$howMany;
        this.$dieSize = input.$dieSize;
    }
    dice() {
        return super.dice() + this.$howMany.value;
    }
}
exports.Dice = Dice;
