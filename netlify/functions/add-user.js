'use strict';
var __awaiter =
    (this && this.__awaiter) ||
    function (thisArg, _arguments, P, generator) {
        function adopt(value) {
            return value instanceof P
                ? value
                : new P(function (resolve) {
                      resolve(value);
                  });
        }
        return new (P || (P = Promise))(function (
            resolve,
            reject,
        ) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                } catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator['throw'](value));
                } catch (e) {
                    reject(e);
                }
            }
            function step(result) {
                result.done
                    ? resolve(result.value)
                    : adopt(result.value).then(
                          fulfilled,
                          rejected,
                      );
            }
            step(
                (generator = generator.apply(
                    thisArg,
                    _arguments || [],
                )).next(),
            );
        });
    };
Object.defineProperty(exports, '__esModule', {
    value: true,
});
exports.handler = void 0;
const supabase_js_1 = require('@supabase/supabase-js');
const db_1 = require('./db');
const express_validator_1 = require('express-validator');
const users_entity_1 = require('../../dist/src/users/users.entity');
const role_1 = require('../../dist/src/enums/role');
const uuidv4_1 = require('uuidv4');
// Create a Supabase client
const supabase = (0, supabase_js_1.createClient)(
    db_1.supabaseUrl,
    db_1.supabaseKey,
);
// Handler function for the endpoint
const handler = function (req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Destructure the request body
            const { firstName, lastName, email, role } =
                JSON.parse(req.body);
            // Check if any of the fields are empty
            if (
                firstName.length < 1 ||
                lastName.length < 1 ||
                email.length < 1 ||
                role.length < 1
            ) {
                return {
                    statusCode: 500,
                    body: JSON.stringify({
                        message:
                            'You cannot leave any fields empty',
                    }),
                };
            }
            if (
                !((_a = Object.values(role_1.Role)) ===
                    null || _a === void 0
                    ? void 0
                    : _a.includes(role))
            ) {
                return {
                    statusCode: 500,
                    body: JSON.stringify({
                        message:
                            'Role can only be guest, member, or admin',
                    }),
                };
            }
            // Perform validation on the request
            const errors = (0,
            express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return {
                    statusCode: 500,
                    body: JSON.stringify({
                        message: errors.array(),
                    }),
                };
            }
            // Create a new instance of the User entity
            const newUser = new users_entity_1.User();
            let userId = (0, uuidv4_1.uuid)();
            let userUn = newUser.generateUsername(
                firstName,
                lastName,
            );
            // Insert the new user into the database
            const { data, error } = yield supabase
                .from('user')
                .insert([
                    {
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        role: role,
                        id: userId,
                        username: userUn,
                    },
                ])
                .select();
            // Check if there was an error during insertion
            if (!error) {
                return {
                    statusCode: 201,
                    body: JSON.stringify({ data }),
                };
            }
            return {
                statusCode: 500,
                body: JSON.stringify({ message: error }),
            };
        } catch (error) {
            return {
                statusCode: 500,
                body: JSON.stringify({
                    message:
                        'Please include a request (POST).',
                }),
            };
        }
    });
};
exports.handler = handler;
