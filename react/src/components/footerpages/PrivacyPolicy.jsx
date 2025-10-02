import '../style/footerpages.css';
import { Link } from 'react-router-dom';

function PrivacyPolicy() {
    return (
        <>
            <main className="mt-5 pt-5 container">
                <h1 className="fw-bold mb-3">Privacy Policy</h1>
                <p style={{ lineHeight: "40px" }} className="fs-5">
                    At Aurévia, we value your privacy and are committed to protecting your personal
                    information. When you shop with us, we may collect details such as your name, contact information, 
                    and delivery address to process your orders efficiently. We do not share, sell, or trade your personal 
                    data with third parties, except when required to deliver your order (e.g., courier services).
                    <br /><br />
                    All online payments are handled through secure gateways to ensure the safety of your financial 
                    information. By using our website, you agree to the collection and use of your information in 
                    accordance with this policy. We are dedicated to keeping your trust and providing a safe shopping 
                    experience at all times.
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

export default PrivacyPolicy;
