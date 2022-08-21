import { Dice } from "./dice";
export class DicePassthru extends Dice {
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
