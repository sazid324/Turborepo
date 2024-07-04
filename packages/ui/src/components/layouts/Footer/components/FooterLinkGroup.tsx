import Link from "next/link";

interface ILink {
    href: string;
    text: string;
}

interface FooterLinkGroupProps {
    title: string;
    links: ILink[];
}

const FooterLinkGroup: React.FC<FooterLinkGroupProps> = ({ title, links }) => (
    <div>
        <h3 className="mb-2 text-base font-medium">{title}</h3>
        <div className="link-group flex flex-col gap-1 text-xs w-[80%]">
            {links.map((link, index) => (
                <Link
                    key={index}
                    className="text-gray-400 hover:text-orange-500"
                    href={link.href}
                >
                    {link.text}
                </Link>
            ))}
        </div>
    </div>
);

const FooterComponent: React.FC = () => {
    const otherLinks: ILink[] = [
        { href: "/", text: "About Us" },
        { href: "/", text: "Our Merchandise" },
        { href: "/", text: "Our Achievement" },
        { href: "/", text: "Career Placement" },
        { href: "/", text: "Customers Feedback" },
        { href: "/", text: "Contact" },
    ];

    const legalLinks: ILink[] = [
        { href: "/", text: "About Us" },
        { href: "/", text: "Our Merchandise" },
        { href: "/", text: "Our Achievement" },
        { href: "/", text: "Career Placement" },
        { href: "/", text: "Customers Feedback" },
        { href: "/", text: "Contact" },
    ];

    const quickLinks: ILink[] = [
        { href: "/", text: "About Bannizik" },
        { href: "/", text: "About Founder & CEO" },
        { href: "/", text: "Manufacturer" },
        { href: "/", text: "Our Gallery" },
        { href: "/", text: "Blog" },
        { href: "/", text: "Privacy Policy" },
        { href: "/", text: "Sitemap" },
    ];

    return (
        <div className="others-links-group space-y-6">
            <FooterLinkGroup title="Others" links={otherLinks} />
            <FooterLinkGroup title="Legal" links={legalLinks} />
            <FooterLinkGroup title="Quick Links" links={quickLinks} />
        </div>
    );
};

export default FooterComponent;
