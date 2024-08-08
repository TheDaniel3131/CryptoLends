import Link from "next/link"
import { Connect } from "./Connect"
import { JSX, SVGProps } from "react"

export function Header() {
    return (
        <header className="bg-primary text-primary-foreground py-4 px-6 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
                <CoinsIcon className="h-8 w-8" />
                <span className="text-xl font-bold">CryptoLends</span>
            </Link>
            <nav className="hidden md:flex items-center gap-4">
                <Link href="/borrow" className="hover:underline underline-offset-4">
                    Borrow Now
                </Link>
                <Link href="/lend" className="hover:underline underline-offset-4">
                    Lending
                </Link>
                <Link href="/about" className="hover:underline underline-offset-4">
                    About Us
                </Link>
                <Link href="/contact" className="hover:underline underline-offset-4">
                    Contact Us
                </Link>
            </nav>
            <Connect />
        </header>
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
