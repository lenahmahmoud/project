import { useState } from "react";
import { Link } from "react-router-dom";
const logo = '/images/Logo Brand.png';

function Navbar() {
    const [showinput,setShowinput]=useState(False)
    return (
        <>
            <nav className="navbar navbar-expand-md shadow fixed-top  mb-5 bg-white">
                <div className="container-fluid">
                    <Link
                        className="navbar-brand fs-2 fw-bold"
                        to="/"
                        style={{
                            fontFamily:
                                "Cambria, Cochin, Georgia, Times, 'Times New Roman', serif",
                        }}
                    >
                        <img src={logo} alt="logo" style={{ width: 40, height: 40 }} className="me-2"></img>
                        Aurévia
                    </Link>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#mainNav"
                        aria-controls="mainNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* Navigation Links */}
                    <div
                        className="collapse navbar-collapse w-75 justify-content-center"
                        id="mainNav">
                        <ul className="navbar-nav mx-auto mt-sm-4 mt-md-0">
                            <li className="nav-item mx-1">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                            <li className="nav-item mx-1">
                                <Link className="nav-link" to="/shopall">Shop</Link>
                            </li>
                            <li className="nav-item mx-1">
                                <Link className="nav-link" to="/about">About</Link>
                            </li>
                            <li className="nav-item mx-1">
                                <Link className="nav-link" to="/contact">Contact</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Icons */}
                    <div
                        className="collapse navbar-collapse mt-md-0 mt-2"
                        id="iconsNav"
                    >
                        <Link to="/search">
                            <i className="bi bi-search text-dark mx-lg-3 mx-2 fs-4"></i>
                            onc
                        </Link>

                        <Link to="/profile">
                            <i className="bi bi-person-exclamation text-dark mx-lg-3 mx-2 fs-4"></i>
                        </Link>
                        <Link to="/wishlist">
                            <i className="bi bi-heart text-dark mx-lg-3 mx-2 fs-4"></i>
                        </Link>
                        <Link to="/cart">
                            <i className="bi bi-bag-heart text-dark mx-lg-3 mx-2 fs-4"></i>
                        </Link>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
