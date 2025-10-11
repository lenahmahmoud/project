import { useState, useEffect } from "react";
import { getproducts } from "../../../utils/Api"; 
import { Link } from "react-router-dom";
import '../style/shop.css'
const logo = '/images/Logo Brand.png';

function Shopall() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getproducts().then((res) => setProducts(res.data));
    }, []);

    return (
        <>
            <header className="header-section mt-5 pt-4">
                <div className="headingText text-center py-5 my-5">
                    <img src={logo} alt="Aurévia Logo" width="70" height="70" className="mb-4" />
                    <h1 className="fw-bold" style={{ fontSize: "4rem", letterSpacing: "0.3rem" }}>
                        shop page
                    </h1>
                    <p className="mt-3"><span className="fw-bold"> Home </span>shop-page</p>
                </div>
            </header>

            <section className="controls py-3" style={{ backgroundColor: "rgb(230, 216, 228)" }}>
                <div className="container">
                    <Link
                        to="#"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#filterpage"
                        aria-controls="filterpage"
                        className="link-opacity-50-hover link-underline-opacity-0 fs-3 text-dark"
                    >
                        <i className="bi bi-filter fs-3"></i> filter & sort
                    </Link>

                    <div
                        className="offcanvas offcanvas-end pt-2 container"
                        tabIndex="-1"
                        id="filterpage"
                        aria-labelledby="filterlabel"
                    >
                        <div className="offcanvas-header">
                            <h3 className="offcanvas-title" id="filterlabel">Filter & Sort</h3>
                            <button
                                type="button"
                                className="btn-close text-reset"
                                data-bs-dismiss="offcanvas"
                                aria-label="Close"
                            ></button>
                        </div>
                        <hr />
                        <div className="offcanvas-body">
                            <form>
                                {/* Sort Alphabetically */}
                                <div className="category">
                                    <h4>Sort Alphabetically:</h4>
                                    <div className="formgroup d-flex flex-column">
                                        <div>
                                            <input type="radio" name="sort-asc" id="alpha-asc" value="A-Z" />
                                            <label htmlFor="alpha-asc" className="form-label fs-5">A to Z</label>
                                        </div>
                                        <div>
                                            <input type="radio" name="sort-desc" id="alpha-desc" value="Z-A" />
                                            <label htmlFor="alpha-desc" className="form-label fs-5">Z to A</label>
                                        </div>
                                    </div>
                                </div>

                                {/* Sort by Date */}
                                <div className="category mt-5">
                                    <h4>Sort by Date:</h4>
                                    <div className="formgroup d-flex flex-column">
                                        <div>
                                            <input type="radio" name="date" id="new-old" value="new-to-old" />
                                            <label htmlFor="new-old" className="form-label fs-5">New to Old</label>
                                        </div>
                                        <div>
                                            <input type="radio" name="date" id="old-new" value="old-to-new" />
                                            <label htmlFor="old-new" className="form-label fs-5">Old to New</label>
                                        </div>
                                    </div>
                                </div>

                                {/* Sort by Price */}
                                <div className="price mt-5">
                                    <h4>Sort by Price:</h4>
                                    <div className="formgroup d-flex flex-column">
                                        <div>
                                            <input type="radio" name="price" id="low-high" value="low-to-high" />
                                            <label htmlFor="low-high" className="form-label fs-5">Price (Low to High)</label>
                                        </div>
                                        <div>
                                            <input type="radio" name="price" id="high-low" value="high-to-low" />
                                            <label htmlFor="high-low" className="form-label fs-5">Price (High to Low)</label>
                                        </div>
                                    </div>
                                </div>

                                {/* Price Range */}
                                <div className="range mt-5">
                                    <h4>Price Range:</h4>
                                    <h6>from 10$ to 500$</h6>
                                    <div className="form-group">
                                        <input type="range" name="price_range" className="form-range" min="10" max="500" />
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    className="btn btn-large text-dark form-control mt-5 rounded"
                                    style={{ backgroundColor: "#eadac7" }}
                                >
                                    Apply Filters
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mt-5" id="shop">
                <div className="container">
                    <div className="row justify-content-center shopsec g-5 text-center">
                        {products.map((product) => (
                            <div key={product.id} className="col-9 col-sm-8 col-lg-3">
                                <div className="parent">
                                    <img src={product.image[0]} alt={product.title} className="rounded w-100" />
                                    <div className="overlay d-flex justify-content-around w-100 align-items-center">
                                        <Link to="#"><i className="bi bi-bag-heart fs-4 rounded-circle p-2 bg-white"></i></Link>
                                        <Link to="#"><i className="bi bi-share rounded-circle p-2 bg-white"></i></Link>
                                        <Link to="#"><i className="bi bi-eye rounded-circle p-2 bg-white"></i></Link>
                                        <Link to="#"><i className="bi bi-suit-heart rounded-circle p-2 bg-white"></i></Link>
                                    </div>
                                </div>
                                <div className="text">
                                    <p className="fs-5 fw-bold">{product.title}</p>
                                    <p>
                                        {Array.from({ length: 5 }, (_, i) => (
                                            <span key={i} style={{ color: i < product.stars ? "#ffc107" : "#b4b4b4ff" }}>
                                                &#9733;
                                            </span>
                                        ))}
                                        <span className="text-muted"> {product.reviews} reviews</span>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section >
            <div className="py-5 mt-5" style={{ backgroundColor: " #eadac7" }}>
                <div className="container-fluid">
                    <div className="row py-4">
                        <div className="col-lg-3 col-md-6 col-sm-12 text-sm-center text-md-start">
                            <div className="d-flex justify-content-center justify-content-md-start mt-sm-4 mt-lg-0">
                                <i className="bi bi-trophy fs-1 me-2"></i>
                                <div className="mt-2">
                                    <h3 className="fw-bold fs-4">High Quality</h3>
                                    <p className="text-secondary mb-sm-5">Crafted from top materials</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6 col-sm-12 text-sm-center text-md-start">
                            <div className="d-flex justify-content-center justify-content-md-start mt-sm-4 mt-lg-0">
                                <i className="bi bi-patch-check fs-1 me-2"></i>
                                <div className="mt-2">
                                    <h3 className="fw-bold fs-4">Warranty Protection</h3>
                                    <p className="text-secondary mb-sm-5">Over 2 years</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6 col-sm-12 text-sm-center text-md-start">
                            <div className="d-flex justify-content-center justify-content-md-start mt-sm-4 mt-lg-0">
                                <i className="bi bi-truck fs-1 me-2"></i>
                                <div className="mt-2">
                                    <h3 className="fw-bold fs-4">Free Shipping</h3>
                                    <p className="text-secondary mb-sm-5">Order over 150 $</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6 col-sm-12 text-sm-center text-md-start">
                            <div className="d-flex justify-content-center justify-content-md-start mt-sm-4 mt-lg-0">
                                <i className="bi bi-headset fs-1 me-2"></i>
                                <div className="mt-2">
                                    <h3 className="fw-bold fs-4">24 / 7 Support</h3>
                                    <p className="text-secondary">Dedicated support</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >

        </>
    );
}

export default Shopall;
