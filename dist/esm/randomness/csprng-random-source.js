import { randomInt } from "crypto";
/** A source of randomness that Rollem can use. */
export class CsprngRandomSource {
    /** Produces an integer in the range of min and max. Includes min and max. */
    nextInteger(options) {
        return randomInt(options.min, options.max + 1);
    }
}
