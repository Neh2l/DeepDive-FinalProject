
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

import MainLayout from "./Layout/MainLayout";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyEmail from "./pages/VerifyEmail";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Wishlist from "./pages/Wishlist";
import Products from "./pages/Products";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ErrorPage from "./pages/ErrorPage";
import AdminDashboard from "./pages/AdminDashboard";
import About from "./pages/About";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import SplashScreen from "./components/SplashScreen";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";
import Contact from "./pages/Contact";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      {/* Premium Splash Screen */}
      {showSplash && (
        <SplashScreen onFinish={() => setShowSplash(false)} />
      )}

      {/* Global Toast Notifications */}
      <Toaster
        position="top-right"
        richColors
        closeButton
      />

      <BrowserRouter>
        <Routes>

          {/* Main Layout - wraps ALL routes */}
          <Route element={<MainLayout />}>

            {/* Public Routes */}
            <Route path="/" element={<Home />} />

            <Route path="/login" element={<Login />} />

            <Route path="/signup" element={<Register />} />

            <Route
              path="/verify-email"
              element={<VerifyEmail />}
            />

            <Route path="/cart" element={<Cart />} />

            <Route path="/profile" element={<Profile />} />

            <Route path="/wishlist" element={<Wishlist />} />

            <Route path="/products" element={<Products />} />

            <Route
              path="/products/:id"
              element={<ProductDetailsPage />}
            />

            <Route
              path="about"
              element={<About />}
            />

            <Route
              path="checkout"
              element={<Checkout />}
            />

            <Route
              path="orders"
              element={<Orders />}
            />
             <Route
              path="contact"
              element={<Contact/>}
            />

            <Route
              path="orders/:id"
              element={<OrderDetails />}
            />

            <Route
              path="*"
              element={<ErrorPage />}
            />

          </Route>

          {/* Protected Admin Route */}
          <Route element={<ProtectedAdminRoute />}>
            <Route
              path="/dashboard"
              element={<AdminDashboard />}
            />
          </Route>

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
