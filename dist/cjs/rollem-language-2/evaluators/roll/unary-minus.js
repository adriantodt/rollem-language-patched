"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unaryMinus = void 0;
const __1 = require("../..");
const roll_simple_1 = require("./roll-simple");
function unaryMinus($$container) {
    return (ctx) => {
        const $container = $$container(ctx);
        ctx.trace("unary-minus: " + $container.pretties);
        // if the attached type is already simple, just pass through the value
        if ($container instanceof __1.Integer) {
            return new __1.Value({
                value: -$container.value,
                pretties: `-${$container.pretties}`,
                parentValues: [$container]
            });
        }
        const rightSidePretties = `-(${$container.pretties})`;
        if ($container instanceof __1.Dice) {
            const newValues = $container.values.map(v => -v);
            const newValue = -$container.value;
            return new __1.DicePassthru({
                $dieSize: $container.$dieSize,
                $howMany: $container.$howMany,
                pretties: `[${newValues.map(v => (0, roll_simple_1.dieFormatter)(v, $container.$dieSize.value, true)).join(", ")}] ⟵ ${rightSidePretties}`,
                value: newValue,
                values: newValues,
                parentValues: [$container],
            });
        }
        if ($container instanceof __1.Values) {
            const newValues = $container.values.map(v => -v);
            const newValue = -$container.value;
            return new __1.Values({
                pretties: `[${newValues.join(", ")}] ⟵ ${rightSidePretties}`,
                value: newValue,
                values: newValues,
                parentValues: [$container],
            });
        }
        if ($container instanceof __1.Value) {
            const newValue = -$container.value;
            return new __1.Value({
                value: newValue,
                pretties: `${newValue} ⟵ ${rightSidePretties}`,
                parentValues: [$container],
            });
        }
        throw "Unary Minus passed unexpected type";
    };
}
exports.unaryMinus = unaryMinus;
