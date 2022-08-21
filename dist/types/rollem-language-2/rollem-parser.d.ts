import { OldContainer } from "./types";
import { Delayed } from "./types/delayed";
export declare class RollemParserV2 {
    tryParse(input: string): Delayed<OldContainer> | false;
    parse(input: string): Delayed<OldContainer>;
}
