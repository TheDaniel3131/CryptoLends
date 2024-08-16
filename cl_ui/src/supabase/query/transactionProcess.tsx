import { createClient } from '@supabase/supabase-js'


export async function transactionProcess(
    lender: string,
    borrower: string,
    amount: number,
    currency: string,
    durationMonth: number,
    rate: number
): Promise<boolean> {

    const supabaseUrl = 'https://bqljlkdiicwfstzyesln.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxbGpsa2RpaWN3ZnN0enllc2xuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMxODcwNjIsImV4cCI6MjAzODc2MzA2Mn0.HEpIt52lNN8MQAcDTmvhmA1-wD4n6UpR4ImVFbk55Qc';
    const supabase = createClient(supabaseUrl, supabaseKey);


    const { error } = await supabase.rpc('transaction_process', {
        lender: lender,
        borrower: borrower,
        amount: amount,
        currency: currency,
        duration_month: durationMonth,
        rate: rate
    });

    if (error) {
        console.error('Error execute the transaction process:', error.message);
        return false;
    }
    return true;
}
