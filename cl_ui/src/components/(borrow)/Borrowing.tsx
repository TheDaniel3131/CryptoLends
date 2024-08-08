/**
 * v0 by Vercel.
 * @see https://v0.dev/t/48kwpiTkZkx
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import React from 'react';
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"

export default function Component() {
    return (
        <div className="flex flex-col min-h-[100dvh]">
            <main className="flex-1">
                <section className="bg-muted py-16 px-6 md:px-12 flex flex-col items-center justify-center gap-8">
                    <div className="max-w-3xl space-y-6 text-center">
                        <h1 className="text-4xl font-bold">Unlock Crypto Liquidity</h1>
                        <p className="text-muted-foreground">
                            Borrow crypto assets from our lending platform to fund your projects or personal expenses.
                        </p>
                        <div className="bg-background p-6 rounded-xl shadow-sm grid gap-4">
                            <h3 className="text-xl font-bold">Borrow Crypto</h3>
                            <form className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="asset">Asset</Label>
                                    <Select id="asset">
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select an asset" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="btc">Bitcoin (BTC)</SelectItem>
                                            <SelectItem value="eth">Ethereum (ETH)</SelectItem>
                                            <SelectItem value="usdc">USD Coin (USDC)</SelectItem>
                                            <SelectItem value="dai">DAI</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="amount">Amount</Label>
                                    <Input id="amount" type="number" placeholder="Enter amount" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="term">Term</Label>
                                    <Select id="term">
                                        <SelectTrigger className="w-full">
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
                                <Button type="submit" className="w-full">
                                    Borrow
                                </Button>
                            </form>
                        </div>
                    </div>
                </section>
                <section className="bg-background py-16 px-6 md:px-12 flex flex-col items-center justify-center gap-8">
                    <div className="max-w-3xl space-y-6 text-center">
                        <h2 className="text-3xl font-bold">Why Borrow with CryptoLends?</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-muted p-6 rounded-xl shadow-sm">
                                <PercentIcon className="h-8 w-8 mb-4 text-secondary" />
                                <h3 className="text-xl font-bold mb-2">Competitive Rates</h3>
                                <p className="text-muted-foreground">
                                    Access crypto loans at some of the lowest interest rates in the industry.
                                </p>
                            </div>
                            <div className="bg-muted p-6 rounded-xl shadow-sm">
                                <LockIcon className="h-8 w-8 mb-4 text-secondary" />
                                <h3 className="text-xl font-bold mb-2">Secure Borrowing</h3>
                                <p className="text-muted-foreground">
                                    Your loan is secured by our robust smart contract system and audited platform.
                                </p>
                            </div>
                            <div className="bg-muted p-6 rounded-xl shadow-sm">
                                <ClockIcon className="h-8 w-8 mb-4 text-secondary" />
                                <h3 className="text-xl font-bold mb-2">Flexible Terms</h3>
                                <p className="text-muted-foreground">
                                    Choose from a variety of loan terms, from 1 month to 12 months, to fit your needs.
                                </p>
                            </div>
                            <div className="bg-muted p-6 rounded-xl shadow-sm">
                                <WalletIcon className="h-8 w-8 mb-4 text-secondary" />
                                <h3 className="text-xl font-bold mb-2">Easy Repayment</h3>
                                <p className="text-muted-foreground">
                                    Repay your loan at any time with no prepayment penalties or hidden fees.
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
                                <WalletIcon className="h-8 w-8 mb-4 text-secondary" />
                                <h3 className="text-xl font-bold mb-2">Connect Wallet</h3>
                                <p className="text-muted-foreground">Connect your crypto wallet to our platform to start borrowing.</p>
                            </div>
                            <div className="bg-background p-6 rounded-xl shadow-sm">
                                <PercentIcon className="h-8 w-8 mb-4 text-secondary" />
                                <h3 className="text-xl font-bold mb-2">Choose Loan Terms</h3>
                                <p className="text-muted-foreground">Select the asset, amount, and term that best suits your needs.</p>
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
                <section className="bg-background py-16 px-6 md:px-12 flex flex-col items-center justify-center gap-8">
                    <div className="max-w-3xl space-y-6 text-center">
                        <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
                        <div className="grid gap-4">
                            <Collapsible>
                                <CollapsibleTrigger className="flex items-center justify-between w-full bg-muted p-4 rounded-xl">
                                    <h3 className="text-lg font-bold">What is the minimum amount I can borrow?</h3>
                                    <ChevronDownIcon className="h-6 w-6 text-muted-foreground" />
                                </CollapsibleTrigger>
                                <CollapsibleContent className="bg-background p-4 rounded-xl">
                                    <p className="text-muted-foreground">
                                        The minimum amount you can borrow is $100 or the equivalent in your chosen crypto asset.
                                    </p>
                                </CollapsibleContent>
                            </Collapsible>
                            <Collapsible>
                                <CollapsibleTrigger className="flex items-center justify-between w-full bg-muted p-4 rounded-xl">
                                    <h3 className="text-lg font-bold">How do I repay my loan?</h3>
                                    <ChevronDownIcon className="h-6 w-6 text-muted-foreground" />
                                </CollapsibleTrigger>
                                <CollapsibleContent className="bg-background p-4 rounded-xl">
                                    <p className="text-muted-foreground">
                                        You can repay your loan at any time by logging into your account and initiating a repayment. There
                                        are no prepayment penalties or hidden fees.
                                    </p>
                                </CollapsibleContent>
                            </Collapsible>
                            <Collapsible>
                                <CollapsibleTrigger className="flex items-center justify-between w-full bg-muted p-4 rounded-xl">
                                    <h3 className="text-lg font-bold">Is my collateral secure with CryptoLends?</h3>
                                    <ChevronDownIcon className="h-6 w-6 text-muted-foreground" />
                                </CollapsibleTrigger>
                                <CollapsibleContent className="bg-background p-4 rounded-xl">
                                    <p className="text-muted-foreground">
                                        Yes, your collateral is secured by our robust smart contract system and regularly audited platform.
                                        We take security very seriously to protect your assets.
                                    </p>
                                </CollapsibleContent>
                            </Collapsible>
                        </div>
                    </div>
                </section>
            </main>
        </div>
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

const CoinsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
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
            <circle cx="8" cy="8" r="6" />
            <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
            <path d="M7 6h1v4" />
            <path d="m16.71 13.88.7.71-2.82 2.82" />
        </svg>
    )
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

