import '../style/footerpages.css';
import { Link } from 'react-router-dom';

function ShippingFees() {
    return (
        <>
            <main className="container rounded my-5 pt-5">
                <h1 className="fw-bold mb-3">Shipping Fees</h1>
                <ul 
                    style={{ listStyle: "none", padding: 0, margin: 0, lineHeight: "50px" }} 
                    className="fs-4"
                >
                    <li>
                        <strong>Cairo &amp; Giza:</strong> 40 LE 
                        <span style={{ color: "#666" }}>(within 48–72 hours)</span>
                    </li>
                    <li>
                        <strong>Alexandria:</strong> 55 LE 
                        <span style={{ color: "#666" }}>(within 3 working days)</span>
                    </li>
                    <li>
                        <strong>Delta:</strong> 55 LE 
                        <span style={{ color: "#666" }}>(within 5 days)</span>
                    </li>
                    <li>
                        <strong>Upper Egypt:</strong> 75 LE 
                        <span style={{ color: "#666" }}>(within 1 week)</span>
                    </li>
                </ul>
            </main>

            <section className="d-flex justify-content-center align-items-center backimage">
                <Link to="/shopall" className="btn btn-large text-dark">
                    Return To Shop
                </Link>
            </section>
        </>
    );
}

export default ShippingFees;
