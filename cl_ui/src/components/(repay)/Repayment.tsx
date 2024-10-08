"use client"

import { useState, useEffect, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { supabase } from '@/lib/supabaseClient';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { useAccount } from "wagmi";
import { ethers } from "ethers";
import { toast } from 'react-toastify';
import { Button } from "@/components/ui/button";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import 'react-toastify/dist/ReactToastify.css';
import crypto from "crypto";

interface Repayment {
  id: number;
  address_borrower: string;
  token_amount: number;
  lending_or_borrowing_start_date: string;
  lending_or_borrowing_end_date: string;
  status: string;
}

interface SortButtonProps {
  label: string;
  sortKey: keyof Repayment;
  currentSort: { key: keyof Repayment; order: "asc" | "desc" };
  onSort: (key: keyof Repayment) => void;
}

const SortButton: React.FC<SortButtonProps> = ({ label, sortKey, currentSort, onSort }) => {
  return (
    <Button
      variant="ghost"
      onClick={() => onSort(sortKey)}
      className="h-8 px-2 lg:px-3"
    >
      {label}
      {currentSort.key === sortKey ? (
        currentSort.order === "asc" ? (
          <ArrowUp className="ml-2 h-4 w-4" />
        ) : (
          <ArrowDown className="ml-2 h-4 w-4" />
        )
      ) : (
        <ArrowUpDown className="ml-2 h-4 w-4" />
      )}
    </Button>
  );
};

const CONTRACT_ADDRESS = '0x90F79bf6EB2c4f870365E785982E1f101E93b906';
const CONTRACT_ABI = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_loanId",
        "type": "uint256"
      }
    ],
    "name": "repayLoan",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  }
];

function hashAddress(address: string): string {
  return crypto.createHash('sha256').update(address.trim().toLowerCase()).digest('hex');
}

