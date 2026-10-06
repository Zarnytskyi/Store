import { useAppSelector, useAppDispatch } from "../app/hooks"
import { previousPage, nextPage } from "../features/product/productSlicer";

const Pagination = () => {

  const dispatch = useAppDispatch();

  const limit = useAppSelector(state=>state.product.limit);
  const skip = useAppSelector(state=>state.product.skip);
  const total = useAppSelector(state=>state.product.total);

  const pages = Math.ceil(total / limit);
  const currentPage = Math.floor(skip / limit) + 1 ;

  return (

    <div className="flex justify-around">
      <button disabled={skip === 0} onClick={()=>dispatch(previousPage())} className=" bg-gray-500 rounded-2xl py-3 px-6 transition-transform duration-300 hover:scale-125 hover:border hover:text-gray-500 hover:bg-white">
        Previous
      </button>

      <p>{currentPage}/{pages}</p>

      <button disabled={(skip + limit)>=total} onClick={()=>dispatch(nextPage())} className="bg-gray-500 rounded-2xl py-3 px-6 transition-transform duration-300 hover:scale-125 hover:border hover:text-gray-500 hover:bg-white">
        Next
      </button>
      </div>
  )
}

export default Pagination