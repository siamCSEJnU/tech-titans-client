import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id);
          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          } else {
            return { items: [...state.items, item] };
          }
        }),
      removeItem: (id) =>
        set((state) => {
          return {
            items: state.items
              .map((item) =>
                item.id === id ? { ...item, quantity: item.quantity - 1 } : item
              )
              .filter((item) => item.quantity > 0),
          };
        }),
      clearCart: () =>
        set(() => {
          return { items: [] };
        }),
    }),
    { name: "cart-storage" }
  )
);
//create is a function from the Zustand library that creates a new store. The store can hold state and actions that can be used to manage the state. In this case, we are creating a store for the shopping cart.
// The `useCartStore` is a custom hook that can be used in React components to access the cart store. It provides a way to read and update the cart items in the store.
// persist is a middleware that allows the store to persist its state in local storage or session storage. In this case, we are using local storage to store the cart items. The name "cart-storage" is used as the key for storing the data in local storage.
// This means that when the page is refreshed, the cart items will still be available in the store.
// The `persist` (gives access to the set) function takes two arguments: the first is the store definition (the function that creates the store), and the second is an options object where you can specify the storage method and other options.
// persist take set as an argument, which is a function that allows you to update the state of the store. In this case, we are using it to add items to the cart.
// The `addItem` function is an action that can be called to add an item to the cart. It takes an item as an argument and updates the state of the store accordingly. If the item already exists in the cart, it updates the quantity; otherwise, it adds a new item to the cart.
// The `set`(gives access to the state) function is used to update the state of the store. It takes a function as an argument, which receives the current state as an argument and returns the new state. In this case, we are using it to add items to the cart.
