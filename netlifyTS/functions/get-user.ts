import { createClient } from '@supabase/supabase-js';
import { supabaseKey, supabaseUrl } from './db';
import {
    APIGatewayProxyEvent,
    APIGatewayProxyResult,
} from 'aws-lambda';

// Create a Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

// Handler function for the endpoint
export const handler = async function (
    event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> {
    // Extract the username from the URL path
    const pathSegments = event.path.split('/');
    const username = pathSegments[pathSegments.length - 1];

    // Check if the username parameter is present
    if (!username) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                message: 'Missing username parameter',
            }),
        };
    }

    // Query the Supabase database for the user with the given username
    const { data, error } = await supabase
        .from('user')
        .select('*')
        .eq('username', username);

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
};
