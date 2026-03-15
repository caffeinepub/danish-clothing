import { Loader2, ShoppingBag, Trash2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { toast } from "sonner";
import { useCart as useCartContext } from "../context/CartContext";
import {
  useAllProducts,
  useCart,
  useCartTotal,
  useClearCart,
  useRemoveFromCart,
} from "../hooks/useQueries";

export function CartDrawer() {
  const { isCartOpen, closeCart } = useCartContext();
  const { data: cartItems = [] } = useCart();
  const { data: products = [] } = useAllProducts();
  const { data: cartTotal = BigInt(0) } = useCartTotal();
  const removeFromCart = useRemoveFromCart();
  const clearCart = useClearCart();

  const getProduct = (productId: string) =>
    products.find((p) => p.id === productId);

  const totalDisplay = (Number(cartTotal) / 100).toFixed(2);

  const handleRemove = async (productId: string, name: string) => {
    try {
      await removeFromCart.mutateAsync(productId);
      toast.success(`${name} removed`);
    } catch {
      toast.error("Failed to remove item");
    }
  };

  const handleClear = async () => {
    try {
      await clearCart.mutateAsync();
      toast.success("Cart cleared");
    } catch {
      toast.error("Failed to clear cart");
    }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm"
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.aside
            data-ocid="cart.panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-background shadow-elevated flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border">
              <h2 className="font-display text-xl text-foreground">
                Your Cart
              </h2>
              <button
                type="button"
                data-ocid="cart.close_button"
                onClick={closeCart}
                className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close cart"
              >
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto py-4">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-muted-foreground">
                  <ShoppingBag size={48} strokeWidth={1} />
                  <p className="font-sans text-sm">Your cart is empty</p>
                </div>
              ) : (
                <ul className="px-6 space-y-6">
                  {cartItems.map((item, i) => {
                    const product = getProduct(item.productId);
                    if (!product) return null;
                    const itemTotal = (
                      (Number(product.price) * Number(item.quantity)) /
                      100
                    ).toFixed(2);
                    return (
                      <motion.li
                        key={item.productId}
                        data-ocid={`cart.item.${i + 1}`}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex gap-4"
                      >
                        <img
                          src={
                            product.imageUrl ||
                            `https://picsum.photos/seed/${encodeURIComponent(product.name)}/80/100`
                          }
                          alt={product.name}
                          className="w-16 h-20 object-cover bg-secondary shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-display text-foreground text-sm truncate">
                            {product.name}
                          </h4>
                          <p className="font-sans text-xs text-muted-foreground mt-0.5">
                            Qty: {Number(item.quantity)} &times; $
                            {(Number(product.price) / 100).toFixed(2)}
                          </p>
                          <p className="font-sans text-sm font-semibold text-foreground mt-1">
                            ${itemTotal}
                          </p>
                        </div>
                        <button
                          type="button"
                          data-ocid={`cart.delete_button.${i + 1}`}
                          onClick={() =>
                            handleRemove(item.productId, product.name)
                          }
                          disabled={removeFromCart.isPending}
                          className="self-start p-1 text-muted-foreground hover:text-destructive transition-colors disabled:opacity-40"
                          aria-label="Remove item"
                        >
                          {removeFromCart.isPending ? (
                            <Loader2 size={15} className="animate-spin" />
                          ) : (
                            <Trash2 size={15} />
                          )}
                        </button>
                      </motion.li>
                    );
                  })}
                </ul>
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="border-t border-border px-6 py-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-sans text-sm text-muted-foreground tracking-wide uppercase text-xs">
                    Total
                  </span>
                  <span className="font-display text-xl text-foreground">
                    ${totalDisplay}
                  </span>
                </div>

                <button
                  type="button"
                  className="w-full bg-foreground text-background font-sans text-xs tracking-widest uppercase py-4 hover:bg-primary/90 transition-colors"
                >
                  Checkout
                </button>

                <button
                  type="button"
                  data-ocid="cart.clear_button"
                  onClick={handleClear}
                  disabled={clearCart.isPending}
                  className="w-full border border-border text-muted-foreground font-sans text-xs tracking-widest uppercase py-3 hover:border-foreground hover:text-foreground transition-colors disabled:opacity-40 flex items-center justify-center gap-2"
                >
                  {clearCart.isPending && (
                    <Loader2 size={13} className="animate-spin" />
                  )}
                  Clear Cart
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
