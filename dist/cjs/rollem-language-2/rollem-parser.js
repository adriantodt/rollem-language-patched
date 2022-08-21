"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RollemParserV2 = void 0;
const rollem_1 = require("./rollem");
class RollemParserV2 {
    tryParse(input) {
        try {
            return (0, rollem_1.parse)(input);
        }
        catch (ex) {
            // TODO: Custom error handling
            return false;
        }
    }
    parse(input) {
        try {
            return (0, rollem_1.parse)(input);
        }
        catch (ex) {
            if (ex instanceof rollem_1.SyntaxError) {
                throw ex;
            }
            throw ex;
        }
    }
}
exports.RollemParserV2 = RollemParserV2;
