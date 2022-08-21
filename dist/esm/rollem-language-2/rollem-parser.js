import { SyntaxError, parse } from "./rollem";
export class RollemParserV2 {
    tryParse(input) {
        try {
            return parse(input);
        }
        catch (ex) {
            // TODO: Custom error handling
            return false;
        }
    }
    parse(input) {
        try {
            return parse(input);
        }
        catch (ex) {
            if (ex instanceof SyntaxError) {
                throw ex;
            }
            throw ex;
        }
    }
}
