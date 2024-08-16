"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAccount, useSimulateContract, useWriteContract, useWaitForTransactionReceipt, usePublicClient } from 'wagmi';
import { parseEther, formatEther } from 'viem';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { supabase } from '@/lib/supabaseClient';
import { ICOContractAddress } from '@/utils/smartContractAddress';
import ico from '@/abi/ico.json';
import { transactionProcess } from '../../supabase/query/transactionProcess';
import { print } from "@/utils/toast";

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
  );
};

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
  );
};

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
  );
};

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
  );
};

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
  );
};

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
  );
};

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

function shortenAddress(address: string): string {
  if (address.length <= 10) {
    return address;
  }
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function BDetails() {
  const [loanDetails, setLoanDetails] = useState<LoanDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const loanId = searchParams.get('id');
  const router = useRouter();

  const { address } = useAccount();
  const [message, setMessage] = useState('');
  const [contractBalance, setContractBalance] = useState<bigint>(BigInt(0));

  const publicClient = usePublicClient();

  const { data: simulateData, error: simulateError } = useSimulateContract({
    address: ICOContractAddress as `0x${string}`,
    abi: ico.abi,
    functionName: 'borrowToken',
    args: [parseEther(loanDetails?.lending_amount.toString() || '0')],
  });

  const { data: hash, error: writeError, writeContract } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

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

  useEffect(() => {
    async function fetchContractBalance() {
      if (ICOContractAddress) {
        try {
          const balance = await publicClient?.getBalance({ address: ICOContractAddress as `0x${string}` });
          if (balance) {
            setContractBalance(balance);
          }
        } catch (error) {
          console.error("Error fetching contract balance:", error);
        }
      }
    }

    fetchContractBalance();
  }, [publicClient]);

  useEffect(() => {
    if (isConfirmed && hash && loanDetails) {
      transactionProcess(
        address!,
        loanDetails.address,
        loanDetails.lending_amount,
        loanDetails.cryptocurrency,
        loanDetails.duration_return,
        loanDetails.interest_rate
      )
        .then((result) => {
          setMessage(result ? 'Your transaction has been successfully recorded!' : 'Failed to record your transaction.');
          print("Borrowing transaction confirmed and recorded in the database.", "success");
        })
        .catch((error) => {
          console.error("Error processing transaction:", error);
          print("Failed to process the transaction.", "error");
        });
    }
  }, [isConfirmed, hash, address, loanDetails]);

  const handleConfirmBorrow = async () => {
    if (!simulateData) {
      console.error('Simulation data is not available. Cannot proceed with borrow.');
      return;
    }

    try {
      await writeContract();
      console.log('Borrowing transaction initiated.');
    } catch (error) {
      console.error('Error initiating borrowing transaction:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!loanDetails) {
    return <div>Loan details not found.</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Loan Details</h1>

      <div className="grid gap-4">
        <div>
          <Label>Lender</Label>
          <Input value={shortenAddress(loanDetails.address)} readOnly />
        </div>

        <div>
          <Label>Amount</Label>
          <Input value={`${loanDetails.lending_amount} ${loanDetails.cryptocurrency}`} readOnly />
        </div>

        <div>
          <Label>Duration (Months)</Label>
          <Input value={loanDetails.duration_return} readOnly />
        </div>

        <div>
          <Label>Interest Rate (%)</Label>
          <Input value={loanDetails.interest_rate} readOnly />
        </div>

        <div>
          <Label>Contract Balance</Label>
          <Input value={formatEther(contractBalance)} readOnly />
        </div>

        <Button onClick={handleConfirmBorrow} disabled={isConfirming}>
          {isConfirming ? 'Confirming...' : 'Confirm Borrow'}
        </Button>

        {message && <div className="mt-4">{message}</div>}

        <Collapsible>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between">
              <span>Show More Details</span>
              <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="mt-4">
              <Label>Status</Label>
              <Input value={loanDetails.status} readOnly />
            </div>
            <div className="mt-4">
              <Label>Term</Label>
              <Input value={loanDetails.term} readOnly />
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
}
