import _ from "lodash";
import { Value } from "./value";
/** A multi-value container with no constraints and no extras. */
export class Values extends Value {
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
            value: _.sum(inputs),
            values: inputs,
            parentValues: [],
        });
    }
}
