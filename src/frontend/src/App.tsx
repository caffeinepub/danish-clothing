import { Toaster } from "@/components/ui/sonner";
import { AboutSection } from "./components/AboutSection";
import { CartDrawer } from "./components/CartDrawer";
import { ContactSection } from "./components/ContactSection";
import { FeaturedProducts } from "./components/FeaturedProducts";
import { Footer } from "./components/Footer";
import { HeroSection } from "./components/HeroSection";
import { Navbar } from "./components/Navbar";
import { ProductCatalog } from "./components/ProductCatalog";
import { CartProvider } from "./context/CartContext";

function AppContent() {
  const scrollToSection = (section: string) => {
    const el = document.getElementById(section);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar activeSection="home" onNavigate={scrollToSection} />

      <main>
        <HeroSection onShopNow={() => scrollToSection("shop")} />
        <FeaturedProducts />
        <ProductCatalog />
        <AboutSection />
        <ContactSection />
      </main>

      <Footer onNavigate={scrollToSection} />
      <CartDrawer />
      <Toaster />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
