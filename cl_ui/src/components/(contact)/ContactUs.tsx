"use client"

import React from "react";
import { useForm, ValidationError } from "@formspree/react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactForm() {
    const [state, handleSubmit] = useForm("myzgjpgo");

    if (state.succeeded) {
        return <p>Your email has been submitted!</p>;
    }

    return (
        <div className="flex flex-col min-h-[85dvh]">
            <main className="flex-1">
                <section className="bg-muted py-16 px-6 md:px-12 flex flex-col items-center justify-center gap-8">
                    <div className="max-w-3xl space-y-6 text-center">
                        <h1 className="text-4xl font-bold">Contact Us</h1>
                        <p className="text-muted-foreground">Get in touch with our team for any inquiries or support.</p>
                        <div className="bg-background p-6 rounded-xl shadow-sm grid gap-4">
                            <form className="grid gap-4" onSubmit={handleSubmit}>
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name" placeholder="Enter your name" required />
                                </div>
                                <ValidationError prefix="Name" field="name" errors={state.errors} />
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" placeholder="Enter your email" required />
                                </div>
                                <ValidationError prefix="Email" field="email" errors={state.errors} />
                                <div className="grid gap-2">
                                    <Label htmlFor="subject">Subject</Label>
                                    <Textarea id="subject" placeholder="Briefly describe your inquiry" className="min-h-[100px]" required />
                                </div>
                                <ValidationError prefix="Subject" field="subject" errors={state.errors} />
                                <Button type="submit" disabled={state.submitting} className="w-full">
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
