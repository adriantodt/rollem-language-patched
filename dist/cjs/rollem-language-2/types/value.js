"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Value = void 0;
const old_container_1 = require("./old-container");
/** A singular value with no constraints. Be sure to  */
class Value extends old_container_1.OldContainer {
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
exports.Value = Value;
