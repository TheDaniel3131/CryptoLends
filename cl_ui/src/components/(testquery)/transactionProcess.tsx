"use client";

import { useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

interface TransactionProcessProps {
    lender: string;
    borrower: string;
    amount: number;
    contract: string;
    durationMonth: number;
    rate: number;
}

export function TransactionProcess({
    lender,
    borrower,
    amount,
    contract,
    durationMonth,
    rate,
}: TransactionProcessProps) {
    useEffect(() => {
        async function processTransaction() {
            const supabaseUrl = 'https://bqljlkdiicwfstzyesln.supabase.co';
            const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxbGpsa2RpaWN3ZnN0enllc2xuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMxODcwNjIsImV4cCI6MjAzODc2MzA2Mn0.HEpIt52lNN8MQAcDTmvhmA1-wD4n6UpR4ImVFbk55Qc';
            const supabase = createClient(supabaseUrl, supabaseKey);

            const { error } = await supabase.rpc('transaction_process', {
                lender: lender,
                borrower: borrower,
                amount: amount,
                contract: contract,
                duration_month: durationMonth,
                rate: rate,
            });

            if (error) {
                console.error('Error executing the transaction process:', error.message);
            } else {
                console.log('Transaction successful!');
            }
        }

        processTransaction();
    }, [lender, borrower, amount, contract, durationMonth, rate]);

    return <div>Transaction is being processed...</div>;
}
