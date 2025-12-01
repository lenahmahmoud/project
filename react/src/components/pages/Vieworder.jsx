import { useState } from "react";
import { getguestorder } from "../../../utils/Api";
import { useEffect } from "react";
function Vieworder({ setVieworders }) {
  const [order, setOrder] = useState({})
  const highlightColor = "#c98533ff"
  useEffect(() => {
    getguestorder()
      .then(res => {
        setOrder(res.data)
      })

  })
  return (<>

    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
      style={{ backgroundColor: "rgba(220, 207, 207, 0.4)", zIndex: 10000, overflowY: "auto" }}
    >
      <div
        className="bg-white rounded-4 shadow p-4 "
        style={{ width: "85%", height: "90%" }}
      >
        <div className="d-flex justify-content-end">
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => {
              setVieworders(false)
            }}

          ></button>
        </div>

        <div >
          <h2 className="fw-bold text-dark text-center ">
            Here is your order details!
          </h2>
        </div>
        <section className="row mt-5 d-flex justify-content-around  text-center">
          <div className="col-3 ">
            <div className="d-flex align-items-center ">
              <div className="me-3 fs-4 fw-bold"><p>Name:</p></div>
              <div><p className="pt-1 fs-5">{order.firstname} {order.lastname}</p></div>

            </div>
            <div className="d-flex align-items-center ">
              <div className="me-3 fs-4 fw-bold"><p>Email:</p></div>
              <div><p className="pt-1 fs-5">{order.email}</p></div>

            </div>
            <div className="d-flex align-items-center ">
              <div className="me-3 fs-4 fw-bold"><p>Address:</p></div>
              <div><p className="pt-1 fs-5">{order.city} , {order.governorate}</p></div>

            </div>

          </div>
          <div className="col-3">
            <div className="d-flex  ">
              <div className="me-3 fs-4 fw-bold"><p>Products Items:</p></div>
              <div><p className="pt-1 fs-5">{order.items?.reduce((acc, item) => (
                acc + item.quantity

              ), 0)}</p></div>

            </div>




            <div className="d-flex align-items-center ">
              <div className="me-3 fs-4 fw-bold "><p>Payment Method:</p></div>
              <div><p className="pt-1 fs-6">{order.paymentmethod === "Via (Card / Wallets / Installments / Debit / Credit)" ? ("Via Cards") : (<>{order.paymentmethod}</>)}</p></div>

            </div>


            <div className="d-flex align-items-center ">
              <div className="me-3 fs-4 fw-bold"><p>Phone Number:</p></div>
              <div><p className="pt-1 fs-5">{order.phonenumber}</p></div>

            </div>
          </div>
        </section>
        <hr />
        <div className="row d-flex align-items-center justify-content-around  ">
          <div className="col-6">
            <table className="table border-2 ">
              <tbody>
                {order.items?.map((item) => (
                  <tr
                    key={item._id}
                  >
                    <td>{item.title}</td>
                    <td>£E {item.price - (item.price * item.discount / 100)}</td>
                    <td>{item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>

          <div className="col-4 ">
            <div className=" p-3 rounded-3 w-50"
            style={{backgroundColor:"#efd6bcff"}} 
            >
              <div className="d-flex align-items-center ">
                <div className="me-3 fs-5 fw-bold"><p>subtotal:</p></div>
                <div><p className="pt-1 fs-6"> £E {order.subtotal} </p></div>

              </div>
              <div className="d-flex align-items-center ">
                <div className="me-3 fs-5 fw-bold"><p>Shipping Fees:</p></div>
                <div><p className="pt-1 fs-6"> £E {order.shippingfees} </p></div>

              </div>
              <div className="d-flex align-items-center ">
                <div className="me-3 fs-5 fw-bold"><p>Total:</p></div>
                <div><p className="pt-1 fs-6"> £E {order.total} </p></div>

              </div>
            </div>
          </div>

        </div>


      </div>
    </div>

  </>);
}

export default Vieworder;