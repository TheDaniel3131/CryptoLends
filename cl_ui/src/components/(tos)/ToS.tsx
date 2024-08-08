/**
 * v0 by Vercel.
 * @see https://v0.dev/t/lMd9JrDzctw
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ToSPage() {
    return (
        <div className="flex flex-col min-h-[100dvh]">
            <main className="flex-1">
                <section className="bg-muted py-16 px-6 md:px-12 flex flex-col items-center justify-center gap-8">
                    <div className="max-w-3xl space-y-6 text-center">
                        <h1 className="text-4xl font-bold">Terms of Service</h1>
                        <div className="bg-white p-8 rounded-lg shadow-lg">
                            <h2 className="text-2xl font-bold mb-6">Welcome to CryptoLends</h2>
                            <div className="space-y-4 text-left">
                                <p>
                                    These Terms of Service (&quot;Terms&quot;) govern your access to and use of the CryptoLends platform, including
                                    our website, mobile applications, and related services (collectively, the &quot;Platform&quot;). By accessing or
                                    using the Platform, you agree to be bound by these Terms and our Privacy Policy, which is incorporated
                                    herein by reference.
                                </p>
                                <h3 className="text-lg font-bold">1. Use of the Platform</h3>
                                <p>
                                    You must be at least 18 years old to use the Platform. By using the Platform, you represent and
                                    warrant that you have the legal capacity to enter into a binding contract. You agree to use the
                                    Platform in accordance with all applicable laws and regulations.
                                </p>
                                <h3 className="text-lg font-bold">2. Lending and Borrowing</h3>
                                <p>
                                    The Platform allows you to lend your crypto assets to borrowers and earn interest. You acknowledge and
                                    agree that lending your crypto assets involves risks, including the potential loss of your principal.
                                    You are solely responsible for evaluating the risks and suitability of any lending activity.
                                </p>
                                <h3 className="text-lg font-bold">3. Intellectual Property</h3>
                                <p>
                                    The Platform and its content, features, and functionality are owned by CryptoLends and are protected
                                    by international copyright, trademark, patent, trade secret, and other intellectual property or
                                    proprietary rights laws.
                                </p>
                                <h3 className="text-lg font-bold">4. Termination</h3>
                                <p>
                                    CryptoLends reserves the right to suspend or terminate your access to the Platform at any time for any
                                    reason, including if we reasonably believe you have violated these Terms.
                                </p>
                                <h3 className="text-lg font-bold">5. Limitation of Liability</h3>
                                <p>
                                    CryptoLends shall not be liable for any indirect, special, incidental, or consequential damages
                                    arising out of or related to your use of the Platform. Our total liability shall not exceed $100.
                                </p>
                                <h3 className="text-lg font-bold">6. Governing Law</h3>
                                <p>
                                    These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in
                                    which CryptoLends is located, without giving effect to any choice or conflict of law provision or
                                    rule.
                                </p>
                                <div className="flex justify-end" />
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

// Type for the CoinsIcon props
interface CoinsIconProps extends React.SVGProps<SVGSVGElement> { }

function CoinsIcon(props: CoinsIconProps) {
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
}
