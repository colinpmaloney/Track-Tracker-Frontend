import Link from "next/link";

function TrendingUpIcon() {
    return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.307a11.95 11.95 0 0 1 5.814-5.519l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
        </svg>
    );
}

function ChartBarIcon() {
    return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
        </svg>
    );
}

function MusicNoteIcon() {
    return (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 4v9.38A3.5 3.5 0 1 0 11 17V9l8-2V4H9zm1 13a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm8-8-6 1.5V6l6-1.5V9z" />
        </svg>
    );
}

function UsersIcon() {
    return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
        </svg>
    );
}

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-green-500 mb-4">
                {icon}
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-2">{title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
        </div>
    );
}

interface AudienceCardProps {
    label: string;
    description: string;
}

function AudienceCard({ label, description }: AudienceCardProps) {
    return (
        <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
            <div>
                <p className="font-bold text-gray-900">{label}</p>
                <p className="text-gray-500 text-sm mt-0.5">{description}</p>
            </div>
        </div>
    );
}

export default function About() {
    return (
        <main className="max-w-5xl mx-auto px-6 py-8">

            {/* Hero */}
            <section className="mb-12">
                <div className="inline-flex items-center gap-2 bg-green-50 text-green-600 text-sm font-bold px-3 py-1.5 rounded-full mb-4">
                    <TrendingUpIcon />
                    <span>Music Analytics</span>
                </div>
                <h1 className="text-foreground mb-4">
                    The pulse of music,<br />
                    <span className="text-green-500">tracked in real time.</span>
                </h1>
                <p className="text-gray-500 text-lg max-w-2xl leading-relaxed">
                    Track Tracker surfaces the songs people are actually listening to — with the numbers to back it up.
                    Daily plays, total listens, weekly growth rates, and release info, all in one place.
                </p>
            </section>

            {/* What we track */}
            <section className="mb-12">
                <h2 className="text-foreground mb-2">What we track</h2>
                <p className="text-gray-500 mb-6">Every card on Track Tracker gives you four data points that matter.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FeatureCard
                        icon={<TrendingUpIcon />}
                        title="Weekly Growth"
                        description="See which tracks are gaining momentum — not just which ones are already huge. Growth percentage tells you what's about to blow up."
                    />
                    <FeatureCard
                        icon={<ChartBarIcon />}
                        title="Daily & Total Listens"
                        description="Understand a track's reach at a glance. Daily listens show current velocity; total listens show staying power."
                    />
                    <FeatureCard
                        icon={<MusicNoteIcon />}
                        title="Track & Artist Info"
                        description="Title, artist, album, and release date — enough context to know the song without needing to leave the page."
                    />
                    <FeatureCard
                        icon={<UsersIcon />}
                        title="Ranked Charts"
                        description="Tracks are ranked and ordered so you can scan the top ten instantly. No noise, no filler — just the charts."
                    />
                </div>
            </section>

            {/* Who it's for */}
            <section className="mb-12">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                    <h2 className="text-gray-900 mb-2">Who it's for</h2>
                    <p className="text-gray-500 mb-6">Track Tracker is useful any time you want data, not just opinions.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <AudienceCard
                            label="Music fans"
                            description="Stay ahead of what's trending before it dominates every playlist."
                        />
                        <AudienceCard
                            label="Artists & managers"
                            description="Benchmark your tracks against what's performing well right now."
                        />
                        <AudienceCard
                            label="Data enthusiasts"
                            description="Explore streaming numbers with clean, structured information that's easy to read."
                        />
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section>
                <div className="bg-green-500 rounded-2xl p-8 text-center">
                    <h2 className="text-white mb-2">Ready to explore?</h2>
                    <p className="text-green-100 mb-6 max-w-md mx-auto">
                        Head back to the charts and see which tracks are trending right now.
                    </p>
                    <Link
                        href="/"
                        className="inline-block bg-white text-green-600 font-bold px-6 py-3 rounded-xl hover:scale-105 transition-all duration-75"
                    >
                        See the top charts
                    </Link>
                </div>
            </section>

        </main>
    );
}
