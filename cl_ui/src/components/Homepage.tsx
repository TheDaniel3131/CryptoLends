/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/Sf3MALSwyYX
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/

/** Add fonts into your Next.js project:

import { Comfortaa } from 'next/font/google'
import { Gabarito } from 'next/font/google'

comfortaa({
  subsets: ['latin'],
  display: 'swap',
})

gabarito({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/

import Link from "next/link"
import { Button } from "@/app/ui/button"
import { JSX, SVGProps } from "react"

export function Homepage() {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-white">
      <main className="flex-1">
        <section className="bg-primary py-16 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-md space-y-4">
            <h1 className="text-4xl font-bold text-primary-foreground">Unlock the Power of Decentralized Lending</h1>
            <p className="text-primary-foreground/80">
              CryptoLends is a leading P2P DeFi lending platform that offers low-interest rates, fast approvals, and
              secure transactions. Start lending or borrowing today!
            </p>
            <div className="flex gap-4">
              <Link href="/borrowdashboard" className="hover:underline underline-offset-4"><Button variant="secondary">Start Borrowing</Button></Link>
              <Link href="/lend" className="hover:underline underline-offset-4"><Button>Earn Through Lending</Button></Link>
            </div>
          </div>
          <div className="bg-background rounded-2xl p-6 w-full md:w-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex flex-col items-center">
                <span className="text-4xl font-bold text-primary">$12.5M</span>
                <span className="text-muted-foreground">Total Value Locked</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-4xl font-bold text-primary">5,200+</span>
                <span className="text-muted-foreground">Active Lenders</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-4xl font-bold text-primary">3,800+</span>
                <span className="text-muted-foreground">Active Borrowers</span>
              </div>
            </div>
          </div>
        </section>
        <section className="py-16 px-6 md:px-12 bg-muted">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold">CryptoLends&rsquo; Key Features</h2>
              <p className="text-muted-foreground">
                CryptoLends offers a range of features to make your lending and borrowing experience seamless.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
          </div>
        </section>
        <section className="py-16 px-6 md:px-12">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold">Our Roadmap</h2>
              <p className="text-muted-foreground">Check out our exciting roadmap for the future of CryptoLends.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-background p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-bold">2024</h3>
                <ul className="space-y-2 mt-4">
                  <li>
                    <CheckIcon className="mr-2 inline-block h-5 w-5 text-primary" />
                    Cross-chain lending and borrowing
                  </li>
                  <li>
                    <CheckIcon className="mr-2 inline-block h-5 w-5 text-primary" />
                    Enhanced token support
                  </li>
                  <li>
                    <CheckIcon className="mr-2 inline-block h-5 w-5 text-primary" />
                    Modern, clean and improved user dashboard
                  </li>
                </ul>
              </div>
              <div className="bg-background p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-bold">2025</h3>
                <ul className="space-y-2 mt-4">
                  <li>
                    <CoinsIcon className="mr-2 inline-block h-5 w-5 text-primary" />
                    Decentralized governance model
                  </li>
                  <li>
                    <CoinsIcon className="mr-2 inline-block h-5 w-5 text-primary" />
                    Mobile application launch
                  </li>
                  <li>
                    <CoinsIcon className="mr-2 inline-block h-5 w-5 text-primary" />
                    Yield farming and staking options
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

function CheckIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

function CoinsIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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

function CurrencyIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <line x1="3" x2="6" y1="3" y2="6" />
      <line x1="21" x2="18" y1="3" y2="6" />
      <line x1="3" x2="6" y1="21" y2="18" />
      <line x1="21" x2="18" y1="21" y2="18" />
    </svg>
  )
}

function LockIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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

function XIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}
