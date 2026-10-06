import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks"
import { fetchProductsThunk, setFilter } from "./features/product/productSlicer";
import ProductCard from "./components/ProductCard";
import Pagination from "./components/Pagination";
import CartItem from "./components/CartItem";
import SearchBar from "./components/SearchBar";
import Loading from "./components/Loading";

function App() {

  const dispatch = useAppDispatch();
  const store = useAppSelector(state=>state.cart.items)
  const limit = useAppSelector(state=>state.product.limit)
  const skip = useAppSelector(state=>state.product.skip)
  const filters = useAppSelector(state=>state.product.filters)

  useEffect(()=>{
    dispatch(fetchProductsThunk({limit, skip, filters}))
  },[dispatch, skip, limit, filters])

  const products = useAppSelector(state => state.product.products)
  const loading = useAppSelector(state => state.product.loading)
  const error = useAppSelector(state => state.product.error)

    if (error) {
    return (
        <p className="text-xl font-bold">Произошла ошибка: {error}</p>
    );
  }

  return (
    <>
    <SearchBar onChange={(e)=>dispatch(setFilter({search: e}))} />
        <h1 className="text-4xl font-bold text-blue-500">
      Redux React Store
    </h1>
    <div className="flex">
      {loading
      ?<Loading/>
      :products.map(item=>(
        <ProductCard key={item.id} {...item} />
      ))}
         
    </div>
      <Pagination/>
      <div className="flex">
        {store.map(item=>(
          <CartItem key={item.id} {...item}/> 
        ))}
      </div>
    </>
  )
}

export default App
