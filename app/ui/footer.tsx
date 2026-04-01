import Link from "next/link";
import Image from "next/image";
import GithubLogo from "../../public/github.png"; // make sure this file exists

export const Footer = () => {
    return (
        <footer className="w-screen bg-gray-100 border-t mt-auto">
            <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">

                {/* Left */}
                <div className="text-black font-semibold">
                    © {new Date().getFullYear()} Track Tracker
                </div>

                {/* Middle */}
                <div className="flex gap-8 text-black">
                    <Link href="/" className="hover:underline">Home</Link>
                    <Link href="/about" className="hover:underline">About</Link>
                    <Link href="/contact" className="hover:underline">Contact</Link>
                </div>

                {/* Right (GitHub Icon) */}
                <div>
                    <Link
                        href="https://github.com/colinpmaloney/Track-Tracker-Frontend/"
                        target="_blank"
                    >
                        <Image
                            src={GithubLogo}
                            alt="GitHub"
                            width={128}
                            height={128}
                            className="hover:scale-110 transition-all duration-75"
                        />
                    </Link>
                </div>

            </div>
        </footer>
    )
}

export default { Footer };
