import { configureStore, } from "@reduxjs/toolkit";
import cartSlicer from "../features/cart/cartSlicer";
import productSlicer from "../features/product/productSlicer";

export const store = configureStore({
    reducer:{
        cart:cartSlicer,

        product:productSlicer,
        
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch