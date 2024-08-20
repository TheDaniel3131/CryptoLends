"use client"

import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
// import { supabase } from '../../supabase/query/dashboard';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { supabase } from '@/lib/supabaseClient';
import { createClient } from "@supabase/supabase-js";
import { ethers } from "ethers";
import { parseEther } from "viem";
import { toast } from 'react-toastify';
import crypto from 'crypto';

interface Loan {
    id: number;
    cryptocurrency: string;
    token_amount: number;
    term: string;
    interest_rate: string;
    status: string;
    lending_or_borrowing_start_date: string;
    lending_or_borrowing_end_date: string;
}

const CONTRACT_ABI = [
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_loanId",
                "type": "uint256"
            }
        ],
        "name": "withdrawal",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    }
];

// Function to shorten wallet address
function shortenAddress(address: string): string {
    if (address.length <= 10) {
        return address;
    }
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

// Function to hash wallet address
function hashAddress(address: string): string {
    return crypto.createHash('sha256').update(address.trim().toLowerCase()).digest('hex');
}

export default function Component(): JSX.Element {
    const { address: walletAddress } = useAccount(); // Get the connected wallet address from wagmi
    const [transactions, setTransactions] = useState<Loan[]>([]);
    const [loans, setLoans] = useState<Loan[]>([]);
    const [debtAmount, setDebtAmount] = useState<number>(0);
    const [lendAmount, setLendAmount] = useState(0);

    useEffect(() => {
        const fetchLoans = async () => {
            if (!walletAddress) return; // Exit if no wallet address is connected

            const supabaseUrl = "https://bqljlkdiicwfstzyesln.supabase.co";
            const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxbGpsa2RpaWN3ZnN0enllc2xuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMxODcwNjIsImV4cCI6MjAzODc2MzA2Mn0.HEpIt52lNN8MQAcDTmvhmA1-wD4n6UpR4ImVFbk55Qc";
            const supabase = createClient(supabaseUrl, supabaseKey);

            // Fetch active and pending loans for the connected wallet
            const { data: loansData, error } = await supabase
                .from("transaction_record") // Replace with your actual table name
                .select("*")
                .or(`address_lender.eq.${hashAddress(walletAddress)},address_borrower.eq.${hashAddress(walletAddress)}`);

            if (error) {
                console.error("Error fetching loans:", error.message);
            } else {
                setLoans(loansData || []);
                calculateTotalFunds(loansData || []);
            }

            // Fetch borrowing history from transaction_record table
            const { data: transactionsData, error: transactionsError } = await supabase
                .from('transaction_record')
                .select('*')
                .eq('address_borrower', hashAddress(walletAddress));

            if (transactionsError) throw transactionsError;

            setTransactions(transactionsData);
        };

        fetchLoans();
    }, [walletAddress]);


    const calculateTotalFunds = (loans: Loan[]) => {
        const total = loans.reduce((acc, loan) => acc + (loan.status === "Repaid" ? loan.token_amount : 0), 0);
        setDebtAmount(total);
    };


    return (
        <div className="flex flex-col min-h-[100dvh]">
            <main className="flex-1">
                <section className="bg-muted py-16 px-6 md:px-12 flex flex-col items-center justify-center gap-8">
                    <div className="max-w-3xl space-y-6 text-center">
                        <h1 className="text-4xl font-bold">My Profile</h1>
                        <p className="text-muted-foreground">View and track your own borrowing history, current debt, and profile details.</p>
                        <div className="bg-background p-6 rounded-xl shadow-sm grid gap-4">
                            <div className="grid md:grid-cols-2 gap-8">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Current Debt</CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex items-center justify-center py-8">
                                        <div className="text-4xl font-bold">
                                            ${debtAmount}
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Borrowing History</CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex items-center justify-center py-8">
                                        <div className="text-4xl font-bold">
                                            {transactions.length} Loans
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-center mb-2 font-bold">My Profile</CardTitle>
                                </CardHeader>
                                <CardContent className="grid gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="wallet" className="text-center">Wallet Address:</Label>
                                        <Input id="wallet" type="text" value={walletAddress ? shortenAddress(walletAddress) : 'N/A'} disabled className="text-center bg-slate-300" />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="collateral" className="text-center">Collateral:</Label>
                                        <Input id="collateral" type="text" value={lendAmount + ' CLT' || '0 CLT'} disabled className="text-center bg-slate-200" />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>
                <section className="bg-background py-16 px-6 md:px-12 flex flex-col items-center justify-center gap-8">
                    <div className="max-w-3xl space-y-6 text-center">
                        <h2 className="text-3xl font-bold">Borrowing History</h2>
                        <div className="bg-muted p-6 rounded-xl shadow-sm">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className='text-center'>Asset</TableHead>
                                        <TableHead className='text-center'>Amount</TableHead>
                                        <TableHead className='text-center'>Term</TableHead>
                                        <TableHead className='text-center'>Interest Rate</TableHead>
                                        <TableHead className='text-center'>Status</TableHead>
                                        <TableHead className='text-center'>Start Date</TableHead>
                                        <TableHead className='text-center'>End Date</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {transactions.map((transaction) => (
                                        <TableRow key={transaction.id}>
                                            <TableCell>{transaction.cryptocurrency}</TableCell>
                                            <TableCell>{transaction.token_amount} CLT</TableCell>
                                            <TableCell>{transaction.term} month</TableCell>
                                            <TableCell>{transaction.interest_rate}%</TableCell>
                                            <TableCell>
                                                <Badge className={transaction.status === 'Active' ? 'bg-blue-500 text-white'
                                                    : transaction.status === 'Complete' ? 'bg-green-500 text-white'
                                                        : transaction.status === 'Pending' ? 'bg-yellow-500 text-white'
                                                            : ''}>
                                                    {transaction.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>{transaction.lending_or_borrowing_start_date}</TableCell>
                                            <TableCell>{transaction.lending_or_borrowing_end_date}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
