"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { supabase } from '@/lib/supabaseClient'; // Ensure this import is correct
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";

interface LoanDetails {
  cryptocurrency: string;
  id: number;
  lending_amount: number;
  duration_return: number;
  interest_rate: number;
  loan_status: string;
  status: string;
  address: string;
}

// Function to shorten wallet address
function shortenAddress(address: string): string {
  if (address.length <= 10) {
    return address;
  }
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function BDetails() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState({ key: "loanAmount", order: "desc" });
  const [filters, setFilters] = useState({
    loanStatus: [],
    loanDuration: [],
  });
  const [loanDetails, setLoanDetails] = useState<LoanDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const loanId = searchParams.get('id') as string | undefined;
  console.log('Loan ID from URL:', loanId);
  type LoanStatus = "Active" | "Pending" | "Completed";

  useEffect(() => {
    async function fetchLoanDetails() {
      if (!loanId) return;

      const { data, error } = await supabase
        .from('lending_list')
        .select('*')
        .eq('id', loanId)
        .single();

      if (error) {
        console.error('Error fetching loan details:', error);
        setError(error.message);
      } else {
        console.log('Fetched loan details:', data);
        setLoanDetails(data);
      }

      setLoading(false);
    }

    fetchLoanDetails();
  }, [loanId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!loanDetails) return <div>No loan details found</div>;

  console.log('Loan Details:', loanDetails); 

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        <section className="bg-background py-12 px-6 md:px-12">
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">Loan Details</h1>
            </div>
            <div className="bg-background rounded-lg shadow-lg p-8 mx-auto max-w-2xl">
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h2 className="text-lg font-bold">Lender Wallet Address</h2>
                    <p>{shortenAddress(loanDetails.address)}</p>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold">Loan Amount</h2>
                    <p>{loanDetails.lending_amount} {loanDetails.cryptocurrency}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h2 className="text-lg font-bold">Loan Duration</h2>
                    <p>{loanDetails.duration_return} Month</p>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold">Cryptocurrency Type</h2>
                    <p>Ethereum (ETH)</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h2 className="text-lg font-bold">Interest Rate</h2>
                    <p>{loanDetails.interest_rate}%</p>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold">Status</h2>
                    <span
                      className={`badge ${loanDetails.status === "Completed" ? "ml-2 bg-primary px-2 py-1 rounded-full text-xs text-primary-foreground bg-gray-500" : loanDetails.status === "Active" ? "ml-2 bg-primary px-2 py-1 rounded-full text-xs text-primary-foreground bg-green-500" : "ml-2 bg-primary px-2 py-1 rounded-full text-xs text-primary-foreground bg-red-500"}`}
                    >
                      {loanDetails.status}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-8">
                <Button>Borrow</Button>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-muted py-16 px-6 md:px-12 flex flex-col items-center justify-center gap-8">
          <div className="max-w-3xl space-y-6 text-center">
            <h2 className="text-3xl font-bold">How it Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-background p-6 rounded-xl shadow-sm">
                <WalletIcon className="h-8 w-8 mb-4 text-secondary" />
                <h3 className="text-xl font-bold mb-2">Connect Wallet</h3>
                <p className="text-muted-foreground">
                  Connect your crypto wallet to our platform to start borrowing.
                </p>
              </div>
              <div className="bg-background p-6 rounded-xl shadow-sm">
                <PercentIcon className="h-8 w-8 mb-4 text-secondary" />
                <h3 className="text-xl font-bold mb-2">Choose Loan Terms</h3>
                <p className="text-muted-foreground">
                  Select the asset, amount, and term that best suits your needs.
                </p>
              </div>
              <div className="bg-background p-6 rounded-xl shadow-sm">
                <ReceiptIcon className="h-8 w-8 mb-4 text-secondary" />
                <h3 className="text-xl font-bold mb-2">Access Crypto Liquidity</h3>
                <p className="text-muted-foreground">
                  Receive the crypto you need to fund your projects or personal expenses.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Frequently Asked Questions Section */}
        <section className="bg-background py-16 px-6 md:px-12 flex flex-col items-center justify-center gap-8">
          <div className="max-w-3xl space-y-6 text-center">
            <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
            <div className="grid gap-4">
              <Collapsible>
                <CollapsibleTrigger className="flex items-center justify-between w-full bg-muted p-4 rounded-xl">
                  <h3 className="text-lg font-bold">What is the minimum amount I can borrow?</h3>
                  <ChevronDownIcon className="h-5 w-5" />
                </CollapsibleTrigger>
                <CollapsibleContent className="bg-background p-4 rounded-xl">
                  <p className="text-muted-foreground">
                    The minimum amount you can borrow is $100.
                  </p>
                </CollapsibleContent>
              </Collapsible>
              <Collapsible>
                <CollapsibleTrigger className="flex items-center justify-between w-full bg-muted p-4 rounded-xl">
                  <h3 className="text-lg font-bold">How long does it take to get approved?</h3>
                  <ChevronDownIcon className="h-5 w-5" />
                </CollapsibleTrigger>
                <CollapsibleContent className="bg-background p-4 rounded-xl">
                  <p className="text-muted-foreground">
                    Loan approval usually takes between 24 to 48 hours.
                  </p>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

const LockIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
      <svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
      >
          <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
  )
}

const PercentIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
      <svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
      >
          <line x1="19" x2="5" y1="5" y2="19" />
          <circle cx="6.5" cy="6.5" r="2.5" />
          <circle cx="17.5" cy="17.5" r="2.5" />
      </svg>
  )
}

const ReceiptIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
      <svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
      >
          <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" />
          <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
          <path d="M12 17.5v-11" />
      </svg>
  )
}

const WalletIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
      <svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
      >
          <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
          <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
      </svg>
  )
}

const ClockIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
      <svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
      >
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
      </svg>
  )
}

const ChevronDownIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
      <svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
      >
          <path d="m6 9 6 6 6-6" />
      </svg>
  )
}

export default BDetails;