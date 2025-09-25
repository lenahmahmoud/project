import Navbar from '../src/components/shared/Navbar'
import Footer from '../src/components/shared/Footer'
import Contact from './components/footerpages/contact';
import PaymentOptions from './components/footerpages/paymentoptions';
import PrivacyPolicy from './components/footerpages/PrivacyPolicy';
import ShippingFees from './components/footerpages/ShippingFees';
import { Routes, Route } from 'react-router-dom'
function App() {
    return (<>
        <Navbar />
        <Routes>
            <Route path="/contact" element={<Contact />}></Route>
            <Route path="/paymentoptions" element={<PaymentOptions />}></Route>
            <Route path="/privacypolicy" element={<PrivacyPolicy />}></Route>
            <Route path="/shippingfees" element={<ShippingFees />}></Route>
        </Routes>

        <Footer />
    </>);
}

export default App;