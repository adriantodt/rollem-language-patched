"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CsprngRandomSource = void 0;
const crypto_1 = require("crypto");
/** A source of randomness that Rollem can use. */
class CsprngRandomSource {
    /** Produces an integer in the range of min and max. Includes min and max. */
    nextInteger(options) {
        return (0, crypto_1.randomInt)(options.min, options.max + 1);
    }
}
exports.CsprngRandomSource = CsprngRandomSource;
