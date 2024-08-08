import Link from "next/link";
import React from "react";
import { Connect } from "@/components/Connect";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactUsPage() {
    return (
        <div className="flex flex-col min-h-[85dvh]">
            <main className="flex-1">
                <section className="bg-muted py-16 px-6 md:px-12 flex flex-col items-center justify-center gap-8">
                    <div className="max-w-3xl space-y-6 text-center">
                        <h1 className="text-4xl font-bold">Contact Us</h1>
                        <p className="text-muted-foreground">Get in touch with our team for any inquiries or support.</p>
                        <div className="bg-background p-6 rounded-xl shadow-sm grid gap-4">
                            <form className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name" placeholder="Enter your name" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" placeholder="Enter your email" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="subject">Subject</Label>
                                    <Textarea id="subject" placeholder="Briefly describe your inquiry" className="min-h-[100px]" />
                                </div>
                                <Button type="submit" className="w-full">
                                    Submit
                                </Button>
                            </form>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

// interface IconProps extends React.SVGProps<SVGSVGElement> { }

// function CoinsIcon(props: IconProps) {
//     return (
//         <svg
//             {...props}
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//         >
//             <circle cx="8" cy="8" r="6" />
//             <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
//             <path d="M7 6h1v4" />
//             <path d="m16.71 13.88.7.71-2.82 2.82" />
//         </svg>
//     );
// }
