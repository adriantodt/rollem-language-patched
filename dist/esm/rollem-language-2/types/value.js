import { OldContainer } from "./old-container";
/** A singular value with no constraints. Be sure to  */
export class Value extends OldContainer {
    constructor(input) {
        super(input);
    }
    static fromNumber(input) {
        return new Value({
            pretties: `${input}`,
            value: input,
            parentValues: [],
        });
    }
}
