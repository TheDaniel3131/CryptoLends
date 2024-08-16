import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface CoinsIconProps extends React.SVGProps<SVGSVGElement> { }

const CoinsIcon: React.FC<CoinsIconProps> = (props) => {
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
    );
};

const CashOutPage: React.FC = () => {
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
                                        <div className="text-4xl font-bold">$5,000</div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Lending Loans</CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex items-center justify-center py-8">
                                        <div className="text-4xl font-bold">8 Loans</div>
                                    </CardContent>
                                </Card>
                            </div>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Your Profile</CardTitle>
                                </CardHeader>
                                <CardContent className="grid gap-4">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="name">Name</Label>
                                            <Input id="name" type="text" value="John Doe" disabled />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input id="email" type="email" value="john@example.com" disabled />
                                        </div>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="wallet">Wallet Address</Label>
                                        <Input id="wallet" type="text" value="0x123456789abcdef" disabled />
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
                                    <TableRow>
                                        <TableCell>BTC</TableCell>
                                        <TableCell>0.5</TableCell>
                                        <TableCell>3 months</TableCell>
                                        <TableCell>8.5%</TableCell>
                                        <TableCell>
                                            <Badge variant="secondary">Repaid</Badge>
                                        </TableCell>
                                        <TableCell>2023-04-15</TableCell>
                                        <TableCell>
                                            <Button variant="outline" size="sm" disabled>
                                                Withdraw
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>ETH</TableCell>
                                        <TableCell>2</TableCell>
                                        <TableCell>6 months</TableCell>
                                        <TableCell>7.2%</TableCell>
                                        <TableCell>
                                            <Badge variant="secondary">Repaid</Badge>
                                        </TableCell>
                                        <TableCell>2023-08-01</TableCell>
                                        <TableCell>
                                            <Button variant="outline" size="sm" disabled>
                                                Withdraw
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>USDC</TableCell>
                                        <TableCell>5,000</TableCell>
                                        <TableCell>1 month</TableCell>
                                        <TableCell>6.0%</TableCell>
                                        <TableCell>
                                            <Badge>Active</Badge>
                                        </TableCell>
                                        <TableCell>2023-11-01</TableCell>
                                        <TableCell>
                                            <Button variant="outline" size="sm">
                                                Withdraw
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>DAI</TableCell>
                                        <TableCell>1,000</TableCell>
                                        <TableCell>3 months</TableCell>
                                        <TableCell>7.5%</TableCell>
                                        <TableCell>
                                            <Badge variant="outline">Pending</Badge>
                                        </TableCell>
                                        <TableCell>2023-12-01</TableCell>
                                        <TableCell>
                                            <Button variant="outline" size="sm" disabled>
                                                Withdraw
                                            </Button>
                                        </TableCell>
                                    </TableRow>
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
