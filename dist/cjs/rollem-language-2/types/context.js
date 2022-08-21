"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestContext = void 0;
const chance_1 = require("chance");
let counter = 0;
/** Adds one to the "random number" each time it's called. */
class TestContext {
    options;
    randomSource;
    chance;
    hello = "world";
    callCount = 0;
    contextId = counter++;
    created = new Date();
    constructor(seed, options = { shouldTrace: false }) {
        this.options = options;
        const internalChance = new chance_1.Chance(seed);
        this.chance = new chance_1.Chance(() => {
            this.callCount++;
            const random = internalChance.random();
            return random;
        });
        this.randomSource = {
            nextInteger: (options) => this.chance.integer({ min: options.min, max: options.max }),
        };
    }
    trace(...values) {
        if (!this.options.shouldTrace) {
            return;
        }
        const hours = this.created.getHours().toString().padStart(2, '0');
        const minutes = this.created.getMinutes().toString().padStart(2, '0');
        const seconds = this.created.getSeconds().toString().padStart(2, '0');
        const millis = this.created.getMilliseconds().toString().padStart(3, '0');
        const stamp = `[${[hours, minutes, seconds].join(':')}.${millis}|${this.contextId.toString().padStart(3)}]`;
        console.log(stamp, ...values);
    }
}
exports.TestContext = TestContext;
