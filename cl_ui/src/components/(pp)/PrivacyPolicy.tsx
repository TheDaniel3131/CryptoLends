/**
 * v0 by Vercel.
 * @see https://v0.dev/t/M6KzKeRW461
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PrivacyPolicyPage() {
    return (
        <div className="flex flex-col min-h-[100dvh]">
            <main className="flex-1">
                <section className="bg-muted py-16 px-6 md:px-12 flex flex-col items-center justify-center gap-8">
                    <div className="max-w-3xl space-y-6 text-center">
                        <h1 className="text-4xl font-bold">Privacy Policy</h1>
                        <div className="bg-white p-8 rounded-lg shadow-lg">
                            <h2 className="text-2xl font-bold mb-6">Your Privacy Matters</h2>
                            <div className="space-y-4 text-left">
                                <p>
                                    At CryptoLends, we are committed to protecting your privacy and the security of your personal
                                    information. This Privacy Policy explains how we collect, use, and safeguard your data when you use
                                    our platform.
                                </p>
                                <h3 className="text-lg font-bold">Information We Collect</h3>
                                <p>
                                    We may collect various types of information from you, including your name, email address, wallet
                                    address, and transaction history. We use this information to provide you with our services, improve
                                    our platform, and comply with legal requirements.
                                </p>
                                <h3 className="text-lg font-bold">How We Use Your Information</h3>
                                <p>
                                    We use your information to facilitate lending and borrowing transactions, communicate with you, and
                                    improve our services. We may also share your information with third-party service providers who assist
                                    us in operating the platform.
                                </p>
                                <h3 className="text-lg font-bold">Data Security</h3>
                                <p>
                                    We take reasonable measures to protect your personal information from unauthorized access, use, or
                                    disclosure. However, no method of transmission over the internet or electronic storage is 100% secure,
                                    and we cannot guarantee absolute security.
                                </p>
                                <h3 className="text-lg font-bold">Your Rights</h3>
                                <p>
                                    You have the right to access, correct, or delete your personal information. You can also opt out of
                                    certain data processing activities. If you have any questions or concerns, please contact us.
                                </p>
                                <h3 className="text-lg font-bold">Changes to this Policy</h3>
                                <p>
                                    We may update this Privacy Policy from time to time. We will notify you of any changes by posting the
                                    new policy on our website.
                                </p>
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
