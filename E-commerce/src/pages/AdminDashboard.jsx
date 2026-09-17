import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  getProducts,
  createProduct,
  updateProductApi,
  deleteProductApi,
} from "../Apis/productsApi";

import { logoutUser } from "../redux/authSlice";

import {
  FiActivity,
  FiBarChart2,
  FiBox,
  FiCheckCircle,
  FiChevronRight,
  FiClock,
  FiDollarSign,
  FiEdit3,
  FiHome,
  FiLogOut,
  FiMenu,
  FiPackage,
  FiPlus,
  FiSearch,
  FiSettings,
  FiShoppingBag,
  FiShoppingCart,
  FiStar,
  FiTrash2,
  FiTrendingUp,
  FiUsers,
  FiX,
} from "react-icons/fi";

function AdminDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const users = useSelector(
    (state) => state.auth.users || []
  );

  const currentUser = useSelector(
    (state) => state.auth.user
  );

  const cartItems = useSelector(
    (state) => state.cart.items || []
  );

  /*
  ========================================
  PRODUCTS FROM BACKEND
  ========================================
  */

  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] =
    useState(true);
  const [productError, setProductError] =
    useState("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setProductsLoading(true);
        setProductError("");

        const response = await getProducts();

        setProducts(response.data || []);
      } catch (error) {
        console.error(
          "Failed to load products:",
          error
        );

        setProductError(
          error.response?.data?.message ||
            "Failed to load products"
        );
      } finally {
        setProductsLoading(false);
      }
    };

    loadProducts();
  }, []);

  const [activePage, setActivePage] =
    useState("Dashboard");

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [showProductModal, setShowProductModal] =
    useState(false);

  const [editingProduct, setEditingProduct] =
    useState(null);

  const [productForm, setProductForm] = useState({
    title: "",
    category: "",
    price: "",
    stock: "",
    image: "",
    description: "",
  });

  const adminName =
    currentUser?.name || "Ahmed";

  /*
  ========================================
  DYNAMIC DATA
  ========================================
  */

  const totalProducts = products.length;

  const totalCustomers = users.length;

  const lowStockProducts = products.filter(
    (product) =>
      Number(product.stock || 0) <= 10
  );

  const totalInventoryValue =
    products.reduce(
      (total, product) =>
        total +
        Number(product.price || 0) *
          Number(product.stock || 0),
      0
    );

  const averageRating = "4.5";

  const filteredProducts = useMemo(() => {
    const search =
      searchTerm.trim().toLowerCase();

    if (!search) {
      return products;
    }

    return products.filter((product) => {
      return (
        product.title
          ?.toLowerCase()
          .includes(search) ||
        product.category
          ?.toLowerCase()
          .includes(search) ||
        product.description
          ?.toLowerCase()
          .includes(search)
      );
    });
  }, [products, searchTerm]);

  /*
  ========================================
  SALES DATA
  ========================================
  */

  const salesData = [
    { month: "Jan", value: 38 },
    { month: "Feb", value: 52 },
    { month: "Mar", value: 44 },
    { month: "Apr", value: 68 },
    { month: "May", value: 61 },
    { month: "Jun", value: 78 },
    { month: "Jul", value: 71 },
    { month: "Aug", value: 88 },
    { month: "Sep", value: 76 },
    { month: "Oct", value: 94 },
    { month: "Nov", value: 86 },
    { month: "Dec", value: 100 },
  ];

  /*
  ========================================
  PRODUCT MODAL
  ========================================
  */

  const openAddProduct = () => {
    setEditingProduct(null);

    setProductForm({
      title: "",
      category: "",
      price: "",
      stock: "",
      image: "",
      description: "",
    });

    setShowProductModal(true);
  };

  const openEditProduct = (product) => {
    setEditingProduct(product);

    setProductForm({
      title: product.title || "",
      category: product.category || "",
      price: product.price || "",
      stock: product.stock || "",
      image: product.images?.[0] || "",
      description:
        product.description || "",
    });

    setShowProductModal(true);
  };

  const closeProductModal = () => {
    setShowProductModal(false);
    setEditingProduct(null);
  };

  const handleProductChange = (e) => {
    const { name, value } = e.target;

    setProductForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /*
  ========================================
  ADD / EDIT PRODUCT
  ========================================
  */

  const handleProductSubmit = async (e) => {
    e.preventDefault();

    if (!productForm.title.trim()) {
      return;
    }

    if (!productForm.category.trim()) {
      return;
    }

    if (!productForm.price) {
      return;
    }

    if (!productForm.stock) {
      return;
    }

    try {
      const productData = {
        title: productForm.title.trim(),
        category: productForm.category.trim(),
        price: Number(productForm.price),
        stock: Number(productForm.stock),
        description:
          productForm.description.trim(),
        images: productForm.image.trim()
          ? [productForm.image.trim()]
          : [],
      };

      /*
      ========================================
      EDIT PRODUCT
      ========================================
      */

      if (editingProduct) {
        const response =
          await updateProductApi(
            editingProduct._id,
            productData
          );

        const updatedProduct =
          response.data;

        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id ===
            editingProduct._id
              ? updatedProduct
              : product
          )
        );
      }

      /*
      ========================================
      CREATE PRODUCT
      ========================================
      */

      else {
        const response =
          await createProduct(productData);

        const newProduct = response.data;

        setProducts((prevProducts) => [
          newProduct,
          ...prevProducts,
        ]);
      }

      closeProductModal();
    } catch (error) {
      console.error(
        "Product operation failed:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  /*
  ========================================
  DELETE PRODUCT
  ========================================
  */

  const handleDeleteProduct = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteProductApi(id);

      setProducts((prevProducts) =>
        prevProducts.filter(
          (product) => product._id !== id
        )
      );
    } catch (error) {
      console.error(
        "Delete product failed:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to delete product"
      );
    }
  };

  /*
  ========================================
  LOGOUT
  ========================================
  */

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  /*
  ========================================
  SIDEBAR
  ========================================
  */

  const menuItems = [
    {
      name: "Dashboard",
      icon: FiHome,
    },
    {
      name: "Products",
      icon: FiBox,
    },
    // {
    //   name: "Orders",
    //   icon: FiShoppingCart,
    // },
    {
      name: "Customers",
      icon: FiUsers,
    },
    // {
    //   name: "Analytics",
    //   icon: FiBarChart2,
    // },
    // {
    //   name: "Payments",
    //   icon: FiDollarSign,
    // },
    {
      name: "Settings",
      icon: FiSettings,
    },
  ];

  const handleMenuClick = (name) => {
    setActivePage(name);
    setSidebarOpen(false);
  };

  /*
  ========================================
  STAT CARD
  ========================================
  */

  const StatCard = ({
    title,
    value,
    icon: Icon,
    trend,
    description,
  }) => {
    return (
      <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-[#2a2a2a] dark:bg-[#1a1a1a]">
        <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-slate-100 transition-transform duration-500 group-hover:scale-150 dark:bg-[#252525]" />

        <div className="relative flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-gray-400">
              {title}
            </p>

            <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              {value}
            </h3>

            <div className="mt-2 flex items-center gap-2">
              {trend && (
                <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
                  <FiTrendingUp size={13} />
                  {trend}
                </span>
              )}

              <span className="text-xs text-slate-400">
                {description}
              </span>
            </div>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-white shadow-lg dark:bg-[#252525]">
            <Icon size={20} />
          </div>
        </div>
      </div>
    );
  };

  /*
  ========================================
  DASHBOARD PAGE
  ========================================
  */

  const renderDashboard = () => {
    const today = new Date();

    const formattedDate =
      today.toLocaleDateString(
        "en-US",
        {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
        }
      );

    return (
      <>
        <div className="mb-8">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="mb-2 text-sm font-medium text-slate-500 dark:text-gray-400">
                {formattedDate}
              </p>

              <h1 className="text-3xl font-bold tracking-tight text-slate-950 dark:text-white">
                Good morning, {adminName} 
              </h1>

              <p className="mt-2 text-sm text-slate-500 dark:text-gray-400">
                Here&apos;s what&apos;s happening with
                your store today.
              </p>
            </div>

            <button
              onClick={openAddProduct}
              className="flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-800"
            >
              <FiPlus size={18} />
              Add Product
            </button>
          </div>
        </div>

        {/* Stats */}

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total Products"
            value={
              productsLoading
                ? "..."
                : totalProducts
            }
            icon={FiBox}
            trend="+4.5%"
            description="this month"
          />

          <StatCard
            title="Customers"
            value={totalCustomers}
            icon={FiUsers}
            trend="+8.2%"
            description="registered"
          />

          <StatCard
            title="Inventory Value"
            value={`$${totalInventoryValue.toLocaleString()}`}
            icon={FiDollarSign}
            trend="+12.4%"
            description="total stock"
          />

          <StatCard
            title="Average Rating"
            value={averageRating}
            icon={FiStar}
            trend="+0.3"
            description="store rating"
          />
        </div>

        {/* Charts */}

        <div className="mt-6 grid gap-6 xl:grid-cols-[1.7fr_1fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-[#2a2a2a] dark:bg-[#1a1a1a]">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-950 dark:text-white">
                  Sales Performance
                </h2>

                <p className="mt-1 text-sm text-slate-500 dark:text-gray-400">
                  Monthly sales overview
                </p>
              </div>

              <div className="flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400">
                <FiTrendingUp />
                +18.4%
              </div>
            </div>

            <div className="flex h-64 items-end gap-2 sm:gap-4">
              {salesData.map((item) => (
                <div
                  key={item.month}
                  className="group flex h-full flex-1 flex-col items-center justify-end"
                >
                  <div className="relative flex w-full flex-1 items-end justify-center">
                    <div
                      className="w-full max-w-8 rounded-t-lg bg-slate-900 transition-all duration-500 group-hover:bg-emerald-500"
                      style={{
                        height: `${item.value}%`,
                      }}
                    >
                      <span className="absolute -top-7 left-1/2 hidden -translate-x-1/2 rounded-md bg-slate-950 px-2 py-1 text-[10px] font-semibold text-white group-hover:block">
                        ${item.value}k
                      </span>
                    </div>
                  </div>

                  <span className="mt-3 text-[11px] font-medium text-slate-400">
                    {item.month}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Store Health */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-[#2a2a2a] dark:bg-[#1a1a1a]">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-slate-950 dark:text-white">
                Store Health
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-gray-400">
                Current store overview
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm text-slate-600 dark:text-gray-400">
                    Products
                  </span>

                  <span className="text-sm font-bold text-slate-900 dark:text-white">
                    {totalProducts}
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-[#2a2a2a]">
                  <div className="h-full w-[82%] rounded-full bg-slate-900" />
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm text-slate-600 dark:text-gray-400">
                    Customers
                  </span>

                  <span className="text-sm font-bold text-slate-900 dark:text-white">
                    {totalCustomers}
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-[#2a2a2a]">
                  <div className="h-full w-[68%] rounded-full bg-emerald-500" />
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm text-slate-600 dark:text-gray-400">
                    Inventory
                  </span>

                  <span className="text-sm font-bold text-slate-900 dark:text-white">
                    {lowStockProducts.length === 0
                      ? "Healthy"
                      : `${lowStockProducts.length} low`}
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-[#2a2a2a]">
                  <div
                    className={`h-full rounded-full ${
                      lowStockProducts.length > 0
                        ? "w-[42%] bg-amber-500"
                        : "w-[92%] bg-emerald-500"
                    }`}
                  />
                </div>
              </div>
            </div>

            <div className="mt-7 rounded-xl bg-slate-50 p-4 dark:bg-[#171717]">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-emerald-600 shadow-sm dark:bg-[#252525]">
                  <FiActivity />
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    Everything looks good
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-gray-400">
                    Your store is running smoothly.
                    Keep adding great products.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Products */}

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-[#2a2a2a] dark:bg-[#1a1a1a]">
          <div className="flex flex-col justify-between gap-4 border-b border-slate-100 p-6 sm:flex-row sm:items-center dark:border-[#2a2a2a]">
            <div>
              <h2 className="text-lg font-bold text-slate-950 dark:text-white">
                Recent Products
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-gray-400">
                Your latest products
              </p>
            </div>

            <button
              onClick={() =>
                setActivePage("Products")
              }
              className="flex items-center gap-1 text-sm font-semibold text-slate-900 transition hover:text-emerald-600 dark:text-gray-300"
            >
              View all
              <FiChevronRight />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-slate-100 text-left text-xs uppercase tracking-wider text-slate-400 dark:border-[#2a2a2a]">
                  <th className="px-6 py-4 font-semibold">
                    Product
                  </th>

                  <th className="px-6 py-4 font-semibold">
                    Category
                  </th>

                  <th className="px-6 py-4 font-semibold">
                    Price
                  </th>

                  <th className="px-6 py-4 font-semibold">
                    Stock
                  </th>

                  <th className="px-6 py-4 font-semibold">
                    Rating
                  </th>
                </tr>
              </thead>

              <tbody>
                {productsLoading ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-12 text-center text-sm text-slate-400"
                    >
                      Loading products...
                    </td>
                  </tr>
                ) : productError ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-12 text-center text-sm text-red-500"
                    >
                      {productError}
                    </td>
                  </tr>
                ) : (
                  products
                    .slice(0, 5)
                    .map((product) => (
                      <tr
                        key={product._id}
                        className="border-b border-slate-50 transition hover:bg-slate-50 dark:border-[#2a2a2a] dark:hover:bg-[#222]"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={
                                product.images?.[0] ||
                                product.thumbnail ||
                                product.image ||
                                "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80"
                              }
                              alt={product.title}
                              className="h-11 w-11 rounded-xl object-cover"
                            />

                            <span className="text-sm font-semibold text-slate-900 dark:text-white">
                              {product.title}
                            </span>
                          </div>
                        </td>

                        <td className="px-6 py-4 text-sm text-slate-500 dark:text-gray-400">
                          {product.category}
                        </td>

                        <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">
                          $
                          {Number(
                            product.price || 0
                          ).toFixed(2)}
                        </td>

                        <td className="px-6 py-4">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                              Number(
                                product.stock || 0
                              ) <= 10
                                ? "bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400"
                                : "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400"
                            }`}
                          >
                            {product.stock} in stock
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <span className="flex items-center gap-1 text-sm font-semibold text-slate-700 dark:text-gray-300">
                            <FiStar className="fill-yellow-400 text-yellow-400" />
                            4.5
                          </span>
                        </td>
                      </tr>
                    ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  };

  /*
  ========================================
  PRODUCTS PAGE
  ========================================
  */

  const renderProducts = () => {
    return (
      <>
        <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-gray-400">
              Store Management
            </p>

            <h1 className="mt-1 text-3xl font-bold text-slate-950 dark:text-white">
              Products
            </h1>

            <p className="mt-2 text-sm text-slate-500 dark:text-gray-400">
              Manage your store products and inventory.
            </p>
          </div>

          <button
            onClick={openAddProduct}
            className="flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            <FiPlus size={18} />
            Add Product
          </button>
        </div>

        <div className="mb-6 flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <FiSearch
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />

            <input
              type="text"
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
              placeholder="Search products..."
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100 dark:border-[#2a2a2a] dark:bg-[#1a1a1a] dark:text-white dark:placeholder:text-gray-500 dark:focus:border-gray-500 dark:focus:ring-[#222]"
            />
          </div>

          <div className="flex items-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-600 dark:border-[#2a2a2a] dark:bg-[#1a1a1a] dark:text-gray-300">
            {filteredProducts.length} products
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-[#2a2a2a] dark:bg-[#1a1a1a]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-400 dark:border-[#2a2a2a] dark:bg-[#171717]">
                  <th className="px-6 py-4">
                    Product
                  </th>

                  <th className="px-6 py-4">
                    Category
                  </th>

                  <th className="px-6 py-4">
                    Price
                  </th>

                  <th className="px-6 py-4">
                    Stock
                  </th>

                  <th className="px-6 py-4">
                    Rating
                  </th>

                  <th className="px-6 py-4 text-right">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {productsLoading ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-16 text-center"
                    >
                      <FiBox
                        className="mx-auto animate-pulse text-slate-300"
                        size={40}
                      />

                      <p className="mt-3 text-sm font-semibold text-slate-700 dark:text-gray-300">
                        Loading products...
                      </p>
                    </td>
                  </tr>
                ) : productError ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-16 text-center text-sm text-red-500"
                    >
                      {productError}
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map(
                    (product) => (
                      <tr
                        key={product._id}
                        className="border-b border-slate-50 transition hover:bg-slate-50 dark:border-[#2a2a2a] dark:hover:bg-[#222]"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={
                                product.images?.[0] ||
                                product.thumbnail ||
                                product.image ||
                                "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80"
                              }
                              alt={product.title}
                              className="h-12 w-12 rounded-xl object-cover"
                            />

                            <div>
                              <p className="text-sm font-bold text-slate-900 dark:text-white">
                                {product.title}
                              </p>

                              <p className="mt-1 max-w-xs truncate text-xs text-slate-400">
                                {product.description ||
                                  "No description available"}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4 text-sm text-slate-500 dark:text-gray-400">
                          {product.category}
                        </td>

                        <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">
                          $
                          {Number(
                            product.price || 0
                          ).toFixed(2)}
                        </td>

                        <td className="px-6 py-4">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                              Number(
                                product.stock || 0
                              ) <= 10
                                ? "bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400"
                                : "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400"
                            }`}
                          >
                            {product.stock}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <span className="flex items-center gap-1 text-sm font-semibold text-slate-700 dark:text-gray-300">
                            <FiStar className="fill-yellow-400 text-yellow-400" />
                            4.5
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() =>
                                openEditProduct(
                                  product
                                )
                              }
                              className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-700 transition hover:bg-slate-900 hover:text-white dark:bg-[#252525] dark:text-gray-300 dark:hover:bg-white dark:hover:text-slate-950"
                            >
                              <FiEdit3 size={15} />
                            </button>

                            <button
                              onClick={() =>
                                handleDeleteProduct(
                                  product._id
                                )
                              }
                              className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-500 transition hover:bg-red-500 hover:text-white dark:bg-red-950/30 dark:text-red-400"
                            >
                              <FiTrash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  )
                )}

                {!productsLoading &&
                  !productError &&
                  filteredProducts.length === 0 && (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-6 py-16 text-center"
                      >
                        <FiBox
                          className="mx-auto text-slate-300 dark:text-gray-600"
                          size={40}
                        />

                        <p className="mt-3 text-sm font-semibold text-slate-700 dark:text-gray-300">
                          No products found
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          Try another search or add a new
                          product.
                        </p>
                      </td>
                    </tr>
                  )}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  };

  /*
  ========================================
  CUSTOMERS PAGE
  ========================================
  */

  const renderCustomers = () => {
    return (
      <>
        <div className="mb-7">
          <p className="text-sm font-medium text-slate-500 dark:text-gray-400">
            Customer Management
          </p>

          <h1 className="mt-1 text-3xl font-bold text-slate-950 dark:text-white">
            Customers
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-gray-400">
            All registered customers appear here
            automatically.
          </p>
        </div>

        <div className="mb-6 grid gap-5 sm:grid-cols-3">
          <StatCard
            title="Total Customers"
            value={totalCustomers}
            icon={FiUsers}
            description="registered"
          />

          <StatCard
            title="Active Cart Items"
            value={cartItems.length}
            icon={FiShoppingCart}
            description="in carts"
          />

          <StatCard
            title="Store Products"
            value={totalProducts}
            icon={FiPackage}
            description="available"
          />
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-[#2a2a2a] dark:bg-[#1a1a1a]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-400 dark:border-[#2a2a2a] dark:bg-[#171717]">
                  <th className="px-6 py-4">
                    Customer
                  </th>

                  <th className="px-6 py-4">
                    Email
                  </th>

                  <th className="px-6 py-4">
                    Role
                  </th>

                  <th className="px-6 py-4">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {users.map((user, index) => (
                  <tr
                    key={`${user.email}-${index}`}
                    className="border-b border-slate-50 hover:bg-slate-50 dark:border-[#2a2a2a] dark:hover:bg-[#222]"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white dark:bg-[#252525]">
                          {user.name
                            ?.charAt(0)
                            ?.toUpperCase() ||
                            "U"}
                        </div>

                        <span className="text-sm font-semibold text-slate-900 dark:text-white">
                          {user.name}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-500 dark:text-gray-400">
                      {user.email}
                    </td>

                    <td className="px-6 py-4">
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-[#252525] dark:text-gray-300">
                        Customer
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span className="flex items-center gap-2 text-xs font-semibold text-emerald-600">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        Active
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {users.length === 0 && (
            <div className="px-6 py-16 text-center">
              <FiUsers
                className="mx-auto text-slate-300 dark:text-gray-600"
                size={42}
              />

              <p className="mt-3 text-sm font-semibold text-slate-700 dark:text-gray-300">
                No customers yet
              </p>
            </div>
          )}
        </div>
      </>
    );
  };

  /*
  ========================================
  ORDERS PAGE
  ========================================
  */

  const renderOrders = () => {
    const orders = [
      {
        id: "#ORD-1048",
        customer: "Sarah Ahmed",
        amount: "$249.00",
        status: "Delivered",
      },
      {
        id: "#ORD-1047",
        customer: "Omar Hassan",
        amount: "$129.00",
        status: "Processing",
      },
      {
        id: "#ORD-1046",
        customer: "Mariam Ali",
        amount: "$599.00",
        status: "Shipped",
      },
      {
        id: "#ORD-1045",
        customer: "Youssef Mohamed",
        amount: "$89.00",
        status: "Delivered",
      },
    ];

    return (
      <>
        <div className="mb-7">
          <p className="text-sm font-medium text-slate-500 dark:text-gray-400">
            Sales Management
          </p>

          <h1 className="mt-1 text-3xl font-bold text-slate-950 dark:text-white">
            Orders
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-gray-400">
            Monitor recent orders and their status.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          <StatCard
            title="Total Orders"
            value="1,248"
            icon={FiShoppingCart}
            trend="+12.6%"
            description="this month"
          />

          <StatCard
            title="Processing"
            value="86"
            icon={FiClock}
            description="needs attention"
          />

          <StatCard
            title="Delivered"
            value="1,042"
            icon={FiCheckCircle}
            trend="+9.4%"
            description="completed"
          />
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-[#2a2a2a] dark:bg-[#1a1a1a]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-400 dark:border-[#2a2a2a] dark:bg-[#171717]">
                  <th className="px-6 py-4">
                    Order
                  </th>

                  <th className="px-6 py-4">
                    Customer
                  </th>

                  <th className="px-6 py-4">
                    Amount
                  </th>

                  <th className="px-6 py-4">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-slate-50 hover:bg-slate-50 dark:border-[#2a2a2a] dark:hover:bg-[#222]"
                  >
                    <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">
                      {order.id}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-gray-400">
                      {order.customer}
                    </td>

                    <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">
                      {order.amount}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          order.status ===
                          "Delivered"
                            ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400"
                            : order.status ===
                              "Processing"
                            ? "bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400"
                            : "bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  };

  /*
  ========================================
  OTHER PAGES
  ========================================
  */

  const renderPlaceholder = (
    title,
    description,
    Icon
  ) => {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <div className="max-w-md text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-900 text-white shadow-xl dark:bg-[#252525]">
            <Icon size={32} />
          </div>

          <h1 className="mt-6 text-3xl font-bold text-slate-950 dark:text-white">
            {title}
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-gray-400">
            {description}
          </p>

          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400">
            <FiActivity />
            Module ready for integration
          </div>
        </div>
      </div>
    );
  };

  /*
  ========================================
  PAGE SWITCHER
  ========================================
  */

  const renderPage = () => {
    switch (activePage) {
      case "Dashboard":
        return renderDashboard();

      case "Products":
        return renderProducts();

      case "Orders":
        return renderOrders();

      case "Customers":
        return renderCustomers();

      case "Analytics":
        return renderPlaceholder(
          "Analytics",
          "Advanced sales analytics, revenue insights, product performance and customer behavior will live here.",
          FiBarChart2
        );

      case "Payments":
        return renderPlaceholder(
          "Payments",
          "Payment tracking, transactions, refunds and financial reports will live here.",
          FiDollarSign
        );

      case "Settings":
        return renderPlaceholder(
          "Settings",
          "Store settings, admin preferences and platform configuration will live here.",
          FiSettings
        );

      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-[#111111] dark:text-white">
      {/* Mobile Overlay */}

      {sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-sm lg:hidden"
          aria-label="Close sidebar"
        />
      )}

      {/* Sidebar */}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-slate-800 bg-slate-950 text-white transition-transform duration-300 ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}

        <div className="flex h-20 items-center border-b border-white/10 px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-400 text-slate-950 shadow-lg">
              <FiShoppingBag size={20} />
            </div>

            <div
              onClick={() => navigate("/")}
              className="cursor-pointer"
            >
              <h2 className="text-xl font-black tracking-tight">
                Shoply
              </h2>

              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-500">
                Admin Panel
              </p>
            </div>
          </div>
        </div>

        {/* Menu */}

        <div className="flex-1 overflow-y-auto px-4 py-6">
          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
            Management
          </p>

          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;

              const active =
                activePage === item.name;

              return (
                <button
                  key={item.name}
                  onClick={() =>
                    handleMenuClick(item.name)
                  }
                  className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all ${
                    active
                      ? "bg-white text-slate-950 shadow-lg"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon
                    size={18}
                    className={`transition-transform ${
                      active
                        ? ""
                        : "group-hover:scale-110"
                    }`}
                  />

                  <span>{item.name}</span>

                  {item.name === "Products" &&
                    lowStockProducts.length > 0 && (
                      <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                        {lowStockProducts.length}
                      </span>
                    )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Admin */}

        <div className="border-t border-white/10 p-4">
          <div className="mb-3 flex items-center gap-3 rounded-xl bg-white/5 p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400 font-bold text-slate-950">
              {adminName
                .charAt(0)
                .toUpperCase()}
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">
                {adminName}
              </p>

              <p className="text-xs text-slate-500">
                Administrator
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-400 transition hover:bg-red-500/10 hover:text-red-400"
          >
            <FiLogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}

      <div className="lg:pl-64">
        {/* Header */}

        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur-xl dark:border-[#2a2a2a] dark:bg-[#171717]/90 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 lg:hidden dark:border-[#2a2a2a] dark:text-gray-300"
            >
              <FiMenu size={20} />
            </button>

            <div>
              <p className="hidden text-xs font-medium text-slate-400 sm:block">
                Shoply / Admin
              </p>

              <h2 className="text-lg font-bold text-slate-950 dark:text-white">
                {activePage}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}

            {/* <div className="relative hidden md:block"> 
              <FiSearch 
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" 
                size={16} 
              /> 
 
              <input 
                type="text" 
                placeholder="Quick search..." 
                onChange={(e) => 
                  setSearchTerm(e.target.value) 
                } 
                className="w-52 rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-xs outline-none transition focus:border-slate-400 focus:bg-white" 
              /> 
            </div> */}

            <div className="hidden h-8 w-px bg-slate-200 dark:bg-[#2a2a2a] sm:block" />

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-sm font-bold text-white dark:bg-[#252525]">
              {adminName
                .charAt(0)
                .toUpperCase()}
            </div>
          </div>
        </header>

        {/* Content */}

        <main className="mx-auto max-w-[1600px] p-4 sm:p-6 lg:p-8">
          {renderPage()}
        </main>
      </div>

      {/* Add/Edit Product Modal */}

      {showProductModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl dark:bg-[#1a1a1a]">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white px-6 py-5 dark:border-[#2a2a2a] dark:bg-[#1a1a1a]">
              <div>
                <h2 className="text-xl font-bold text-slate-950 dark:text-white">
                  {editingProduct
                    ? "Edit Product"
                    : "Add New Product"}
                </h2>

                <p className="mt-1 text-xs text-slate-500 dark:text-gray-400">
                  {editingProduct
                    ? "Update product information"
                    : "Add a new product to your store"}
                </p>
              </div>

              <button
                onClick={closeProductModal}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition hover:bg-slate-900 hover:text-white dark:bg-[#252525] dark:text-gray-400 dark:hover:bg-white dark:hover:text-slate-950"
              >
                <FiX />
              </button>
            </div>

            <form
              onSubmit={handleProductSubmit}
              className="space-y-5 p-6"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-gray-400">
                    Product Name
                  </label>

                  <input
                    name="title"
                    value={productForm.title}
                    onChange={handleProductChange}
                    placeholder="e.g. Premium Wireless Headphones"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100 dark:border-[#2a2a2a] dark:bg-[#171717] dark:text-white dark:placeholder:text-gray-500 dark:focus:border-gray-500 dark:focus:ring-[#222]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-gray-400">
                    Category
                  </label>

                  <input
                    name="category"
                    value={productForm.category}
                    onChange={handleProductChange}
                    placeholder="Electronics"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100 dark:border-[#2a2a2a] dark:bg-[#171717] dark:text-white dark:placeholder:text-gray-500 dark:focus:border-gray-500 dark:focus:ring-[#222]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-gray-400">
                    Price
                  </label>

                  <input
                    name="price"
                    type="number"
                    min="0"
                    value={productForm.price}
                    onChange={handleProductChange}
                    placeholder="99"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100 dark:border-[#2a2a2a] dark:bg-[#171717] dark:text-white dark:placeholder:text-gray-500 dark:focus:border-gray-500 dark:focus:ring-[#222]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-gray-400">
                    Stock
                  </label>

                  <input
                    name="stock"
                    type="number"
                    min="0"
                    value={productForm.stock}
                    onChange={handleProductChange}
                    placeholder="20"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100 dark:border-[#2a2a2a] dark:bg-[#171717] dark:text-white dark:placeholder:text-gray-500 dark:focus:border-gray-500 dark:focus:ring-[#222]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-gray-400">
                    Rating
                  </label>

                  <input
                    name="rating"
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    value="4.5"
                    disabled
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500 outline-none dark:border-[#2a2a2a] dark:bg-[#222] dark:text-gray-400"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-gray-400">
                    Image URL
                  </label>

                  <input
                    name="image"
                    value={productForm.image}
                    onChange={handleProductChange}
                    placeholder="https://..."
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100 dark:border-[#2a2a2a] dark:bg-[#171717] dark:text-white dark:placeholder:text-gray-500 dark:focus:border-gray-500 dark:focus:ring-[#222]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-gray-400">
                    Description
                  </label>

                  <textarea
                    name="description"
                    rows="4"
                    value={productForm.description}
                    onChange={handleProductChange}
                    placeholder="Write a short product description..."
                    className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100 dark:border-[#2a2a2a] dark:bg-[#171717] dark:text-white dark:placeholder:text-gray-500 dark:focus:border-gray-500 dark:focus:ring-[#222]"
                  />
                </div>
              </div>

              <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end dark:border-[#2a2a2a]">
                <button
                  type="button"
                  onClick={closeProductModal}
                  className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 dark:border-[#2a2a2a] dark:text-gray-300 dark:hover:bg-[#222]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-slate-800"
                >
                  {editingProduct
                    ? "Save Changes"
                    : "Add Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;