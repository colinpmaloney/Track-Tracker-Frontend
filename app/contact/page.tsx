"use client";

import { useState } from "react";
import Link from "next/link";


function CheckCircleIcon() {
    return (
        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
    );
}

type IssueType = "bug" | "feature" | "data" | "other";

interface FormState {
    name: string;
    email: string;
    issueType: IssueType | "";
    subject: string;
    description: string;
}

const ISSUE_TYPES: { value: IssueType; label: string }[] = [
    { value: "bug", label: "Bug report" },
    { value: "feature", label: "Feature request" },
    { value: "data", label: "Incorrect data" },
    { value: "other", label: "Other" },
];

const inputClass =
    "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-75";

export default function Contact() {
    const [form, setForm] = useState<FormState>({
        name: "",
        email: "",
        issueType: "",
        subject: "",
        description: "",
    });
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState<Partial<FormState>>({});

    function validate(): boolean {
        const next: Partial<FormState> = {};
        if (!form.name.trim()) next.name = "Name is required.";
        if (!form.email.trim()) {
            next.email = "Email is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            next.email = "Enter a valid email address.";
        }
        if (!form.issueType) next.issueType = "Please select an issue type." as IssueType;
        if (!form.subject.trim()) next.subject = "Subject is required.";
        if (!form.description.trim()) next.description = "Please describe the issue.";
        setErrors(next);
        return Object.keys(next).length === 0;
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        if (errors[name as keyof FormState]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (validate()) setSubmitted(true);
    }

    if (submitted) {
        return (
            <main className="max-w-5xl mx-auto px-6 py-8">
                <div className="flex flex-col items-center justify-center py-24 text-center">
                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-500 mb-6">
                        <CheckCircleIcon />
                    </div>
                    <h1 className="text-foreground mb-3">Report received</h1>
                    <p className="text-gray-500 text-lg max-w-md leading-relaxed mb-8">
                        Thanks for reaching out. We&apos;ll review your report and follow up if needed.
                    </p>
                    <div className="flex gap-4">
                        <button
                            onClick={() => { setSubmitted(false); setForm({ name: "", email: "", issueType: "", subject: "", description: "" }); }}
                            className="bg-white border border-gray-200 text-gray-700 font-bold px-6 py-3 rounded-xl hover:scale-105 transition-all duration-75"
                        >
                            Submit another
                        </button>
                        <Link
                            href="/"
                            className="bg-green-500 text-white font-bold px-6 py-3 rounded-xl hover:scale-105 transition-all duration-75"
                        >
                            Back to charts
                        </Link>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="max-w-5xl mx-auto px-6 py-8">

            {/* Hero */}
            <section className="mb-10">
                <div className="inline-flex items-center gap-2 bg-green-50 text-green-600 text-sm font-bold px-3 py-1.5 rounded-full mb-4">
                    <span>Issue Reporting</span>
                </div>
                <h1 className="text-foreground mb-4">
                    Found a problem?<br />
                    <span className="text-green-500">Let us know.</span>
                </h1>
                <p className="text-gray-500 text-lg max-w-2xl leading-relaxed">
                    Use this form to report bugs, incorrect track data, or any other issue you&apos;ve noticed.
                    We read every report.
                </p>
            </section>

            {/* Form */}
            <section className="mb-12">
                <form onSubmit={handleSubmit} noValidate>
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex flex-col gap-6">

                        {/* Name + Email */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-bold text-gray-900" htmlFor="name">Name</label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="Your name"
                                    value={form.name}
                                    onChange={handleChange}
                                    className={inputClass}
                                />
                                {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-bold text-gray-900" htmlFor="email">Email</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={form.email}
                                    onChange={handleChange}
                                    className={inputClass}
                                />
                                {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                            </div>
                        </div>

                        {/* Issue type */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-bold text-gray-900" htmlFor="issueType">Issue type</label>
                            <select
                                id="issueType"
                                name="issueType"
                                value={form.issueType}
                                onChange={handleChange}
                                className={inputClass}
                            >
                                <option value="" disabled>Select a category</option>
                                {ISSUE_TYPES.map(({ value, label }) => (
                                    <option key={value} value={value}>{label}</option>
                                ))}
                            </select>
                            {errors.issueType && <p className="text-red-500 text-xs">{errors.issueType}</p>}
                        </div>

                        {/* Subject */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-bold text-gray-900" htmlFor="subject">Subject</label>
                            <input
                                id="subject"
                                name="subject"
                                type="text"
                                placeholder="Brief summary of the issue"
                                value={form.subject}
                                onChange={handleChange}
                                className={inputClass}
                            />
                            {errors.subject && <p className="text-red-500 text-xs">{errors.subject}</p>}
                        </div>

                        {/* Description */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-bold text-gray-900" htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                rows={5}
                                placeholder="Describe the issue in detail — what you saw, what you expected, and any steps to reproduce it."
                                value={form.description}
                                onChange={handleChange}
                                className={`${inputClass} resize-none`}
                            />
                            {errors.description && <p className="text-red-500 text-xs">{errors.description}</p>}
                        </div>

                        <div className="flex justify-end pt-2">
                            <button
                                type="submit"
                                className="bg-green-500 text-white font-bold px-6 py-3 rounded-xl hover:scale-105 transition-all duration-75"
                            >
                                Submit report
                            </button>
                        </div>
                    </div>
                </form>
            </section>

        </main>
    );
}
