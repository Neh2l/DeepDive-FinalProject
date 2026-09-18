// import {
//   FiArrowRight,
//   FiChevronRight,
//   FiSmartphone,
//   FiMonitor,
//   FiWatch,
//   FiShoppingBag,
//   FiHeart,
//   FiHome,
//   FiCamera,
//   FiHeadphones,
// } from "react-icons/fi";

// import { Link } from "react-router-dom";

// function Categories() {
//   const categories = [
//     {
//       name: "Mobiles",
//       slug: "smartphones",
//       icon: <FiSmartphone />,
//       color: "bg-blue-50 text-blue-600",
//     },
//     {
//       name: "Laptops",
//       slug: "laptops",
//       icon: <FiMonitor />,
//       color: "bg-purple-50 text-purple-600",
//     },
//     {
//       name: "Watches",
//       slug: "mens-watches",
//       icon: <FiWatch />,
//       color: "bg-orange-50 text-orange-600",
//     },
//     {
//       name: "Fashion",
//       slug: "mens-shirts",
//       icon: <FiShoppingBag />,
//       color: "bg-pink-50 text-pink-600",
//     },
//     {
//       name: "Beauty",
//       slug: "beauty",
//       icon: <FiHeart />,
//       color: "bg-rose-50 text-rose-600",
//     },
//     {
//       name: "Home",
//       slug: "furniture",
//       icon: <FiHome />,
//       color: "bg-green-50 text-green-600",
//     },
//     {
//       name: "Cameras",
//       slug: "mobile-accessories",
//       icon: <FiCamera />,
//       color: "bg-yellow-50 text-yellow-600",
//     },
//     {
//       name: "Accessories",
//       slug: "mobile-accessories",
//       icon: <FiHeadphones />,
//       color: "bg-cyan-50 text-cyan-600",
//     },
//   ];

//   return (
//     <section className="relative overflow-hidden bg-[#f7f7f7] py-10 sm:py-14">
      
//       <div className="pointer-events-none absolute -left-20 top-10 h-48 w-48 rounded-full bg-yellow-300/10 blur-3xl" />
//       <div className="pointer-events-none absolute -right-20 bottom-0 h-56 w-56 rounded-full bg-blue-300/10 blur-3xl" />

//       <div className="relative mx-auto max-w-[1400px] px-4">

//         <div className="mb-7 flex items-end justify-between">

//           <div className="animate-[fadeUp_0.7s_ease-out]">

//             <div className="mb-2 flex items-center gap-2">
//               <span className="h-2 w-2 animate-pulse rounded-full bg-yellow-500" />

//               <p className="text-xs font-black uppercase tracking-[0.2em] text-yellow-600">
//                 Explore
//               </p>
//             </div>

//             <h2 className="text-2xl font-black tracking-tight text-gray-900 sm:text-3xl">
//               Shop by category
//             </h2>

//             <p className="mt-1 text-sm text-gray-500">
//               Everything you need, all in one place.
//             </p>

//           </div>

//           <Link
//             to="/products"
//             className="group hidden items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-bold text-gray-700 shadow-sm transition-all duration-300 hover:border-yellow-400 hover:bg-yellow-400 hover:text-black hover:shadow-md sm:flex"
//           >
//             View all

//             <FiArrowRight
//               className="transition-transform duration-300 group-hover:translate-x-1"
//             />
//           </Link>

//         </div>

//         {/* Categories */}
//         <div className="scrollbar-hide flex gap-4 overflow-x-auto pb-4">

//           {categories.map((category, index) => (
//             <Link
//               key={category.slug + index}
//               to={`/category/${category.slug}`}
//               style={{
//                 animationDelay: `${index * 80}ms`,
//               }}
//               className="category-card group relative min-w-[135px] flex-1 overflow-hidden rounded-2xl border border-gray-100 bg-white p-4 text-center opacity-0 shadow-sm animate-[categoryIn_0.7s_ease-out_forwards]"
//             >

//               {/* Glow */}
//               <div className="absolute -right-5 -top-5 h-16 w-16 rounded-full bg-yellow-300/0 blur-2xl transition-all duration-500 group-hover:bg-yellow-300/30" />

//               {/* Icon */}
//               <div
//                 className={`relative mx-auto flex h-16 w-16 items-center justify-center rounded-full text-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-lg ${category.color}`}
//               >
//                 {category.icon}

//                 <span className="absolute inset-0 rounded-full border border-current opacity-0 transition-all duration-500 group-hover:scale-125 group-hover:opacity-20" />
//               </div>

//               {/* Name */}
//               <h3 className="relative mt-4 text-sm font-bold text-gray-800 transition-colors duration-300 group-hover:text-black">
//                 {category.name}
//               </h3>

//               {/* Shop */}
//               <div className="relative mt-2 flex items-center justify-center gap-1 text-[11px] font-semibold text-gray-400 transition-all duration-300 group-hover:text-yellow-600">
//                 Shop now

//                 <FiChevronRight
//                   size={13}
//                   className="transition-transform duration-300 group-hover:translate-x-1"
//                 />
//               </div>

//               {/* Bottom line */}
//               <div className="absolute bottom-0 left-1/2 h-1 w-0 -translate-x-1/2 rounded-full bg-yellow-400 transition-all duration-500 group-hover:w-16" />

//             </Link>
//           ))}

//         </div>

//         {/* Mobile */}
//         <Link
//           to="/products"
//           className="mt-3 flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-3 text-sm font-bold shadow-sm transition-all duration-300 hover:border-yellow-400 hover:bg-yellow-400"
//         >
//           View all categories
//           <FiArrowRight />
//         </Link>

//       </div>

//       <style>{`
//         @keyframes categoryIn {
//           0% {
//             opacity: 0;
//             transform: translateY(25px) scale(0.96);
//           }

//           100% {
//             opacity: 1;
//             transform: translateY(0) scale(1);
//           }
//         }

//         @media (min-width: 640px) {
//           .category-card {
//             min-width: 125px;
//           }
//         }
//       `}</style>

//     </section>
//   );
// }

// export default Categories;