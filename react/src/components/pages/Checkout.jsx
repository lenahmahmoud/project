import { Link } from "react-router-dom";
import ThankU from "./ThankU";
import { useState, useEffect } from "react";
import { getitems, isloggedin, getuserinfo, saveorder } from "../../../utils/Api";


function Checkout() {
  const [showThankU, setShowThankU] = useState(false);
  const [loggedin, setLoggedIn] = useState(false)
  const [userinfo, setUserinfo] = useState({})
  const [orderdata, setOrderdata] = useState({

  });
  useEffect(() => {
    setLoggedIn(isloggedin());
    if (loggedin) {
      getuserinfo()
        .then(res => setUserinfo(res.data))
    }
    getitems().then(res => {
      setOrderdata(prev => ({
        ...prev,
        items: res.data
      }));
    });
  }, [loggedin]);

  useEffect(() => {
    if (userinfo) {
      setOrderdata({
        email: userinfo.email,
        firstname: userinfo.firstname,
        lastname: userinfo.lastname,
        phonenumber: userinfo.phonenumber,
        city: userinfo.city,
        governorate: userinfo.governorate,
        paymentmethod: userinfo.paymentmethod,


      });
    }
  }, [userinfo]);

  const subtotal = orderdata.items?.reduce((acc, item) => acc + ((item.price - (item.discount * item.price / 100)) * item.quantity), 0);
  const shippingFees = {
    50: ["cairo", "giza", "alexandria", "beheira", "dakahlia", "monufia", "qalyubia"],
    70: ["faiyum", "beni_suef", "minya", "sohag", "asyut", "red_sea"],
    80: ["luxor", "qena", "matrouh", "gharbia", "ismailia", "port_said", "damietta", "sharqia"],
    100: ["aswan", "south_sinai", "north_sinai", "new_valley", "helwan", "6_october"]
  };


  const handleshippingfees = (gov) => {
    for (let fee in shippingFees) {
      if (shippingFees[fee].includes(gov)) {
        return Number(fee)
      }
    }
    return 50



  }

  return (
    <>
      <section className="container-fluid pt-5 mt-5">
        <div className="row justify-content-center align-items-start">
          <div className="col-lg-7 col-md-8 col-12">
            <form>
              {/* Contact */}
              <div className="mb-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h2>Contact</h2>
                  {
                    !loggedin ? (<><Link to='/login'>Sign In</Link></>) : (null)

                  }

                </div>
                <input
                  type="email"
                  className="w-100 border-0 p-2 rounded mb-2"
                  placeholder="Enter your email.."
                  required
                  value={
                    orderdata.email
                  }
                  onChange={(e) =>
                    setOrderdata({ ...orderdata, email: e.target.value })
                  }
                />
              </div>

              {/* Delivery */}
              <div className="mb-5 w-100">
                <h2 className="mb-3">Delivery</h2>
                <div
                  className="rounded border border-dark pt-2 ps-2 mb-3"
                  style={{ backgroundColor: "#F6F6F6" }}
                >
                  <p>Egypt</p>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6 mb-3 mb-md-0">
                    <input
                      type="text"
                      placeholder="First name"
                      className="form-control border-0 p-2 rounded"
                      required
                      value={orderdata.firstname
                      }
                      onChange={(e) =>
                        setOrderdata({ ...orderdata, firstname: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      placeholder="Last name"
                      className="form-control border-0 p-2 rounded"
                      required
                      value={
                        orderdata.lastname
                      }
                      onChange={(e) =>
                        setOrderdata({ ...orderdata, lastname: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="row mb-3 g-2">
                  <div className="col-md-4">
                    <input
                      type="text"
                      name="city"
                      id="city"
                      placeholder="City"
                      className="form-control border-0 p-2 rounded"
                      required
                      value={
                        orderdata.city
                      }
                      onChange={(e) =>
                        setOrderdata({ ...orderdata, city: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-md-4">
                    <select
                      id="governorates"
                      name="governorates"
                      className="form-control border-0  rounded"
                      required
                      value={orderdata.governorate}
                      onChange={(e) =>
                        setOrderdata({
                          ...orderdata,
                          governorate: e.target.value,
                        })
                      }
                    >
                      <option disabled value="">
                        Governorate
                      </option>

                      <optgroup label="Shipping: E£50">
                        <option value="cairo">Cairo</option>
                        <option value="giza">Giza</option>
                        <option value="alexandria">Alexandria</option>
                        <option value="beheira">Beheira</option>
                        <option value="dakahlia">Dakahlia</option>
                        <option value="monufia">Monufia</option>
                        <option value="qalyubia">Qalyubia</option>
                      </optgroup>

                      <optgroup label="Shipping: E£70">
                        <option value="faiyum">Faiyum</option>
                        <option value="beni_suef">Beni Suef</option>
                        <option value="minya">Minya</option>
                        <option value="sohag">Sohag</option>
                        <option value="asyut">Asyut</option>
                        <option value="red_sea">Red Sea</option>
                      </optgroup>

                      <optgroup label="Shipping: E£80">
                        <option value="luxor">Luxor</option>
                        <option value="qena">Qena</option>
                        <option value="matrouh">Matrouh</option>
                        <option value="gharbia">Gharbia</option>
                        <option value="ismailia">Ismailia</option>
                        <option value="port_said">Port Said</option>
                        <option value="damietta">Damietta</option>
                        <option value="sharqia">Sharqia</option>
                      </optgroup>

                      <optgroup label="Shipping: E£100">
                        <option value="aswan">Aswan</option>
                        <option value="south_sinai">South Sinai</option>
                        <option value="north_sinai">North Sinai</option>
                        <option value="new_valley">New Valley</option>
                        <option value="helwan">Helwan</option>
                        <option value="6_october">6th of October</option>
                      </optgroup>

                    </select>
                  </div>
                  <div className="col-md-4">
                    <input
                      type="text"
                      placeholder="Postal code (optional)"
                      className="form-control border-0 p-2 rounded"
                    />
                  </div>

                </div>


                <input
                  type="tel"
                  name="tel"
                  id="tel"
                  placeholder="Phone number"
                  className="w-100 border-0 p-2 rounded"
                  value={
                    orderdata.phonenumber
                  }
                  onChange={(e) =>
                    setOrderdata({ ...orderdata, phonenumber: e.target.value })
                  }
                />
              </div>

              {/* Shipping */}
              <div className="mb-5">
                <h2 className="mb-3">Shipping method</h2>
                <div
                  className="d-flex justify-content-between rounded border border-dark ps-2 p-2 align-items-center"
                  style={{ backgroundColor: "#F6F6F6" }}
                >
                  <p>Express shipping 3–4 working days</p>
                  <p className="p-1">  E£ {handleshippingfees(orderdata.governorate) || 0}
                  </p>
                </div>
              </div>

              {/* Payment */}
              <div className="mb-5">
                <h2 className="mb-3">Payment method</h2>
                <div className="card shadow-sm my-3">
                  <div className="card-body" id="paymentSection">
                    <div className="form-check mb-3">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="payment"
                        id="cashOption"

                        value="Cash on Delivery"
                        checked={orderdata.paymentmethod === "Cash on Delivery"}

                        onChange={(e) =>
                          setOrderdata({ ...orderdata, paymentmethod: e.target.value })}

                      />
                      <label
                        className="form-check-label fw-bold"
                        htmlFor="cashOption"
                      >
                        Cash On Delivery (COD)
                      </label>
                    </div>
                    <div className="form-check mb-2">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="payment"
                        id="cardOption"
                        data-bs-toggle="collapse"
                        data-bs-target="#cardContent"
                        aria-expanded="false"
                        value="Via (Card / Wallets / Installments / Debit / Credit)"
                        onChange={(e) =>
                          setOrderdata({ ...orderdata, paymentmethod: e.target.value })}
                        checked={orderdata.paymentmethod === "Via (Card / Wallets / Installments / Debit / Credit)"}

                      />
                      <label
                        className="form-check-label fw-bold"
                        htmlFor="cardOption"
                      >
                        Via (Card / Wallets / Installments / Debit / Credit)
                      </label>
                    </div>
                    <div
                      className="collapse mt-2"
                      id="cardContent"
                      data-bs-parent="#paymentSection"
                    >
                      <div className="card card-body mb-2 text-center">
                        <i className="bi bi-credit-card-2-front fs-1"></i>
                        <p>
                          After clicking “Pay now”, you will be redirected to
                          the payment page to complete your purchase securely.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Billing */}
              <div className="mb-5">
                <h2 className="mb-3">Billing address</h2>
                <div className="card shadow-sm my-3">
                  <div className="card-body" id="addressSection">
                    <div className="form-check mb-3">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="address"
                        id="sameAddress"
                        defaultChecked
                        value="samebilling"
                        onChange={(e) => {
                          setOrderdata({
                            ...orderdata,
                            billing: e.target.value


                          })
                        }}
                      />
                      <label
                        className="form-check-label fw-bold"
                        htmlFor="sameAddress"
                      >
                        Same as shipping address
                      </label>
                    </div>

                    <div className="form-check mb-2">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="address"
                        id="differentAddress"
                        data-bs-toggle="collapse"
                        data-bs-target="#billingcontent"
                        aria-expanded="false"
                        value="differentbilling"
                        onChange={(e) => {
                          setOrderdata({
                            ...orderdata,
                            billing: e.target.value


                          })
                        }}
                      />
                      <label
                        className="form-check-label fw-bold"
                        htmlFor="differentAddress"
                      >
                        Use a different billing address
                      </label>
                    </div>

                    <div
                      className="collapse mt-2"
                      id="billingcontent"
                      data-bs-parent="#addressSection"
                    >
                      <div className="card card-body mb-2 text-center">
                        <input
                          type="text"
                          placeholder="First name"
                          className="border-0 p-2 rounded mb-1"
                          onChange={(e) => {
                            setOrderdata({
                              ...orderdata,
                              firstnamebilling: e.target.value
                            })

                          }}

                          required
                        />
                        <input
                          type="text"
                          placeholder="Last name"
                          className="border-0 p-2  rounded mb-1"
                          onChange={(e) =>
                            setOrderdata({ ...orderdata, lastnamebilling: e.target.value })
                          }
                          required
                        />

                        <input
                          type="text"
                          name="city"
                          id="city"
                          placeholder="City"
                          className="border-0 p-2 rounded mb-1"
                          onChange={(e) =>
                            setOrderdata({ ...orderdata, citybilling: e.target.value })
                          }
                        />
                        <select
                          id="governorates"
                          name="governorates"
                          className="form-control border-0 p-2 mb-1 rounded"
                          required
                          value={orderdata.governoratebilling}
                          onChange={(e) =>
                            setOrderdata({
                              ...orderdata,
                              governoratebilling: e.target.value,
                            })
                          }
                        >
                          <option value="cairo">Cairo</option>
                          <option value="giza">Giza</option>
                          <option value="alexandria">Alexandria</option>
                          <option value="beheira">Beheira</option>
                          <option value="dakahlia">Dakahlia</option>
                          <option value="monufia">Monufia</option>
                          <option value="qalyubia">Qalyubia</option>
                          <option value="faiyum">Faiyum</option>
                          <option value="beni_suef">Beni Suef</option>
                          <option value="minya">Minya</option>
                          <option value="sohag">Sohag</option>
                          <option value="asyut">Asyut</option>
                          <option value="red_sea">Red Sea</option>
                          <option value="luxor">Luxor</option>
                          <option value="qena">Qena</option>
                          <option value="matrouh">Matrouh</option>
                          <option value="gharbia">Gharbia</option>
                          <option value="ismailia">Ismailia</option>
                          <option value="port_said">Port Said</option>
                          <option value="damietta">Damietta</option>
                          <option value="sharqia">Sharqia</option>
                          <option value="aswan">Aswan</option>
                          <option value="south_sinai">South Sinai</option>
                          <option value="north_sinai">North Sinai</option>
                          <option value="new_valley">New Valley</option>
                          <option value="helwan">Helwan</option>
                          <option value="6_october">6th of October</option>
                        </select>

                        <input
                          type="tel"
                          name="tel"
                          id="tel"
                          placeholder="Phone number"
                          className="w-100 border-0 p-2 rounded mb-1"
                          onChange={(e) =>
                            setOrderdata({ ...orderdata, phonenumberbilling: e.target.value })
                          }

                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit */}
              <button
                type="button"
                className="btn btn-large w-100 bg-dark text-white mb-4"
                onClick={ () => {
                  setShowThankU(true)
                  console.log(orderdata)

                  saveorder({
                    ...orderdata,
                    shippingfees: handleshippingfees(orderdata.governorate),
                    subtotal:subtotal,
                    total:handleshippingfees(orderdata.governorate)+subtotal
                  })
                
                }
                }
                disabled={
                  !orderdata.firstname ||
                  !orderdata.lastname ||
                  !orderdata.email ||
                  !orderdata.city ||
                  !orderdata.governorate ||
                  !orderdata.phonenumber ||
                  !orderdata.paymentmethod
                  ||
                  (orderdata.billing === "differentbilling" && (
                    !orderdata.firstnamebilling ||
                    !orderdata.lastnamebilling ||
                    !orderdata.citybilling ||
                    !orderdata.governoratebilling ||
                    !orderdata.phonenumberbilling
                  ))
                }
              >
                Complete Order
              </button>

            </form>
          </div>

          {/* Sidebar */}
          <aside className="col-lg-4 col-md-8 col-12">
            <div
              style={{
                position: "fixed",
                top: "100px",
                backgroundColor: "#fff",
                padding: "1rem",
                width: "700px",
              }}
            >
              <div style={{ overflowY: "auto", height: "35vh" }} className="mb-5">
                {orderdata.items?.length > 0 &&
                  orderdata.items?.map((item) => (
                    <div
                      key={item.id}
                      className="d-flex justify-content-between align-items-center mb-3"
                    >
                      <div className="d-flex align-items-center">
                        <img
                          src={item.image[0]}
                          style={{ width: "50px", height: "50px" }}
                          className="rounded shadow"
                          alt={item.title}
                        />
                        <p className="fw-bold mx-3">{item.title}</p>
                      </div>
                      <p>E£ {((item.price - (item.discount * item.price / 100)) * item.quantity)}</p>
                    </div>
                  ))
                }
              </div>

              {/* <form className="mt-5">
                <input
                  type="text"
                  name="discount"
                  id="discount"
                  placeholder="Discount Code"
                  className="w-75 py-2 border-0 ps-2"
                />
                <button className="btn py-3">Apply</button>
              </form> */}

              <section className="mt-5">
                <div className="d-flex justify-content-between mb-2">
                  <p>subtotal</p>
                  <p>E£ {subtotal}</p>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <p>shipping</p>
                  <p>E£ {handleshippingfees(orderdata.governorate) || 0}
                  </p>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <p className="fw-bold">Total</p>
                  <p>E£ {subtotal + handleshippingfees(orderdata.governorate) || 0}</p>
                </div>
              </section>
            </div>
          </aside>

        </div>
      </section >
      {showThankU && <ThankU closeThankU={setShowThankU} />
      }
    </>
  );
}

export default Checkout;