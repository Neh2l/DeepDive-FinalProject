import { useState } from "react"; 
 
import { 
  FiHeart, 
  FiShoppingCart, 
  FiMinus, 
  FiPlus, 
  FiStar, 
  FiTruck, 
  FiShield, 
  FiRefreshCw, 
  FiCheck, 
} from "react-icons/fi"; 
 
import { useDispatch, useSelector } from "react-redux"; 
 
import { addToCart } from "../../redux/cartSlice"; 
import { toggleWishlist } from "../../redux/wishlistSlice"; 
 
import LoginRequiredModal from "../LoginRequiredModal"; 
 
function ProductDetails({ product }) { 
  const dispatch = useDispatch(); 
 
  const [quantity, setQuantity] = useState(1); 
 
  const [showLoginModal, setShowLoginModal] = useState(false); 
 
  const [loginAction, setLoginAction] = useState("cart"); 
 
  const isLoggedIn = useSelector( 
    (state) => state.auth.isLoggedIn 
  ); 
 
  const wishlistItems = useSelector( 
    (state) => state.wishlist.items 
  ); 
 
  const isWishlisted = wishlistItems.some( 
    (item) => item._id === product._id 
  ); 
 
  // ================= DISCOUNT ================= 
 
  const discount = Math.round( 
    product.discountPercentage || 0 
  ); 
 
  const oldPrice = 
    discount > 0 
      ? product.price / (1 - discount / 100) 
      : null; 
 
  // ================= LOGIN MODAL ================= 
 
  const openLoginModal = (action) => { 
    setLoginAction(action); 
    setShowLoginModal(true); 
  }; 
 
  // ================= QUANTITY ================= 
 
  const handleIncrease = () => { 
    setQuantity((prev) => 
      prev < product.stock ? prev + 1 : prev 
    ); 
  }; 
 
  const handleDecrease = () => { 
    setQuantity((prev) => 
      prev > 1 ? prev - 1 : 1 
    ); 
  }; 
 
  // ================= ADD TO CART ================= 
 
  const handleAddToCart = () => { 
    if (!isLoggedIn) { 
      openLoginModal("cart"); 
      return; 
    } 
 
    for (let i = 0; i < quantity; i += 1) { 
      dispatch( 
        addToCart({ 
          ...product, 
          quantity: 1, 
        }) 
      ); 
    } 
  }; 
 
  // ================= WISHLIST ================= 
 
  const handleWishlist = () => { 
    if (!isLoggedIn) { 
      openLoginModal("wishlist"); 
      return; 
    } 
 
    dispatch(toggleWishlist(product)); 
  }; 
 
  return ( 
    <> 
      <div className="flex flex-col"> 
 
        {/* CATEGORY */} 
 
        <span className="text-xs font-black uppercase tracking-[0.18em] text-yellow-600"> 
          {product.category} 
        </span> 
 
        {/* TITLE */} 
 
        <h1 className="mt-3 text-3xl font-black leading-tight text-gray-950 dark:text-white sm:text-4xl"> 
          {product.title} 
        </h1> 
 
        {/* RATING */} 
 
        <div className="mt-4 flex flex-wrap items-center gap-3"> 
 
          <div className="flex items-center gap-1 rounded-lg bg-yellow-50 px-3 py-2 dark:bg-[#2a2500]"> 
 
            <FiStar 
              size={16} 
              className="fill-yellow-400 text-yellow-400" 
            /> 
 
            <span className="text-sm font-black dark:text-white"> 
              {product.rating || "4.5"} 
            </span> 
 
          </div> 
 
          <span className="text-sm text-gray-400"> 
            Excellent rating 
          </span> 
 
          <span className="h-1 w-1 rounded-full bg-gray-300 dark:bg-gray-600" /> 
 
          <span 
            className={`text-sm font-semibold ${ 
              product.stock > 0 
                ? "text-green-600" 
                : "text-red-500" 
            }`} 
          > 
            {product.stock > 0 
              ? "In Stock" 
              : "Out of Stock"} 
          </span> 
 
        </div> 
 
        {/* DESCRIPTION */} 
 
        <p className="mt-6 text-sm leading-7 text-gray-500 dark:text-gray-400 sm:text-base"> 
          {product.description} 
        </p> 
 
        {/* PRICE */} 
 
        <div className="mt-7 flex flex-wrap items-end gap-3"> 
 
          <span className="text-3xl font-black text-gray-950 dark:text-white"> 
            ${Number(product.price).toFixed(2)} 
          </span> 
 
          {oldPrice && ( 
            <> 
              <span className="text-base text-gray-400 line-through"> 
                ${oldPrice.toFixed(2)} 
              </span> 
 
              <span className="rounded-md bg-red-50 px-2.5 py-1 text-xs font-black text-red-500 dark:bg-red-950/30 dark:text-red-400"> 
                {discount}% OFF 
              </span> 
            </> 
          )} 
 
        </div> 
 
        <div className="my-7 border-t border-gray-100 dark:border-[#2a2a2a]" /> 
 
        {/* QUANTITY */} 
 
        <div> 
 
          <p className="mb-3 text-sm font-black text-gray-900 dark:text-white"> 
            Quantity 
          </p> 
 
          <div className="flex w-fit items-center overflow-hidden rounded-xl border border-gray-200 dark:border-[#2a2a2a]"> 
 
            <button 
              type="button" 
              onClick={handleDecrease} 
              className="flex h-12 w-12 items-center justify-center text-gray-600 transition hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-[#222]" 
            > 
              <FiMinus size={16} /> 
            </button> 
 
            <span className="flex h-12 min-w-14 items-center justify-center border-x border-gray-200 text-sm font-black dark:border-[#2a2a2a] dark:text-white"> 
              {quantity} 
            </span> 
 
            <button 
              type="button" 
              onClick={handleIncrease} 
              disabled={product.stock <= 0} 
              className="flex h-12 w-12 items-center justify-center text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 dark:text-gray-300 dark:hover:bg-[#222]" 
            > 
              <FiPlus size={16} /> 
            </button> 
 
          </div> 
 
        </div> 
 
        {/* ACTION BUTTONS */} 
 
        <div className="mt-6 flex flex-col gap-3 sm:flex-row"> 
 
          <button 
            type="button" 
            onClick={handleAddToCart} 
            disabled={product.stock <= 0} 
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-yellow-400 px-6 py-4 text-sm font-black text-gray-950 transition-all duration-300 hover:-translate-y-0.5 hover:bg-yellow-300 hover:shadow-lg disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400 disabled:hover:translate-y-0 disabled:hover:shadow-none" 
          > 
            <FiShoppingCart size={19} /> 
 
            {product.stock > 0 
              ? "Add to cart" 
              : "Out of stock"} 
          </button> 
 
          <button 
            type="button" 
            onClick={handleWishlist} 
            className={`flex items-center justify-center gap-2 rounded-xl border px-6 py-4 text-sm font-bold transition-all duration-300 ${ 
              isWishlisted 
                ? "border-red-200 bg-red-50 text-red-500 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-400" 
                : "border-gray-200 bg-white text-gray-800 hover:border-red-200 hover:bg-red-50 hover:text-red-500 dark:border-[#2a2a2a] dark:bg-[#1a1a1a] dark:text-gray-200 dark:hover:border-red-900/40 dark:hover:bg-red-950/30 dark:hover:text-red-400" 
            }`} 
          > 
 
            <FiHeart 
              size={19} 
              className={ 
                isWishlisted 
                  ? "fill-current" 
                  : "" 
              } 
            /> 
 
            {isWishlisted 
              ? "Saved" 
              : "Wishlist"} 
 
          </button> 
 
        </div> 
 
        {/* FEATURES */} 
 
        <div className="mt-8 grid gap-3 sm:grid-cols-3"> 
 
          <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 dark:border-[#2a2a2a] dark:bg-[#1a1a1a]"> 
 
            <FiTruck 
              className="text-green-600" 
              size={20} 
            /> 
 
            <p className="mt-3 text-xs font-black dark:text-white"> 
              Free Delivery 
            </p> 
 
            <p className="mt-1 text-[10px] leading-4 text-gray-500 dark:text-gray-400"> 
              Fast delivery to your door 
            </p> 
 
          </div> 
 
          <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 dark:border-[#2a2a2a] dark:bg-[#1a1a1a]"> 
 
            <FiShield 
              className="text-blue-600" 
              size={20} 
            /> 
 
            <p className="mt-3 text-xs font-black dark:text-white"> 
              Secure Payment 
            </p> 
 
            <p className="mt-1 text-[10px] leading-4 text-gray-500 dark:text-gray-400"> 
              Your payment is protected 
            </p> 
 
          </div> 
 
          <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 dark:border-[#2a2a2a] dark:bg-[#1a1a1a]"> 
 
            <FiRefreshCw 
              className="text-purple-600" 
              size={20} 
            /> 
 
            <p className="mt-3 text-xs font-black dark:text-white"> 
              Easy Returns 
            </p> 
 
            <p className="mt-1 text-[10px] leading-4 text-gray-500 dark:text-gray-400"> 
              Simple return process 
            </p> 
 
          </div> 
 
        </div> 
 
        {/* PRODUCT INFO */} 
 
        <div className="mt-7 rounded-2xl border border-gray-100 bg-white dark:border-[#2a2a2a] dark:bg-[#1a1a1a]"> 
 
          <div className="grid grid-cols-2 divide-x divide-gray-100 dark:divide-[#2a2a2a]"> 
 
            <div className="p-4"> 
 
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400"> 
                Brand 
              </p> 
 
              <p className="mt-1 text-sm font-bold text-gray-900 dark:text-white"> 
                {product.brand || "Shoply"} 
              </p> 
 
            </div> 
 
            <div className="p-4"> 
 
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400"> 
                Availability 
              </p> 
 
              <p 
                className={`mt-1 flex items-center gap-1 text-sm font-bold ${ 
                  product.stock > 0 
                    ? "text-green-600" 
                    : "text-red-500" 
                }`} 
              > 
 
                <FiCheck size={14} /> 
 
                {product.stock > 0 
                  ? `${product.stock} Available` 
                  : "Out of Stock"} 
 
              </p> 
 
            </div> 
 
          </div> 
 
        </div> 
 
      </div> 
 
      {/* LOGIN REQUIRED MODAL */} 
 
      <LoginRequiredModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
        action={loginAction} 
      /> 
 
    </> 
  ); 
} 
 
export default ProductDetails;