import '../style/footerpage.css';
import { Link } from 'react-router-dom';

function PaymentOptions() {
    return (
        <>
            <main className="mt-5 pt-5 container">
                <h1 className="fw-bold mb-3">Payment Options</h1>
                <p style={{ lineHeight: "40px" }} className="fs-5">
                    We offer flexible and secure payment options to make your shopping
                    experience smooth and convenient. Customers can pay Cash on Delivery (COD) for extra peace of mind, or
                    choose online payment through trusted debit/credit cards and digital wallets. All transactions are processed
                    safely to ensure your information is protected at every step. Our goal is to provide you with easy and
                    reliable payment methods that suit your needs.
                </p>
            </main>

            <section className="d-flex justify-content-center align-items-center backimage mt-5">
                <Link to="/shop" className="btn btn-large text-dark">
                    Return To Shop
                </Link>
            </section>
        </>
    );
}

export default PaymentOptions;
