/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/yngatCsLqKE
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
"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function BDetails() {
  const [search, setSearch] = useState("")
  const [sort, setSort] = useState({ key: "loanAmount", order: "desc" })
  const [filters, setFilters] = useState({
    loanStatus: [],
    loanDuration: [],
  })
  const loans = useMemo(
    () =>
      [
        {
          id: "LOAN001",
          loanStatus: "Active",
          loanAmount: 10000,
          loanDuration: "12 months",
          interestRate: 8.5,
          createdAt: "2023-06-15",
          walletAddress: "0x123456789abcdef",
          smartContract: "0xabcdef0123456789",
          repaymentDeadline: "2024-06-15",
        },
        {
          id: "LOAN002",
          loanStatus: "Pending",
          loanAmount: 5000,
          loanDuration: "6 months",
          interestRate: 7.2,
          createdAt: "2023-07-01",
          walletAddress: "0x987654321fedcba",
          smartContract: "0x9876543210fedcba",
          repaymentDeadline: "2023-12-31",
        },
        {
          id: "LOAN003",
          loanStatus: "Completed",
          loanAmount: 15000,
          loanDuration: "24 months",
          interestRate: 9.0,
          createdAt: "2023-07-10",
          walletAddress: "0xfedcba0987654321",
          smartContract: "0xfedcba9876543210",
          repaymentDeadline: "2025-07-10",
        },
        {
          id: "LOAN004",
          loanStatus: "Active",
          loanAmount: 20000,
          loanDuration: "18 months",
          interestRate: 8.2,
          createdAt: "2023-07-20",
          walletAddress: "0x0123456789abcdef",
          smartContract: "0x0123456789abcdef",
          repaymentDeadline: "2024-12-31",
        },
        {
          id: "LOAN005",
          loanStatus: "Pending",
          loanAmount: 8000,
          loanDuration: "9 months",
          interestRate: 7.8,
          createdAt: "2023-08-01",
          walletAddress: "0xfedcba9876543210",
          smartContract: "0xfedcba9876543210",
          repaymentDeadline: "2024-04-30",
        },
      ]
        .filter((loan) => {
          const searchValue = search.toLowerCase()
          return (
            loan.id.toLowerCase().includes(searchValue) ||
            loan.loanStatus.toLowerCase().includes(searchValue) ||
            loan.loanAmount.toString().includes(searchValue) ||
            loan.loanDuration.toLowerCase().includes(searchValue) ||
            loan.interestRate.toString().includes(searchValue) ||
            loan.createdAt.includes(searchValue) ||
            loan.walletAddress.toLowerCase().includes(searchValue) ||
            loan.smartContract.toLowerCase().includes(searchValue) ||
            loan.repaymentDeadline.includes(searchValue)
          )
        })
        .sort((a, b) => {
          if (sort.order === "asc") {
            return a[sort.key] > b[sort.key] ? 1 : -1
          } else {
            return a[sort.key] < b[sort.key] ? 1 : -1
          }
        }),
    [search, sort, filters],
  )
  const handleSearch = (e) => setSearch(e.target.value)
  const handleSort = (key) => {
    if (sort.key === key) {
      setSort({ key, order: sort.order === "asc" ? "desc" : "asc" })
    } else {
      setSort({ key, order: "desc" })
    }
  }
  const handleFilter = (type, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [type]: prevFilters[type].includes(value)
        ? prevFilters[type].filter((item) => item !== value)
        : [...prevFilters[type], value],
    }))
  }
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="bg-primary text-primary-foreground py-4 px-6 flex items-center justify-between">
        <Link href="#" className="flex items-center gap-2" prefetch={false}>
          <CoinsIcon className="h-8 w-8" />
          <span className="text-xl font-bold">CryptoLends</span>
        </Link>
        <nav className="hidden md:flex items-center gap-4">
          <Link href="#" className="hover:underline underline-offset-4" prefetch={false}>
            Lend
          </Link>
          <Link href="#" className="hover:underline underline-offset-4" prefetch={false}>
            Borrow
          </Link>
          <Link href="#" className="hover:underline underline-offset-4" prefetch={false}>
            About
          </Link>
          <Link href="#" className="hover:underline underline-offset-4" prefetch={false}>
            Contact
          </Link>
        </nav>
        <Button variant="secondary">Connect Wallet</Button>
      </header>
      <main className="flex-1">
        <section className="bg-background py-12 px-6 md:px-12">
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">Loan Details</h1>
            </div>
            <div className="bg-background rounded-lg shadow-lg p-8 mx-auto max-w-2xl">
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h2 className="text-lg font-bold">Loaner's Wallet Address</h2>
                    <p>{loans[0].walletAddress}</p>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold">Loan Amount</h2>
                    <p>${loans[0].loanAmount.toFixed(2)}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h2 className="text-lg font-bold">Loan Duration</h2>
                    <p>{loans[0].loanDuration}</p>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold">Smart Contract</h2>
                    <p>{loans[0].smartContract}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h2 className="text-lg font-bold">Interest Rate</h2>
                    <p>{loans[0].interestRate}%</p>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold">Status</h2>
                    <Badge
                      variant={
                        loans[0].loanStatus === "Completed"
                          ? "success"
                          : loans[0].loanStatus === "Active"
                          ? "outline"
                          : "secondary"
                      }
                    >
                      {loans[0].loanStatus}
                    </Badge>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h2 className="text-lg font-bold">Repayment Deadline</h2>
                    <p>{loans[0].repaymentDeadline}</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-8">
                <Button>Return to Dashboard</Button>
              </div>
            </div>
          </div>
        </section>
      </main>
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
    </div>
  )
}

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
