import { ParamType } from "./param-type";
import { Value } from "./value";
import { Values } from "./values";
export declare class Dice extends Values {
    readonly $howMany: Value;
    readonly $dieSize: Value;
    constructor(input: ParamType<Dice>);
    dice(): number;
}
