
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./Layout/MainLayout";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Wishlist from "./pages/Wishlist";
import Products from "./pages/Products";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ErrorPage from "./pages/ErrorPage";
import AdminDashboard from "./pages/AdminDashboard";

import ProtectedAdminRoute from "./components/ProtectedAdminRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Main Layout - wraps ALL routes */}
        <Route element={<MainLayout />}>

          {/* Public Routes */}
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />

          <Route path="/signup" element={<Register />} />

          <Route path="/cart" element={<Cart />} />

          <Route path="/profile" element={<Profile />} />

          <Route path="/wishlist" element={<Wishlist />} />

          <Route path="/products" element={<Products />} />

          <Route
            path="/products/:id"
            element={<ProductDetailsPage />}
          />

          {/* Admin Protected Route */}
         

          {/* Error Page */}
          <Route
            path="*"
            element={<ErrorPage />}
          />

        </Route>
         <Route element={<ProtectedAdminRoute />}>
            <Route
              path="/dashboard"
              element={<AdminDashboard />}
            />
          </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
