"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

/**
 * Controlled search input that syncs its value with the URL query param `q`.
 * Debounces URL updates by 300ms to avoid pushing a history entry on every keystroke.
 */
export default function SearchBar({ initialValue = "" }: { initialValue?: string }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        setValue(searchParams.get("q") ?? "");
    }, [searchParams]);

    const updateUrl = useCallback(
        (term: string) => {
            const params = new URLSearchParams(searchParams.toString());
            if (term) {
                params.set("q", term);
            } else {
                params.delete("q");
            }
            router.push(`?${params.toString()}`);
        },
        [router, searchParams]
    );

    useEffect(() => {
        const timer = setTimeout(() => updateUrl(value), 300);
        return () => clearTimeout(timer);
    }, [value, updateUrl]);

    return (
        <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                </svg>
            </div>
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Search all tracks or artists..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm text-sm"
            />
        </div>
    );
}
