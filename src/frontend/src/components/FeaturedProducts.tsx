import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "motion/react";
import { useAllProducts } from "../hooks/useQueries";
import { ProductCard } from "./ProductCard";

export function FeaturedProducts() {
  const { data: products, isLoading } = useAllProducts();

  const featured = products?.slice(0, 3) ?? [];

  return (
    <section id="featured" className="py-24 max-w-7xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground font-sans mb-3">
          Curated Picks
        </p>
        <h2 className="font-display text-4xl md:text-5xl text-foreground">
          Featured Pieces
        </h2>
      </motion.div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col gap-3">
              <Skeleton className="aspect-[4/5] w-full" />
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featured.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              index={i + 1}
              showFull
            />
          ))}
        </div>
      )}
    </section>
  );
}
