import { Link } from "react-router-dom";
import logo from '../../assets/images/Logo Brand.png'
function Footer() {
    return (
        <>
            <footer className="footer mt-5 pt-5 text-center text-md-start">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-3 col-md-6 col-sm-12">
                            <h3 className="fw-bold mb-5">
                                <img
                                    src={logo}
                                    alt="Aurévia Logo"
                                    width="40"
                                    height="40"
                                    className="me-2"
                                /> 
                                Aurévia
                            </h3>
                            <p className="w-75 text-secondary mx-auto">
                                Lorem ipsum dolor sit amet, consectetur adipisicing,
                            </p>
                            <p className="w-75 text-secondary mx-auto mb-5">
                                Lorem ipsum dolor.
                            </p>
                        </div>

                        <div className="col-lg-3 col-md-6 col-sm-12 fw-bold">
                            <p className="mb-5 fs-5 mt-sm-5 mt-md-0">Links</p>
                            <ul className="navbar-nav mx-auto text-secondary">
                                <li className="nav-item">
                                    <Link className="nav-link mb-md-3" to="#">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link mb-md-3" to="#">Shop</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link mb-md-3" to="#">About</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link mb-5" to="#">Contact</Link>
                                </li>
                            </ul>
                        </div>

                        <div className="col-lg-3 col-md-6 col-sm-12 fw-bold">
                            <p className="mb-5 fs-5 mt-sm-5 mt-md-0">Help</p>
                            <ul className="navbar-nav mx-auto text-secondary">
                                <li className="nav-item">
                                    <Link className="nav-link mb-3" to="#">Payment Options</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link mb-3" to="#">Returns</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link mb-5" to="#">Privacy Policies</Link>
                                </li>
                            </ul>
                        </div>

                        <div className="col-lg-3 col-md-6 col-sm-12 fw-bold">
                            <p className="mb-5 fs-5 mt-sm-5 mt-md-0">Join Our Mailing List</p>

                            <form>
                                <div className="form-group my-3">
                                    <label
                                        className="form-control border-0 p-0 text-secondary"
                                        htmlFor="email"
                                        style={{ backgroundColor: "#f6f0ed" }}
                                    >
                                        Enter your email here
                                    </label>
                                    <input
                                        type="text"
                                        id="email"
                                        name="email"
                                        style={{ backgroundColor: "#f6f0ed" }}
                                        className="p-1 fs-6"
                                    />
                                </div>

                                <div className="form-group mb-3">
                                    <input type="checkbox" id="sub" name="subscription" />
                                    <label
                                        htmlFor="sub"
                                        className="p-0 text-secondary"
                                        style={{ backgroundColor: "#f6f0ed" }}
                                    >
                                        Yes, Subscribe me
                                    </label>
                                </div>

                                <button className="btn btn-large text-white bg-dark rounded-0 w-100 text-center">
                                    Subscribe Now
                                </button>
                            </form>
                        </div>

                        <div className="border-top">
                            <p
                                className="text-center my-4 text-body-tertiary"
                                style={{ fontSize: "0.8rem" }}
                            >
                                Copyright &copy; 2025 Aurévia , All rights reserved
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Footer;
