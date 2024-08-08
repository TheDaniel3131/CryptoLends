/**
 * v0 by Vercel.
 * @see https://v0.dev/t/0k9wzlkLWna
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link";
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

export default function LendingPage() {
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
                            <form className="grid gap-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="asset" className="text-sm font-medium">
                                            Asset
                                        </Label>
                                        <Select id="asset" className="w-full">
                                            <SelectTrigger>
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
                                        <Label htmlFor="amount" className="text-sm font-medium">
                                            Amount
                                        </Label>
                                        <Input
                                            id="amount"
                                            type="number"
                                            placeholder="Enter amount"
                                            className="bg-gray-100 focus:bg-white"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="term" className="text-sm font-medium">
                                            Term
                                        </Label>
                                        <Select id="term" className="w-full">
                                            <SelectTrigger>
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
                                    <div className="flex items-end">
                                        <Button
                                            type="submit"
                                            className="w-full bg-gray-800 hover:bg-gray-700 text-white font-medium"
                                        >
                                            Lend
                                        </Button>
                                    </div>
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
                                    Choose from a variety of lending terms, from 1 month to 12 months, to fit your needs.
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
                                <p className="text-muted-foreground">Select the asset, amount, and term that best suits your needs.</p>
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
                                <CollapsibleContent className="bg-background p-4 rounded-xl shadow-sm">
                                    <p className="text-muted-foreground">The minimum amount is 0.01 BTC or equivalent in other assets.</p>
                                </CollapsibleContent>
                            </Collapsible>
                            <Collapsible>
                                <CollapsibleTrigger className="flex items-center justify-between w-full bg-muted p-4 rounded-xl">
                                    <h3 className="text-lg font-bold">How is the interest calculated?</h3>
                                    <ChevronDownIcon className="h-6 w-6 text-muted-foreground" />
                                </CollapsibleTrigger>
                                <CollapsibleContent className="bg-background p-4 rounded-xl shadow-sm">
                                    <p className="text-muted-foreground">Interest is calculated daily and paid out at the end of the term.</p>
                                </CollapsibleContent>
                            </Collapsible>
                            <Collapsible>
                                <CollapsibleTrigger className="flex items-center justify-between w-full bg-muted p-4 rounded-xl">
                                    <h3 className="text-lg font-bold">Can I withdraw my funds early?</h3>
                                    <ChevronDownIcon className="h-6 w-6 text-muted-foreground" />
                                </CollapsibleTrigger>
                                <CollapsibleContent className="bg-background p-4 rounded-xl shadow-sm">
                                    <p className="text-muted-foreground">Yes, you can withdraw early, but there may be a small penalty.</p>
                                </CollapsibleContent>
                            </Collapsible>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

// Icons can be added here or imported from an external library.
function CoinsIcon(props: React.SVGProps<SVGSVGElement>) {
    return <svg {...props}></svg>;
}

function PercentIcon(props: React.SVGProps<SVGSVGElement>) {
    return <svg {...props}></svg>;
}

function LockIcon(props: React.SVGProps<SVGSVGElement>) {
    return <svg {...props}></svg>;
}

function ClockIcon(props: React.SVGProps<SVGSVGElement>) {
    return <svg {...props}></svg>;
}

function WalletIcon(props: React.SVGProps<SVGSVGElement>) {
    return <svg {...props}></svg>;
}

function ReceiptIcon(props: React.SVGProps<SVGSVGElement>) {
    return <svg {...props}></svg>;
}

function ChevronDownIcon(props: React.SVGProps<SVGSVGElement>) {
    return <svg {...props}></svg>;
}
