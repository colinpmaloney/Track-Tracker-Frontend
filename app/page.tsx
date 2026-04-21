import TrackList from "./components/TrackList"
import { mockTopTen } from "./tests/mockTopTen"

export default function Home() {
    return (
        <main className="max-w-5xl mx-auto px-6 py-8">
            <TrackList songs={mockTopTen} />
        </main>
    )
}