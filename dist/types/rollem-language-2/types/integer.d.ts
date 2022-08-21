import { ParamType } from "./param-type";
import { Value } from "./value";
/** A singluar integer value. */
export declare class Integer extends Value {
    constructor(input: ParamType<Integer>);
    static fromNumber(input: number): Integer;
}
