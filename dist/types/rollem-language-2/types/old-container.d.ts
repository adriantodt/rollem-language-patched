import { ParamType } from "./param-type";
export declare abstract class OldContainer {
    readonly value: number;
    readonly pretties: string;
    readonly parentValues: OldContainer[];
    constructor(input: ParamType<OldContainer>);
    depth(): number;
    dice(): number;
    protected dicePassthru(): number;
}
