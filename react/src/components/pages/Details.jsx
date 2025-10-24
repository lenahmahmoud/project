import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import '../style/home.css'
import { getproduct, decrementquantity, getproducts, getreviews } from "../../../utils/Api";
import { addtocart } from "../../../utils/Api";
import '../style/details.css'

function Details() {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true);
    const [Quantity, setQuantity] = useState(1);
    const [reviews, setReviews] = useState([])
    const [showform, setShowform] = useState(false)
    const filteredreviews = reviews.filter((review) => {
        return review.productId === product.id
    })
    const background = useRef(null)
    useEffect(() => {
        getproduct(id)
            .then((res) => {

                setProduct(res.data);
                setLoading(false);
            })
        getproducts()
            .then(res => setProducts(res.data))
        getreviews()
            .then((res) => setReviews(res.data))

    }, [id, reviews]);
    useEffect(() => {
        if (background.current) {
            if (showform) {
                background.current.style.filter = "blur(5px)";
                background.current.style.pointerEvents = "none"; // prevent clicking
            } else {
                background.current.style.filter = "none";
                background.current.style.pointerEvents = "auto";
            }
        }
    }, [showform]);

    if (loading) {
        return <p className="text-center mt-5">Loading...</p>;
    }

    if (!product) {
        return <p className="text-center mt-5">Product not found.</p>;
    }

    function increment() {
        if (product.quantity > Quantity) {
            setQuantity(Quantity + 1);
        }
        else {
            return
        }


    }

    function decrement() {
        if (Quantity > 1) {
            setQuantity(Quantity - 1);
        }
        else {
            return
        }
    }
    function totalRate(filtered, product) {
        const totalrate = filtered.reduce((sum, review) => sum + review.rating, 0)
        const average = totalrate / product.reviews
        return Math.ceil(average)

    }

    return (
        <>
            <div >
                <div className="container my-5 product-details pt-5">
                    {
                        product.quantity > 0 ? (<><div className="row">
                            <div className="col-md-6 text-center">
                                <img
                                    src={product.image[0]}
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
                                                <del>£E {product.price}</del>{"  "}
                                                <span className="text-success">
                                                    £E {product.price - (product.discount * product.price) / 100}
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
                                        {product.keyfeatures &&
                                            product.keyfeatures.map((f, index) => (
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

                                    <button className="btn btn-dark me-3" onClick={() => {
                                        const productToAdd = {
                                            ...product,
                                            quantity: Quantity
                                        };

                                        addtocart(productToAdd)
                                        decrementquantity(product, product.id, Quantity)




                                    }}>Add to Cart</button>
                                    <Link to="/shopall" className="btn btn-outline-secondary">
                                        Back to Shop
                                    </Link>
                                </div>
                            </div>
                        </div>
                            <section className="mt-5">
                                <div className="product-card container" >
                                    <div className="d-flex justify-content-between align-items-center mb-3" ref={background}>
                                        <h3 className=" fw-bold" style={{ color: "#7a312cff" }}>Customers Reviews</h3>
                                        <button className="btn bg-white" onClick={() => {
                                            setShowform(true)

                                        }}>Write a Review</button>
                                    </div>
                                    {
                                        showform ? (<>
                                            <div className="popup-overlay position-relative d-flex justify-content-center">
                                                <div className="popup-window position-absolute w-75">
                                                    <form className="w-50 mx-auto">
                                                        <h4 className="fw-bold mb-3">write a review</h4>

                                                        <div className="form-floating mb-3">
                                                            <input
                                                                type="text"
                                                                className="form-control py-3"
                                                                id="floatingName"
                                                                placeholder="Name"
                                                            />
                                                            <label htmlFor="floatingName">First name</label>
                                                        </div>
                                                        <div className="form-floating mb-3">
                                                            <input
                                                                type="text"
                                                                className="form-control py-3"
                                                                id="floatingName"
                                                                placeholder="Name"
                                                            />
                                                            <label htmlFor="floatingName">last name</label>
                                                        </div>

                                                        <div className="form-floating mb-3">
                                                            <textarea
                                                                className="form-control py-5"
                                                                id="floatingMessage"
                                                                placeholder="Message"
                                                            ></textarea>
                                                            <label htmlFor="floatingMessage">comment</label>
                                                        </div>

                                                        <button className="btn btn-large px-5 bg-dark text-white">
                                                            submit
                                                        </button>
                                                    </form>
                                                </div>
                                            </div>
                                        </>) : (null)





                                    }
                                    <h5>{totalRate(filteredreviews, product)} <small className="text-muted">Based On </small>{product.reviews} <small className="text-muted">Reviews </small></h5>
                                    <div >
                                        <span className="text-warning">
                                            {Array.from({ length: 5 }, (_, i) => (
                                                <span key={i} style={{ color: i < totalRate(filteredreviews, product) ? "#ffc107" : "#b4b4b4ff" }}>
                                                    &#9733;
                                                </span>
                                            ))}</span>

                                    </div>
                                    {
                                        filteredreviews.map((r) => (
                                            <div className="list-group">
                                                <div className="list-group-item">
                                                    <strong>{r.author}</strong>
                                                    <span className="text-warning">
                                                        {Array.from({ length: 5 }, (_, i) => (
                                                            <span key={i} style={{ color: i < r.rating ? "#ffc107" : "#b4b4b4ff" }}>
                                                                &#9733;
                                                            </span>
                                                        ))}</span>
                                                    <p>{r.text}</p>
                                                </div>

                                            </div>
                                        ))
                                    }



                                </div>
                            </section>
                            <section className="mt-5 container">
                                <h3 className="mb-4 fw-bold" style={{ color: "#7a312cff" }}>You May Also Like</h3>


                                <div className="row g-3 justify-content-center">

                                    {
                                        products.map((p) => (
                                            p.category === product.category ? (
                                                <div className="col-md-3" key={p.id}>
                                                    <div className="card shadow-sm">
                                                        <div className="parent position-relative">
                                                            <img src={p.image[0]} className="card-img-top" alt={p.title} style={{ height: "350px" }} />
                                                            {p.discount ? (
                                                                <p className="badge bg-danger m-2 position-absolute top-0 end-0 fs-4">
                                                                    -{p.discount}%
                                                                </p>
                                                            ) : (null)}


                                                            <div className="overlay d-flex justify-content-around w-100 align-items-center">
                                                                <button className="btn border-0" onClick={
                                                                    () => {
                                                                        const productToAdd = { ...p, quantity: 1 }
                                                                        addtocart(productToAdd)
                                                                        decrementquantity(p, p.id, 1)

                                                                    }
                                                                }><i className="bi bi-bag-heart fs-4 rounded-circle p-2 bg-white"></i></button>
                                                                <Link><i className="bi bi-share rounded-circle p-2 bg-white"></i></Link>
                                                                <Link to={`/details/${p.id}`}><i className="bi bi-eye rounded-circle p-2 bg-white"></i></Link>
                                                                <Link><i className="bi bi-suit-heart rounded-circle p-2 bg-white"></i></Link>
                                                            </div>
                                                        </div>
                                                        <div className="card-body">
                                                            <h5 className="card-title">{p.title}</h5>
                                                            <p>
                                                                {p.discount ? (
                                                                    <>
                                                                        <del>${p.price}</del>{" "}
                                                                        <strong className="text-success">
                                                                            ${p.price - (p.price * p.discount) / 100}
                                                                        </strong>
                                                                    </>
                                                                ) : (
                                                                    <>${p.price}</>
                                                                )}
                                                            </p>
                                                            <p>
                                                                {Array.from({ length: 5 }, (_, i) => (
                                                                    <span key={i} style={{ color: i < p.stars ? "#ffc107" : "#b4b4b4ff" }}>
                                                                        &#9733;
                                                                    </span>
                                                                ))}
                                                                <span className="text-muted"> {p.reviews} reviews</span>
                                                            </p>
                                                            <Link to="#" className="btn btn-dark">Buy Now</Link>
                                                        </div>
                                                    </div>
                                                </div>


                                            ) : (null)

                                        )
                                        )

                                    }



                                </div>
                            </section>
                        </>) : (
                            <>
                                <p className="fs-1 fw-semibold text-center text-secondary mt-5">
                                    Out Of Stock <span className="text-danger">!!</span>


                                </p>
                                <div className="text-center">
                                    <Link to="/shopall" className="btn btn-large text-dark" style={{ backgroundColor: "#d7c3b9ff" }}>
                                        Return To Shop
                                    </Link></div>
                            </>

                        )
                    }

                </div>

            </div>


        </>
    );
}

export default Details;
