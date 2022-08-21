import { ParamType } from "./param-type";
import { Value } from "./value";
/** A multi-value container with no constraints and no extras. */
export declare class Values extends Value {
    readonly values: number[];
    constructor(input: ParamType<Values>);
    depth(): number;
    dice(): number;
    static fromNumbers(inputs: number[]): Values;
}
