"use client"

import { useState, useEffect } from 'react';
import { useAccount, useSimulateContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
    Collapsible,
    CollapsibleTrigger,
    CollapsibleContent,
} from "@/components/ui/collapsible";
import { SVGProps } from "react";
import { lendingListInsert } from '../../supabase/query/lendingListInsert';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ICOContractAddress } from '@/utils/smartContractAddress';
import ico from '@/abi/ico.json';
import { print } from "@/utils/toast";
import crypto from 'crypto';
import { supabase } from '@/lib/supabaseClient'; // Make sure this import is correct


function hashAddress(address: string): string {
    return crypto.createHash('sha256').update(address.trim().toLowerCase()).digest('hex');
  }

  
// SVG Icon components
function CoinsIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            {...props}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 15.75A7.875 7.875 0 004.125 12 7.875 7.875 0 0012 8.25M12 15.75a7.875 7.875 0 007.875-3.75M12 15.75V19.5M19.875 12A7.875 7.875 0 0012 8.25M19.875 12H23.25M12 8.25V4.5M12 8.25a7.875 7.875 0 01-7.875 3.75M4.125 12H.75"
            />
        </svg>
    );
}

function PercentIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            {...props}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 4.5l-15 15m3-10.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm9 6a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"
            />
        </svg>
    );
}

function LockIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            {...props}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5v-3a4.5 4.5 0 00-9 0v3m9 0h-9m9 0a2.25 2.25 0 012.25 2.25v6.75A2.25 2.25 0 0116.5 21h-9a2.25 2.25 0 01-2.25-2.25v-6.75A2.25 2.25 0 017.5 10.5m9 0h-9"
            />
        </svg>
    );
}

function ClockIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            {...props}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6l4 2m6-2.25A9.75 9.75 0 1114.25 1.5 9.75 9.75 0 0122 9.75z"
            />
        </svg>
    );
}

function WalletIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            {...props}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 7.5V6a3 3 0 00-3-3H6a3 3 0 00-3 3v12a3 3 0 003 3h12a3 3 0 003-3v-1.5m0-6h-4.5A1.5 1.5 0 0015 12v0a1.5 1.5 0 001.5 1.5H21m0-3v3m0 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
            />
        </svg>
    );
}

function ChevronDownIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            {...props}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 9l-7.5 7.5L4.5 9"
            />
        </svg>
    );
}

function ReceiptIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            {...props}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 6.75A2.25 2.25 0 015.25 4.5h13.5A2.25 2.25 0 0121 6.75v12a1.5 1.5 0 01-2.475 1.18l-1.278-1.021a.75.75 0 00-.948 0l-1.278 1.021a1.5 1.5 0 01-1.848 0l-1.278-1.021a.75.75 0 00-.948 0l-1.278 1.021a1.5 1.5 0 01-1.848 0l-1.278-1.021a.75.75 0 00-.948 0l-1.278 1.021A1.5 1.5 0 013 18.75v-12z"
            />
        </svg>
    );
}

