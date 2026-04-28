import Image from "next/image";
import Link from "next/link";
import Logo from '../../public/Track-Tracker-Logo-Cropped.png'

interface PageLinkProps {
    href: string,
    displayText: string
}

const PageLink = ({ href, displayText }: PageLinkProps) => {
    return (
        <Link className="text-xl font-bold hover:scale-110 transition-all duration-75" href={href}>{displayText}</Link>
    )
}

export const Header = () => {
    return (
        <>
            <div className="w-screen px-18 py-4 bg-white dark:bg-zinc-900 border-b border-gray-100 dark:border-zinc-800">
                <div className="w-full flex items-center">
                    <div className="w-screen">
                        <Link href="/" className="flex items-center gap-3">
                            <Image className="hover:scale-110 transition-all duration-75" src={Logo} alt="Track Tracker Logo" width={64} height={64} />
                            <span className="text-xl font-bold text-black dark:text-white hover:scale-110 transition-all duration-75">Track Tracker</span>
                        </Link>
                    </div>
                    <div className="w-fit text-black dark:text-white flex gap-x-12">
                        <PageLink href="/" displayText="Home" />
                        <PageLink href="/charts" displayText="Charts" />
                        <PageLink href="/about" displayText="About" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default { Header };