"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DicePassthru = void 0;
const dice_1 = require("./dice");
class DicePassthru extends dice_1.Dice {
    $howMany;
    $dieSize;
    constructor(input) {
        super(input);
        this.$howMany = input.$howMany;
        this.$dieSize = input.$dieSize;
    }
    dice() {
        return this.dicePassthru();
    }
}
exports.DicePassthru = DicePassthru;
