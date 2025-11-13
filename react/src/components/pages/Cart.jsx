import { useEffect, useState } from "react";
import { getitems, incrementquantity, getproducts } from "../../../utils/Api";
import { Link } from "react-router-dom";
import { removeitem } from "../../../utils/Api";
function Cart() {
    const [items, setItems] = useState([]);
    const [products, setProduct] = useState([])

    useEffect(() => {
        getitems().then(res => setItems(res.data ));
        getproducts().then(res => setProduct(res.data ));
    }, [items]);


    const subtotal = items.reduce((acc, item) => acc + ((item.price - (item.discount * item.price / 100)) * item.quantity), 0);
    return (
        <>
            <section className="cart-section mt-5 pt-5">
                <div className="container">
                    <div className="row d-flex justify-content-around">
                        <div className="col-lg-7 col-12">
                            {
                                items.length > 0 ? (
                                    <div className="table-responsive">
                                    <table className="text-center w-100 fs-5">
                                        <thead style={{ backgroundColor: "#eadac7" }}>
                                            <tr>
                                                <th>product</th>
                                                <th>price</th>
                                                <th>quantity</th>
                                                <th>subtotal</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {items.map(item => (
                                                <tr key={item.id}>
                                                    <td className="p-3">
                                                        <div className="d-flex justify-content-center">
                                                            <div className="w-25">
                                                                <img
                                                                    src={item.image?.[0]}
                                                                    style={{ height: "55px", width: "50px" }}
                                                                    className="rounded"
                                                                />
                                                            </div>

                                                            <div className="w-50 d-flex align-items-center">
                                                                <p className="fs-6">{item.title}</p>
                                                            </div>

                                                        </div>
                                                    </td>
                                                    <td className="align-middle">{item.price}</td>
                                                    <td className="align-middle">
                                                        <p className="border d-inline p-1 rounded">{item.quantity}</p>
                                                    </td>
                                                    <td className="align-middle">{item.price * item.quantity}</td>
                                                    <td className="align-middle">
                                                        <button
                                                            className="delButton btn"
                                                            onClick={() => {
                                                                {
                                                                    products.map((p) => {
                                                                        if (p.id === item.id) {
                                                                            incrementquantity(p, p.id, item.quantity)
                                                                        }

                                                                    })
                                                                }


                                                                removeitem(item.id)

                                                            }}

                                                        >
                                                            <i className="bi bi-trash3 text-warning-emphasis fs-3"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                     </div>) : (
                                    <p className="fs-4 fw-semibold text-center text-secondary mt-5">
                                        Your cart is empty 🛍️
                                    </p>
                                )
                            }

                        </div>

                        <div
                            className="mb-4 py-4 text-center rounded-2 col-lg-4 col-12"
                            style={{ backgroundColor: "#eadac7" }} >
                            <h3 className="fw-bold fs-2 mb-5">Cart Totals</h3>
                            <p className="fw-bold my-4">
                                Total
                                <span className="text-warning-emphasis ms-2 fs-5">Rs.{subtotal}</span>
                            </p>
                            <Link
                                to="/checkout"
                                className="btn btn-outline-dark mt-4 px-5 py-2 fw-bold mb-4"
                                type="submit"
                            >
                                Check Out
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Cart;
