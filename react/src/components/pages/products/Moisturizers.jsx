import { useState, useEffect } from "react";
import { getcategory } from "../../../../utils/Api";
import { Link } from "react-router-dom";
import '../../style/shop.css'
const logo = '/images/Logo Brand.png';

function Moisturizers() {
    const [products, setProducts] = useState([]);
    const [originalProducts, setOriginalProducts] = useState([]);
    const [filters, setFilters] = useState({
        sortAlphabetically: "",
        sortPrice: "",
        sortDate: "",
        priceRange: [10, 500],
    });

    useEffect(() => {
        getcategory("moisturizers").then(res => {
            setProducts(res.data);
            setOriginalProducts(res.data);
        });
    }, []);

    const applyFilters = () => {
        let result = [...originalProducts];

        // Sort Alphabetically
        if (filters.sortAlphabetically === "A-Z") result.sort((a, b) => a.title.localeCompare(b.title));
        if (filters.sortAlphabetically === "Z-A") result.sort((a, b) => b.title.localeCompare(a.title));

        // Sort Price
        if (filters.sortPrice === "low-to-high") result.sort((a, b) => a.price - b.price);
        if (filters.sortPrice === "high-to-low") result.sort((a, b) => b.price - a.price);

        // Sort by Date
        if (filters.sortDate === "new-old") result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        if (filters.sortDate === "old-new") result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

        // Filter by Price Range
        result = result.filter(p => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]);

        setProducts(result);
    };

    const clearFilters = () => {
        setFilters({ sortAlphabetically: "", sortPrice: "", sortDate: "", priceRange: [10, 500] });
        setProducts(originalProducts);
    };

    return (
        <>
            {/* HEADER */}
            <header className="header-section mt-5 pt-4">
                <div className="headingText text-center py-5 my-5">
                    <img src={logo} alt="Aurévia Logo" width="70" height="70" className="mb-4" />
                    <h1 className="fw-bold" style={{ fontSize: "4rem", letterSpacing: "0.3rem" }}>Moisturizers</h1>
                    <p className="mt-3"><span className="fw-bold"> Home </span>moisturizers-page</p>
                </div>
            </header>

            {/* FILTER SECTION */}
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

                    <div className="offcanvas offcanvas-end pt-2 container" tabIndex="-1" id="filterpage">
                        <div className="offcanvas-header">
                            <h3 className="offcanvas-title">Filter & Sort</h3>
                            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <hr />
                        <div className="offcanvas-body">
                            <form>
                                {/* Alphabetical */}
                                <div className="category">
                                    <h4>Sort Alphabetically:</h4>
                                    <div className="formgroup d-flex flex-column">
                                        <div>
                                            <input
                                                type="radio"
                                                name="alphabet"
                                                checked={filters.sortAlphabetically === "A-Z"}
                                                onChange={() => setFilters({ ...filters, sortAlphabetically: "A-Z" })}
                                            />
                                            <label className="form-label fs-5 mx-2">A to Z</label>
                                        </div>
                                        <div>
                                            <input
                                                type="radio"
                                                name="alphabet"
                                                checked={filters.sortAlphabetically === "Z-A"}
                                                onChange={() => setFilters({ ...filters, sortAlphabetically: "Z-A" })}
                                            />
                                            <label className="form-label fs-5 mx-2">Z to A</label>
                                        </div>
                                    </div>
                                </div>

                                {/* Date */}
                                <div className="category mt-5">
                                    <h4>Sort by Date:</h4>
                                    <div className="formgroup d-flex flex-column">
                                        <div>
                                            <input
                                                type="radio"
                                                name="date"
                                                checked={filters.sortDate === "new-old"}
                                                onChange={() => setFilters({ ...filters, sortDate: "new-old" })}
                                            />
                                            <label className="form-label fs-5 mx-2">New to Old</label>
                                        </div>
                                        <div>
                                            <input
                                                type="radio"
                                                name="date"
                                                checked={filters.sortDate === "old-new"}
                                                onChange={() => setFilters({ ...filters, sortDate: "old-new" })}
                                            />
                                            <label className="form-label fs-5 mx-2">Old to New</label>
                                        </div>
                                    </div>
                                </div>

                                {/* Price */}
                                <div className="price mt-5">
                                    <h4>Sort by Price:</h4>
                                    <div className="formgroup d-flex flex-column">
                                        <div>
                                            <input
                                                type="radio"
                                                name="price"
                                                checked={filters.sortPrice === "low-to-high"}
                                                onChange={() => setFilters({ ...filters, sortPrice: "low-to-high" })}
                                            />
                                            <label className="form-label fs-5 mx-2">Price (Low to High)</label>
                                        </div>
                                        <div>
                                            <input
                                                type="radio"
                                                name="price"
                                                checked={filters.sortPrice === "high-to-low"}
                                                onChange={() => setFilters({ ...filters, sortPrice: "high-to-low" })}
                                            />
                                            <label className="form-label fs-5 mx-2">Price (High to Low)</label>
                                        </div>
                                    </div>
                                </div>

                                {/* Price Range */}
                                <div className="range mt-5">
                                    <h4>Price Range:</h4>
                                    <h6>from 10$ to 500$</h6>
                                    <input
                                        type="range"
                                        min="10"
                                        max="500"
                                        value={filters.priceRange[1]}
                                        onChange={(e) => setFilters({ ...filters, priceRange: [filters.priceRange[0], Number(e.target.value)] })}
                                        className="form-range"
                                    />
                                    <p>Max Price: ${filters.priceRange[1]}</p>
                                </div>

                                <button type="button" className="btn btn-large text-dark form-control mt-5 rounded" style={{ backgroundColor: "#eadac7" }} onClick={applyFilters}>
                                    Apply Filters
                                </button>
                                <button type="button" className="btn btn-large text-dark form-control mt-2 rounded" style={{ backgroundColor: "#eadac7" }} onClick={clearFilters}>
                                    Clear Filters
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* PRODUCTS */}
            <section className="mt-5" id="shop">
                <div className="container">
                    <div className="row justify-content-center shopsec g-5 text-center">
                        {products.map(product => (
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
                                    <p className="fs-5 fw-bold">{product.title} - <span className="fs-6 text-danger">${product.price}</span></p>
                                    <p>
                                        {Array.from({ length: 5 }, (_, i) => (
                                            <span key={i} style={{ color: i < product.stars ? "#ffc107" : "#b4b4b4ff" }}>&#9733;</span>
                                        ))}
                                        <span className="text-muted"> {product.reviews} reviews</span>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}

export default Moisturizers;
