import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import {
  FiFacebook,
  FiInstagram,
  FiTwitter,
  FiYoutube,
  FiPhone,
  FiMail,
  FiMapPin,
  FiSave,
} from "react-icons/fi";

import {
  getFooterSettings,
  updateFooterSettings,
} from "../Apis/footerSettingsApi";
import {
  getProducts,
  createProduct,
  updateProductApi,
  deleteProductApi,
} from "../Apis/productsApi";
import { getAllOrders, updateOrderStatus } from "../Apis/ordersApi";
import {
  getCategories,
  createCategory,
  updateCategoryApi,
  deleteCategoryApi,
} from "../Apis/categoriesApi";

import { getAllUsers } from "../Apis/usersApi";

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
  FiTag,
  FiTrash2,
  FiTrendingUp,
  FiUsers,
  FiX,
} from "react-icons/fi";

function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  const [ordersPage, setOrdersPage] = useState(1);
  const [ordersTotal, setOrdersTotal] = useState(0);

  const [orderStatusFilter, setOrderStatusFilter] = useState("");
  const [orderSearch, setOrderSearch] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [footerSettings, setFooterSettings] = useState({
    phone: "",
    email: "",
    location: "",
    facebook: "",
    instagram: "",
    twitter: "",
    youtube: "",
  });

  const [footerSaving, setFooterSaving] = useState(false);
  const currentUser = useSelector((state) => state.auth.user);

  const cartItems = useSelector((state) => state.cart.items || []);

  /*
  ========================================
  USERS FROM BACKEND
  ========================================
  */

  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);

  /*
  ========================================
  PRODUCTS FROM BACKEND
  ========================================
  */

  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productError, setProductError] = useState("");

  /*
  ========================================
  CATEGORIES FROM BACKEND
  ========================================
  */

  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  /*
  ========================================
  CATEGORY MODAL
  ========================================
  */

  const [showCategoryModal, setShowCategoryModal] = useState(false);

  const [editingCategory, setEditingCategory] = useState(null);

  const [categoryName, setCategoryName] = useState("");

  const [categorySearch, setCategorySearch] = useState("");

  /*
  ========================================
  LOAD USERS
  ========================================
  */

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setUsersLoading(true);

        const response = await getAllUsers();

        setUsers(response.users || []);
      } catch (error) {
        console.error("Failed to load customers:", error);

        toast.error(
          error.response?.data?.message || "Failed to load customers",
        );

        setUsers([]);
      } finally {
        setUsersLoading(false);
      }
    };

    loadUsers();
  }, []);

  /*
  ========================================
  LOAD PRODUCTS
  ========================================
  */

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setProductsLoading(true);
        setProductError("");

        const response = await getProducts();

        setProducts(response.data || []);
      } catch (error) {
        console.error("Failed to load products:", error);

        setProductError(
          error.response?.data?.message || "Failed to load products",
        );
      } finally {
        setProductsLoading(false);
      }
    };

    loadProducts();
  }, []);

  /*
  ========================================
  LOAD CATEGORIES
  ========================================
  */

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setCategoriesLoading(true);

        const response = await getCategories();

        if (Array.isArray(response.data)) {
          setCategories(response.data);
        } else {
          setCategories([]);
        }
      } catch (error) {
        console.error("Failed to load categories:", error);

        setCategories([]);
      } finally {
        setCategoriesLoading(false);
      }
    };

    loadCategories();
  }, []);

  const [activePage, setActivePage] = useState("Dashboard");

  /* ===== SALES DATA (Dashboard) ===== */

  const [salesOrders, setSalesOrders] = useState([]);
  const [salesLoading, setSalesLoading] = useState(false);

  useEffect(() => {
    if (activePage !== "Dashboard") return;

    const loadSalesOrders = async () => {
      try {
        setSalesLoading(true);

        const limit = 100;
        let page = 1;
        let all = [];

        while (true) {
          const response = await getAllOrders({ page, limit });
          const batch = response.orders || [];

          all = [...all, ...batch];

          if (batch.length === 0 || all.length >= (response.total || 0)) {
            break;
          }

          page += 1;
        }

        setSalesOrders(all);
      } catch (error) {
        console.error("Failed to load sales data:", error);
      } finally {
        setSalesLoading(false);
      }
    };

    loadSalesOrders();
  }, [activePage]);

  /* ===== ORDERS PAGE ===== */

  useEffect(() => {
    if (activePage !== "Orders") return;

    const fetchOrders = async () => {
      try {
        setOrdersLoading(true);

        const response = await getAllOrders({
          page: ordersPage,
          limit: 10,
          status: orderStatusFilter || undefined,
          search: orderSearch || undefined,
        });

        setOrders(response.orders || []);
        setOrdersTotal(response.total || 0);
      } catch (error) {
        console.error("Orders error:", error);

        toast.error(error?.response?.data?.message || "Failed to load orders");
      } finally {
        setOrdersLoading(false);
      }
    };

    fetchOrders();
  }, [activePage, ordersPage, orderStatusFilter, orderSearch]);
  const handleOrderStatusChange = async (orderId, status) => {
    try {
      await updateOrderStatus(orderId, status);

      toast.success("Order status updated successfully");

      const response = await getAllOrders({
        page: ordersPage,
        limit: 10,
        status: orderStatusFilter || undefined,
        search: orderSearch || undefined,
      });

      setOrders(response.orders || []);
      setOrdersTotal(response.total || 0);
    } catch (error) {
      console.error("Update order status error:", error);

      toast.error(
        error?.response?.data?.message || "Failed to update order status",
      );
    }
  };
  useEffect(() => {
    if (activePage !== "Settings") return;

    const fetchFooterSettings = async () => {
      try {
        const response = await getFooterSettings();

        setFooterSettings(response.data);
      } catch (error) {
        console.error(error);

        toast.error("Failed to load footer settings");
      }
    };

    fetchFooterSettings();
  }, [activePage]);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const [showProductModal, setShowProductModal] = useState(false);

  const [editingProduct, setEditingProduct] = useState(null);

  const [productForm, setProductForm] = useState({
    title: "",
    category: "",
    price: "",
    stock: "",
    image: null,
    description: "",
    rate: "",
  });

  const adminName = currentUser?.name || "Ahmed";

  /*
  ========================================
  DYNAMIC DATA
  ========================================
  */

  const totalProducts = products.length;

  const totalCustomers = users.filter((user) => user.role === "Buyer").length;

  const lowStockProducts = products.filter(
    (product) => Number(product.stock || 0) <= 10,
  );

  const totalInventoryValue = products.reduce(
    (total, product) =>
      total + Number(product.price || 0) * Number(product.stock || 0),
    0,
  );

  const averageRating = "4.5";

  /*
  ========================================
  CATEGORY NAME HELPER
  ========================================
  */

  const getCategoryName = (category) => {
    const categoryId = typeof category === "object" ? category?._id : category;

    return (
      categories.find((item) => item._id === categoryId)?.name ||
      (typeof category === "object" ? category?.name : category) ||
      "Uncategorized"
    );
  };

  /*
  ========================================
  FILTERED PRODUCTS
  ========================================
  */

  const filteredProducts = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    if (!search) {
      return products;
    }

    return products.filter((product) => {
      const categoryName = getCategoryName(product.category);

      return (
        product.title?.toLowerCase().includes(search) ||
        categoryName?.toLowerCase().includes(search) ||
        product.description?.toLowerCase().includes(search)
      );
    });
  }, [products, searchTerm, categories]);

  /*
  ========================================
  FILTERED CATEGORIES
  ========================================
  */

  const filteredCategories = useMemo(() => {
    const search = categorySearch.trim().toLowerCase();

    if (!search) {
      return categories;
    }

    return categories.filter((category) =>
      category.name?.toLowerCase().includes(search),
    );
  }, [categories, categorySearch]);

  /*
  ========================================
  SALES DATA
  ========================================
  */

  const MONTH_LABELS = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const currentYear = new Date().getFullYear();

  const salesData = useMemo(() => {
    const months = MONTH_LABELS.map((label) => ({
      month: label,
      revenue: 0,
      orders: 0,
    }));

    salesOrders.forEach((order) => {
      if (!order.createdAt) return;

      const date = new Date(order.createdAt);
      if (date.getFullYear() !== currentYear) return;

      if (order.status === "Canceled") return;
      if (order.paymentMethod === "Paymob" && order.paymentStatus !== "Paid") {
        return;
      }

      const index = date.getMonth();
      months[index].revenue += Number(order.total || 0);
      months[index].orders += 1;
    });

    const maxRevenue = Math.max(...months.map((m) => m.revenue), 0);

    return months.map((m) => ({
      ...m,
      height: maxRevenue > 0 ? Math.max((m.revenue / maxRevenue) * 100, 3) : 3,
    }));
  }, [salesOrders, currentYear]);

  const totalYearSales = salesData.reduce((sum, m) => sum + m.revenue, 0);

  const currentMonthIndex = new Date().getMonth();
  const currentMonthSales = salesData[currentMonthIndex]?.revenue || 0;
  const previousMonthSales =
    currentMonthIndex > 0 ? salesData[currentMonthIndex - 1].revenue : 0;

  const salesGrowth =
    previousMonthSales > 0
      ? ((currentMonthSales - previousMonthSales) / previousMonthSales) * 100
      : null;
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
      image: null,
      description: "",
      rate: "",
    });

    setShowProductModal(true);
  };

  const openEditProduct = (product) => {
    setEditingProduct(product);

    setProductForm({
      title: product.title || "",
      category:
        typeof product.category === "object"
          ? product.category?._id || ""
          : product.category || "",
      price: product.price || "",
      stock: product.stock || "",
      image: null,
      description: product.description || "",
      rate: product.rate || "",
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

    const productTitle = productForm.title.trim();

    const productDescription = productForm.description.trim();

    const price = Number(productForm.price);

    const stock = Number(productForm.stock);
    const rate = Number(productForm.rate);

    /*
    ========================================
    PRODUCT VALIDATION
    ========================================
    */

    if (!productTitle) {
      toast.error("Please enter product name");
      return;
    }

    if (productTitle.length < 3) {
      toast.error("Product name must be at least 3 characters");
      return;
    }

    if (productTitle.length > 100) {
      toast.error("Product name must not exceed 100 characters");
      return;
    }

    if (!productForm.category) {
      toast.error("Please select a category");
      return;
    }

    if (productForm.price === "" || productForm.price === null) {
      toast.error("Please enter product price");
      return;
    }

    if (!Number.isFinite(price) || price <= 0) {
      toast.error("Product price must be greater than 0");
      return;
    }

    if (productForm.stock === "" || productForm.stock === null) {
      toast.error("Please enter product stock");
      return;
    }

    if (!Number.isInteger(stock) || stock < 0) {
      toast.error("Stock must be a whole number greater than or equal to 0");
      return;
    }

    if (!productDescription) {
      toast.error("Please enter product description");
      return;
    }

    if (productDescription.length < 10) {
      toast.error("Product description must be at least 10 characters");
      return;
    }

    if (productDescription.length > 1000) {
      toast.error("Product description must not exceed 1000 characters");
      return;
    }
    if (rate.length > 5) {
      toast.error("Product rate must be from 1 to 5");
      return;
    }

    const toastId = toast.loading(
      editingProduct
        ? "Updating product, please wait..."
        : "Adding product, please wait...",
    );

    try {
      const formData = new FormData();

      formData.append("title", productTitle);

      formData.append("category", productForm.category);

      formData.append("price", price);

      formData.append("stock", stock);

      formData.append("description", productDescription);
      formData.append("rate", rate);

      if (productForm.image) {
        formData.append("images", productForm.image);
      }

      /*
      ========================================
      EDIT PRODUCT
      ========================================
      */

      if (editingProduct) {
        const response = await updateProductApi(editingProduct._id, formData);

        const updatedProduct = response.data;

        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === editingProduct._id ? updatedProduct : product,
          ),
        );

        toast.success("Product updated successfully!", {
          id: toastId,
        });
      } else {

      /*
      ========================================
      CREATE PRODUCT
      ========================================
      */
        const response = await createProduct(formData);

        const newProduct = response.data;

        setProducts((prevProducts) => [newProduct, ...prevProducts]);

        toast.success("Product added successfully!", {
          id: toastId,
        });
      }

      closeProductModal();
    } catch (error) {
      console.error("Product operation failed:", error);

      toast.error(
        error.response?.data?.message ||
          "Something went wrong while saving the product",
        {
          id: toastId,
        },
      );
    }
  };

  /*
  ========================================
  DELETE PRODUCT
  ========================================
  */

  const handleDeleteProduct = async (id) => {
    toast.warning("Are you sure you want to delete this product?", {
      duration: 8000,

      action: {
        label: "Delete",

        onClick: async () => {
          const toastId = toast.loading("Deleting product, please wait...");

          try {
            await deleteProductApi(id);

            setProducts((prevProducts) =>
              prevProducts.filter((product) => product._id !== id),
            );

            toast.success("Product deleted successfully!", {
              id: toastId,
            });
          } catch (error) {
            console.error("Delete product failed:", error);

            toast.error(
              error.response?.data?.message || "Failed to delete product",
              {
                id: toastId,
              },
            );
          }
        },
      },

      cancel: {
        label: "Cancel",
      },
    });
  };

  /*
  ========================================
  CATEGORY MODAL
  ========================================
  */

  const openAddCategory = () => {
    setEditingCategory(null);
    setCategoryName("");
    setShowCategoryModal(true);
  };

  const openEditCategory = (category) => {
    setEditingCategory(category);
    setCategoryName(category.name || "");
    setShowCategoryModal(true);
  };

  const closeCategoryModal = () => {
    setShowCategoryModal(false);
    setEditingCategory(null);
    setCategoryName("");
  };

  /*
  ========================================
  CATEGORY VALIDATION
  ========================================
  */

  const validateCategoryName = (name) => {
    const trimmedName = name.trim();

    if (!trimmedName) {
      return "Category name is required";
    }

    if (trimmedName.length < 3) {
      return "Category name must be at least 3 characters";
    }

    if (trimmedName.length > 30) {
      return "Category name must not exceed 30 characters";
    }

    const validNameRegex =
      /^[A-Za-z\u0600-\u06FF]+(?:\s+[A-Za-z\u0600-\u06FF]+)*$/u;

    if (!validNameRegex.test(trimmedName)) {
      return "Category name can only contain letters and spaces";
    }

    if (/(.)\1{3,}/u.test(trimmedName)) {
      return "Please enter a valid category name";
    }

    const lettersOnly = trimmedName.replace(/\s/g, "").toLowerCase();

    if (lettersOnly.length >= 3 && new Set(lettersOnly).size === 1) {
      return "Please enter a meaningful category name";
    }

    return "";
  };

  /*
  ========================================
  ADD / EDIT CATEGORY
  ========================================
  */

  const handleCategorySubmit = async (e) => {
    e.preventDefault();

    const trimmedName = categoryName.trim();

    const validationError = validateCategoryName(trimmedName);

    if (validationError) {
      toast.error(validationError);
      return;
    }

    const duplicateCategory = categories.some(
      (category) =>
        category.name?.trim().toLowerCase() === trimmedName.toLowerCase() &&
        category._id !== editingCategory?._id,
    );

    if (duplicateCategory) {
      toast.error("This category already exists");
      return;
    }

    const toastId = toast.loading(
      editingCategory
        ? "Updating category, please wait..."
        : "Adding category, please wait...",
    );

    try {
      if (editingCategory) {
        const response = await updateCategoryApi(editingCategory._id, {
          name: trimmedName,
        });

        const updatedCategory = response.data;

        setCategories((prevCategories) =>
          prevCategories.map((category) =>
            category._id === editingCategory._id ? updatedCategory : category,
          ),
        );

        toast.success("Category updated successfully!", {
          id: toastId,
        });
      } else {
        const response = await createCategory({
          name: trimmedName,
        });

        const newCategory = response.data;

        setCategories((prevCategories) => [...prevCategories, newCategory]);

        setProductForm((prev) => ({
          ...prev,
          category: newCategory._id,
        }));

        toast.success("Category added successfully!", {
          id: toastId,
        });
      }

      closeCategoryModal();
    } catch (error) {
      console.error("Category operation failed:", error);

      console.error("Backend response:", error.response?.data);

      toast.error(
        error.response?.data?.message ||
          "Something went wrong while saving the category",
        {
          id: toastId,
        },
      );
    }
  };

  /*
  ========================================
  DELETE CATEGORY
  ========================================
  */

  const handleDeleteCategory = (id) => {
    toast.warning("Are you sure you want to delete this category?", {
      description: "Categories containing products cannot be deleted.",
      duration: 8000,

      action: {
        label: "Delete",

        onClick: async () => {
          const toastId = toast.loading("Deleting category, please wait...");

          try {
            await deleteCategoryApi(id);

            setCategories((prevCategories) =>
              prevCategories.filter((category) => category._id !== id),
            );

            setProductForm((prev) =>
              prev.category === id
                ? {
                    ...prev,
                    category: "",
                  }
                : prev,
            );

            toast.success("Category deleted successfully!", {
              id: toastId,
            });
          } catch (error) {
            console.error("Delete category failed:", error);

            toast.error(
              error.response?.data?.message || "Failed to delete category",
              {
                id: toastId,
              },
            );
          }
        },
      },

      cancel: {
        label: "Cancel",
      },
    });
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
    {
      name: "Categories",
      icon: FiTag,
    },
    {
      name: "Customers",
      icon: FiUsers,
    },
    {
      name: "Orders",
      icon: FiShoppingBag,
    },
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

  const StatCard = ({ title, value, icon: Icon, trend, description }) => {
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

              <span className="text-xs text-slate-400">{description}</span>
            </div>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-white shadow-lg dark:bg-[#252525]">
            <Icon size={20} />
          </div>
        </div>
      </div>
    );
  };

const renderOrders = () => {
  const pendingCount = orders.filter(
    (order) => order.status === "Pending",
  ).length;

  const shippedCount = orders.filter(
    (order) => order.status === "Shipped",
  ).length;

  const deliveredCount = orders.filter(
    (order) => order.status === "Delivered",
  ).length;

  const canceledCount = orders.filter(
    (order) => order.status === "Canceled",
  ).length;

  const pageSales = orders.reduce(
    (sum, order) => sum + Number(order.total || 0),
    0,
  );

  const getStatusStyle = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800";

      case "Shipped":
        return "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800";

      case "Delivered":
        return "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800";

      case "Canceled":
        return "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800";

      default:
        return "bg-gray-50 text-gray-600 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700";
    }
  };

  const getNextStatusOptions = (status) => {
    if (status === "Pending") {
      return ["Pending", "Shipped", "Canceled"];
    }

    if (status === "Shipped") {
      return ["Shipped", "Delivered"];
    }

    return [status];
  };

  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-400 text-black shadow-sm">
              <FiShoppingBag size={21} />
            </div>

            <div>
              <h1 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white">
                Orders
              </h1>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Manage and track all customer orders.
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={async () => {
            try {
              const response = await getAllOrders({
                page: ordersPage,
                limit: 10,
                status: orderStatusFilter || undefined,
                search: orderSearch || undefined,
              });

              setOrders(response.orders || []);
              setOrdersTotal(response.total || 0);

              toast.success("Orders refreshed");
            } catch (error) {
              console.error("Refresh orders error:", error);

              toast.error(
                error?.response?.data?.message || "Failed to refresh orders",
              );
            }
          }}
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            rounded-xl
            border
            border-gray-200
            bg-white
            px-5
            py-3
            text-sm
            font-bold
            text-gray-700
            shadow-sm
            transition-all
            duration-200
            hover:border-gray-300
            hover:bg-gray-50
            hover:shadow-md
            dark:border-gray-700
            dark:bg-[#1a1a1a]
            dark:text-gray-200
            dark:hover:border-gray-600
            dark:hover:bg-[#222222]
          "
        >
          <FiActivity size={17} />
          Refresh
        </button>
      </div>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Total Orders */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md dark:border-gray-800 dark:bg-[#1a1a1a]">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Total Orders
              </p>

              <h3 className="mt-2 text-2xl font-black text-gray-900 dark:text-white">
                {ordersTotal}
              </h3>

              <p className="mt-1 text-xs text-gray-400">
                All customer orders
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
              <FiShoppingCart size={19} />
            </div>
          </div>
        </div>

        {/* Pending */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md dark:border-gray-800 dark:bg-[#1a1a1a]">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Pending
              </p>

              <h3 className="mt-2 text-2xl font-black text-gray-900 dark:text-white">
                {pendingCount}
              </h3>

              <p className="mt-1 text-xs text-gray-400">
                Waiting for processing
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400">
              <FiClock size={19} />
            </div>
          </div>
        </div>

        {/* Shipped */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md dark:border-gray-800 dark:bg-[#1a1a1a]">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Shipped
              </p>

              <h3 className="mt-2 text-2xl font-black text-gray-900 dark:text-white">
                {shippedCount}
              </h3>

              <p className="mt-1 text-xs text-gray-400">
                On the way to customers
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
              <FiPackage size={19} />
            </div>
          </div>
        </div>

        {/* Delivered */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md dark:border-gray-800 dark:bg-[#1a1a1a]">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Delivered
              </p>

              <h3 className="mt-2 text-2xl font-black text-gray-900 dark:text-white">
                {deliveredCount}
              </h3>

              <p className="mt-1 text-xs text-gray-400">
                Successfully completed
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400">
              <FiCheckCircle size={19} />
            </div>
          </div>
        </div>
      </div>

      {/* ================= FILTER BAR ================= */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-[#1a1a1a]">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          {/* Search */}
          <div className="relative w-full xl:max-w-md">
            <FiSearch
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={orderSearch}
              onChange={(e) => {
                setOrderSearch(e.target.value);
                setOrdersPage(1);
              }}
              placeholder="Search by customer or order ID..."
              className="
                h-12
                w-full
                rounded-xl
                border
                border-gray-200
                bg-gray-50
                pl-11
                pr-4
                text-sm
                font-medium
                text-gray-800
                outline-none
                transition-all
                placeholder:text-gray-400
                focus:border-yellow-400
                focus:bg-white
                focus:ring-4
                focus:ring-yellow-100
                dark:border-gray-700
                dark:bg-[#111111]
                dark:text-white
                dark:placeholder:text-gray-500
                dark:focus:bg-[#111111]
              "
            />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            {/* Status Filter */}
            <div className="relative">
              <select
                value={orderStatusFilter}
                onChange={(e) => {
                  setOrderStatusFilter(e.target.value);
                  setOrdersPage(1);
                }}
                className="
                  h-12
                  min-w-[170px]
                  appearance-none
                  rounded-xl
                  border
                  border-gray-200
                  bg-gray-50
                  px-4
                  pr-10
                  text-sm
                  font-bold
                  text-gray-700
                  outline-none
                  transition-all
                  focus:border-yellow-400
                  focus:bg-white
                  focus:ring-4
                  focus:ring-yellow-100
                  dark:border-gray-700
                  dark:bg-[#111111]
                  dark:text-white
                  dark:focus:bg-[#111111]
                "
              >
                <option value="">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Canceled">Canceled</option>
              </select>

              <FiChevronRight
                size={16}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-gray-400"
              />
            </div>

            {/* Clear */}
            {(orderSearch || orderStatusFilter) && (
              <button
                type="button"
                onClick={() => {
                  setOrderSearch("");
                  setOrderStatusFilter("");
                  setOrdersPage(1);
                }}
                className="
                  inline-flex
                  h-12
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  border-gray-200
                  bg-white
                  px-5
                  text-sm
                  font-bold
                  text-gray-600
                  transition-all
                  hover:border-gray-300
                  hover:bg-gray-50
                  dark:border-gray-700
                  dark:bg-[#1a1a1a]
                  dark:text-gray-300
                  dark:hover:border-gray-600
                  dark:hover:bg-[#222222]
                "
              >
                <FiX size={16} />
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ================= ORDERS TABLE ================= */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-gray-800 dark:bg-[#1a1a1a]">
        {/* Table Header */}
        <div className="border-b border-gray-100 px-6 py-5 dark:border-gray-800">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-black text-gray-900 dark:text-white">
                All Orders
              </h2>

              <p className="mt-1 text-xs text-gray-400">
                Review products, customers, payment and order status.
              </p>
            </div>

            <div className="rounded-lg bg-gray-50 px-3 py-2 text-xs font-bold text-gray-500 dark:bg-gray-800 dark:text-gray-300">
              {orders.length} orders on this page
            </div>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="flex min-h-[360px] flex-col items-center justify-center px-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500">
              <FiShoppingBag size={28} />
            </div>

            <h3 className="mt-5 text-lg font-black text-gray-800 dark:text-white">
              No orders found
            </h3>

            <p className="mt-2 max-w-sm text-sm leading-6 text-gray-400">
              There are no orders matching your current search or filter.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px]">
              <thead>
                <tr className="border-b border-gray-100 bg-[#fafafa] dark:border-gray-800 dark:bg-[#151515]">
                  <th className="px-6 py-4 text-left text-[11px] font-black uppercase tracking-wider text-gray-400">
                    Order
                  </th>

                  <th className="px-6 py-4 text-left text-[11px] font-black uppercase tracking-wider text-gray-400">
                    Customer
                  </th>

                  <th className="px-6 py-4 text-left text-[11px] font-black uppercase tracking-wider text-gray-400">
                    Products
                  </th>

                  <th className="px-6 py-4 text-left text-[11px] font-black uppercase tracking-wider text-gray-400">
                    Total
                  </th>

                  <th className="px-6 py-4 text-left text-[11px] font-black uppercase tracking-wider text-gray-400">
                    Payment
                  </th>

                  <th className="px-6 py-4 text-left text-[11px] font-black uppercase tracking-wider text-gray-400">
                    Status
                  </th>

                  <th className="px-6 py-4 text-left text-[11px] font-black uppercase tracking-wider text-gray-400">
                    Date
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {orders.map((order) => (
                  <tr
                    key={order._id}
                    className="group transition-colors duration-200 hover:bg-[#fffdf5] dark:hover:bg-[#202020]"
                  >
                    {/* ORDER */}
                    <td className="px-6 py-5 align-top">
                      <div>
                        <p className="font-mono text-xs font-black text-gray-900 dark:text-white">
                          #{order._id?.slice(-8).toUpperCase()}
                        </p>

                        <p className="mt-1 text-[11px] text-gray-400">
                          {order.items?.length || 0} product
                          {(order.items?.length || 0) !== 1 ? "s" : ""}
                        </p>
                      </div>
                    </td>

                    {/* CUSTOMER */}
                    <td className="px-6 py-5 align-top">
                      <div className="max-w-[180px]">
                        <p className="truncate text-sm font-black text-gray-800 dark:text-gray-100">
                          {order.user?.name || "Unknown Customer"}
                        </p>

                        <p className="mt-1 truncate text-xs text-gray-400">
                          {order.user?.email || "No email"}
                        </p>
                      </div>
                    </td>

                    {/* PRODUCTS */}
                    <td className="px-6 py-5 align-top">
                      <div className="space-y-3">
                        {order.items?.map((item, index) => {
                          const product = item.product;

                          const productImage =
                            typeof product?.images?.[0] === "string"
                              ? product.images[0]
                              : product?.images?.[0]?.url || "";

                          console.log("ORDER PRODUCT:", product);
                          console.log(
                            "ORDER PRODUCT IMAGES:",
                            product?.images,
                          );
                          console.log(
                            "ORDER FIRST IMAGE:",
                            product?.images?.[0],
                          );
                          console.log("ORDER IMAGE URL:", productImage);

                          return (
                            <div
                              key={`${order._id}-${product?._id || index}`}
                              className="flex min-w-[280px] items-center gap-3"
                            >
                              <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
                                {productImage ? (
                                  <img
                                    src={productImage}
                                    alt={product?.name || "Product"}
                                    className="h-full w-full object-cover"
                                    onError={(e) => {
                                      console.log(
                                        "IMAGE FAILED:",
                                        productImage,
                                      );

                                      e.currentTarget.style.display = "none";
                                    }}
                                  />
                                ) : (
                                  <div className="flex h-full w-full items-center justify-center text-gray-300 dark:text-gray-500">
                                    <FiPackage size={18} />
                                  </div>
                                )}
                              </div>

                              <div className="min-w-0">
                                <p className="max-w-[220px] truncate text-sm font-bold text-gray-800 dark:text-gray-100">
                                  {product?.name || "Product unavailable"}
                                </p>

                                <div className="mt-1 flex items-center gap-2 text-xs text-gray-400">
                                  <span>
                                    Qty:{" "}
                                    <span className="font-bold text-gray-600 dark:text-gray-300">
                                      {item.quantity}
                                    </span>
                                  </span>

                                  <span>•</span>

                                  <span>
                                    {Number(item.price || 0).toFixed(2)} EGP
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </td>

                    {/* TOTAL */}
                    <td className="px-6 py-5 align-top">
                      <p className="whitespace-nowrap text-sm font-black text-gray-900 dark:text-white">
                        {Number(order.total || 0).toFixed(2)} EGP
                      </p>
                    </td>

                    {/* PAYMENT */}
                    <td className="px-6 py-5 align-top">
                      <div className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 dark:border-gray-700 dark:bg-gray-800">
                        <span className="text-sm">💵</span>

                        <span className="text-xs font-bold text-gray-600 dark:text-gray-300">
                          {order.paymentMethod === "COD"
                            ? "Cash on Delivery"
                            : order.paymentMethod || "N/A"}
                        </span>
                      </div>
                    </td>

                    {/* STATUS */}
                    <td className="px-6 py-5 align-top">
                      <div className="flex flex-col items-start gap-2">
                        <span
                          className={`
                            inline-flex
                            items-center
                            rounded-full
                            border
                            px-3
                            py-1.5
                            text-[11px]
                            font-black
                            ${getStatusStyle(order.status)}
                          `}
                        >
                          {order.status}
                        </span>

                        {order.status !== "Delivered" &&
                          order.status !== "Canceled" && (
                            <select
                              value={order.status}
                              onChange={(e) =>
                                handleOrderStatusChange(
                                  order._id,
                                  e.target.value,
                                )
                              }
                              className="
                                rounded-lg
                                border
                                border-gray-200
                                bg-white
                                px-2.5
                                py-2
                                text-xs
                                font-bold
                                text-gray-600
                                outline-none
                                transition-all
                                focus:border-yellow-400
                                focus:ring-2
                                focus:ring-yellow-100
                                dark:border-gray-700
                                dark:bg-[#111111]
                                dark:text-gray-200
                              "
                            >
                              {getNextStatusOptions(order.status).map(
                                (status) => (
                                  <option key={status} value={status}>
                                    {status}
                                  </option>
                                ),
                              )}
                            </select>
                          )}
                      </div>
                    </td>

                    {/* DATE */}
                    <td className="px-6 py-5 align-top">
                      <div className="whitespace-nowrap">
                        <p className="text-sm font-bold text-gray-700 dark:text-gray-200">
                          {order.createdAt
                            ? new Date(order.createdAt).toLocaleDateString(
                                "en-GB",
                              )
                            : "—"}
                        </p>

                        <p className="mt-1 text-xs text-gray-400">
                          {order.createdAt
                            ? new Date(order.createdAt).toLocaleTimeString(
                                [],
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                },
                              )
                            : ""}
                        </p>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ================= PAGINATION ================= */}
        {ordersTotal > 10 && (
          <div className="flex flex-col gap-4 border-t border-gray-100 px-6 py-5 sm:flex-row sm:items-center sm:justify-between dark:border-gray-800">
            <p className="text-xs font-medium text-gray-400">
              Showing{" "}
              <span className="font-bold text-gray-700 dark:text-gray-200">
                {(ordersPage - 1) * 10 + 1}
              </span>{" "}
              -{" "}
              <span className="font-bold text-gray-700 dark:text-gray-200">
                {Math.min(ordersPage * 10, ordersTotal)}
              </span>{" "}
              of{" "}
              <span className="font-bold text-gray-700 dark:text-gray-200">
                {ordersTotal}
              </span>{" "}
              orders
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={ordersPage === 1}
                onClick={() => setOrdersPage((prev) => prev - 1)}
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-gray-200
                  bg-white
                  text-gray-600
                  transition-all
                  hover:bg-gray-50
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                  dark:border-gray-700
                  dark:bg-[#1a1a1a]
                  dark:text-gray-300
                  dark:hover:bg-[#222222]
                "
              >
                <FiChevronRight size={17} className="rotate-180" />
              </button>

              <div className="flex h-10 min-w-10 items-center justify-center rounded-lg bg-yellow-400 px-3 text-sm font-black text-black">
                {ordersPage}
              </div>

              <button
                type="button"
                disabled={ordersPage * 10 >= ordersTotal}
                onClick={() => setOrdersPage((prev) => prev + 1)}
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-gray-200
                  bg-white
                  text-gray-600
                  transition-all
                  hover:bg-gray-50
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                  dark:border-gray-700
                  dark:bg-[#1a1a1a]
                  dark:text-gray-300
                  dark:hover:bg-[#222222]
                "
              >
                <FiChevronRight size={17} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ================= SMALL SUMMARY ================= */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="rounded-xl border border-gray-100 bg-white px-4 py-4 shadow-sm dark:border-gray-800 dark:bg-[#1a1a1a]">
          <p className="text-xs font-bold text-gray-400">Pending</p>

          <p className="mt-1 text-lg font-black text-yellow-600">
            {pendingCount}
          </p>
        </div>

        <div className="rounded-xl border border-gray-100 bg-white px-4 py-4 shadow-sm dark:border-gray-800 dark:bg-[#1a1a1a]">
          <p className="text-xs font-bold text-gray-400">Shipped</p>

          <p className="mt-1 text-lg font-black text-blue-600">
            {shippedCount}
          </p>
        </div>

        <div className="rounded-xl border border-gray-100 bg-white px-4 py-4 shadow-sm dark:border-gray-800 dark:bg-[#1a1a1a]">
          <p className="text-xs font-bold text-gray-400">Delivered</p>

          <p className="mt-1 text-lg font-black text-green-600">
            {deliveredCount}
          </p>
        </div>

        <div className="rounded-xl border border-gray-100 bg-white px-4 py-4 shadow-sm dark:border-gray-800 dark:bg-[#1a1a1a]">
          <p className="text-xs font-bold text-gray-400">Page Sales</p>

          <p className="mt-1 text-lg font-black text-gray-900 dark:text-white">
            {pageSales.toFixed(2)} EGP
          </p>
        </div>
      </div>
    </div>
  );
};


const renderSettings = () => {
  const handleFooterChange = (e) => {
    const { name, value } = e.target;

    setFooterSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFooterSave = async (e) => {
    e.preventDefault();

    try {
      setFooterSaving(true);

      const response = await updateFooterSettings(footerSettings);

      setFooterSettings(response.data);

      toast.success("settings saved successfully");
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message || "Failed to save footer settings",
      );
    } finally {
      setFooterSaving(false);
    }
  };

  return (
    <div className="min-h-full bg-[#f7f7f7] p-4 sm:p-6 lg:p-8 dark:bg-[#111111]">
      {/* Page Header */}
      <div className="mb-7">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#ffcf00]" />

              <span className="text-xs font-bold uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400">
                Store Configuration
              </span>
            </div>

            <h1 className="text-2xl font-black tracking-tight text-gray-900 sm:text-3xl dark:text-white">
              Settings
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500 dark:text-gray-400">
              Manage the contact information and social media links displayed
              in your Shoply footer.
            </p>
          </div>

          <div className="hidden rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm sm:block dark:border-gray-700 dark:bg-[#1a1a1a]">
            <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
              Status
            </p>

            <p className="mt-1 flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              Active
            </p>
          </div>
        </div>
      </div>

      {/* Main Card */}
      <form onSubmit={handleFooterSave}>
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-[#1a1a1a]">
          {/* Card Header */}
          <div className="border-b border-gray-100 px-5 py-5 sm:px-7 dark:border-gray-800">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#fff7cc] text-[#d5a900]">
                <FiSettings className="text-xl" />
              </div>

              <div>
                <h2 className="text-base font-extrabold text-gray-900 dark:text-white">
                  Contact Information
                </h2>

                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Update the information your customers see in the website
                  footer.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="p-5 sm:p-7">
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
              {/* Phone */}
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Phone Number
                </label>

                <div className="group relative">
                  <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition group-focus-within:text-gray-900 dark:group-focus-within:text-white" />

                  <input
                    type="tel"
                    name="phone"
                    value={footerSettings.phone}
                    onChange={handleFooterChange}
                    placeholder="01092362189"
                    className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pl-11 pr-4 text-sm font-medium text-gray-900 outline-none transition placeholder:text-gray-300 hover:border-gray-300 focus:border-gray-900 focus:ring-4 focus:ring-gray-100 dark:border-gray-700 dark:bg-[#111111] dark:text-white dark:placeholder:text-gray-600 dark:hover:border-gray-600 dark:focus:border-gray-500 dark:focus:ring-gray-800"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Email Address
                </label>

                <div className="group relative">
                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition group-focus-within:text-gray-900 dark:group-focus-within:text-white" />

                  <input
                    type="email"
                    name="email"
                    value={footerSettings.email}
                    onChange={handleFooterChange}
                    placeholder="support@shoply.com"
                    className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pl-11 pr-4 text-sm font-medium text-gray-900 outline-none transition placeholder:text-gray-300 hover:border-gray-300 focus:border-gray-900 focus:ring-4 focus:ring-gray-100 dark:border-gray-700 dark:bg-[#111111] dark:text-white dark:placeholder:text-gray-600 dark:hover:border-gray-600 dark:focus:border-gray-500 dark:focus:ring-gray-800"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Location
                </label>

                <div className="group relative">
                  <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition group-focus-within:text-gray-900 dark:group-focus-within:text-white" />

                  <input
                    type="text"
                    name="location"
                    value={footerSettings.location}
                    onChange={handleFooterChange}
                    placeholder="Egypt"
                    className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pl-11 pr-4 text-sm font-medium text-gray-900 outline-none transition placeholder:text-gray-300 hover:border-gray-300 focus:border-gray-900 focus:ring-4 focus:ring-gray-100 dark:border-gray-700 dark:bg-[#111111] dark:text-white dark:placeholder:text-gray-600 dark:hover:border-gray-600 dark:focus:border-gray-500 dark:focus:ring-gray-800"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="border-t border-gray-100 dark:border-gray-800">
            <div className="px-5 py-5 sm:px-7">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#fff7cc] text-[#d5a900]">
                  <FiInstagram className="text-xl" />
                </div>

                <div>
                  <h2 className="text-base font-extrabold text-gray-900 dark:text-white">
                    Social Media
                  </h2>

                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Add or update the social media links displayed in the
                    footer.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 border-t border-gray-100 p-5 sm:grid-cols-2 sm:p-7 dark:border-gray-800">
              {/* Facebook */}
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Facebook
                </label>

                <div className="group relative">
                  <FiFacebook className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition group-focus-within:text-gray-900 dark:group-focus-within:text-white" />

                  <input
                    type="url"
                    name="facebook"
                    value={footerSettings.facebook}
                    onChange={handleFooterChange}
                    placeholder="https://facebook.com/..."
                    className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pl-11 pr-4 text-sm font-medium text-gray-900 outline-none transition placeholder:text-gray-300 hover:border-gray-300 focus:border-gray-900 focus:ring-4 focus:ring-gray-100 dark:border-gray-700 dark:bg-[#111111] dark:text-white dark:placeholder:text-gray-600 dark:hover:border-gray-600 dark:focus:border-gray-500 dark:focus:ring-gray-800"
                  />
                </div>
              </div>

              {/* Instagram */}
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Instagram
                </label>

                <div className="group relative">
                  <FiInstagram className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition group-focus-within:text-gray-900 dark:group-focus-within:text-white" />

                  <input
                    type="url"
                    name="instagram"
                    value={footerSettings.instagram}
                    onChange={handleFooterChange}
                    placeholder="https://instagram.com/..."
                    className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pl-11 pr-4 text-sm font-medium text-gray-900 outline-none transition placeholder:text-gray-300 hover:border-gray-300 focus:border-gray-300 focus:ring-4 focus:ring-gray-100 dark:border-gray-700 dark:bg-[#111111] dark:text-white dark:placeholder:text-gray-600 dark:hover:border-gray-600 dark:focus:border-gray-500 dark:focus:ring-gray-800"
                  />
                </div>
              </div>

              {/* Twitter */}
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  X / Twitter
                </label>

                <div className="group relative">
                  <FiTwitter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition group-focus-within:text-gray-900 dark:group-focus-within:text-white" />

                  <input
                    type="url"
                    name="twitter"
                    value={footerSettings.twitter}
                    onChange={handleFooterChange}
                    placeholder="https://x.com/..."
                    className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pl-11 pr-4 text-sm font-medium text-gray-900 outline-none transition placeholder:text-gray-300 hover:border-gray-300 focus:border-gray-300 focus:ring-4 focus:ring-gray-100 dark:border-gray-700 dark:bg-[#111111] dark:text-white dark:placeholder:text-gray-600 dark:hover:border-gray-600 dark:focus:border-gray-500 dark:focus:ring-gray-800"
                  />
                </div>
              </div>

              {/* YouTube */}
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  YouTube
                </label>

                <div className="group relative">
                  <FiYoutube className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition group-focus-within:text-gray-900 dark:group-focus-within:text-white" />

                  <input
                    type="url"
                    name="youtube"
                    value={footerSettings.youtube}
                    onChange={handleFooterChange}
                    placeholder="https://youtube.com/..."
                    className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pl-11 pr-4 text-sm font-medium text-gray-900 outline-none transition placeholder:text-gray-300 hover:border-gray-300 focus:border-gray-900 focus:ring-4 focus:ring-gray-100 dark:border-gray-700 dark:bg-[#111111] dark:text-white dark:placeholder:text-gray-600 dark:hover:border-gray-600 dark:focus:border-gray-500 dark:focus:ring-gray-800"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Action */}
          <div className="flex flex-col gap-4 border-t border-gray-100 bg-[#fafafa] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7 dark:border-gray-800 dark:bg-[#151515]">
            <div>
              <p className="text-sm font-bold text-gray-900 dark:text-white">
                Save your changes
              </p>

              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                These settings will appear on the storefront footer.
              </p>
            </div>

            <button
              type="submit"
              disabled={footerSaving}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#ffcf00] px-7 py-3.5 text-sm font-extrabold text-gray-950 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-[#f5c500] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
            >
              <FiSave className="text-base" />

              {footerSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </form>
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

    const formattedDate = today.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });

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
                Here&apos;s what&apos;s happening with your store today.
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

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total Products"
            value={productsLoading ? "..." : totalProducts}
            icon={FiBox}
            trend="+4.5%"
            description="this month"
          />

          <StatCard
            title="Categories"
            value={categoriesLoading ? "..." : categories.length}
            icon={FiTag}
            trend="+2"
            description="available"
          />

          <StatCard
            title="Customers"
            value={usersLoading ? "..." : totalCustomers}
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
        </div>
        <br />

        <div className="mb-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-[#2a2a2a] dark:bg-[#1a1a1a]">
          {/* Header */}
          <div className="flex flex-col gap-4 border-b border-slate-100 p-6 sm:flex-row sm:items-center sm:justify-between dark:border-[#2a2a2a]">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-white shadow-sm dark:bg-emerald-500/10 dark:text-emerald-400">
                <FiBarChart2 size={19} />
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-950 dark:text-white">
                  Sales Performance
                </h2>

                <p className="mt-1 text-sm text-slate-500 dark:text-gray-400">
                  {salesLoading
                    ? "Loading..."
                    : `${totalYearSales.toLocaleString()} EGP total revenue in ${currentYear}`}
                </p>
              </div>
            </div>

            {salesGrowth !== null && (
              <div
                className={`flex items-center gap-1.5 self-start rounded-full px-3 py-1.5 text-xs font-bold sm:self-auto ${
                  salesGrowth >= 0
                    ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400"
                    : "bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400"
                }`}
              >
                <FiTrendingUp
                  size={13}
                  className={salesGrowth < 0 ? "rotate-180" : ""}
                />
                {salesGrowth >= 0 ? "+" : ""}
                {salesGrowth.toFixed(1)}% vs last month
              </div>
            )}
          </div>

          {/* Quick stats strip - derived from the same real salesData */}
          <div className="grid grid-cols-3 divide-x divide-slate-100 border-b border-slate-100 dark:divide-[#2a2a2a] dark:border-[#2a2a2a]">
            <div className="p-5">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                This Month
              </p>

              <p className="mt-1 text-base font-bold text-slate-950 sm:text-lg dark:text-white">
                {currentMonthSales.toLocaleString()} EGP
              </p>
            </div>

            <div className="p-5">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Avg / Month
              </p>

              <p className="mt-1 text-base font-bold text-slate-950 sm:text-lg dark:text-white">
                {Math.round(totalYearSales / 12).toLocaleString()} EGP
              </p>
            </div>

            <div className="p-5">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Best Month
              </p>

              <p className="mt-1 text-base font-bold text-slate-950 sm:text-lg dark:text-white">
                {salesData.reduce(
                  (best, item) => (item.revenue > best.revenue ? item : best),
                  salesData[0] || { month: "—", revenue: 0 },
                ).month}
              </p>
            </div>
          </div>

          {/* Chart */}
          <div className="p-6">
            <div className="relative flex h-64 items-end gap-2 sm:gap-4">
              {/* Grid lines */}
              <div className="pointer-events-none absolute inset-0 flex flex-col justify-between">
                {[0, 1, 2, 3].map((line) => (
                  <div
                    key={line}
                    className="h-px w-full bg-slate-100 dark:bg-[#232323]"
                  />
                ))}
              </div>

              {salesData.map((item, index) => {
                const isCurrentMonth = index === currentMonthIndex;

                return (
                  <div
                    key={item.month}
                    className="group relative z-10 flex h-full flex-1 flex-col items-center justify-end"
                  >
                    <div className="relative flex w-full flex-1 items-end justify-center">
                      <div
                        className={`w-full max-w-8 rounded-t-lg transition-all duration-500 ${
                          isCurrentMonth
                            ? "bg-gradient-to-t from-emerald-600 to-emerald-400 shadow-lg shadow-emerald-500/30"
                            : "bg-gradient-to-t from-slate-800 to-slate-600 group-hover:from-emerald-600 group-hover:to-emerald-400 dark:from-slate-600 dark:to-slate-400"
                        }`}
                        style={{ height: `${item.height}%` }}
                      >
                        <span className="pointer-events-none absolute -top-14 left-1/2 z-20 hidden -translate-x-1/2 whitespace-nowrap rounded-lg bg-slate-950 px-3 py-2 text-[11px] font-semibold text-white shadow-xl group-hover:block dark:bg-black">
                          <span className="block">
                            {item.revenue.toLocaleString()} EGP
                          </span>

                          <span className="block text-[10px] font-normal text-slate-300">
                            {item.orders} order{item.orders !== 1 ? "s" : ""}
                          </span>

                          <span className="absolute left-1/2 top-full -mt-1 h-2 w-2 -translate-x-1/2 rotate-45 bg-slate-950 dark:bg-black" />
                        </span>
                      </div>
                    </div>

                    <span
                      className={`mt-3 text-[11px] font-medium ${
                        isCurrentMonth
                          ? "font-bold text-emerald-600 dark:text-emerald-400"
                          : "text-slate-400"
                      }`}
                    >
                      {item.month}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

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
              onClick={() => setActivePage("Products")}
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
                  <th className="px-6 py-4 font-semibold">Product</th>

                  <th className="px-6 py-4 font-semibold">Category</th>

                  <th className="px-6 py-4 font-semibold">Price</th>

                  <th className="px-6 py-4 font-semibold">Stock</th>

                  <th className="px-6 py-4 font-semibold">Rating</th>
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
                  products.slice(0, 5).map((product) => (
                    <tr
                      key={product._id}
                      className="border-b border-slate-50 transition hover:bg-slate-50 dark:border-[#2a2a2a] dark:hover:bg-[#222]"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={
                              product.images?.[0]?.url ||
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
                        {getCategoryName(product.category)}
                      </td>

                      <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">
                        ${Number(product.price || 0).toFixed(2)}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            Number(product.stock || 0) <= 10
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
                          {averageRating}
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
              onChange={(e) => setSearchTerm(e.target.value)}
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
                  <th className="px-6 py-4">Product</th>

                  <th className="px-6 py-4">Category</th>

                  <th className="px-6 py-4">Price</th>

                  <th className="px-6 py-4">Stock</th>

                  <th className="px-6 py-4">Rating</th>

                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {productsLoading ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-16 text-center">
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
                  filteredProducts.map((product) => (
                    <tr
                      key={product._id}
                      className="border-b border-slate-50 transition hover:bg-slate-50 dark:border-[#2a2a2a] dark:hover:bg-[#222]"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={
                              product.images?.[0]?.url ||
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
                        {getCategoryName(product.category)}
                      </td>

                      <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">
                        ${Number(product.price || 0).toFixed(2)}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            Number(product.stock || 0) <= 10
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
    {product.rate ? Number(product.rate).toFixed(1) : "—"}
  </span>
</td>

                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => openEditProduct(product)}
                            className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-700 transition hover:bg-slate-900 hover:text-white dark:bg-[#252525] dark:text-gray-300 dark:hover:bg-white dark:hover:text-slate-950"
                          >
                            <FiEdit3 size={15} />
                          </button>

                          <button
                            onClick={() => handleDeleteProduct(product._id)}
                            className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-500 transition hover:bg-red-500 hover:text-white dark:bg-red-950/30 dark:text-red-400"
                          >
                            <FiTrash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}

                {!productsLoading &&
                  !productError &&
                  filteredProducts.length === 0 && (
                    <tr>
                      <td colSpan="6" className="px-6 py-16 text-center">
                        <FiBox
                          className="mx-auto text-slate-300 dark:text-gray-600"
                          size={40}
                        />

                        <p className="mt-3 text-sm font-semibold text-slate-700 dark:text-gray-300">
                          No products found
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          Try another search or add a new product.
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
  CATEGORIES PAGE
  ========================================
  */

  const renderCategories = () => {
    return (
      <>
        <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-gray-400">
              Store Management
            </p>

            <h1 className="mt-1 text-3xl font-bold text-slate-950 dark:text-white">
              Categories
            </h1>

            <p className="mt-2 text-sm text-slate-500 dark:text-gray-400">
              Organize your products into clear categories.
            </p>
          </div>

          <button
            onClick={openAddCategory}
            className="flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-800"
          >
            <FiPlus size={18} />
            Add Category
          </button>
        </div>

        <div className="mb-6 grid gap-5 sm:grid-cols-2">
          <StatCard
            title="Total Categories"
            value={categoriesLoading ? "..." : categories.length}
            icon={FiTag}
            description="available"
          />

          <StatCard
            title="Total Products"
            value={productsLoading ? "..." : totalProducts}
            icon={FiBox}
            description="across all categories"
          />
        </div>

        <div className="mb-6 flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <FiSearch
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />

            <input
              type="text"
              value={categorySearch}
              onChange={(e) => setCategorySearch(e.target.value)}
              placeholder="Search categories..."
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100 dark:border-[#2a2a2a] dark:bg-[#1a1a1a] dark:text-white dark:placeholder:text-gray-500 dark:focus:border-gray-500 dark:focus:ring-[#222]"
            />
          </div>

          <div className="flex items-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-600 dark:border-[#2a2a2a] dark:bg-[#1a1a1a] dark:text-gray-300">
            {filteredCategories.length} categories
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-[#2a2a2a] dark:bg-[#1a1a1a]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-400 dark:border-[#2a2a2a] dark:bg-[#171717]">
                  <th className="px-6 py-4">Category</th>

                  <th className="px-6 py-4">Products</th>

                  <th className="px-6 py-4">Status</th>

                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {categoriesLoading ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-16 text-center">
                      <FiTag
                        className="mx-auto animate-pulse text-slate-300"
                        size={40}
                      />

                      <p className="mt-3 text-sm font-semibold text-slate-700 dark:text-gray-300">
                        Loading categories...
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredCategories.map((category) => {
                    const categoryProducts = products.filter((product) => {
                      const productCategory =
                        typeof product.category === "object"
                          ? product.category?._id
                          : product.category;

                      return productCategory === category._id;
                    });

                    return (
                      <tr
                        key={category._id}
                        className="border-b border-slate-50 transition hover:bg-slate-50 dark:border-[#2a2a2a] dark:hover:bg-[#222]"
                      >
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-white shadow-sm dark:bg-[#252525]">
                              <FiTag size={18} />
                            </div>

                            <div>
                              <p className="text-sm font-bold text-slate-900 dark:text-white">
                                {category.name}
                              </p>

                              <p className="mt-1 text-xs text-slate-400">
                                Category
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-5">
                          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-[#252525] dark:text-gray-300">
                            {categoryProducts.length} products
                          </span>
                        </td>

                        <td className="px-6 py-5">
                          <span className="flex items-center gap-2 text-xs font-semibold text-emerald-600">
                            <span className="h-2 w-2 rounded-full bg-emerald-500" />
                            Active
                          </span>
                        </td>

                        <td className="px-6 py-5">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => openEditCategory(category)}
                              className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-700 transition hover:bg-slate-900 hover:text-white dark:bg-[#252525] dark:text-gray-300 dark:hover:bg-white dark:hover:text-slate-950"
                            >
                              <FiEdit3 size={15} />
                            </button>

                            <button
                              onClick={() => handleDeleteCategory(category._id)}
                              className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-500 transition hover:bg-red-500 hover:text-white dark:bg-red-950/30 dark:text-red-400"
                            >
                              <FiTrash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}

                {!categoriesLoading && filteredCategories.length === 0 && (
                  <tr>
                    <td colSpan="4" className="px-6 py-16 text-center">
                      <FiTag
                        className="mx-auto text-slate-300 dark:text-gray-600"
                        size={40}
                      />

                      <p className="mt-3 text-sm font-semibold text-slate-700 dark:text-gray-300">
                        No categories found
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        Add a new category to organize your products.
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
    const customerUsers = users.filter((user) => user.role === "Buyer");

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
            Manage your registered customers and their account information.
          </p>
        </div>

        <div className="mb-6 grid gap-5 sm:grid-cols-3">
          <StatCard
            title="Total Customers"
            value={usersLoading ? "..." : totalCustomers}
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
          <div className="border-b border-slate-100 bg-white px-6 py-5 dark:border-[#2a2a2a] dark:bg-[#1a1a1a]">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-base font-bold text-slate-950 dark:text-white">
                  Customer Directory
                </h2>

                <p className="mt-1 text-xs text-slate-400">
                  {usersLoading
                    ? "Loading customer accounts..."
                    : `${customerUsers.length} customer accounts`}
                </p>
              </div>

              <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 dark:bg-[#171717]">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />

                <span className="text-xs font-semibold text-slate-600 dark:text-gray-300">
                  Live data
                </span>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px]">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-400 dark:border-[#2a2a2a] dark:bg-[#171717]">
                  <th className="px-6 py-4">Customer</th>

                  <th className="px-6 py-4">Email</th>

                  <th className="px-6 py-4">Role</th>

                  <th className="px-6 py-4">Joined</th>

                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>

              <tbody>
                {usersLoading ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-16 text-center">
                      <FiUsers
                        className="mx-auto animate-pulse text-slate-300 dark:text-gray-600"
                        size={42}
                      />

                      <p className="mt-3 text-sm font-semibold text-slate-700 dark:text-gray-300">
                        Loading customers...
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        Getting customer data from the server
                      </p>
                    </td>
                  </tr>
                ) : (
                  customerUsers.map((user, index) => {
                    const joinedDate = user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "—";

                    const initials =
                      user.name
                        ?.split(" ")
                        .filter(Boolean)
                        .slice(0, 2)
                        .map((part) => part.charAt(0).toUpperCase())
                        .join("") || "U";

                    return (
                      <tr
                        key={`${user._id || user.email}-${index}`}
                        className="group border-b border-slate-50 transition-all duration-200 hover:bg-slate-50 dark:border-[#2a2a2a] dark:hover:bg-[#222]"
                      >
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-xs font-bold text-white shadow-sm transition-transform duration-200 group-hover:scale-105 dark:bg-[#252525]">
                              {initials}
                            </div>

                            <div className="min-w-0">
                              <p className="truncate text-sm font-bold text-slate-900 dark:text-white">
                                {user.name || "Unnamed Customer"}
                              </p>

                              <p className="mt-1 text-xs text-slate-400">
                                Customer account
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-5">
                          <span className="text-sm text-slate-600 dark:text-gray-400">
                            {user.email}
                          </span>
                        </td>

                        <td className="px-6 py-5">
                          <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:bg-[#252525] dark:text-gray-300">
                            {user.role === "Buyer" ? "Customer" : user.role}
                          </span>
                        </td>

                        <td className="px-6 py-5">
                          <span className="text-sm text-slate-500 dark:text-gray-400">
                            {joinedDate}
                          </span>
                        </td>

                        <td className="px-6 py-5">
                          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            Active
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {!usersLoading && customerUsers.length === 0 && (
            <div className="px-6 py-16 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-[#252525] dark:text-gray-500">
                <FiUsers size={28} />
              </div>

              <p className="mt-4 text-sm font-semibold text-slate-700 dark:text-gray-300">
                No customers yet
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Registered customers will appear here automatically.
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

  /*
  ========================================
  OTHER PAGES
  ========================================
  */

  const renderPlaceholder = (title, description, Icon) => {
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

      case "Categories":
        return renderCategories();

      case "Orders":
        return renderOrders();

      case "Customers":
        return renderCustomers();

      case "Analytics":
        return renderPlaceholder(
          "Analytics",
          "Advanced sales analytics, revenue insights, product performance and customer behavior will live here.",
          FiBarChart2,
        );

      case "Payments":
        return renderPlaceholder(
          "Payments",
          "Payment tracking, transactions, refunds and financial reports will live here.",
          FiDollarSign,
        );

      case "Settings":
        return renderSettings();

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
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}

        <div className="flex h-20 items-center border-b border-white/10 px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-400 text-slate-950 shadow-lg">
              <FiShoppingBag size={20} />
            </div>

            <div onClick={() => navigate("/")} className="cursor-pointer">
              <h2 className="text-xl font-black tracking-tight">Shoply</h2>

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

              const active = activePage === item.name;

              return (
                <button
                  key={item.name}
                  onClick={() => handleMenuClick(item.name)}
                  className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all ${
                    active
                      ? "bg-white text-slate-950 shadow-lg"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon
                    size={18}
                    className={`transition-transform ${
                      active ? "" : "group-hover:scale-110"
                    }`}
                  />

                  <span>{item.name}</span>

                  {item.name === "Products" && lowStockProducts.length > 0 && (
                    <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                      {lowStockProducts.length}
                    </span>
                  )}

                  {item.name === "Categories" && categories.length > 0 && (
                    <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-yellow-400 px-1 text-[10px] font-bold text-slate-950">
                      {categories.length}
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
              {adminName.charAt(0).toUpperCase()}
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">
                {adminName}
              </p>

              <p className="text-xs text-slate-500">Administrator</p>
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
            <div className="hidden h-8 w-px bg-slate-200 dark:bg-[#2a2a2a] sm:block" />

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-sm font-bold text-white dark:bg-[#252525]">
              {adminName.charAt(0).toUpperCase()}
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
                  {editingProduct ? "Edit Product" : "Add New Product"}
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

            <form onSubmit={handleProductSubmit} className="space-y-5 p-6">
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

                  <select
                    name="category"
                    value={productForm.category}
                    onChange={handleProductChange}
                    disabled={categoriesLoading}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100 dark:border-[#2a2a2a] dark:bg-[#171717] dark:text-white dark:placeholder:text-gray-500 dark:focus:border-gray-500 dark:focus:ring-[#222]"
                  >
                    <option value="">
                      {categoriesLoading
                        ? "Loading categories..."
                        : "Select category"}
                    </option>

                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>

                  <button
                    type="button"
                    onClick={openAddCategory}
                    className="mt-2 flex items-center gap-1 text-xs font-semibold text-slate-500 transition hover:text-emerald-600 dark:text-gray-400"
                  >
                    <FiPlus size={13} />
                    Add new category
                  </button>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-gray-400">
                    Price
                  </label>

                  <input
                    name="price"
                    type="number"
                    min="0"
                    step="0.01"
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
                    step="1"
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
                    name="rate"
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    value={productForm.rate}
                    onChange={handleProductChange}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500 outline-none dark:border-[#2a2a2a] dark:bg-[#222] dark:text-gray-400"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-gray-400">
                    Product Image
                  </label>

                  <input
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      setProductForm((prev) => ({
                        ...prev,
                        image: e.target.files?.[0] || null,
                      }));
                    }}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100 dark:border-[#2a2a2a] dark:bg-[#171717] dark:text-white dark:placeholder:text-gray-500 dark:focus:border-gray-500 dark:focus:ring-[#222]"
                  />

                  {editingProduct && (
                    <p className="mt-2 text-xs text-slate-400">
                      Leave empty to keep the current image.
                    </p>
                  )}
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
                  {editingProduct ? "Save Changes" : "Add Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add/Edit Category Modal */}

      {showCategoryModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-[#1a1a1a]">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5 dark:border-[#2a2a2a]">
              <div>
                <h2 className="text-xl font-bold text-slate-950 dark:text-white">
                  {editingCategory ? "Edit Category" : "Add New Category"}
                </h2>

                <p className="mt-1 text-xs text-slate-500 dark:text-gray-400">
                  {editingCategory
                    ? "Update category information"
                    : "Create a new category for your products"}
                </p>
              </div>

              <button
                type="button"
                onClick={closeCategoryModal}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition hover:bg-slate-900 hover:text-white dark:bg-[#252525] dark:text-gray-400 dark:hover:bg-white dark:hover:text-slate-950"
              >
                <FiX />
              </button>
            </div>

            <form onSubmit={handleCategorySubmit} className="p-6">
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-gray-400">
                  Category Name
                </label>

                <div className="relative">
                  <FiTag
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    size={18}
                  />

                  <input
                    type="text"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    placeholder="e.g. Electronics"
                    autoFocus
                    maxLength={30}
                    className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100 dark:border-[#2a2a2a] dark:bg-[#171717] dark:text-white dark:placeholder:text-gray-500 dark:focus:border-gray-500 dark:focus:ring-[#222]"
                  />
                </div>

                <div className="mt-2 flex items-center justify-between">
                  <p className="text-xs text-slate-400">
                    Letters and spaces only, 3–30 characters.
                  </p>

                  <span className="text-[11px] text-slate-400">
                    {categoryName.length}/30
                  </span>
                </div>
              </div>

              <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeCategoryModal}
                  className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 dark:border-[#2a2a2a] dark:text-gray-300 dark:hover:bg-[#222]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-slate-800"
                >
                  <FiCheckCircle size={16} />

                  {editingCategory ? "Save Changes" : "Add Category"}
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
