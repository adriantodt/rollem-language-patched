"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multiply = void 0;
const __1 = require("../..");
function multiply($$left, $$right) {
    return (ctx) => {
        debugger;
        const $left = $$left(ctx);
        const $right = $$right(ctx);
        const total = $left.value * $right.value;
        ctx.trace(`multiply: ${$left}`);
        ctx.trace(`multiply: ${$right}`);
        return new __1.Value({
            parentValues: [$left, $right],
            value: total,
            pretties: `${total} ⟵ ${$left.pretties} * ${$right.pretties}`
        });
    };
}
exports.multiply = multiply;
