
"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { supabase } from '@/lib/supabaseClient'; // Make sure this import is correct
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"

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
                <Button>Borrow</Button>
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
                <p className="text-muted-foreground">
                  Connect your crypto wallet to our platform to start borrowing.
                </p>
              </div>
              <div className="bg-background p-6 rounded-xl shadow-sm">
                <PercentIcon className="h-8 w-8 mb-4 text-secondary" />
                <h3 className="text-xl font-bold mb-2">Choose Loan Terms</h3>
                <p className="text-muted-foreground">
                  Select the asset, amount, and term that best suits your needs.
                </p>
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

        {/* Frequently Asked Questions Section */}
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