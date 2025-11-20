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
import { useState } from 'react';

function App() {
  const [thankUVisible, setThankUVisible] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const location = useLocation();

  // Hide navbar or footer on specific routes
  const hideNavbar = ["/profile", '/login', '/signup'];
  const hideFooter = ["/checkout", "/profile", '/login', '/signup'];

  

  return (
    <>
      {!hideNavbar.includes(location.pathname) && (
        <Navbar setSearchInput={setSearchInput} />
      )}

      <Routes>


        {/* <Route path="/" element={<Navigate to="/login" replace />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/paymentoptions" element={<PaymentOptions />}></Route>
        <Route path="/privacypolicy" element={<PrivacyPolicy />}></Route>
        <Route path="/shippingfees" element={<ShippingFees />}></Route>
        <Route path='/shopall' element={<Shopall searchInput={searchInput} />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/oils' element={<Oils searchInput={searchInput} />}></Route>
        <Route path='/masks' element={<Masks searchInput={searchInput} />}></Route>
        <Route path='/toners' element={<Toners searchInput={searchInput} />}></Route>
        <Route path='/serums' element={<Serums searchInput={searchInput} />}></Route>
        <Route path='/moisturizers' element={<Moisturizers searchInput={searchInput} />}></Route>
        <Route path='/cleansers' element={<Cleansers searchInput={searchInput} />}></Route>
        <Route path='/details/:id' element={<Details />}></Route>
        <Route path='/cart' element={<Cart />}></Route>
        <Route path='/checkout' element={<Checkout />}></Route>
        <Route path='/wishlist' element={<Wishlist/>}></Route>
        <Route path='/profile' element={<ProfilePage/>}></Route>
      </Routes>

      {!hideFooter.includes(location.pathname) && <Footer />}
      {thankUVisible && <ThankU closeThankU={setThankUVisible} />}
    </>
  );
}

export default App;
