import { Link } from "react-router-dom";

function Checkout() {
  return (
    <>
      <section className="container-fluid pt-5 mt-5">
        <div className="row justify-content-around">
          <div className="col-lg-6 col-8 border-2 rounded">
            <form>
              {/* Contact */}
              <div className="mb-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h2>Contact</h2>
                  <Link to="#">sign-in</Link>
                </div>
                <input
                  type="email"
                  className="w-100 border-0 p-2 rounded"
                  placeholder="Enter your email.."
                  required
                />
                <div className="form-group">
                  <input type="checkbox" name="check" id="check" />
                  <label htmlFor="check">email me with any new offers</label>
                </div>
              </div>

              {/* Delivery */}
              <div className="mb-5 w-100">
                <div className="mb-3">
                  <h2>Delivery</h2>
                </div>
                <div
                  className="rounded border border-dark pt-2 ps-2 mb-3"
                  style={{ backgroundColor: "#F6F6F6" }}
                >
                  <p>Egypt</p>
                </div>

                <input
                  type="text"
                  placeholder="First name"
                  style={{ width: "49%" }}
                  className="border-0 p-2 rounded mb-3"
                  required
                />
                <input
                  type="text"
                  placeholder="Last name"
                  style={{ width: "49%" }}
                  className="border-0 p-2 rounded mb-3"
                  required
                />
                <input
                  type="text"
                  placeholder="Apartment, suite..etc.(optional)"
                  className="w-100 border-0 p-2 rounded mb-3"
                />
                <input
                  type="text"
                  name="city"
                  id="city"
                  placeholder="City"
                  className="border-0 p-2 rounded mb-3"
                  style={{ width: "30%" }}
                />
                <select
                  id="governorates"
                  name="governorates"
                  className="border-0 p-2 rounded mb-3"
                  style={{ width: "30%" }}
                >
                  <option disabled selected>
                    Governorate
                  </option>
                  <option value="alexandria">Alexandria</option>
                  <option value="aswan">Aswan</option>
                  <option value="asyut">Asyut</option>
                  <option value="beheira">Beheira</option>
                  <option value="beni_suef">Beni Suef</option>
                  <option value="cairo">Cairo</option>
                  <option value="dakahlia">Dakahlia</option>
                  <option value="damietta">Damietta</option>
                  <option value="fayoum">Fayoum</option>
                  <option value="gharbiya">Gharbiya</option>
                  <option value="giza">Giza</option>
                  <option value="ismailia">Ismailia</option>
                  <option value="kafr_el_sheikh">Kafr El Sheikh</option>
                  <option value="luxor">Luxor</option>
                  <option value="matruh">Matruh</option>
                  <option value="minya">Minya</option>
                  <option value="monufia">Monufia</option>
                  <option value="new_valley">New Valley</option>
                  <option value="north_sinai">North Sinai</option>
                  <option value="portsaid">Port Said</option>
                  <option value="qalyubia">Qalyubia</option>
                  <option value="qena">Qena</option>
                  <option value="red_sea">Red Sea</option>
                  <option value="sharqia">Sharqia</option>
                  <option value="sohag">Sohag</option>
                  <option value="south_sinai">South Sinai</option>
                  <option value="suez">Suez</option>
                </select>
                <input
                  type="text"
                  placeholder="Postal code (optional)"
                  className="border-0 p-2 rounded mb-3"
                  style={{ width: "33%" }}
                />
                <input
                  type="tel"
                  name="tel"
                  id="tel"
                  placeholder="phone number"
                  className="w-100 border-0 p-2 rounded"
                />
              </div>

              {/* Shipping */}
              <div className="mb-5">
                <h2 className="mb-3">Shipping method</h2>
                <div
                  className="d-flex justify-content-between rounded border border-dark ps-2 pt-2 align-items-center"
                  style={{ backgroundColor: "#F6F6F6" }}
                >
                  <p>Epress shipping 3-4 working days</p>
                  <p className="p-1">E£ 80.00</p>
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
                        defaultChecked
                      />
                      <label className="form-check-label fw-bold" htmlFor="cashOption">
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
                      />
                      <label className="form-check-label fw-bold" htmlFor="cardOption">
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
                          After clicking “Pay now”, you will be redirected to Pay via
                          (Debit/Credit cards/Wallets/Installments) to complete your
                          purchase securely.
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
                      />
                      <label className="form-check-label fw-bold" htmlFor="sameAddress">
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
                      />
                      <label className="form-check-label fw-bold" htmlFor="differentAddress">
                        Use a different billing address
                      </label>
                    </div>
                    <div
                      className="collapse mt-2"
                      id="billingcontent"
                      data-bs-parent="#addressSection"
                    >
                      <div className="card card-body mb-2 text-center">
                        {/* same nested inputs as delivery section */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button className="btn btn-large w-100 bg-dark text-white">Pay Now</button>
            </form>
          </div>

          {/* Sidebar */}
          <aside className="col-lg-5 col-8">
            <div
              style={{
                position: "fixed",
                top: "100px",
                right: "20px",
                backgroundColor: "#fff",
                padding: "1rem",
              }}
              className="col-lg-5 col-8"
            >
              <div
                style={{ overflowY: "auto", height: "35vh" }}
                className="mb-5"
              >
                {/* Example product */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                  {/* <div className="image d-flex align-items-center position-relative">
                    <img
                      src="../assets/images/facial_set.jpg"
                      style={{ width: "14%" }}
                      className="shadow rounded"
                      alt="facial set"
                    />
                    <p className="fw-bold mx-3">cleanser</p>
                    <p className="badge bg-danger position-absolute top-0 start-0">1</p>
                  </div>
                  <div>E£510</div> */}
                </div>
              </div>

              <form className="mt-5">
                <input
                  type="text"
                  name="discount"
                  id="discount"
                  placeholder="Discount Code"
                  className="w-75 py-2 border-0 ps-2"
                />
                <button className="btn py-3">Apply</button>
              </form>

              <section className="mt-5">
                <div className="d-flex justify-content-between mb-2">
                  <p>subtotal</p>
                  <p>E£520</p>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <p>shipping</p>
                  <p>E£50</p>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <p className="fw-bold">Total</p>
                  <p>E£570</p>
                </div>
              </section>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

export default Checkout;
