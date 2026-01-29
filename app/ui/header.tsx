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
            <div className="w-screen px-18 py-4 bg-white">
                <div className="w-full flex items-center">
                    <div className="w-screen text-3xl">
                        <Link href="/">
                            <Image className="hover:scale-110 transition-all duration-75" src={Logo} alt="Track Tracker Logo" width={64} height={64} />
                        </Link>
                    </div>
                    <div className="w-fit text-black flex gap-x-12">
                        <PageLink href="/" displayText="Home" />
                        <PageLink href="About" displayText="About" />
                        <PageLink href="Contact" displayText="Contact" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default { Header };