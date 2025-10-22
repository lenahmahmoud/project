import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getproduct, decrementquantity } from "../../../utils/Api";
import { addtocart } from "../../../utils/Api";

function Details() {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const [Quantity, setQuantity] = useState(1);


    useEffect(() => {
        getproduct(id)
            .then((res) => {
                console.log("Fetched product:", res.data);
                setProduct(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching product:", err);
                setLoading(false);
            });
    }, [id]);

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

    return (
        <>
            <div className="container my-5 product-details pt-5">
                {
                    product.quantity > 0 ? (<div className="row">
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
                    </div>) : (
                        <>
                            <p className="fs-1 fw-semibold text-center text-secondary mt-5">
                                Out Of Stock <span className="text-danger">!!</span>


                            </p>
                            <div className="text-center">                  
                                 <Link to="/shopall" className="btn btn-large text-dark" style={{backgroundColor:"#d7c3b9ff"}}>
                                Return To Shop
                            </Link></div>
                        </>

                    )
                }

            </div>
        </>
    );
}

export default Details;
