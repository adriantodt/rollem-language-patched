import { Chance } from 'chance';
let counter = 0;
/** Adds one to the "random number" each time it's called. */
export class TestContext {
    options;
    randomSource;
    chance;
    hello = "world";
    callCount = 0;
    contextId = counter++;
    created = new Date();
    constructor(seed, options = { shouldTrace: false }) {
        this.options = options;
        const internalChance = new Chance(seed);
        this.chance = new Chance(() => {
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
