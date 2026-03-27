import TrackList from "./components/TrackList"
import { mockTopTen } from "./tests/mockTopTen"

export default function Home() {
    return (
        <main>
            <TrackList songs={mockTopTen} />
        </main>
    )
}