import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = 'https://bqljlkdiicwfstzyesln.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxbGpsa2RpaWN3ZnN0enllc2xuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMxODcwNjIsImV4cCI6MjAzODc2MzA2Mn0.HEpIt52lNN8MQAcDTmvhmA1-wD4n6UpR4ImVFbk55Qc';
const supabase = createClient(supabaseUrl, supabaseKey);

// Define TypeScript interface for Repayment
interface Repayment {
  id: number;
  transaction_id: number;
  amount_repaid: number;
  repayment_date: string;
  status: string;
}

// Function to fetch repayments for a user
export async function fetchRepaymentsForUser(address: string): Promise<Repayment[] | null> {
  try {
    // Call the stored procedure to fetch repayments
    const { data, error } = await supabase.rpc('get_repayments_for_user', {
      user_address: address
    });

    if (error) {
      console.error('Error fetching repayments:', error.message);
      return null;
    }

    // Log the data for debugging
    console.log('Fetched repayments:', data);

    // Return the fetched data
    return data as Repayment[];
  } catch (err) {
    console.error('Unexpected error:', err);
    return null;
  }
}
