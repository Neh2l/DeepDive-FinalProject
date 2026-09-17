import { useEffect, useState } from "react"; 
import { Link } from "react-router-dom"; 
import { 
  FiArrowRight, 
  FiCalendar, 
  FiChevronRight, 
  FiPackage, 
  FiShoppingBag, 
} from "react-icons/fi"; 
 
import { getMyOrders } from "../Apis/ordersApi"; 
 
function Orders() { 
  const [activeFilter, setActiveFilter] = useState("All"); 
  const [orders, setOrders] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(""); 
 
  useEffect(() => { 
    const fetchOrders = async () => { 
      try { 
        setLoading(true); 
        setError(""); 
 
        const data = await getMyOrders(); 
 
        console.log(" ORDERS FROM BACKEND:", data); 
        console.log(" FIRST ORDER:", data.orders?.[0]); 
 
        const ordersData = data.orders || data.data || []; 
 
        setOrders( 
          Array.isArray(ordersData) 
            ? ordersData 
            : [] 
        ); 
      } catch (error) { 
        console.error( 
          "Failed to fetch orders:", 
          error 
        ); 
 
        setError( 
          error.response?.data?.message || 
            "Failed to load your orders." 
        ); 
      } finally { 
        setLoading(false); 
      } 
    }; 
 
    fetchOrders(); 
  }, []); 
 
  const filters = [ 
    "All", 
    "Pending", 
    "Shipped", 
    "Delivered", 
    "Canceled", 
  ]; 
 
  const filteredOrders = 
    activeFilter === "All" 
      ? orders 
      : orders.filter( 
          (order) => 
            order.status === activeFilter 
        ); 
 
  return ( 
    <main className="min-h-screen bg-[#f7f7f7] text-gray-900 dark:bg-[#111111] dark:text-white"> 
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8"> 
 
        {/* Header */} 
 
        <div className="mb-8"> 
          <Link 
            to="/" 
            className="mb-5 inline-flex items-center gap-2 text-sm font-bold text-gray-500 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" 
          > 
            <FiArrowRight 
              size={16} 
              className="rotate-180" 
            /> 
 
            Continue shopping 
          </Link> 
 
          <div className="flex items-center gap-4"> 
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ffd600] text-black"> 
              <FiPackage size={22} /> 
            </div> 
 
            <div> 
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400"> 
                Shoply 
              </p> 
 
              <h1 className="text-3xl font-black tracking-tight sm:text-4xl dark:text-white"> 
                Your Orders 
              </h1> 
            </div> 
          </div> 
 
          <p className="mt-3 max-w-xl text-sm leading-6 text-gray-500 dark:text-gray-400"> 
            Track your purchases and view your order 
            history. 
          </p> 
        </div> 
 
        {/* Filters */} 
 
        <div className="mb-6 overflow-x-auto"> 
          <div className="flex min-w-max gap-2 rounded-2xl border border-gray-200 bg-white p-2 shadow-sm dark:border-[#2a2a2a] dark:bg-[#1a1a1a]"> 
            {filters.map((filter) => ( 
              <button 
                key={filter} 
                type="button" 
                onClick={() => 
                  setActiveFilter(filter) 
                } 
                className={`rounded-xl px-5 py-2.5 text-xs font-bold transition ${ 
                  activeFilter === filter 
                    ? "bg-gray-900 text-white shadow-sm dark:bg-white dark:text-black" 
                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-[#222] dark:hover:text-white" 
                }`} 
              > 
                {filter} 
              </button> 
            ))} 
          </div> 
        </div> 
 
        {/* Loading */} 
 
        {loading ? ( 
          <div className="rounded-3xl border border-gray-200 bg-white px-6 py-16 text-center dark:border-[#2a2a2a] dark:bg-[#1a1a1a]"> 
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-gray-900 dark:border-[#2a2a2a] dark:border-t-white" /> 
 
            <p className="mt-4 text-sm font-bold text-gray-500 dark:text-gray-400"> 
              Loading your orders... 
            </p> 
          </div> 
        ) : error ? ( 
          /* Error */ 
 
          <div className="rounded-3xl border border-red-200 bg-red-50 px-6 py-12 text-center dark:border-red-900/40 dark:bg-red-950/20"> 
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 text-red-500 dark:bg-red-950/40 dark:text-red-400"> 
              <FiPackage size={27} /> 
            </div> 
 
            <h2 className="mt-5 text-xl font-black text-red-700 dark:text-red-400"> 
              Something went wrong 
            </h2> 
 
            <p className="mt-2 text-sm text-red-600 dark:text-red-400"> 
              {error} 
            </p> 
          </div> 
        ) : filteredOrders.length > 0 ? ( 
          /* Orders */ 
 
          <div className="space-y-5"> 
            {filteredOrders.map((order) => ( 
              <OrderCard 
                key={order._id} 
                order={order} 
              /> 
            ))} 
          </div> 
        ) : ( 
          /* Empty */ 
 
          <div className="rounded-3xl border border-gray-200 bg-white px-6 py-16 text-center dark:border-[#2a2a2a] dark:bg-[#1a1a1a]"> 
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 text-gray-400 dark:bg-[#222] dark:text-gray-500"> 
              <FiShoppingBag size={27} /> 
            </div> 
 
            <h2 className="mt-5 text-xl font-black dark:text-white"> 
              No orders found 
            </h2> 
 
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400"> 
              You don't have any{" "} 
              {activeFilter.toLowerCase()} orders. 
            </p> 
 
            <Link 
              to="/products" 
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#ffd600] px-5 py-3 text-sm font-black text-black transition hover:bg-[#f5cc00]" 
            > 
              Start Shopping 
 
              <FiArrowRight size={16} /> 
            </Link> 
          </div> 
        )} 
      </div> 
    </main> 
  ); 
} 
 
function OrderCard({ order }) { 
  const date = new Date( 
    order.createdAt 
  ).toLocaleDateString("en-US", { 
    year: "numeric", 
    month: "short", 
    day: "numeric", 
  }); 
 
  const statusStyle = { 
    Pending: 
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-950/30 dark:text-yellow-400", 
 
    Shipped: 
      "bg-blue-100 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400", 
 
    Delivered: 
      "bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-400", 
 
    Canceled: 
      "bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-400", 
  }; 
 
  const firstItems = ( 
    order.items || [] 
  ).slice(0, 3); 
 
  const totalItems = ( 
    order.items || [] 
  ).reduce( 
    (total, item) => 
      total + item.quantity, 
    0 
  ); 
 
  return ( 
    <article className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:border-[#2a2a2a] dark:bg-[#1a1a1a]"> 
 
      {/* Top */} 
 
      <div className="flex flex-col gap-4 border-b border-gray-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6 dark:border-[#2a2a2a]"> 
        <div> 
          <div className="flex items-center gap-2"> 
            <span className="text-xs font-black uppercase tracking-wider text-gray-400"> 
              Order 
            </span> 
 
            <span className="text-sm font-black text-gray-900 dark:text-white"> 
              #{order._id} 
            </span> 
          </div> 
 
          <div className="mt-2 flex items-center gap-2 text-xs text-gray-400"> 
            <FiCalendar size={13} /> 
 
            {date} 
          </div> 
        </div> 
 
        <span 
          className={`w-fit rounded-full px-3 py-1.5 text-[10px] font-black uppercase tracking-wider ${ 
            statusStyle[order.status] || 
            "bg-gray-100 text-gray-600 dark:bg-[#222] dark:text-gray-400" 
          }`} 
        > 
          {order.status} 
        </span> 
      </div> 
 
      {/* Products */} 
 
      <div className="p-5 sm:p-6"> 
        <div className="flex flex-wrap gap-3"> 
          {firstItems.map((item, index) => { 
            const productImage = 
              item.product?.thumbnail || 
              item.product?.image || 
              item.product?.images?.[0]; 
 
            const productName = 
              item.product?.title || 
              item.product?.name || 
              "Product"; 
 
            return ( 
              <div 
                key={`${order._id}-${index}`} 
                className="relative h-20 w-20 overflow-hidden rounded-2xl bg-gray-100 dark:bg-[#222]" 
              > 
                {productImage ? ( 
                  <img 
                    src={productImage} 
                    alt={productName} 
                    className="h-full w-full object-contain" 
                  /> 
                ) : ( 
                  <div className="flex h-full w-full items-center justify-center text-gray-300 dark:text-gray-600"> 
                    <FiPackage size={22} /> 
                  </div> 
                )} 
              </div> 
            ); 
          })} 
 
          {order.items?.length > 3 && ( 
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gray-100 text-xs font-black text-gray-500 dark:bg-[#222] dark:text-gray-400"> 
              +{order.items.length - 3} 
            </div> 
          )} 
        </div> 
 
 
        <div className="mt-6 grid gap-5 border-t border-gray-100 pt-5 sm:grid-cols-3 dark:border-[#2a2a2a]"> 
 
          <div> 
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400"> 
              Items 
            </p> 
 
            <p className="mt-1 text-sm font-black dark:text-white"> 
              {totalItems}{" "} 
              {totalItems === 1 
                ? "item" 
                : "items"} 
            </p> 
          </div> 
 
          <div> 
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400"> 
              Payment 
            </p> 
 
            <p className="mt-1 text-sm font-black dark:text-white"> 
              {order.paymentMethod === "COD" 
                ? "Cash on Delivery" 
                : order.paymentMethod || "N/A"} 
            </p> 
          </div> 
 
          <div> 
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400"> 
              Total 
            </p> 
 
            <p className="mt-1 text-lg font-black dark:text-white"> 
              $ 
              {Number(order.total).toFixed(2)} 
            </p> 
          </div> 
 
        </div> 
 
 
        <Link 
          to={`/orders/${order._id}`} 
          className="group mt-6 flex items-center justify-center gap-2 rounded-2xl border border-gray-200 py-3.5 text-sm font-black text-gray-800 transition hover:border-gray-900 hover:bg-gray-900 hover:text-white dark:border-[#2a2a2a] dark:text-gray-200 dark:hover:border-white dark:hover:bg-white dark:hover:text-black" 
        > 
          View Order 
 
          <FiChevronRight 
            size={17} 
            className="transition-transform group-hover:translate-x-1" 
          /> 
        </Link> 
      </div> 
    </article> 
  ); 
} 
 
export default Orders;