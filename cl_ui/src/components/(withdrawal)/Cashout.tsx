"use client";

import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { withdrawToken } from "../../supabase/query/withdrawToken";
import { transactionProcess } from "../../supabase/query/transactionProcess";
import { createClient } from "@supabase/supabase-js";

interface Loan {
    id: number;
    asset: string;
    amount: number;
    term: string;
    interest_rate: string;
    status: string;
    date: string;
}

const CashOutPage: React.FC = () => {
    const { address: walletAddress } = useAccount(); // Get the connected wallet address from wagmi
    const [loans, setLoans] = useState<Loan[]>([]);
    const [totalFunds, setTotalFunds] = useState<number>(0);

    useEffect(() => {
        const fetchLoans = async () => {
            if (!walletAddress) return; // Exit if no wallet address is connected

            const supabaseUrl = "https://bqljlkdiicwfstzyesln.supabase.co";
            const supabaseKey = "your_supabase_key";
            const supabase = createClient(supabaseUrl, supabaseKey);

            // Fetch active and pending loans for the connected wallet
            const { data: loansData, error } = await supabase
                .from("lending_loans") // Replace with your actual table name
                .select("*")
                .or(`borrower.eq.${walletAddress},lender.eq.${walletAddress}`);

            if (error) {
                console.error("Error fetching loans:", error.message);
            } else {
                setLoans(loansData || []);
                calculateTotalFunds(loansData || []);
            }
        };

        fetchLoans();
    }, [walletAddress]);

    const calculateTotalFunds = (loans: Loan[]) => {
        const total = loans.reduce((acc, loan) => acc + (loan.status === "Active" || loan.status === "Pending" ? loan.amount : 0), 0);
        setTotalFunds(total);
    };

    const handleWithdraw = async (loan: Loan) => {
        if (!walletAddress) return; // Exit if no wallet address is connected

        const success = await withdrawToken(walletAddress, loan.amount);
        if (success) {
            alert("Withdrawal successful!");
        } else {
            alert("Withdrawal failed.");
        }
    };

    return (
        <div className="flex flex-col min-h-[100dvh]">
            <main className="flex-1">
                <section className="bg-muted py-16 px-6 md:px-12 flex flex-col items-center justify-center gap-8">
                    <div className="max-w-3xl space-y-6 text-center">
                        <h1 className="text-4xl font-bold">Your Withdrawal Dashboard</h1>
                        <p className="text-muted-foreground">
                            View your lending loans, withdraw your funds, and manage your profile.
                        </p>
                        <div className="bg-background p-6 rounded-xl shadow-sm grid gap-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Total Funds to Withdraw</CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex items-center justify-center py-8">
                                        <div className="text-4xl font-bold">${totalFunds}</div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Lending Loans</CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex items-center justify-center py-8">
                                        <div className="text-4xl font-bold">{loans.length} Loans</div>
                                    </CardContent>
                                </Card>
                            </div>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Your Profile</CardTitle>
                                </CardHeader>
                                <CardContent className="grid gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="wallet">Wallet Address</Label>
                                        <Input id="wallet" type="text" value={walletAddress || "Not Connected"} disabled />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>
                <section className="bg-background py-16 px-6 md:px-12 flex flex-col items-center justify-center gap-8">
                    <div className="max-w-3xl space-y-6 text-center">
                        <h2 className="text-3xl font-bold">Lending Loans</h2>
                        <div className="bg-muted p-6 rounded-xl shadow-sm">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Asset</TableHead>
                                        <TableHead>Amount</TableHead>
                                        <TableHead>Term</TableHead>
                                        <TableHead>Interest Rate</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {loans.map((loan) => (
                                        <TableRow key={loan.id}>
                                            <TableCell>{loan.asset}</TableCell>
                                            <TableCell>{loan.amount}</TableCell>
                                            <TableCell>{loan.term}</TableCell>
                                            <TableCell>{loan.interest_rate}</TableCell>
                                            <TableCell>
                                                <Badge variant={loan.status === "Repaid" ? "secondary" : loan.status === "Active" ? "default" : "outline"}>
                                                    {loan.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>{loan.date}</TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleWithdraw(loan)}
                                                    disabled={loan.status !== "Repaid"}
                                                >
                                                    Withdraw
                                                </Button>
                                            </TableCell>
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
};

export default CashOutPage;
