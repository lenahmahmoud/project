import { useEffect, useState } from "react";
import { getWishListitems, removeWishlistitem } from "../../../utils/Api";


function Wishlist() {
  const [wishlist, setwishlist] = useState([])
  useEffect(()=>{
    getWishListitems()
    .then(res=>setwishlist(res.data))

  })

  return (
    <>
      <section className="cart-section mt-5 pt-5">
        <div className="container">
          <div className="row d-flex justify-content-around">
            <div className="col-lg-7 col-12" style={{ width: "65%" }}>
              {wishlist.length > 0 ? (
                <table className="text-center w-100 fs-5">
                  <thead style={{ backgroundColor: "#eadac7" }}>
                    <tr>
                      <th>product</th>
                      <th>price</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {wishlist.map((w) => (
                      <tr key={w.id}>
                        <td className="p-3">
                          <div className="d-flex justify-content-center">
                            <div className="w-25">
                              <img
                                src={w.image?.[0]}
                                style={{ height: "55px", width: "50px" }}
                                className="rounded"
                              />
                            </div>
                            <div className="w-50 d-flex align-items-center">
                              <p className="fs-6">{w.title}</p>
                            </div>
                          </div>
                        </td>
                        <td className="align-middle">{w.price}</td>
                        <td className="align-middle">
                          <button
                            className="delButton btn"
                            onClick={() => {
                              removeWishlistitem(w.id).then(() => {
                                getproducts();
                              });
                            }}
                          >
                            <i className="bi bi-trash3 text-warning-emphasis fs-3"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="fs-4 fw-semibold text-center text-secondary mt-5">
                  Your wishlist is empty
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Wishlist;
