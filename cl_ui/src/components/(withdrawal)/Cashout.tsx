"use client"

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
import { ethers } from "ethers";
import { parseEther } from "viem";
import { toast } from 'react-toastify';
import { supabase } from '@/lib/supabaseClient';
import crypto from 'crypto';


interface Loan {
    id: number;
    cryptocurrency: string;
    token_amount: number;
    term: string;
    interest_rate: string;
    status: string;
    date: string;
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

const CONTRACT_ADDRESS = "0x90F79bf6EB2c4f870365E785982E1f101E93b906";

function hashAddress(address: string): string {
    return crypto.createHash('sha256').update(address.trim().toLowerCase()).digest('hex');
}

// Function to shorten wallet address
function shortenAddress(address: string): string {
    if (address.length <= 10) {
        return address;
    }
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

const CashOutPage: React.FC = () => {
    const { address: walletAddress } = useAccount(); // Get the connected wallet address from wagmi
    const [loans, setLoans] = useState<Loan[]>([]);
    const [totalFunds, setTotalFunds] = useState<number>(0);

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
        };

        fetchLoans();
    }, [walletAddress]);

    const calculateTotalFunds = (loans: Loan[]) => {
        const total = loans.reduce((acc, loan) => acc + (loan.status === "Repaid" ? loan.token_amount : 0), 0);
        setTotalFunds(total);
    };

    // Example function to fetch the token amount
    const fetchTokenAmount = async (loanId: number): Promise<number> => {
        const supabaseUrl = "https://bqljlkdiicwfstzyesln.supabase.co";
        const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxbGpsa2RpaWN3ZnN0enllc2xuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMxODcwNjIsImV4cCI6MjAzODc2MzA2Mn0.HEpIt52lNN8MQAcDTmvhmA1-wD4n6UpR4ImVFbk55Qc"; // Use environment variables for security
        const supabase = createClient(supabaseUrl, supabaseKey);

        const { data, error } = await supabase
            .from("transaction_record")
            .select("token_amount")
            .eq("id", loanId)
            .single(); // Fetch a single record

        if (error) {
            console.error("Error fetching token amount:", error.message);
            throw error;
        }

        return data.token_amount;
    };

    const [transactionPending, setTransactionPending] = useState(false);

    const handleWithdraw = async (loan: Loan) => {
        try {
            if (!loan.token_amount) {
                throw new Error('Token amount is not defined.');
            }

            if (typeof window !== "undefined" && window.ethereum) {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                if (!CONTRACT_ADDRESS) {
                    throw new Error('Contract address is not set.');
                }
                const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

                // Convert amount to wei (assuming the contract uses ether as the unit)
                const amountInWei = ethers.utils.parseUnits(loan.token_amount.toString(), 'ether');

                console.log('Withdrawal loan with ID:', loan.id);
                console.log('Amount in wei:', amountInWei.toString());

                setTransactionPending(true);
                const tx = await contract.withdrawal(loan.id, { value: amountInWei });

                console.log('Transaction hash:', tx.hash);
                await tx.wait();
                toast.success('Withdraw successful');

                const { error } = await supabase
                    .from('transaction_record')
                    .update({ status: 'Withdrew' })
                    .eq('id', loan.id);

                if (error) {
                    console.error('Error updating status:', error.message);
                    toast.error('Error updating withdrawal status: ' + error.message);
                } else {
                    console.log(`Loan with ID ${loan.id} status updated to "Withdrew"`);
                }

            } else {
                toast.error('Ethereum provider not found');
            }
        } catch (error: any) {
            console.error('Withdrawal error:', error);
            if (error.code === 'ACTION_REJECTED') {
                toast.info('Transaction was canceled by the user');
            } else {
                toast.error('Error processing withdrawal: ' + error.message);
            }
        } finally {
            setTransactionPending(false);
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
                                        <div className="text-4xl font-bold"> ${totalFunds}</div>
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
                                    <CardTitle className="mb-2 font-bold">My Profile</CardTitle>
                                </CardHeader>
                                <CardContent className="grid gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="wallet">Wallet Address:</Label>
                                        <Input id="wallet" type="text" value={shortenAddress(walletAddress) || "Not Connected"} disabled className="text-center" />
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
                                    <TableRow className="font-semibold">
                                        <TableHead className='text-center'>Asset</TableHead>
                                        <TableHead className='text-center'>Amount</TableHead>
                                        <TableHead className='text-center'>Term</TableHead>
                                        <TableHead className='text-center'>Interest Rate</TableHead>
                                        <TableHead className='text-center'>Status</TableHead>
                                        <TableHead className='text-center'>Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {loans.map((loan) => (
                                        <TableRow key={loan.id}>
                                            <TableCell>{loan.cryptocurrency}</TableCell>
                                            <TableCell>{loan.token_amount}</TableCell>
                                            <TableCell>{loan.term}</TableCell>
                                            <TableCell>{loan.interest_rate}</TableCell>
                                            <TableCell>
                                                <Badge className={loan.status === "Repaid" ? "secondary" : loan.status === "Active" ? "default" : loan.status === "Pending" ? "outline" : "outline"}>
                                                    {loan.status}
                                                </Badge>
                                            </TableCell>
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
