import { createClient } from '@supabase/supabase-js';
import { supabaseKey, supabaseUrl } from './db';

// Create a Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

// Handler function for the endpoint
export const handler = async function () {
    // Fetch all users from the database
    const { data, error } = await supabase
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
};
