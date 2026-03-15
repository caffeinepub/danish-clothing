import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "motion/react";
import { useState } from "react";
import { useProductsByCategory } from "../hooks/useQueries";
import { ProductCard } from "./ProductCard";

const CATEGORIES = ["All", "Men", "Women", "Accessories"];

export function ProductCatalog() {
  const [activeCategory, setActiveCategory] = useState("All");
  const { data: products, isLoading } = useProductsByCategory(activeCategory);

  return (
    <section id="shop" className="py-24 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground font-sans mb-3">
            The Collection
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-foreground">
            Shop All
          </h2>
        </motion.div>

        {/* Category tabs */}
        <div className="flex items-center justify-center gap-2 mb-12 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              data-ocid="catalog.tab"
              onClick={() => setActiveCategory(cat)}
              className={`font-sans text-xs tracking-widest uppercase px-6 py-2.5 border transition-colors ${
                activeCategory === cat
                  ? "bg-foreground text-background border-foreground"
                  : "bg-transparent text-muted-foreground border-border hover:border-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex flex-col gap-3">
                <Skeleton className="aspect-[4/5] w-full" />
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>
        ) : products && products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i + 1} />
            ))}
          </div>
        ) : (
          <div
            data-ocid="product.empty_state"
            className="text-center py-24 text-muted-foreground font-sans"
          >
            <p className="text-lg">No products found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
}
