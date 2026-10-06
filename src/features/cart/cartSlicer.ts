import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface CartProduct{
    id:number,
    title:string,
    price:number,
    quantity:number
}

type CartProductState = {
    items: CartProduct[]
}

const initialState:CartProductState = {
    items: []
}

const cartSlicer = createSlice({
    name: "cart",
    initialState,
    reducers:{
        addToCart(state, action:PayloadAction<CartProduct> ){
            const exist = state.items.find(item=>item.id === action.payload.id)

            if(exist){
                //  state.items = state.items.map(item=>item.id === action.payload.id
                //     ?{...item, quantity: item.quantity+1}
                //     :item
                // )
                exist.quantity += 1
            }else{
                state.items.push(action.payload)
            }
        },
        removeFromCart(state, action:PayloadAction<number>){
           state.items = state.items.filter(item=>item.id !== action.payload)
        },
        increaseQuantity(state, action:PayloadAction<number>){
            state.items = state.items.map(item=>item.id === action.payload
                    ?{...item, quantity: item.quantity+1}
                    :item
            )
        },
        decreaseQuantity(state, action:PayloadAction<number>){
            
            const exist = state.items.find(item=>item.id === action.payload)

            if(exist?.quantity === 1){
                state.items = state.items.filter(item=>item.id !== action.payload)
            }else{
                state.items = state.items.map(item=>item.id === action.payload
                    ?{...item, quantity: item.quantity-1}
                    :item
            )
            }
        }
    }
})

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } = cartSlicer.actions
export default cartSlicer.reducer