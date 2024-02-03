"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
const db_1 = require("./db");
// Create a Supabase client
const supabase = (0, supabase_js_1.createClient)(db_1.supabaseUrl, db_1.supabaseKey);
// Handler function for the endpoint
const handler = function () {
    return __awaiter(this, void 0, void 0, function* () {
        // Fetch all users from the database
        const { data, error } = yield supabase
            .from('user')
            .select('*');
        // Check if there was an error
        if (!error) {
            return {
                statusCode: 200,
                body: JSON.stringify({ data }),
            };
        }
        return {
            statusCode: 500,
            body: JSON.stringify({ message: error }),
        };
    });
};
exports.handler = handler;
