import Image from "next/image";
import Link from "next/link";
import Logo from '../../public/Track-Tracker-Logo-Cropped.png'

interface PageLinkProps {
    href: string,
    displayText: string
}

const PageLink = ({ href, displayText }: PageLinkProps) => {
    return (
        <Link className="text-xl font-bold hover:scale-110 transition-all duration-75" href={href}>
            {displayText}
        </Link>
    )
}

export const Header = () => {
    return (
        <>
            <div className="w-screen px-18 py-4 bg-white">
                <div className="w-full flex items-center justify-between">

                    {/* Logo + Text */}
                    <div className="flex items-center gap-3">
                        <Link href="/" className="flex items-center gap-3">
                            <Image
                                className="hover:scale-110 transition-all duration-75"
                                src={Logo}
                                alt="Track Tracker Logo"
                                width={64}
                                height={64}
                            />
                            <span className="text-4xl font-extrabold text-black">
                                Track Tracker
                            </span>
                        </Link>
                    </div>

                    {/* Navigation */}
                    <div className="text-black flex gap-x-12">
                        <PageLink href="/" displayText="Home" />
                        <PageLink href="/about" displayText="About" />
                        <PageLink href="/contact" displayText="Contact" />
                    </div>

                </div>
            </div>
        </>
    )
}

export default { Header };