export default function Repayment() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<{ key: keyof Repayment; order: "asc" | "desc" }>({ key: "id", order: "desc" });
  const [repayments, setRepayments] = useState<Repayment[]>([]);
  const [loading, setLoading] = useState(true);
  const { address } = useAccount(); // Retrieve the current Ethereum address from MetaMask

  useEffect(() => {
    async function loadRepayments() {
      setLoading(true);

      if (address) {
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
          .eq('address_borrower', hashAddress(address));

        if (error) {
          console.error('Error fetching data from Supabase:', error.message);
        } else {
          const formattedData = data.map((item: any) => ({
            id: item.id,
            address_borrower: item.address_borrower,
            token_amount: item.token_amount,
            lending_or_borrowing_start_date: item.lending_or_borrowing_start_date,
            lending_or_borrowing_end_date: item.lending_or_borrowing_end_date,
            status: item.status
          }));

          setRepayments(formattedData);
        }
      } else {
        console.warn('No user address found');
        setRepayments([]);
      }
      setLoading(false);
    }

    loadRepayments();
  }, [address]);

  const filteredRepayments = useMemo(() => {
    return repayments
      .filter((repayment) => {
        const searchValue = search.toLowerCase();

        return (
          repayment.id.toString().includes(searchValue) ||
          repayment.address_borrower.toLowerCase().includes(searchValue) ||
          repayment.token_amount.toString().includes(searchValue) ||
          repayment.lending_or_borrowing_start_date.toLowerCase().includes(searchValue) ||
          repayment.lending_or_borrowing_end_date.toLowerCase().includes(searchValue) ||
          repayment.status.toLowerCase().includes(searchValue)
        );
      })
      .sort((a, b) => {
        if (!a || !b) return 0;

        const aValue = a[sort.key as keyof Repayment];
        const bValue = b[sort.key as keyof Repayment];

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sort.order === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }

        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return sort.order === "asc" ? aValue - bValue : bValue - aValue;
        }

        // Fallback for other types
        if (aValue < bValue) return sort.order === "asc" ? -1 : 1;
        if (aValue > bValue) return sort.order === "asc" ? 1 : -1;
        return 0;
      });
  }, [search, sort, repayments]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);

  const handleSort = (key: keyof Repayment) => {
    setSort((prevSort) => ({
      key,
      order: prevSort.key === key && prevSort.order === "asc" ? "desc" : "asc",
    }));
  };
  const [transactionPending, setTransactionPending] = useState(false);

  const handleRepay = async (id: number, amount: number) => {
    try {
      if (typeof window !== "undefined" && window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        if (!CONTRACT_ADDRESS) {
          throw new Error('Contract address is not set.');
        }
        const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

        // Convert amount to wei (assuming the contract uses ether as the unit)
        const amountInWei = ethers.utils.parseUnits(amount.toString(), 'ether');

        console.log('Repaying loan with ID:', id);
        console.log('Amount in wei:', amountInWei.toString());

        setTransactionPending(true);
        const tx = await contract.repayLoan(id, { value: amountInWei });

        console.log('Transaction hash:', tx.hash);
        await tx.wait();
        toast.success('Repayment successful');

        const { error } = await supabase
          .from('transaction_record')
          .update({ status: 'Repaid' })
          .eq('id', id);

        if (error) {
          console.error('Error updating status:', error.message);
          toast.error('Error updating repayment status: ' + error.message);
        } else {
          console.log(`Loan with ID ${id} status updated to "Repaid"`);
        }

      } else {
        toast.error('Ethereum provider not found');
      }
    } catch (error: any) {
      console.error('Repayment error:', error);
      if (error.code === 'ACTION_REJECTED') {
        toast.info('Transaction was canceled by the user');
      } else {
        toast.error('Error processing repayment: ' + error.message);
      }
    } finally {
      setTransactionPending(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="bg-background py-12 px-8 md:px-12">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">Repay Dashboard</h1>
              <div className="flex items-center gap-4">
                <Input placeholder="Search Repayments..." value={search} onChange={handleSearch} className="max-w-xs" />
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">
                    <SortButton label="ID" sortKey="id" currentSort={sort} onSort={handleSort} />
                  </TableHead>
                  <TableHead className="text-center">
                    <SortButton label="Borrower Address" sortKey="address_borrower" currentSort={sort} onSort={handleSort} />
                  </TableHead>
                  <TableHead className="text-center">
                    <SortButton label="Amount" sortKey="token_amount" currentSort={sort} onSort={handleSort} />
                  </TableHead>
                  <TableHead className="text-center">
                    <SortButton label="Repayment Start Date" sortKey="lending_or_borrowing_start_date" currentSort={sort} onSort={handleSort} />
                  </TableHead>
                  <TableHead className="text-center">
                    <SortButton label="Repayment End Date" sortKey="lending_or_borrowing_end_date" currentSort={sort} onSort={handleSort} />
                  </TableHead>
                  <TableHead className='text-center' onClick={() => handleSort("status")}>Status</TableHead>
                  <TableHead className='text-center'>|</TableHead>
                  <TableHead className="text-center">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : filteredRepayments.length > 0 ? (
                  filteredRepayments.map((repayment) => (
                    <TableRow key={repayment.id}>
                      <TableCell className='text-center'>{repayment.id}</TableCell>
                      <TableCell className='text-center'>{repayment.address_borrower}</TableCell>
                      <TableCell className='text-center'>{repayment.token_amount}</TableCell>
                      <TableCell className='text-center'>{repayment.lending_or_borrowing_start_date}</TableCell>
                      <TableCell className='text-center'>{repayment.lending_or_borrowing_end_date}</TableCell>
                      <TableCell className='text-center'><Badge>{repayment.status}</Badge></TableCell>
                      <TableCell className='text-center text-slate-500'>|</TableCell>
                      <TableCell className='text-center'>
                        <Button
                          onClick={() => handleRepay(repayment.id, repayment.token_amount)}
                          disabled={repayment.status === "Withdrew" || repayment.status === "Repaid"}
                        >
                          Repay
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={12} className="text-center">
                      No repayments available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </section>
        {/* Other sections (How it Works, FAQ) */}
      </main>
    </div>
  );
}
