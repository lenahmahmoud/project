import Navbar from '../src/components/shared/Navbar'
import Footer from '../src/components/shared/Footer'
import Contact from './components/footerpages/contact';
import PaymentOptions from './components/footerpages/paymentoptions';
import PrivacyPolicy from './components/footerpages/PrivacyPolicy';
import ShippingFees from './components/footerpages/ShippingFees';
import Shopall from './components/pages/Shopall';
import About from './components/pages/About';
import Oils from './components/pages/products/Oils';
import Home from './components/pages/Home';
import Masks from './components/pages/products/Masks';
import Toners from './components/pages/products/Toners';
import Serums from './components/pages/products/Serums';
import Moisturizers from './components/pages/products/Moisturizers';
import { Routes, Route } from 'react-router-dom'
function App() {
    return (<>
        <Navbar />
        <Routes>
            <Route path='/home' element={<Home />}></Route>
            <Route path="/contact" element={<Contact />}></Route>
            <Route path="/paymentoptions" element={<PaymentOptions />}></Route>
            <Route path="/privacypolicy" element={<PrivacyPolicy />}></Route>
            <Route path="/shippingfees" element={<ShippingFees />}></Route>
            <Route path='/shopall' element={<Shopall />}></Route>
            <Route path='/about' element={<About />}></Route>
            <Route path='/oils' element={<Oils />}></Route>
            <Route path='/masks' element={<Masks />}></Route>
            <Route path='/toners' element={<Toners />}></Route>
            <Route path='/serums' element={<Serums />}></Route>
            <Route path='/moisturizers' element={<Moisturizers/>}></Route>
        </Routes>
        <Footer />
    </>);
}

export default App;