"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rollSimple = exports.dieFormatter = void 0;
const __1 = require("../..");
function minFormatter(formatted) {
    return "**" + formatted + "**";
}
function maxFormatter(formatted) {
    return "**" + formatted + "**";
}
function dropFormatter(formatted) {
    return "~~" + formatted + "~~";
}
// This is used to configure stylization of the individual die results.
function dieFormatter(value, size, isKept = true) {
    let formatted = value;
    if (value >= size)
        formatted = maxFormatter(formatted);
    else if (value === 1)
        formatted = minFormatter(formatted);
    if (!isKept)
        formatted = dropFormatter(formatted);
    return formatted;
}
exports.dieFormatter = dieFormatter;
function rollSimple($$howMany, $$dieSize) {
    return (ctx) => {
        const allRolls = [];
        const $howMany = $$howMany ? $$howMany(ctx) : __1.Integer.fromNumber(1);
        const howMany = $howMany.value;
        const $dieSize = $$dieSize(ctx);
        ctx.trace(`roll-simple: die-size: ${$dieSize}`);
        ctx.trace(`roll-simple: how-many: ${howMany}`);
        for (let i = 0; i < howMany; i++) {
            allRolls.push(ctx.randomSource.nextInteger({ min: 1, max: $dieSize.value }));
        }
        allRolls.sort();
        const sum = allRolls.reduce((accum, cur) => accum + cur, 0);
        // TODO: this formatter should probably preserve the contents of the right hand side if the type is complex
        const pretties = `[${allRolls.map(v => dieFormatter(v, $dieSize.value, true)).join(", ")}] ⟵ ${howMany}d${$dieSize.value}`;
        return new __1.Dice({
            $howMany: $howMany,
            $dieSize: $dieSize,
            value: sum,
            values: allRolls,
            pretties: pretties,
            parentValues: [$howMany, $dieSize],
        });
    };
}
exports.rollSimple = rollSimple;
