import { Menu, ShoppingBag, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useCart as useCartQuery } from "../hooks/useQueries";

interface NavbarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

export function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const { openCart } = useCart();
  const { data: cartItems = [] } = useCartQuery();
  const [mobileOpen, setMobileOpen] = useState(false);

  const cartCount = cartItems.reduce(
    (sum, item) => sum + Number(item.quantity),
    0,
  );

  const links = [
    { id: "home", label: "Home" },
    { id: "shop", label: "Shop" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          type="button"
          onClick={() => onNavigate("home")}
          className="font-display text-xl font-bold tracking-widest uppercase text-foreground hover:opacity-75 transition-opacity"
        >
          Danish Clothing
        </button>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <li key={link.id}>
              <button
                type="button"
                data-ocid={`nav.${link.id}_link`}
                onClick={() => onNavigate(link.id)}
                className={`text-sm tracking-widest uppercase transition-colors font-sans ${
                  activeSection === link.id
                    ? "text-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            data-ocid="nav.cart_button"
            onClick={openCart}
            className="relative p-2 text-foreground hover:opacity-75 transition-opacity"
            aria-label="Open cart"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-0.5 -right-0.5 bg-foreground text-background text-xs rounded-full w-4 h-4 flex items-center justify-center font-sans font-semibold"
              >
                {cartCount}
              </motion.span>
            )}
          </button>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="md:hidden p-1 text-foreground"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-background border-b border-border"
          >
            <ul className="px-6 py-4 flex flex-col gap-4">
              {links.map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    data-ocid={`nav.${link.id}_link`}
                    onClick={() => {
                      onNavigate(link.id);
                      setMobileOpen(false);
                    }}
                    className="text-sm tracking-widest uppercase text-foreground font-sans w-full text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
