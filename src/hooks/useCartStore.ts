import { WixClient } from "@/context/wixContext";
import { wixClientServer } from "@/lib/wixClientServer";
import { currentCart, cart } from "@wix/ecom";

import { create } from "zustand";

// Type Declaration
type CartState = {
  cart: currentCart.Cart;
  isLoading: boolean;
  counter: number;
  quantity: number;
  getCart: (wixClient: WixClient) => void;
  addItem: (
    wixClient: WixClient,
    productId: string,
    variantId: string,
    quantity: number
  ) => void;
  removeItem: (wixClient: WixClient, itemId: string) => void;
  deleteCart: (wixClient: WixClient, _id: string) => void;
  updateQuantity: (itemId: string, newQuantity: number) => void;
};

// Defining and creating store
export const useCartStore = create<CartState>((set) => ({
  cart: [],
  isLoading: true,
  counter: 0,
  quantity: 10,
  getCart: async (wixClient) => {
    try {
      const cart = await wixClient.currentCart.getCurrentCart();

      if (cart) {
        set({
          cart: cart || [],
          isLoading: false,
          counter: cart?.lineItems?.length || 0,
        });
      }
    } catch (error) {
      set((prev) => ({ ...prev, isLoading: false }));
      console.log(error);
    }
  },

  addItem: async (wixClient, productId, variantId, quantity) => {
    set((prev) => ({ ...prev, isLoading: true }));

    try {
      const response = await wixClient.currentCart.addToCurrentCart({
        lineItems: [
          {
            catalogReference: {
              appId: process.env.NEXT_PUBLIC_WIX_APP_ID!,
              catalogItemId: productId!,
              ...(variantId && { options: { variantId } }),
            },
            quantity: quantity,
          },
        ],
      });
      set({
        cart: response.cart,
        counter: response.cart?.lineItems.length,
        isLoading: false,
      });
    } catch (error) {
      console.log(error);
      //   set((prev) => ({ ...prev, isLoading: false }));
    }
  },

  removeItem: async (wixClient, itemId) => {
    set((prev) => ({ ...prev, isLoading: true }));

    try {
      const response =
        await wixClient.currentCart.removeLineItemsFromCurrentCart([itemId]);
      set({
        cart: response.cart,
        counter: response.cart?.lineItems.length,
        isLoading: false,
      });
    } catch (error) {
      console.log(error);
      //   set((prev) => ({ ...prev, isLoading: false }));
    }
  },

  deleteCart: async (wixClient, _id) => {
    try {
      await wixClient.cart.deleteCart(_id);

      set({
        cart: {},
        counter: 0,
        isLoading: false,
      });
    } catch (error) {
      console.log(error);
    }
  },

  updateQuantity: (itemId: string, newQuantity: number) => {
    set((state) => {
      const updatedLineItems = state?.cart?.lineItems?.map((item) => {
        if (item._id === itemId) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
      return {
        cart: { ...state.cart, lineItems: updatedLineItems },
      };
    });
  },
}));
