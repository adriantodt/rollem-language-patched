import { Values } from "./values";
export class Dice extends Values {
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
