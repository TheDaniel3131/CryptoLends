"use client";

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { ChevronLeftIcon } from '@/components/ui/icons';

interface RepaymentDetail {
  id: number;
  address_borrower: string;
  token_amount: number;
  lending_or_borrowing_start_date: string;
  lending_or_borrowing_end_date: string;
  status: string;
}

export default function RepaymentDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [repayment, setRepayment] = useState<RepaymentDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRepaymentDetail() {
      if (typeof id === 'string') {
        const { data, error } = await supabase
          .from('transaction_record')
          .select(`
            id,
            address_borrower,
            token_amount,
            lending_or_borrowing_start_date,
            lending_or_borrowing_end_date,
            status
          `)
          .eq('id', id)
          .single();

        if (error) {
          console.error('Error fetching repayment detail:', error.message);
        } else {
          setRepayment(data);
        }
        setLoading(false);
      }
    }

    fetchRepaymentDetail();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!repayment) {
    return <div>Repayment detail not found</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="bg-background py-12 px-6 md:px-12">
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="flex items-center mb-6">
              <Link href="/repayments" className="flex items-center text-blue-500 hover:underline">
                <ChevronLeftIcon className="h-6 w-6 mr-2" />
                Back to Repayments
              </Link>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h1 className="text-3xl font-bold mb-4">Repayment Details</h1>
              <div className="space-y-4">
                <div>
                  <span className="font-semibold">ID:</span> {repayment.id}
                </div>
                <div>
                  <span className="font-semibold">Borrower Address:</span> {repayment.address_borrower}
                </div>
                <div>
                  <span className="font-semibold">Amount:</span> {repayment.token_amount}
                </div>
                <div>
                  <span className="font-semibold">Start Date:</span> {repayment.lending_or_borrowing_start_date}
                </div>
                <div>
                  <span className="font-semibold">End Date:</span> {repayment.lending_or_borrowing_end_date}
                </div>
                <div>
                  <span className="font-semibold">Status:</span> <Badge>{repayment.status}</Badge>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
