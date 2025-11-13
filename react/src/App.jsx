import Navbar from '../src/components/shared/Navbar'
import Footer from '../src/components/shared/Footer'
import Contact from '../src/components/footerpages/Contact';
import PaymentOptions from './components/footerpages/PaymentOptions';
import PrivacyPolicy from './components/footerpages/PrivacyPolicy';
import ShippingFees from './components/footerpages/ShippingFees';
import Shopall from './components/pages/Shopall';
import About from './components/pages/About';
import Oils from './components/pages/products/Oils';
import Home from './components/pages/Home';
import Masks from './components/pages/products/Masks';
import Toners from './components/pages/products/Toners';
import Serums from './components/pages/products/Serums';
import Cleansers from './components/pages/products/Cleansers';
import Moisturizers from './components/pages/products/Moisturizers';
import Details from './components/pages/Details'
import Cart from './components/pages/Cart';
import ThankU from './components/pages/ThankU';
import Checkout from './components/pages/Checkout';
import ProfilePage from './components/pages/ProfilePage';
import Wishlist from './components/pages/Wishlist';
import Login from './components/pages/Login';
import Signup from './components/pages/SignUp';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

function App() {
  const [thankUVisible, setThankUVisible] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("user"));
  const location = useLocation();

  // Hide navbar or footer on specific routes
  const hideNavbar = ["/profile", '/login', '/signup'];
  const hideFooter = ["/checkout", "/profile", '/login', '/signup'];

  // Sync login state across tabs and refreshes
  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("user"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Protected route wrapper
  const ProtectedRoute = ({ children }) => {
    return isLoggedIn ? children : <Navigate to="/login" replace />;
  };

  return (
    <>
      {!hideNavbar.includes(location.pathname) && (
        <Navbar setSearchInput={setSearchInput} />
      )}

      <Routes>
        {/* Redirect root to home or login */}
        <Route
          path="/"
          element={<Navigate to={isLoggedIn ? "/home" : "/login"} replace />}
        />

        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/shopall"
          element={
            <ProtectedRoute>
              <Shopall searchInput={searchInput} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/oils"
          element={
            <ProtectedRoute>
              <Oils searchInput={searchInput} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/masks"
          element={
            <ProtectedRoute>
              <Masks searchInput={searchInput} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/toners"
          element={
            <ProtectedRoute>
              <Toners searchInput={searchInput} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/serums"
          element={
            <ProtectedRoute>
              <Serums searchInput={searchInput} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/moisturizers"
          element={
            <ProtectedRoute>
              <Moisturizers searchInput={searchInput} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cleansers"
          element={
            <ProtectedRoute>
              <Cleansers searchInput={searchInput} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/details/:id"
          element={
            <ProtectedRoute>
              <Details />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout openThankU={() => setThankUVisible(true)} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          }
        />

        {/* Public footer pages */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/paymentoptions" element={<PaymentOptions />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route path="/shippingfees" element={<ShippingFees />} />
        <Route path="/about" element={<About />} />
      </Routes>

      {!hideFooter.includes(location.pathname) && <Footer />}
      {thankUVisible && <ThankU closeThankU={setThankUVisible} />}
    </>
  );
}

export default App;
