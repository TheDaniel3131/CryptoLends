import { createClient } from '@supabase/supabase-js'


export async function withdrawToken(address: string, amount: number): Promise<boolean> {

    const supabaseUrl = 'https://bqljlkdiicwfstzyesln.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxbGpsa2RpaWN3ZnN0enllc2xuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMxODcwNjIsImV4cCI6MjAzODc2MzA2Mn0.HEpIt52lNN8MQAcDTmvhmA1-wD4n6UpR4ImVFbk55Qc';
    const supabase = createClient(supabaseUrl,supabaseKey);


    const { data, error } = await supabase.rpc('withdraw_token', {
        p_address: address,
        amount: amount
    });

    if (error) {
        console.error('Error withdrawing token:', error.message);
        return false;
    }

    if (data) {
        return true;
    } else {
        console.error('Unexpected response from Supabase function');
        return false;
    }
}
