import type { CartProduct } from "../features/cart/cartSlicer";
import { decreaseQuantity, increaseQuantity } from "../features/cart/cartSlicer";
import { useAppDispatch } from "../app/hooks"

const CartItem = (item:CartProduct) => {
    const dispatch = useAppDispatch();
  return (
    <div className="flex bg-yellow-200 gap-2.5 flex-col m-2.5 p-4 w-1/5 rounded-2xl shadow-2xl items-center">
            <h2 className="text-2xl font-bold">
              {item.title}
            </h2>
            <p className="italic">${item.price}</p>
            <p>{item.quantity}</p>
            <div className="flex gap-1.5">
              <button onClick={()=>dispatch(increaseQuantity(item.id))} className="bg-emerald-600 text-white rounded-full p-3 shadow hover:bg-white hover:text-emerald-600 h-12.5 w-12.5">+</button>
              <button onClick={()=>dispatch(decreaseQuantity(item.id))} className="bg-amber-600 text-white rounded-full p-3 shadow hover:bg-white hover:text-amber-600 h-12.5 w-12.5">-</button>
          </div>
          </div>
  )
}

export default CartItem