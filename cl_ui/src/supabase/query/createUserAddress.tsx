import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://bqljlkdiicwfstzyesln.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxbGpsa2RpaWN3ZnN0enllc2xuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMxODcwNjIsImV4cCI6MjAzODc2MzA2Mn0.HEpIt52lNN8MQAcDTmvhmA1-wD4n6UpR4ImVFbk55Qc'; // It's safer to use environment variables for keys
const supabase = createClient(supabaseUrl, supabaseKey);

export async function createUserAddress(address: string): Promise<boolean> {
    const { error } = await supabase.rpc('insert_address', {
        p_address: address
    });

    if (error) {
        console.error('Error inserting address:', error.message);
        return false;
    }
    return true;
}
