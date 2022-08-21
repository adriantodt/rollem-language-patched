import { Value } from "./value";
/** A singluar integer value. */
export class Integer extends Value {
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
