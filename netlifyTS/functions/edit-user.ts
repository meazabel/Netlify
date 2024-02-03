import { createClient } from '@supabase/supabase-js';
import { supabaseKey, supabaseUrl } from './db';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { Role } from '../../src/enums/role';

// Create a Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

// Handler function for the endpoint
export const handler = async function (
    req: Request,
    res: Response,
) {
    try {
        // Destructure the request body
        const {
            firstName,
            lastName,
            email,
            role,
            id,
            username,
        } = JSON.parse(req.body);
        // Check if any of the fields are empty
        if (
            firstName.length < 1 ||
            lastName.length < 1 ||
            email.length < 1 ||
            role.length < 1 ||
            id.length < 1 ||
            username.length < 1
        ) {
            return {
                statusCode: 500,
                body: JSON.stringify({
                    message:
                        'You cannot leave any fields empty',
                }),
            };
        }
        if (!Object.values(Role)?.includes(role)) {
            return {
                statusCode: 500,
                body: JSON.stringify({
                    message:
                        'Role can only be guest, member, or admin',
                }),
            };
        }
        // Perform validation on the request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return {
                statusCode: 500,
                body: JSON.stringify({ message: errors }),
            };
        }

        //Update user in the database
        const { data, error } = await supabase
            .from('user')
            .update({
                firstName: firstName,
                lastName: lastName,
                email: email,
                role: role,
            })
            .eq('id', id)
            .eq('username', username)
            .select();

        // Check if there was an error
        if (!error) {
            return {
                statusCode: 201,
                body: JSON.stringify({ data }),
            };
        }
        if (data == null) {
            return {
                statusCode: 201,
                body: JSON.stringify({
                    message:
                        'Username or id does not exist',
                }),
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
                message: 'Please include a request (POST).',
            }),
        };
    }
};
