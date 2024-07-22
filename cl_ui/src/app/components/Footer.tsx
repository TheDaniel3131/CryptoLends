import Link from "next/link"
import React from "react"

function CoinsIcon(props) {
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

export function Footer() {
    return (
        <footer className="bg-primary text-primary-foreground py-6 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-2">
                <CoinsIcon className="h-6 w-6" />
                <span>&copy; 2024 CryptoLends. All rights reserved.</span>
            </div>
            <nav className="flex items-center gap-4 mt-4 md:mt-0">
                <Link href="#" className="hover:underline underline-offset-4" prefetch={false}>
                    Terms of Service
                </Link>
                <Link href="#" className="hover:underline underline-offset-4" prefetch={false}>
                    Privacy Policy
                </Link>
                <Link href="#" className="hover:underline underline-offset-4" prefetch={false}>
                    Contact Us
                </Link>
            </nav>
        </footer>
    )
}
