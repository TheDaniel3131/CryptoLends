"use client"

import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { supabase } from '../../supabase/query/dashboard';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// Function to shorten wallet address
function shortenAddress(address: string): string {
    if (address.length <= 10) {
        return address;
    }
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
}


export default function Component(): JSX.Element {
    const { address = '' } = useAccount();
    const [transactions, setTransactions] = useState([]);
    const [debtAmount, setDebtAmount] = useState(0);
    const [lendAmount, setLendAmount] = useState(0);

    useEffect(() => {
        const fetchBorrowingData = async () => {
            if (!address) return;

            try {
                // Fetch debt amount from user_address table
                const { data: userData, error: userError } = await supabase
                    .from('user_address')
                    .select('borrowing_amount')
                    .eq('address', address)
                    .single();

                if (userError) throw userError;

                setDebtAmount(userData?.borrowing_amount || 0);
                setLendAmount(userData?.lending_amount || 0);

                // Fetch borrowing history from transaction_record table
                const { data: transactionsData, error: transactionsError } = await supabase
                    .from('transaction_record')
                    .select('*')
                    .eq('address_borrower', address);

                if (transactionsError) throw transactionsError;

                setTransactions(transactionsData);
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };

        fetchBorrowingData();
    }, [address]);

    return (
        <div className="flex flex-col min-h-[100dvh]">
            <main className="flex-1">
                <section className="bg-muted py-16 px-6 md:px-12 flex flex-col items-center justify-center gap-8">
                    <div className="max-w-3xl space-y-6 text-center">
                        <h1 className="text-4xl font-bold">My Borrowing Dashboard</h1>
                        <p className="text-muted-foreground">Track your own borrowing history, current debt, and profile details.</p>
                        <div className="bg-background p-6 rounded-xl shadow-sm grid gap-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Current Debt</CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex items-center justify-center py-8">
                                        <div className="text-4xl font-bold">
                                            {debtAmount} CLT
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
                                    <CardTitle className="text-center mb-2">My Profile</CardTitle>
                                </CardHeader>
                                <CardContent className="grid gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="wallet" className="text-center">Wallet Address:</Label>
                                        <Input id="wallet" type="text" value={shortenAddress(address) || 'N/A'} disabled className="text-center" />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="collateral" className="text-center">Collateral:</Label>
                                        <Input id="collateral" type="text" value={lendAmount + ' CLT' || '0 CLT'} disabled className="text-center" />
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