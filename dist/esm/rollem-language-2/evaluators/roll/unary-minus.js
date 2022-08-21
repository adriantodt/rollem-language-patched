import { Dice, DicePassthru, Integer, Value, Values } from "../..";
import { dieFormatter } from "./roll-simple";
export function unaryMinus($$container) {
    return (ctx) => {
        const $container = $$container(ctx);
        ctx.trace("unary-minus: " + $container.pretties);
        // if the attached type is already simple, just pass through the value
        if ($container instanceof Integer) {
            return new Value({
                value: -$container.value,
                pretties: `-${$container.pretties}`,
                parentValues: [$container]
            });
        }
        const rightSidePretties = `-(${$container.pretties})`;
        if ($container instanceof Dice) {
            const newValues = $container.values.map(v => -v);
            const newValue = -$container.value;
            return new DicePassthru({
                $dieSize: $container.$dieSize,
                $howMany: $container.$howMany,
                pretties: `[${newValues.map(v => dieFormatter(v, $container.$dieSize.value, true)).join(", ")}] ⟵ ${rightSidePretties}`,
                value: newValue,
                values: newValues,
                parentValues: [$container],
            });
        }
        if ($container instanceof Values) {
            const newValues = $container.values.map(v => -v);
            const newValue = -$container.value;
            return new Values({
                pretties: `[${newValues.join(", ")}] ⟵ ${rightSidePretties}`,
                value: newValue,
                values: newValues,
                parentValues: [$container],
            });
        }
        if ($container instanceof Value) {
            const newValue = -$container.value;
            return new Value({
                value: newValue,
                pretties: `${newValue} ⟵ ${rightSidePretties}`,
                parentValues: [$container],
            });
        }
        throw "Unary Minus passed unexpected type";
    };
}
