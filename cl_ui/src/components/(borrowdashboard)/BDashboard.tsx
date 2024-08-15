// src/components/(borrowdashboard)/BDashboard.tsx

"use client";

import BDetails from '@/components/(bdetails)/BDetails';
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { supabase } from '@/lib/supabaseClient'; // Make sure this import is correct
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"

interface Loan {
  cryptocurrency: string;
  id: number;
  lending_amount: number;
  duration_return: number;
  interest_rate: number;
  loan_status: string;
  status: string;
  address: string;

}

export default function Component() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState({ key: "lending_amount", order: "desc" });
  type LoanStatus = "Active" | "Pending" | "Completed";
  type LoanDuration = "6 months" | "9 months" | "12 months" | "18 months" | "24 months";

  type Loan = {
    [key: string]: any;
  };
  const [filters, setFilters] = useState<{
    loanStatus: LoanStatus[],
    loanDuration: LoanDuration[],
  }>({
    loanStatus: [],
    loanDuration: [],
  });
  const [loans, setLoans] = useState<Loan[]>([]);

  useEffect(() => {
    async function fetchLoans() {
      const { data, error } = await supabase
        .from('lending_list')
        .select('*');

      if (error) {
        console.error('Error fetching data from Supabase:', error.message);
      } else {
        setLoans(data);
      }
    }

    fetchLoans();
  }, []);

  const filteredLoans = useMemo(() => {
    return loans
      .filter((loan) => {
        if (!loan) return false;

        const searchValue = search.toLowerCase();

        const id = typeof loan.id === 'number' ? loan.id.toString() : '';
        const loanStatus = typeof loan.loan_status === 'string' ? loan.loan_status.toLowerCase() : '';
        const lendingAmount = typeof loan.lending_amount === 'number' ? loan.lending_amount.toString() : '';
        const durationReturn = typeof loan.duration_return === 'number' ? loan.duration_return.toString() : '';
        const interestRate = typeof loan.interest_rate === 'number' ? loan.interest_rate.toString() : '';
        const cryptocurrency = typeof loan.cryptocurrency === 'string' ? loan.cryptocurrency.toLowerCase() : '';


        return (
          id.includes(searchValue) ||
          loanStatus.includes(searchValue) ||
          lendingAmount.includes(searchValue) ||
          durationReturn.includes(searchValue) ||
          interestRate.includes(searchValue) ||
          cryptocurrency.includes(searchValue)
        );
      })
      .filter((loan) => {
        if (!loan) return false;

        if (filters.loanStatus.length > 0 && !filters.loanStatus.includes(loan.status as LoanStatus)) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (!a || !b) return 0;

        const valueA = a[sort.key];
        const valueB = b[sort.key];

        if (valueA == null && valueB == null) return 0;
        if (valueA == null) return sort.order === "asc" ? -1 : 1;
        if (valueB == null) return sort.order === "asc" ? 1 : -1;

        if (sort.order === "asc") {
          return valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
        } else {
          return valueA < valueB ? 1 : valueA > valueB ? -1 : 0;
        }
      });
  }, [search, sort, filters, loans]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSort = (key: string) => {
    setSort((prevSort) => ({
      key,
      order: prevSort.key === key && prevSort.order === "asc" ? "desc" : "asc",
    }));
  };

  type Filters = {
    loanStatus: LoanStatus[];
    loanDuration: LoanDuration[];
  };

  const handleFilter = <T extends keyof Filters>(type: T, value: Filters[T][number]) => {
    setFilters((prevFilters: Filters) => ({
      ...prevFilters,
      [type]: prevFilters[type]?.includes(value)
        ? prevFilters[type].filter((item: Filters[T][number]) => item !== value)
        : [...(prevFilters[type] || []), value],
    }));
  };


  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        <section className="bg-background-dark py-12 px-6 md:px-12">
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">Loan Dashboard</h1>
              <div className="flex items-center gap-4">
                <Input placeholder="Search loans..." value={search} onChange={handleSearch} className="max-w-xs" />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      Sort by
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-[200px]" align="end">
                    <DropdownMenuRadioGroup value={sort.key}>
                      <DropdownMenuRadioItem value="id" onClick={() => handleSort("id")}>
                        ID
                        {sort.key === "id" && (
                          <span className="ml-1">{sort.order === "asc" ? "\u2191" : "\u2193"}</span>
                        )}
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="status" onClick={() => handleSort("status")}>
                        Status
                        {sort.key === "status" && (
                          <span className="ml-1">{sort.order === "asc" ? "\u2191" : "\u2193"}</span>
                        )}
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="lending_amount" onClick={() => handleSort("lending_amount")}>
                        Loan Amount
                        {sort.key === "lending_amount" && (
                          <span className="ml-1">{sort.order === "asc" ? "\u2191" : "\u2193"}</span>
                        )}
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="duration_return" onClick={() => handleSort("duration_return")}>
                        Loan Duration
                        {sort.key === "duration_return" && (
                          <span className="ml-1">{sort.order === "asc" ? "\u2191" : "\u2193"}</span>
                        )}
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="interest_rate" onClick={() => handleSort("interest_rate")}>
                        Interest Rate
                        {sort.key === "interest_rate" && (
                          <span className="ml-1">{sort.order === "asc" ? "\u2191" : "\u2193"}</span>
                        )}
                      </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className="grid gap-4">
              <div className="flex items-center gap-4">
                <span className="font-medium">Filters:</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      Loan Status
                      {filters.loanStatus.length > 0 && (
                        <span className="ml-2 bg-primary px-2 py-1 rounded-full text-xs text-primary-foreground">
                          {filters.loanStatus.length}
                        </span>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-[200px]">
                    <DropdownMenuCheckboxItem
                      checked={filters.loanStatus.includes("Active")}
                      onCheckedChange={() => handleFilter("loanStatus", "Active")}
                    >
                      Active
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={filters.loanStatus.includes("Pending")}
                      onCheckedChange={() => handleFilter("loanStatus", "Pending")}
                    >
                      Pending
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={filters.loanStatus.includes("Completed")}
                      onCheckedChange={() => handleFilter("loanStatus", "Completed")}
                    >
                      Completed
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      Loan Duration
                      {filters.loanDuration.length > 0 && (
                        <span className="ml-2 bg-primary px-2 py-1 rounded-full text-xs text-primary-foreground">
                          {filters.loanDuration.length}
                        </span>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-[200px]">
                    <DropdownMenuCheckboxItem
                      checked={filters.loanDuration.includes("6 months")}
                      onCheckedChange={() => handleFilter("loanDuration", "6 months")}
                    >
                      6 months
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={filters.loanDuration.includes("9 months")}
                      onCheckedChange={() => handleFilter("loanDuration", "9 months")}
                    >
                      9 months
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={filters.loanDuration.includes("12 months")}
                      onCheckedChange={() => handleFilter("loanDuration", "12 months")}
                    >
                      12 months
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={filters.loanDuration.includes("18 months")}
                      onCheckedChange={() => handleFilter("loanDuration", "18 months")}
                    >
                      18 months
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={filters.loanDuration.includes("24 months")}
                      onCheckedChange={() => handleFilter("loanDuration", "24 months")}
                    >
                      24 months
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Loan Status</TableHead>
                    <TableHead>Loan Amount</TableHead>
                    <TableHead>Loan Duration</TableHead>
                    <TableHead>Interest Rate</TableHead>
                    <TableHead>Cryptocurrency Type</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLoans.length > 0 ? (
                    filteredLoans.map((loan) => (
                      <TableRow key={loan.id}>
                        <TableCell>{loan.id}</TableCell>
                        <TableCell>
                          <Badge>{loan.status}</Badge>
                        </TableCell>
                        <TableCell>{loan.lending_amount}</TableCell>
                        <TableCell>{loan.duration_return} Month</TableCell>
                        <TableCell>{loan.interest_rate}%</TableCell>
                        <TableCell>{loan.cryptocurrency}</TableCell>
                        <TableCell>
                          <Link href={`/bdetails?id=${loan.id}`}>
                            <Button>Details</Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center">
                        No loans available
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </section>
        <section className="bg-muted-dark py-16 px-6 md:px-12 flex flex-col items-center justify-center gap-8">
          <div className="max-w-3xl space-y-6 text-center">
            <h2 className="text-3xl font-bold">How it Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-background-dark p-6 rounded-xl shadow-sm">
                <WalletIcon className="h-8 w-8 mb-4 bg-" />
                <h3 className="text-xl font-bold mb-2">Connect Wallet</h3>
                <p className="text-muted-foreground">Connect your crypto wallet to our platform to start borrowing.</p>
              </div>
              <div className="bg-background-dark p-6 rounded-xl shadow-sm">
                <PercentIcon className="h-8 w-8 mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">Choose Loan Terms</h3>
                <p className="text-muted-foreground">Select the asset, amount, and term that best suits your needs.</p>
              </div>
              <div className="bg-background-dark p-6 rounded-xl shadow-sm">
                <ReceiptIcon className="h-8 w-8 mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">Access Crypto Liquidity</h3>
                <p className="text-muted-foreground">
                  Receive the crypto you need to fund your projects or personal expenses.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-background-dark py-16 px-6 md:px-12 flex flex-col items-center justify-center gap-8">
          <div className="max-w-3xl space-y-6 text-center">
            <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
            <div className="grid gap-4">
              <Collapsible>
                <CollapsibleTrigger className="flex items-center justify-between w-full bg-muted-dark p-4 rounded-xl">
                  <h3 className="text-lg font-bold">What is the minimum amount I can borrow?</h3>
                  <ChevronDownIcon className="h-6 w-6 text-muted-foreground" />
                </CollapsibleTrigger>
                <CollapsibleContent className="bg-background-dark p-4 rounded-xl">
                  <p className="text-muted-foreground">
                    The minimum amount you can borrow is $100 or the equivalent in your chosen crypto asset.
                  </p>
                </CollapsibleContent>
              </Collapsible>
              <Collapsible>
                <CollapsibleTrigger className="flex items-center justify-between w-full bg-muted-dark p-4 rounded-xl">
                  <h3 className="text-lg font-bold">How do I repay my loan?</h3>
                  <ChevronDownIcon className="h-6 w-6 text-muted-foreground" />
                </CollapsibleTrigger>
                <CollapsibleContent className="bg-background-dark p-4 rounded-xl">
                  <p className="text-muted-foreground">
                    You can repay your loan at any time by logging into your account and initiating a repayment. There
                    are no prepayment penalties or hidden fees.
                  </p>
                </CollapsibleContent>
              </Collapsible>
              <Collapsible>
                <CollapsibleTrigger className="flex items-center justify-between w-full bg-muted-dark p-4 rounded-xl">
                  <h3 className="text-lg font-bold">Is my collateral secure with CryptoLends?</h3>
                  <ChevronDownIcon className="h-6 w-6 text-muted-foreground" />
                </CollapsibleTrigger>
                <CollapsibleContent className="bg-background-dark p-4 rounded-xl">
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
  );
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

const CoinsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
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
