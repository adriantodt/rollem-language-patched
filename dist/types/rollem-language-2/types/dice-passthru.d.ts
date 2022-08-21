import { Dice } from "./dice";
import { ParamType } from "./param-type";
import { Value } from "./value";
export declare class DicePassthru extends Dice {
    readonly $howMany: Value;
    readonly $dieSize: Value;
    constructor(input: ParamType<DicePassthru>);
    dice(): number;
}
