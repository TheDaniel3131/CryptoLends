"use client"

import React, { useEffect } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ContactForm() {
    const [state, handleSubmit] = useForm("myzgjpgo");

    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await handleSubmit(event);
        } catch (error) {
            console.error("Form submission error:", error);
        }
    };

    useEffect(() => {
        if (state.succeeded) {
            toast.success("Your email has been submitted!");
        } else if (Array.isArray(state.errors) && state.errors.length > 0) {
            toast.error("There was an error submitting the form. Please try again.");
        }
    }, [state]);

    return (
        <div className="flex flex-col min-h-[85dvh]">
            <main className="flex-1">
                <section className="bg-muted py-16 px-6 md:px-12 flex flex-col items-center justify-center gap-8">
                    <div className="max-w-3xl space-y-6 text-center">
                        <h1 className="text-4xl font-bold">Contact Us</h1>
                        <p className="text-muted-foreground">
                            Get in touch with our team for any inquiries or support.
                        </p>
                        <div className="bg-background p-6 rounded-xl shadow-sm grid gap-4">
                            <form className="grid gap-4" onSubmit={handleFormSubmit}>
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name" name="name" placeholder="Enter your name" required />
                                </div>
                                <ValidationError prefix="Name" field="name" errors={state.errors} />
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" name="email" type="email" placeholder="Enter your email" required />
                                </div>
                                <ValidationError prefix="Email" field="email" errors={state.errors} />
                                <div className="grid gap-2">
                                    <Label htmlFor="subject">Subject</Label>
                                    <Textarea
                                        id="subject"
                                        name="subject"
                                        placeholder="Briefly describe your inquiry"
                                        className="min-h-[100px]"
                                        required
                                    />
                                </div>
                                <ValidationError prefix="Subject" field="subject" errors={state.errors} />
                                <Button type="submit" disabled={state.submitting} className="w-full">
                                    Submit
                                </Button>
                                {Array.isArray(state.errors) && state.errors.length > 0 && (
                                    <div className="text-red-500">
                                        <p>There was an error submitting the form. Please try again.</p>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
