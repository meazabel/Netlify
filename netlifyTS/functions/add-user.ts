import { createClient } from '@supabase/supabase-js';
import { supabaseKey, supabaseUrl } from './db';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { User } from '../../src/users/users.entity';
import { Role } from '../../src/enums/role';
import { uuid } from 'uuidv4';

// Create a Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

// Handler function for the endpoint
export const handler = async function (
    req: Request,
    res: Response,
) {
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
                body: JSON.stringify({
                    message: errors.array(),
                }),
            };
        }
        // Create a new instance of the User entity
        const newUser = new User();
        let userId = uuid();
        let userUn = newUser.generateUsername(
            firstName,
            lastName,
        );
        // Insert the new user into the database
        const { data, error } = await supabase
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
                message: 'Please include a request (POST).',
            }),
        };
    }
};
