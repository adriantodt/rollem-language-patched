import _ from "lodash";
export class OldContainer {
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
        return _.sum([0, ...this.parentValues.map(parent => parent.dice())]);
    }
}
