import axios from "axios";
import { type Product, type ProductFilters } from "../features/product/productSlicer";

export interface ApiResponse {
    products: Product[];
    total:number;
    skip:number;
    limit:number;
}

export const fetchProducts = async ( limit:number, skip:number ):Promise<ApiResponse>=>{

    const response = await axios<ApiResponse>('https://dummyjson.com/products',{
        params:{limit,skip}
    })

    return response.data

}


export const searchProducts = async (  filter:ProductFilters, limit:number, skip:number ):Promise<ApiResponse>=>{

    const response = await axios<ApiResponse>('https://dummyjson.com/products/search',{
        params:{ q:filter.search,limit,skip}
    })

    return response.data

}
