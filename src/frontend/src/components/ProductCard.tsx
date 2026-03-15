import { Loader2, ShoppingBag } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";
import type { Product } from "../backend.d";
import { useAddToCart } from "../hooks/useQueries";

interface ProductCardProps {
  product: Product;
  index: number;
  showFull?: boolean;
}

export function ProductCard({
  product,
  index,
  showFull = false,
}: ProductCardProps) {
  const addToCart = useAddToCart();

  const price = (Number(product.price) / 100).toFixed(2);

  const imgSrc =
    product.imageUrl ||
    `https://picsum.photos/seed/${encodeURIComponent(product.name)}/400/500`;

  const handleAdd = async () => {
    try {
      await addToCart.mutateAsync({
        productId: product.id,
        quantity: BigInt(1),
      });
      toast.success(`${product.name} added to cart`);
    } catch {
      toast.error("Failed to add to cart");
    }
  };

  return (
    <motion.article
      data-ocid={`product.item.${index}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.55,
        delay: (index - 1) * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group flex flex-col"
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-secondary aspect-[4/5]">
        <img
          src={imgSrc}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-300" />
        {/* Category badge */}
        <span className="absolute top-3 left-3 bg-background/90 text-foreground text-xs tracking-widest uppercase px-3 py-1 font-sans">
          {product.category}
        </span>
      </div>

      {/* Info */}
      <div className="pt-4 flex flex-col gap-2 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3
            className={`font-display text-foreground leading-snug ${
              showFull ? "text-lg" : "text-base"
            }`}
          >
            {product.name}
          </h3>
          <span className="font-sans text-sm font-semibold text-foreground whitespace-nowrap">
            ${price}
          </span>
        </div>

        <p className="text-muted-foreground font-sans text-sm leading-relaxed line-clamp-2 flex-1">
          {product.description}
        </p>

        <button
          type="button"
          data-ocid={`product.add_button.${index}`}
          onClick={handleAdd}
          disabled={addToCart.isPending}
          className="mt-3 flex items-center justify-center gap-2 w-full bg-foreground text-background font-sans text-xs tracking-widest uppercase py-3 px-4 hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {addToCart.isPending ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <ShoppingBag size={14} />
          )}
          Add to Cart
        </button>
      </div>
    </motion.article>
  );
}