// Function to shorten wallet address
function shortenAddress(address: string): string {
    if (address.length <= 10) {
        return address;
    }
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export default function LendingPage() {
    const [addressesHashed, setAddressesHashed] = useState(false);
    const { address } = useAccount();
    const [amount, setAmount] = useState<number>(0);
    const [contract, setContract] = useState('');
    const [term, setTerm] = useState<string>('1');
    const [rate, setRate] = useState<number>(0);
    const [message, setMessage] = useState('');

    const { data: simulateData, error: simulateError } = useSimulateContract({
        address: ICOContractAddress as `0x${string}`,
        abi: ico.abi,
        functionName: 'lendToken',
        value: parseEther(amount.toString()),
    })

    const { data: hash, error: writeError, writeContract } = useWriteContract()

    const { isLoading: isConfirming, isSuccess: isConfirmed } =
        useWaitForTransactionReceipt({
            hash,
        })

    useEffect(() => {
        if (message) {
            toast.success(message);
        }
    }, [message]);

    useEffect(() => {
        if (isConfirmed && hash) {
            lendingListInsert(address!, amount, contract, parseInt(term), rate)
                .then((result) => {
                    setMessage(result ? 'Your lending entry has been successfully added!' : 'Failed to add your lending entry.');
                    print("Lending transaction confirmed and recorded in the database.", "success");
                })
                .catch((error) => {
                    console.error("Error inserting lending entry:", error);
                    print("Failed to record lending entry in the database.", "error");
                });
        }
    }, [isConfirmed, hash, address, amount, contract, term, rate]);

    useEffect(() => {
        async function hashAllWalletAddresses() {
          if (addressesHashed) return; // Skip if already hashed
    
          // Fetch all wallet addresses
          const { data, error } = await supabase
            .from('lending_list')
            .select('id, address');
    
          if (error) {
            console.error('Error fetching wallet addresses:', error);
            return;
          }
    
          // Hash each address that is not already hashed
          for (const record of data) {
            // Check if the address is already hashed
            if (isAddressHashed(record.address)) continue;
    
            const hashedAddress = hashAddress(record.address);
    
            const { error: updateError } = await supabase
              .from('lending_list')
              .update({ address: hashedAddress })
              .eq('id', record.id);
    
            if (updateError) {
              console.error(`Error updating record ID ${record.id}:`, updateError);
            } else {
              console.log(`Successfully hashed address for record ID ${record.id}`);
            }
          }
    
          setAddressesHashed(true); // Set the state to indicate addresses are hashed
          hashAllWalletAddresses();
        }
    
        function isAddressHashed(address: string): boolean {
          // Example check: if the address length is not 42 (standard Ethereum address length), assume it's hashed
          return address.length !== 42;
        }
    
        hashAllWalletAddresses();
      }, [addressesHashed]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!address) {
            setMessage('Please connect your wallet first');
            return;
        }

        if (simulateError) {
            print("Error simulating transaction: " + simulateError.message, "error");
            return;
        }

        if (!simulateData) {
            print("Simulated data is unavailable. Please try again later.", "error");
            return;
        }

        try {
            await writeContract(simulateData.request);
            print("Lending transaction submitted. Waiting for confirmation...", "info");
        } catch (e) {
            print("Failed to submit lending transaction: " + (e as Error).message, "error");
        }
    };


    return (
        <div className="flex flex-col min-h-[100dvh]">
            <main className="flex-1">
                <section className="bg-muted py-16 px-6 md:px-12 flex flex-col items-center justify-center gap-8">
                    <div className="max-w-7xl space-y-6 text-center">
                        <h1 className="text-4xl font-bold">Lend Your Crypto</h1>
                        <p className="text-muted-foreground">
                            Earn passive income by lending your crypto assets to borrowers on our platform.
                        </p>
                        <div className="bg-white p-8 rounded-lg shadow-lg">
                            <h3 className="text-2xl font-bold text-center mb-6">Earn Passive Income</h3>
                            <form className="grid gap-6" onSubmit={handleSubmit}>
                                <div className="grid gap-2">
                                    <Label htmlFor="address" className="text-sm font-medium">
                                        Connected Wallet Address
                                    </Label>
                                    <Input
                                        id="address"
                                        type="text"
                                        value={shortenAddress(address) || 'Not connected'}
                                        disabled
                                        className="bg-gray-100 text-center"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="contract" className="text-sm font-medium">
                                            Cryptocurrency Type
                                        </Label>
                                        <Select value={contract} onValueChange={setContract}>
                                            <SelectTrigger id="contract">
                                                <SelectValue placeholder="Select a contract" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="ETH">Ethereum (ETH)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="amount" className="text-sm font-medium">
                                            Amount
                                        </Label>
                                        <Input
                                            id="amount"
                                            type="number"
                                            placeholder="Enter amount"
                                            className="bg-gray-100 focus:bg-white"
                                            value={amount}
                                            onChange={(e) => setAmount(Number(e.target.value))}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="term" className="text-sm font-medium">
                                            Term
                                        </Label>
                                        <Select value={term} onValueChange={setTerm}>
                                            <SelectTrigger id="term">
                                                <SelectValue placeholder="Select a term" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="1">1 month</SelectItem>
                                                <SelectItem value="3">3 months</SelectItem>
                                                <SelectItem value="6">6 months</SelectItem>
                                                <SelectItem value="9">9 months</SelectItem>
                                                <SelectItem value="12">12 months</SelectItem>
                                                <SelectItem value="18">18 months</SelectItem>
                                                <SelectItem value="24">24 months</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="rate" className="text-sm font-medium">
                                            Interest Rate
                                        </Label>
                                        <Input
                                            id="rate"
                                            type="number"
                                            step="0.01"
                                            placeholder="Enter interest rate"
                                            className="bg-gray-100 focus:bg-white"
                                            value={rate}
                                            onChange={(e) => setRate(Number(e.target.value))}
                                        />
                                    </div>
                                </div>
                                <div className="flex items-end">
                                    <Button
                                        type="submit"
                                        className="w-full bg-gray-800 hover:bg-gray-700 text-white font-medium"
                                        disabled={!address || isConfirming}
                                    >
                                        {isConfirming ? 'Confirming...' : 'Lend'}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
                <section className="bg-background py-16 px-6 md:px-12 flex flex-col items-center justify-center gap-8">
                    <div className="max-w-3xl space-y-6 text-center">
                        <h2 className="text-3xl font-bold">Why Lend with CryptoLends?</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-muted p-6 rounded-xl shadow-sm">
                                <PercentIcon className="h-8 w-8 mb-4 text-primary" />
                                <h3 className="text-xl font-bold mb-2">Competitive Rates</h3>
                                <p className="text-muted-foreground">
                                    Earn up to 8% APY on your crypto assets with our industry-leading lending rates.
                                </p>
                            </div>
                            <div className="bg-muted p-6 rounded-xl shadow-sm">
                                <LockIcon className="h-8 w-8 mb-4 text-primary" />
                                <h3 className="text-xl font-bold mb-2">Secure Lending</h3>
                                <p className="text-muted-foreground">
                                    Your assets are secured by our robust smart contract system and audited platform.
                                </p>
                            </div>
                            <div className="bg-muted p-6 rounded-xl shadow-sm">
                                <ClockIcon className="h-8 w-8 mb-4 text-primary" />
                                <h3 className="text-xl font-bold mb-2">Flexible Terms</h3>
                                <p className="text-muted-foreground">
                                    Choose from a variety of lending terms, from 1 month up to 24 months, to fit your needs.
                                </p>
                            </div>
                            <div className="bg-muted p-6 rounded-xl shadow-sm">
                                <WalletIcon className="h-8 w-8 mb-4 text-primary" />
                                <h3 className="text-xl font-bold mb-2">Easy Withdrawals</h3>
                                <p className="text-muted-foreground">
                                    Withdraw your funds at any time with no penalties or hidden fees.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="bg-muted py-16 px-6 md:px-12 flex flex-col items-center justify-center gap-8">
                    <div className="max-w-3xl space-y-6 text-center">
                        <h2 className="text-3xl font-bold">How it Works</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="bg-background p-6 rounded-xl shadow-sm">
                                <WalletIcon className="h-8 w-8 mb-4 text-primary" />
                                <h3 className="text-xl font-bold mb-2">Connect Wallet</h3>
                                <p className="text-muted-foreground">Connect your crypto wallet to our platform to start lending.</p>
                            </div>
                            <div className="bg-background p-6 rounded-xl shadow-sm">
                                <PercentIcon className="h-8 w-8 mb-4 text-primary" />
                                <h3 className="text-xl font-bold mb-2">Choose Lending Terms</h3>
                                <p className="text-muted-foreground">
                                    Select the asset, amount, and term that best suits your needs.
                                </p>
                            </div>
                            <div className="bg-background p-6 rounded-xl shadow-sm">
                                <ReceiptIcon className="h-8 w-8 mb-4 text-primary" />
                                <h3 className="text-xl font-bold mb-2">Earn Passive Income</h3>
                                <p className="text-muted-foreground">Sit back and watch your crypto assets earn interest over time.</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="bg-background py-16 px-6 md:px-12 flex flex-col items-center justify-center gap-8">
                    <div className="max-w-3xl space-y-6 text-center">
                        <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
                        <div className="grid gap-4">
                            <Collapsible>
                                <CollapsibleTrigger className="flex items-center justify-between w-full bg-muted p-4 rounded-xl">
                                    <h3 className="text-lg font-bold">What is the minimum amount I can lend?</h3>
                                    <ChevronDownIcon className="h-6 w-6 text-muted-foreground" />
                                </CollapsibleTrigger>
                                <CollapsibleContent className="bg-background p-4 rounded-xl">
                                    <p className="text-muted-foreground">
                                        The minimum amount you can lend on our platform is $100 worth of any supported cryptocurrency such as Ethereum (ETH).
                                    </p>
                                </CollapsibleContent>
                            </Collapsible>
                            <Collapsible>
                                <CollapsibleTrigger className="flex items-center justify-between w-full bg-muted p-4 rounded-xl">
                                    <h3 className="text-lg font-bold">How do I withdraw my earnings?</h3>
                                    <ChevronDownIcon className="h-6 w-6 text-muted-foreground" />
                                </CollapsibleTrigger>
                                <CollapsibleContent className="bg-background p-4 rounded-xl">
                                    <p className="text-muted-foreground">
                                        You can withdraw your earnings anytime by connecting your wallet and navigating to the Withdraw page.
                                    </p>
                                </CollapsibleContent>
                            </Collapsible>
                            <Collapsible>
                                <CollapsibleTrigger className="flex items-center justify-between w-full bg-muted p-4 rounded-xl">
                                    <h3 className="text-lg font-bold">Are there any fees for lending?</h3>
                                    <ChevronDownIcon className="h-6 w-6 text-muted-foreground" />
                                </CollapsibleTrigger>
                                <CollapsibleContent className="bg-background p-4 rounded-xl">
                                    <p className="text-muted-foreground">
                                        No, there are no fees for lending your crypto assets on our platform.
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

