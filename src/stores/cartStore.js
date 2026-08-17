import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useCartStore = create(
    persist(
        (set, get) => ({
            items: [],
            addItem: (product) => {
                const currentItems = get().items;
                const existingItem = currentItems.find((item) => item.id === product.id);

                if (existingItem) {
                set({
                    items: currentItems.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                    ),
                });
                } else {
                set({ items: [...currentItems, { ...product, quantity: 1 }] });
                }
            },

            removeItem: (productId) => {
                set({
                    items: get().items.filter((item) => item.id !== productId),
                });
            },

            increaseQuantity: (productId) => {
                set({
                    items: get().items.map((item) =>
                    item.id === productId
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
                    ),
                });
            },

            decreaseQuantity: (productId) => {
                const currentItems = get().items;
                const existingItem = currentItems.find((item) => item.id === productId);

                if (existingItem?.quantity === 1) {
                    get().removeItem(productId);
                } else {
                    set({
                        items: currentItems.map((item) =>
                            item.id === productId
                                ? { ...item, quantity: item.quantity - 1 }
                                : item
                        ),
                    });
                }
            },

            clearCart: () => {
                set({ items: [] });
            }

        }),
        {
            name: 'cart-storage', // unique name
        }
    )
);