import { OldContainer } from "./old-container";
import { ParamType } from "./param-type";
/** A singular value with no constraints. Be sure to  */
export declare class Value extends OldContainer {
    constructor(input: ParamType<Value>);
    static fromNumber(input: number): Value;
}
