import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Product {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    category: string;
    price: bigint;
}
export interface CartItem {
    productId: string;
    quantity: bigint;
}
export interface backendInterface {
    addToCart(productId: string, quantity: bigint): Promise<void>;
    clearCart(): Promise<void>;
    getAllCarts(): Promise<Array<[Principal, Array<CartItem>]>>;
    getAllProducts(): Promise<Array<Product>>;
    getCart(): Promise<Array<CartItem>>;
    getCartTotal(): Promise<bigint>;
    getProductById(id: string): Promise<Product>;
    getProductsByCategory(category: string): Promise<Array<Product>>;
    initProducts(): Promise<void>;
    removeFromCart(productId: string): Promise<void>;
}
