import { useSelector } from "react-redux"; 
import CartItem from "./CartItem"; 
import { FiShoppingBag } from "react-icons/fi"; 
import { Link } from "react-router-dom"; 
 
function CartList() { 
  const items = useSelector((state) => state.cart.items); 
 
  if (!items || items.length === 0) { 
    return ( 
      <div className="flex min-h-[420px] flex-col items-center justify-center px-4 text-center"> 
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-yellow-50 text-yellow-500 ring-1 ring-yellow-200 dark:bg-[#2a2500] dark:text-yellow-400 dark:ring-yellow-900/40"> 
          <FiShoppingBag size={38} /> 
        </div> 
 
        <h2 className="mb-2 text-2xl font-black text-gray-900 dark:text-white"> 
          Your cart is empty 
        </h2> 
 
        <p className="mb-7 max-w-sm text-sm leading-6 text-gray-500 dark:text-gray-400"> 
          Looks like you haven't added anything to your cart yet. 
          Let's find something you love. 
        </p> 
 
        <Link 
          to="/" 
          className="rounded-xl bg-[#ffd600] px-7 py-3.5 text-sm font-black text-black transition duration-300 hover:-translate-y-0.5 hover:bg-[#f5cc00] hover:shadow-lg hover:shadow-yellow-200" 
        > 
          Start Shopping 
        </Link> 
      </div> 
    ); 
  } 
 
  return ( 
    <div> 
      {/* Header */} 
      <div className="mb-5 flex items-center justify-between border-b border-gray-100 pb-5 dark:border-[#2a2a2a]"> 
        <div> 
          <h2 className="text-lg font-black text-gray-900 dark:text-white"> 
            Your Items 
          </h2> 
 
          <p className="mt-1 text-xs text-gray-400"> 
            {items.length} {items.length === 1 ? "item" : "items"} in your cart 
          </p> 
        </div> 
 
        <span className="rounded-full bg-green-50 px-3 py-1.5 text-[11px] font-bold text-green-600 dark:bg-green-950/30 dark:text-green-400"> 
          Ready to checkout 
        </span> 
      </div> 
 
      {/* Products */} 
      <div className="space-y-3"> 
        {items.map((item) => ( 
          <CartItem 
            key={item.id} 
            item={item} 
          /> 
        ))} 
      </div> 
    </div> 
  ); 
} 
 
export default CartList; 