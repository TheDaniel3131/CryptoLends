"use client"

import { useState } from 'react';
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
import { lendingListInsert } from '../../supabase/query/lendingListInsert';

export default function LendingPage() {
    const [address, setAddress] = useState('');
    const [amount, setAmount] = useState<number>(0);
    const [contract, setContract] = useState('');
    const [term, setTerm] = useState<string>('1');
    const [rate, setRate] = useState<number>(0);
    const [message, setMessage] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const result = await lendingListInsert(address, amount, contract, parseInt(term), rate);
        setMessage(result ? 'Lending entry successfully added' : 'Failed to add lending entry');
    };

    return (
        <div className="flex flex-col min-h-[100dvh]">
            <main className="flex-1">
                <section className="bg-muted py-16 px-6 md:px-12 flex flex-col items-center justify-center gap-8">
                    <div className="max-w-3xl space-y-6 text-center">
                        <h1 className="text-4xl font-bold">Lend Your Crypto</h1>
                        <p className="text-muted-foreground">
                            Earn passive income by lending your crypto assets to borrowers on our platform.
                        </p>
                        <div className="bg-white p-8 rounded-lg shadow-lg">
                            <h3 className="text-2xl font-bold text-center mb-6">Earn Passive Income</h3>
                            <form className="grid gap-6" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="contract" className="text-sm font-medium">
                                            Smart Contract Type
                                        </Label>
                                        <Select value={contract} onValueChange={setContract}>
                                            <SelectTrigger id="contract">
                                                <SelectValue placeholder="Select a contract" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="contract_1">Contract 1</SelectItem>
                                                <SelectItem value="contract_2">Contract 2</SelectItem>
                                                <SelectItem value="contract_3">Contract 3</SelectItem>
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
                                                <SelectItem value="12">12 months</SelectItem>
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
                                    >
                                        Lend
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
                {/* Additional sections remain unchanged */}
            </main>
        </div>
    );
}
