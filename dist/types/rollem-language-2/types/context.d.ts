/// <reference types="chance" />
import { RollemRandomSource } from '../../randomness/random-source';
export interface Context {
    randomSource: RollemRandomSource;
    hello: string;
    trace(...values: any[]): void;
}
/** Adds one to the "random number" each time it's called. */
export declare class TestContext implements Context {
    private readonly options;
    randomSource: RollemRandomSource;
    chance: Chance.Chance;
    hello: string;
    callCount: number;
    contextId: number;
    created: Date;
    constructor(seed: Chance.Seed, options?: {
        shouldTrace: boolean;
    });
    trace(...values: any[]): void;
}
