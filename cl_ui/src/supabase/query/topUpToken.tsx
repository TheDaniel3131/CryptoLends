import { createClient } from '@supabase/supabase-js'


export async function topUpToken(address: string, amount: number): Promise<boolean> {

    const supabaseUrl = 'https://bqljlkdiicwfstzyesln.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxbGpsa2RpaWN3ZnN0enllc2xuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMxODcwNjIsImV4cCI6MjAzODc2MzA2Mn0.HEpIt52lNN8MQAcDTmvhmA1-wD4n6UpR4ImVFbk55Qc';
    const supabase = createClient(supabaseUrl,supabaseKey);


    // Call the Supabase function
    const { data, error } = await supabase.rpc('top_up_token', {
        p_address: address,
        p_token_amount: amount
    });

    // Handle errors
    if (error) {
        console.error('Error topping up token:', error.message);
        return false;
    }
    // Check for success (based on function behavior)
    if (data) {
        return true;
    } else {
        console.error('Unexpected response from Supabase function');
        return false;
    }
}
