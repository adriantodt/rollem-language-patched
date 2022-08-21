import { parse } from './rollem';
export class RollemParserV1 {
    // returns false if parsing failed due to grammar match failure
    tryParse(input) {
        try {
            return parse(input);
        }
        catch (ex) {
            // console.warn(input + " -> " + ex);
            if (ex.location === "CUSTOM") {
                return {
                    depth: 0,
                    dice: 0,
                    pretties: ex.message,
                    value: 0,
                    values: [0],
                    error: ex.message,
                    label: "error"
                };
            }
            return false;
        }
    }
    // returns errors relating to grammar match failure
    parse(input) {
        try {
            return parse(input);
        }
        catch (ex) {
            // console.warn(input + " -> " + ex);
            return {
                depth: 0,
                dice: 0,
                pretties: ex.message,
                value: 0,
                values: [0],
                error: ex.message,
                label: "error"
            };
        }
    }
}
