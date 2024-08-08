import Link from "next/link";
import { Connect } from "@/components/Connect";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function AboutUsPage() {
    return (
        <div className="flex flex-col min-h-[100dvh]">
            <main className="flex-1">
                <section className="bg-muted py-16 px-6 md:px-12 flex flex-col items-center justify-center gap-8">
                    <div className="max-w-3xl space-y-6 text-center">
                        <h1 className="text-4xl font-bold">About CryptoLends</h1>
                        <p className="text-muted-foreground">
                            CryptoLends is a leading decentralized finance (DeFi) lending platform that connects lenders and borrowers
                            in a secure and transparent environment. Our mission is to revolutionize the traditional lending industry
                            by providing a more accessible, efficient, and equitable financial system.
                        </p>
                        <div className="flex gap-4 justify-center">
                            <Button>Learn More</Button>
                            <Button variant="secondary">Contact Us</Button>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
                        <div className="bg-background p-6 rounded-xl shadow-sm">
                            <CurrencyIcon className="h-12 w-12 text-primary" />
                            <h3 className="text-xl font-bold mt-4">Low Interest Rates</h3>
                            <p className="text-muted-foreground mt-2">
                                Enjoy competitive interest rates on your loans, with transparent and fair pricing.
                            </p>
                        </div>
                        <div className="bg-background p-6 rounded-xl shadow-sm">
                            <CheckIcon className="h-12 w-12 text-primary" />
                            <h3 className="text-xl font-bold mt-4">Fast Approvals</h3>
                            <p className="text-muted-foreground mt-2">
                                Get your loan approved quickly, with a streamlined application process.
                            </p>
                        </div>
                        <div className="bg-background p-6 rounded-xl shadow-sm">
                            <LockIcon className="h-12 w-12 text-primary" />
                            <h3 className="text-xl font-bold mt-4">Secure Transactions</h3>
                            <p className="text-muted-foreground mt-2">
                                Rest assured that your transactions are secure and protected, thanks to our robust security measures.
                            </p>
                        </div>
                    </div>
                </section>
                <section className="py-16 px-6 md:px-12 bg-primary text-primary-foreground">
                    <div className="max-w-5xl mx-auto space-y-12">
                        <div className="text-center space-y-4">
                            <h2 className="text-3xl font-bold">CryptoLends Team</h2>
                            <p className="text-primary-foreground/80">Meet the talented team behind CryptoLends.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="bg-background p-6 rounded-xl shadow-sm text-center">
                                <Avatar>
                                    <AvatarImage src="./placeholder-user.png" alt="Team Member 1" />
                                    <AvatarFallback>TM1</AvatarFallback>
                                </Avatar>
                                <h3 className="text-xl text-primary font-bold mt-4">Daniel Poh Ting Fong</h3>
                                <p className="text-muted-foreground mt-2">Lead Developer</p>
                            </div>
                            <div className="bg-background p-6 rounded-xl shadow-sm text-center">
                                <Avatar>
                                    <AvatarImage src="./placeholder-user.png" alt="Team Member 2" />
                                    <AvatarFallback>TM2</AvatarFallback>
                                </Avatar>
                                <h3 className="text-xl text-primary font-bold mt-4">Tan Han Jay</h3>
                                <p className="text-muted-foreground mt-2">Full Stack Developer</p>
                            </div>
                            <div className="bg-background p-6 rounded-xl shadow-sm text-center">
                                <Avatar>
                                    <AvatarImage src="./placeholder-user.png" alt="Team Member 3" />
                                    <AvatarFallback>TM3</AvatarFallback>
                                </Avatar>
                                <h3 className="text-xl text-primary font-bold mt-4">Oscar Lam Chun Yin</h3>
                                <p className="text-muted-foreground mt-2">Backend Developer</p>
                            </div>
                            <div className="bg-background p-6 rounded-xl shadow-sm text-center">
                                <Avatar>
                                    <AvatarImage src="./placeholder-user.png" alt="Team Member 4" />
                                    <AvatarFallback>TM3</AvatarFallback>
                                </Avatar>
                                <h3 className="text-xl text-primary font-bold mt-4">Koh Hung Soon</h3>
                                <p className="text-muted-foreground mt-2">Database Developer</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="py-16 px-6 md:px-12 bg-muted">
                    <div className="max-w-5xl mx-auto space-y-12">
                        <div className="text-center space-y-4">
                            <h2 className="text-3xl font-bold">Our Values</h2>
                            <p className="text-muted-foreground">At the core of CryptoLends are these guiding principles.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="bg-background p-6 rounded-xl shadow-sm">
                                <InfoIcon className="h-12 w-12 text-primary" />
                                <h3 className="text-xl font-bold mt-4">Transparency</h3>
                                <p className="text-muted-foreground mt-2">
                                    We believe in open and honest communication, providing clear information about our platform and
                                    processes.
                                </p>
                            </div>
                            <div className="bg-background p-6 rounded-xl shadow-sm">
                                <AccessibilityIcon className="h-12 w-12 text-primary" />
                                <h3 className="text-xl font-bold mt-4">Accessibility</h3>
                                <p className="text-muted-foreground mt-2">
                                    Our goal is to make DeFi lending accessible to everyone, regardless of their financial background or
                                    location.
                                </p>
                            </div>
                            <div className="bg-background p-6 rounded-xl shadow-sm">
                                <InfoIcon className="h-12 w-12 text-primary" />
                                <h3 className="text-xl font-bold mt-4">Innovation</h3>
                                <p className="text-muted-foreground mt-2">
                                    We are constantly exploring new technologies and strategies to improve the lending experience for our
                                    users.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

        </div>
    );
}

interface IconProps extends React.SVGProps<SVGSVGElement> { }

function AccessibilityIcon(props: IconProps) {
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
            <circle cx="16" cy="4" r="1" />
            <path d="m18 19 1-7-6 1" />
            <path d="m5 8 3-3 5.5 3-2.55 3.25" />
            <path d="m4.24 14.48 4.96-4.96 5.5 3-1.5 2.5-6.5 6.5" />
        </svg>
    );
}

function CheckIcon(props: IconProps) {
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
            <path d="m20 6-11 11-5-5" />
        </svg>
    );
}

function CoinsIcon(props: IconProps) {
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
            <path d="M14.5 14.5a6 6 0 1 0 8.5-8.5" />
            <path d="M8 14v2a6 6 0 0 0 11 3" />
            <path d="M22 14v2a6 6 0 0 1-6 6h-1" />
        </svg>
    );
}

function CurrencyIcon(props: IconProps) {
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
            <circle cx="12" cy="12" r="8" />
            <path d="M12 8v8" />
            <path d="M8 12h8" />
        </svg>
    );
}

function InfoIcon(props: IconProps) {
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
            <path d="M12 16v-4" />
            <path d="M12 8h.01" />
        </svg>
    );
}

function LockIcon(props: IconProps) {
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
    );
}
