import { SiFacebook, SiInstagram, SiPinterest } from "react-icons/si";

interface FooterProps {
  onNavigate: (section: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const year = new Date().getFullYear();
  const hostname = window.location.hostname;

  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <p className="font-display text-2xl text-background mb-3">
              Danish Clothing
            </p>
            <p className="font-sans text-sm text-background/60 leading-relaxed">
              Timeless style rooted in Nordic craftsmanship and sustainable
              values.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="font-sans text-xs tracking-[0.2em] uppercase text-background/40 mb-4">
              Navigation
            </p>
            <ul className="space-y-2">
              {["home", "shop", "about"].map((s) => (
                <li key={s}>
                  <button
                    type="button"
                    data-ocid={`nav.${s}_link`}
                    onClick={() => onNavigate(s)}
                    className="font-sans text-sm text-background/70 hover:text-background transition-colors capitalize"
                  >
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <p className="font-sans text-xs tracking-[0.2em] uppercase text-background/40 mb-4">
              Follow Us
            </p>
            <div className="flex gap-4">
              {[
                {
                  Icon: SiInstagram,
                  label: "Instagram",
                  href: "https://instagram.com",
                },
                {
                  Icon: SiFacebook,
                  label: "Facebook",
                  href: "https://facebook.com",
                },
                {
                  Icon: SiPinterest,
                  label: "Pinterest",
                  href: "https://pinterest.com",
                },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 border border-background/20 flex items-center justify-center text-background/60 hover:text-background hover:border-background/60 transition-colors"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-background/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-background/40">
            &copy; {year} Danish Clothing. All rights reserved.
          </p>
          <p className="font-sans text-xs text-background/40">
            Built with ❤ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-background/70 transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
