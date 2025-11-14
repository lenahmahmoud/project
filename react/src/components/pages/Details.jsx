import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../style/home.css";
import {
    getproduct,
    decrementquantity,
    getproducts,
    getreviews,
    addreview,
    updatereview,
} from "../../../utils/Api";
import { addtocart } from "../../../utils/Api";
import "../style/details.css";
import { FaStar } from "react-icons/fa";

function Details() {
    // id for the main product
    const { id } = useParams();
    // the main product
    const [product, setProduct] = useState({});
    // the whole products
    const [products, setProducts] = useState([]);
    // the quantity
    const [Quantity, setQuantity] = useState(1);
    // the whole reviews tht need to be filtered
    const [reviews, setReviews] = useState([]);
    // written review
    const [writtenreview, setWrittenreview] = useState({});
    // hover state
    const [hover, setHover] = useState(null);
    // toggle form state
    const [showform, setShowform] = useState(false);

    // reviews for this product
    const filteredreviews = reviews.filter(
        (review) => String(review.productId) === String(product.id)
    );
    
    // getting data
    useEffect(() => {
        getproduct(id).then((res) => setProduct(res.data));
        getproducts().then((res) => setProducts(res.data));
        getreviews().then((res) => setReviews(res.data));
    }, [id]);


    // functions for the quantity buttons
    function increment() {
        if (product.quantity > Quantity) {
            setQuantity(Quantity + 1);
        }
    }

    function decrement() {
        if (Quantity > 1) {
            setQuantity(Quantity - 1);
        }
    }

    // average calculation
    function totalRate(filtered) {
        if (!filtered || filtered.length === 0) return 0;
        const total = filtered.reduce(
            (sum, r) => sum + (Number(r.rating) || 0),
            0
        );
        const avg = total / filtered.length;
        return Math.round(avg); 
    }

    return (
        <>
            <div className="container my-5 product-details pt-5">
                {product.quantity > 0 ? (
                    <>
                        <div className="row">
                            <div className="col-md-6 text-center">
                                <img
                                    src={product.image?.[0]}
                                    alt={product.title}
                                    className="img-fluid rounded shadow"
                                    style={{ width: "400px", height: "500px" }}
                                />
                            </div>

                            <div className="col-md-5 pt-3">
                                <h2 className="fw-bold" style={{ textTransform: "capitalize" }}>
                                    {product.title}
                                </h2>

                                <div>
                                    <p className="fw-bold fs-4">
                                        {product.discount > 0 ? (
                                            <>
                                                <del>£E {product.price}</del>{" "}
                                                <span className="text-success">
                                                    £E{" "}
                                                    {product.price -
                                                        (product.discount *
                                                            product.price) /
                                                        100}
                                                </span>
                                            </>
                                        ) : (
                                            <>£E {product.price}</>
                                        )}
                                    </p>
                                </div>

                                <div className="mt-2">
                                    <h5 style={{ color: "#CA554D" }} className="fw-bold">
                                        Description
                                    </h5>
                                    <p>{product.description}</p>
                                </div>

                                <div>
                                    <h5 style={{ color: "#CA554D" }} className="fw-bold">
                                        Key Features
                                    </h5>
                                    <ul>
                                        {product.keyfeatures?.map((f, index) => (
                                            <li key={index}>{f}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="mt-2">
                                    <div className="quantity-control mb-3">
                                        <button className="btn btn-outline-dark" onClick={decrement}>
                                            -
                                        </button>
                                        <span className="mx-3">{Quantity}</span>
                                        <button className="btn btn-outline-dark" onClick={increment}>
                                            +
                                        </button>
                                    </div>

                                    <button
                                        className="btn btn-dark me-3"
                                        onClick={() => {
                                            const productToAdd = { ...product, quantity: Quantity };
                                            addtocart(productToAdd);
                                            decrementquantity(product, product.id, Quantity);
                                        }}
                                    >
                                        Add to Cart
                                    </button>
                                    <Link to="/shopall" className="btn btn-outline-secondary">
                                        Back to Shop
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Reviews */}
                        <section className="mt-5">
                            <div className="product-card container">
                                {!showform ? (
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <h3 className="fw-bold" style={{ color: "#7a312cff" }}>
                                            Customers Reviews
                                        </h3>
                                        <button
                                            className="btn bg-white"
                                            onClick={() => setShowform(true)}
                                        >
                                            Write a Review
                                        </button>
                                    </div>
                                ) : null}

                                {showform && (
                                    <div className="popup-overlay position-relative d-flex justify-content-center">
                                        <div className="popup-window position-absolute w-100">
                                            <form
                                                className="w-100 mx-auto"
                                                style={{ backgroundColor: "#f6f0ed" }}
                                            >
                                                <div className="d-flex justify-content-between p-2">
                                                    <h4 className="fw-bold" style={{ color: "#7a312cff" }}>
                                                        Write A Review
                                                    </h4>
                                                    <button
                                                        type="button"
                                                        className="btn border-0"
                                                        onClick={() => setShowform(false)}
                                                    >
                                                        <i className="bi bi-x-circle fs-4 text-danger"></i>
                                                    </button>
                                                </div>

                                                <div className="form-floating mb-3">
                                                    <input
                                                        type="text"
                                                        className="form-control py-4"
                                                        id="floatingName"
                                                        placeholder="Name"
                                                        onChange={(e) =>
                                                            setWrittenreview({
                                                                ...writtenreview,
                                                                firstname: e.target.value,
                                                            })
                                                        }
                                                    />
                                                    <label htmlFor="floatingName" className="py-2">
                                                        First name
                                                    </label>
                                                </div>

                                                <div className="form-floating mb-3">
                                                    <input
                                                        type="text"
                                                        className="form-control py-4"
                                                        id="floatingLast"
                                                        placeholder="Last name"
                                                        onChange={(e) =>
                                                            setWrittenreview({
                                                                ...writtenreview,
                                                                lastname: e.target.value,
                                                            })
                                                        }
                                                    />
                                                    <label htmlFor="floatingLast" className="py-2">
                                                        Last name
                                                    </label>
                                                </div>

                                                <div className="form-floating mb-3">
                                                    <textarea
                                                        className="form-control py-5"
                                                        id="floatingMessage"
                                                        placeholder="Message"
                                                        onChange={(e) =>
                                                            setWrittenreview({
                                                                ...writtenreview,
                                                                text: e.target.value,
                                                            })
                                                        }
                                                    ></textarea>
                                                    <label htmlFor="floatingMessage">Comment</label>
                                                </div>

                                                <div className="mb-3">
                                                    <p className="mb-1">Rate this product:</p>
                                                    {Array.from({ length: 5 }).map((_, index) => {
                                                        const starValue = index + 1;
                                                        return (
                                                            <FaStar
                                                                key={index}
                                                                size={25}
                                                                className="me-1"
                                                                color={
                                                                    starValue <=
                                                                        (hover || writtenreview.rating)
                                                                        ? "#ffc107"
                                                                        : "#e4e5e9"
                                                                }
                                                                onClick={() =>
                                                                    setWrittenreview({
                                                                        ...writtenreview,
                                                                        rating: starValue,
                                                                    })
                                                                }
                                                                onMouseEnter={() => setHover(starValue)}
                                                                onMouseLeave={() => setHover(null)}
                                                                style={{ cursor: "pointer" }}
                                                            />
                                                        );
                                                    })}
                                                </div>

                                                <button
                                                    type="submit"
                                                    className="btn btn-dark"
                                                    onClick={async (e) => {
                                                        e.preventDefault();

                                                        const reviewToAdd = {
                                                            ...writtenreview,
                                                            productId: id,
                                                            rating: Number(writtenreview.rating) || 0,
                                                        };

                                                        await addreview(reviewToAdd);
                                                        setReviews((prev) => [...prev, reviewToAdd]);

                                                        const newFiltered = [...filteredreviews, reviewToAdd];

                                                        const rate = totalRate(newFiltered);

                                                        const updatedProduct = {
                                                            ...product,
                                                            reviews: newFiltered.length,
                                                            stars: rate,
                                                        };
                                                        setProduct(updatedProduct);

                                                        await updatereview(id, rate, newFiltered.length);

                                                        setWrittenreview({});
                                                        setShowform(false);
                                                    }}
                                                >
                                                    Submit
                                                </button>

                                            </form>
                                        </div>
                                    </div>
                                )}

                                <h5>
                                    {totalRate(filteredreviews)}{" "}
                                    <small className="text-muted">Based On </small>
                                    {filteredreviews.length}{" "}
                                    <small className="text-muted">Reviews</small>
                                </h5>

                                <div>
                                    <span className="text-warning">
                                        {Array.from({ length: 5 }, (_, i) => (
                                            <span
                                                key={i}
                                                style={{
                                                    color:
                                                        i < totalRate(filteredreviews)
                                                            ? "#ffc107"
                                                            : "#b4b4b4ff",
                                                }}
                                            >
                                                ★
                                            </span>
                                        ))}
                                    </span>
                                </div>

                                {filteredreviews.map((r, index) => (
                                    <div className="list-group" key={index}>
                                        <div className="list-group-item">
                                            <div className="d-flex justify-content-between">
                                                <div>
                                                    <strong>
                                                        {r.firstname} {r.lastname}
                                                    </strong>
                                                </div>
                                                <div>
                                                    {Array.from({ length: 5 }, (_, i) => (
                                                        <span
                                                            key={i}
                                                            style={{
                                                                color:
                                                                    i < r.rating
                                                                        ? "#ffc107"
                                                                        : "#b4b4b4ff",
                                                            }}
                                                        >
                                                            ★
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            <p>{r.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Suggested */}
                        <section className="mt-5 container">
                            <h3 className="mb-4 fw-bold" style={{ color: "#7a312cff" }}>
                                You May Also Like
                            </h3>
                            <div className="row g-3 justify-content-center">
                                {products
                                    .filter((p) => p.category === product.category)
                                    .map((p) => (
                                        <div className="col-md-3" key={p.id}>
                                            <div className="card shadow-sm">
                                                <div className="parent position-relative">
                                                    <img
                                                        src={p.image?.[0]}
                                                        className="card-img-top"
                                                        alt={p.title}
                                                        style={{ height: "350px" }}
                                                    />
                                                    {p.discount ? (
                                                        <p className="badge bg-danger m-2 position-absolute top-0 end-0 fs-4">
                                                            -{p.discount}%
                                                        </p>
                                                    ) : null}

                                                    <div className="overlay d-flex justify-content-around w-100 align-items-center">
                                                        <button
                                                            className="btn border-0"
                                                            onClick={() => {
                                                                const productToAdd = { ...p, quantity: 1 };
                                                                addtocart(productToAdd);
                                                                decrementquantity(p, p.id, 1);
                                                            }}
                                                        >
                                                            <i className="bi bi-bag-heart fs-4 rounded-circle p-2 bg-white"></i>
                                                        </button>
                                                        <Link>
                                                            <i className="bi bi-share rounded-circle p-2 bg-white"></i>
                                                        </Link>
                                                        <Link to={`/details/${p.id}`}>
                                                            <i className="bi bi-eye rounded-circle p-2 bg-white"></i>
                                                        </Link>
                                                        <Link>
                                                            <i className="bi bi-suit-heart rounded-circle p-2 bg-white"></i>
                                                        </Link>
                                                    </div>
                                                </div>

                                                <div className="card-body">
                                                    <h5 className="card-title">{p.title}</h5>
                                                    <p>
                                                        {p.discount ? (
                                                            <>
                                                                <del>${p.price}</del>{" "}
                                                                <strong className="text-success">
                                                                    $
                                                                    {p.price -
                                                                        (p.price * p.discount) /
                                                                        100}
                                                                </strong>
                                                            </>
                                                        ) : (
                                                            <>${p.price}</>
                                                        )}
                                                    </p>
                                                    <p>
                                                        {Array.from({ length: 5 }, (_, i) => (
                                                            <span
                                                                key={i}
                                                                style={{
                                                                    color:
                                                                        i < (p.stars || 0)
                                                                            ? "#ffc107"
                                                                            : "#b4b4b4ff",
                                                                }}
                                                            >
                                                                ★
                                                            </span>
                                                        ))}
                                                        <span className="text-muted">
                                                            {" "}
                                                            {p.reviews} reviews
                                                        </span>
                                                    </p>
                                                    <Link to="#" className="btn btn-dark">
                                                        Buy Now
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </section>
                    </>
                ) : (
                    <>
                        <p className="fs-1 fw-semibold text-center text-secondary mt-5">
                            Out Of Stock <span className="text-danger">!!</span>
                        </p>
                        <div className="text-center">
                            <Link
                                to="/shopall"
                                className="btn btn-large text-dark"
                                style={{ backgroundColor: "#d7c3b9ff" }}
                            >
                                Return To Shop
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default Details;
