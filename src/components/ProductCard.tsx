import type { Product } from "../features/product/productSlicer"
import { addToCart } from "../features/cart/cartSlicer"
import { useAppDispatch } from "../app/hooks"

const ProductCard = (product:Product) => {
    const dispatch = useAppDispatch()
  return (
    <div className="flex text-center bg-sky-300 gap-2.5 flex-col m-2.5 p-4 w-1/5 rounded-2xl shadow-2xl items-center" key={product.id}>
        <h2 className=" flex-1 text-2xl font-bold">
              {product.title}
            </h2>
            <p className="flex-1">
              {product.id}
            </p>
            <button onClick={()=>dispatch(addToCart({...product, quantity:1}))} className=" flex-1 bg-emerald-600 text-white rounded-2xl p-2 shadow hover:bg-white hover:text-emerald-600 w-1/2">
              Add to cart
            </button>
    </div>
  )
}

export default ProductCard