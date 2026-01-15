import Link from "next/link";

export default function Morebutton({ href }: { href: string }) {
    return (
        <Link href={href}>
            <button className="btn">もっと見る→</button>
        </Link>
    )
}