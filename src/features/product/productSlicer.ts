import { createAsyncThunk, createSlice, type PayloadAction} from "@reduxjs/toolkit"
import { fetchProducts, searchProducts } from "../../api/productsApi";


export interface Product{
    id: number
    title: string
    price: number
    rating: number
    stock: number
};

export type ProductFilters = {
    search?: string
    category?: string
    minPrice?: number
    maxPrice?: number
    sortBy?: "title" | "price" | "rating" | "stock"
    order?: "asc" | "desc"
}

export type ProductState = {
    products: Product[],
    limit:number,
    skip: number,
    total:number,
    loading: boolean; 
    error: string | null;
    filters: ProductFilters

}
const initialState:ProductState ={
    products:[],
    limit:5,
    skip:0,
    total:0,
    loading: false,
    error: null,
    filters:{}
}

export const fetchProductsThunk = createAsyncThunk(
    'product/productsApi',
    async ({limit, skip, filters}:{ limit: number; skip: number; filters: ProductFilters })=>{

        if(!filters.search){
        const response = await fetchProducts( limit, skip )
        return response
        }else{
        const response = await searchProducts( filters, limit, skip )
        return response
        }
    }
)


export const productSlicer = createSlice({
    name: 'product',
    initialState,
    reducers:{
        nextPage(state){
            if((state.skip + state.limit) >= state.total){
                return
            }
                state.skip += state.limit
        },
        previousPage(state){
            console.log("previousPage:", state.skip)
            if(state.skip === 0){
                return 
            }
            state.skip -= state.limit
        },
        setFilter(state, action: PayloadAction<ProductFilters>){
            state.filters = {...state.filters, ...action.payload};
            state.skip = 0
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchProductsThunk.pending, (state)=>{
            state.loading = true;
            state.error = null
        })
        .addCase(fetchProductsThunk.fulfilled, (state, action)=>{
            state.loading = false;
            state.error = null;
            state.products = action.payload.products;
            state.limit = action.payload.limit;
            state.skip = action.payload.skip;
            state.total = action.payload.total;
        })
        .addCase(fetchProductsThunk.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.error.message || 'Something went wrong'
        });
    }
})

export const {previousPage, nextPage, setFilter} = productSlicer.actions

export default productSlicer.reducer;