import { useState, useEffect } from "react";
import { getcategory, addtocart } from "../../../../utils/Api";
import { Link } from "react-router-dom";
import '../../style/shop.css'
const logo = '/images/Logo Brand.png';

function Masks() {
    const [masks, setProducts] = useState([]);
    const [originalProducts, setOriginalProducts] = useState([]);
    const [filters, setFilters] = useState({
        sortAlphabetically: "",
        sortPrice: "",
        priceRange: [10, 500],
    });

    useEffect(() => {
        getcategory("masks").then(res => {
            setProducts(res.data);
            setOriginalProducts(res.data);
        });
    }, []);

    const applyFilters = () => {
        let result = [...originalProducts];

        // Alphabetical
        if (filters.sortAlphabetically === "A-Z") result.sort((a, b) => a.title.localeCompare(b.title));
        if (filters.sortAlphabetically === "Z-A") result.sort((a, b) => b.title.localeCompare(a.title));

        // Price
        if (filters.sortPrice === "low-to-high") result.sort((a, b) => a.price - b.price);
        if (filters.sortPrice === "high-to-low") result.sort((a, b) => b.price - a.price);


        // Price Range
        result = result.filter(p => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]);

        setProducts(result);
    };

    const clearFilters = () => {
        setFilters({ sortAlphabetically: "", sortPrice: "", priceRange: [10, 500] });
        setProducts(originalProducts);
    };

    return (
        <>
            {/* HEADER */}
            <header className="header-section mt-5 pt-4">
                <div className="headingText text-center py-5 my-5">
                    <img src={logo} alt="Aurévia Logo" width="70" height="70" className="mb-4" />
                    <h1 className="fw-bold" style={{ fontSize: "4rem", letterSpacing: "0.3rem" }}>Masks</h1>
                    <p className="mt-3"><span className="fw-bold"> Home </span>masks-page</p>
                </div>
            </header>

            {/* FILTER */}
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
                                            <input type="radio" name="alphabet" checked={filters.sortAlphabetically === "A-Z"}
                                                onChange={() => setFilters({ ...filters, sortAlphabetically: "A-Z" })} />
                                            <label className="form-label fs-5 mx-2">A to Z</label>
                                        </div>
                                        <div>
                                            <input type="radio" name="alphabet" checked={filters.sortAlphabetically === "Z-A"}
                                                onChange={() => setFilters({ ...filters, sortAlphabetically: "Z-A" })} />
                                            <label className="form-label fs-5 mx-2">Z to A</label>
                                        </div>
                                    </div>
                                </div>
                                {/* Price */}
                                <div className="price mt-5">
                                    <h4>Sort by Price:</h4>
                                    <div className="formgroup d-flex flex-column">
                                        <div>
                                            <input type="radio" name="price" checked={filters.sortPrice === "low-to-high"}
                                                onChange={() => setFilters({ ...filters, sortPrice: "low-to-high" })} />
                                            <label className="form-label fs-5 mx-2">Price (Low to High)</label>
                                        </div>
                                        <div>
                                            <input type="radio" name="price" checked={filters.sortPrice === "high-to-low"}
                                                onChange={() => setFilters({ ...filters, sortPrice: "high-to-low" })} />
                                            <label className="form-label fs-5 mx-2">Price (High to Low)</label>
                                        </div>
                                    </div>
                                </div>

                                {/* Price Range */}
                                <div className="range mt-5">
                                    <h4>Price Range:</h4>
                                    <h6>from £E200 to £E700</h6>
                                    <input
                                        type="range"
                                        min="10"
                                        max="500"
                                        value={filters.priceRange[1]}
                                        onChange={(e) => setFilters({ ...filters, priceRange: [filters.priceRange[0], Number(e.target.value)] })}
                                        className="form-range"
                                    />
                                    <p>Max Price: £E{filters.priceRange[1]}</p>
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

            {/* masks */}
            <section className="mt-5" id="shop">
                <div className="container">
                    <div className="row justify-content-center shopsec g-5 text-center">
                        {masks.map(mask => (
                            mask.quantity > 0 ? (<div key={mask.id} className="col-9 col-sm-8 col-lg-3">
                                <div className={`parent ${mask.discount > 0 ? "position-relative" : ""}`}>
                                    <img src={mask.image[0]} alt={mask.title} className="rounded w-100" />
                                    {mask.discount > 0 && (
                                        <p className="badge bg-danger m-2 position-absolute top-0 end-0 fs-4">
                                            -{mask.discount}%
                                        </p>
                                    )}

                                    <div className="overlay d-flex justify-content-around w-100 align-items-center">
                                        <button
                                            className="btn border-0"
                                            onClick={() => {
                                                const productToAdd = { ...mask, quantity: 1 };
                                                addtocart(productToAdd);
                                                decrementquantity(mask, mask.id, 1)

                                            }}
                                        >
                                            <i className="bi bi-bag-heart fs-4 rounded-circle p-2 bg-white"></i>
                                        </button>                                        <Link to="#"><i className="bi bi-share rounded-circle p-2 bg-white"></i></Link>
                                        <Link to={`/details/${mask.id}`}><i className="bi bi-eye rounded-circle p-2 bg-white"></i></Link>
                                        <Link to="#"><i className="bi bi-suit-heart rounded-circle p-2 bg-white"></i></Link>
                                    </div>
                                </div>
                                <div className="text">
                                    <p className="fs-5 fw-bold">{mask.title} -
                                        <span className="fs-6 text-danger">
                                            £E{" "}
                                            {mask.discount > 0 ? (
                                                <>
                                                    <del>{mask.price}</del>{" "}
                                                </>
                                            ) : (
                                                mask.price
                                            )}
                                        </span></p>
                                    <p>
                                        {Array.from({ length: 5 }, (_, i) => (
                                            <span key={i} style={{ color: i < mask.stars ? "#ffc107" : "#b4b4b4ff" }}>&#9733;</span>
                                        ))}
                                        <span className="text-muted"> {mask.reviews} reviews</span>
                                    </p>
                                </div>
                            </div>) : (null)


                        ))}
                    </div>
                </div>
            </section>
            <div className="py-5 mt-5" style={{ backgroundColor: "#eadac7" }}>
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
            </div>
        </>
    );
}

export default Masks;
