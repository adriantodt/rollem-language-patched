"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RollemParserV1 = void 0;
const rollem_1 = require("./rollem");
class RollemParserV1 {
    // returns false if parsing failed due to grammar match failure
    tryParse(input) {
        try {
            return (0, rollem_1.parse)(input);
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
            return (0, rollem_1.parse)(input);
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
exports.RollemParserV1 = RollemParserV1;
