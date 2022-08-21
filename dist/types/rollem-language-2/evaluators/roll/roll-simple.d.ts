import { Delayed, Dice, Integer } from "../..";
export declare function dieFormatter(value: any, size: any, isKept?: boolean): any;
export declare function rollSimple($$howMany: Delayed<Integer> | null | undefined, $$dieSize: Delayed<Integer>): Delayed<Dice | Integer>;
