const signup = '/images/lock2.jpg'
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getuserinfo, isloggedin } from "../../../utils/Api";
import { useState } from "react";
const ProfilePage = () => {
  const navigate = useNavigate()
  const [loggedin, setLoggedIn] = useState(false)
  const [userinfo, setUserInfo] = useState({})
  useEffect(() => {
    setLoggedIn(isloggedin())
    if (loggedin) {
      getuserinfo()
        .then(res => setUserInfo(res.data))
    }
  }, [loggedin])
  return (
    <>
      {loggedin ? (<>
        <main>
          <div className="card text-bg-light shadow mb-3 mx-2 my-2">
            <div className="card-body">
              <div className="profile-pic text-center position-relative mx-auto rounded-circle overflow-hidden">
                {/* Default icon */}
                <i className="bi bi-person-fill text-secondary"></i>

                {/* Overlay */}
                <div className="overlay d-flex flex-column justify-content-center align-items-center">
                  <i className="bi bi-camera text-white"></i>
                  <p className="text-white mb-0">Add Photo</p>
                </div>
              </div>
              <p className="card-text fw-bold text-center fs-3 letter-spacing-3">
                {userinfo.username}
              </p>
            </div>
          </div>
        </main>

        <section className="details">
          <div
            className="accordion accordion-flush mx-2 shadow"
            id="accordionFlushExample"
          >
            {/* User Info */}
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed fw-bold"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseOne"
                  aria-expanded="false"
                  aria-controls="flush-collapseOne"
                >
                  User Info
                </button>
              </h2>
              <div
                id="flush-collapseOne"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <div className="input-group mb-3 mt-3 ml-3">
                  <span className="input-group-text" id="name">
                    Name
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="name"
                    required

                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="phone">
                    Phone Number
                  </span>
                  <input
                    type="tel"
                    className="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="phone"
                    required
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="email">
                    Email
                  </span>
                  <input
                    type="email"
                    className="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="email"
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="address">
                    Address
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="address"
                    required
                  />
                </div>
                <div className="actions d-flex flex-column flex-md-row justify-content-between align-items-start gap-3 mt-4">
                  <button type="button" className="btn mb-3 order-2 order-md-1">
                    Save Changes
                  </button>
                  <div className="form-check order-1 order-md-2 flex-grow-1">
                    <input
                      className="form-check-input mx-3"
                      type="checkbox"
                      value=""
                      id="checkChecked"
                      defaultChecked
                    />
                    <label className="form-check-label" htmlFor="checkChecked">
                      I agree to allow my data to be used to receive promotions,
                      updates, and special offers about your products
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Order History */}
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed fw-bold"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseTwo"
                  aria-expanded="false"
                  aria-controls="flush-collapseTwo"
                >
                  Order History
                </button>
              </h2>
              <div
                id="flush-collapseTwo"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body">
                  <div className="table-responsive">
                    <table className="table table-striped align-middle">
                      <thead>
                        <tr>
                          <th>Order ID</th>
                          <th>Date</th>
                          <th>Items</th>
                          <th>Total</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Fake data */}
                        <tr>
                          <td>#10234</td>
                          <td>2025-09-10</td>
                          <td>2 items</td>
                          <td>$150.00</td>
                          <td>
                            <span className="badge bg-success">Delivered</span>
                          </td>
                          <td>
                            <button className="btn btn-sm btn-outline-primary">
                              View
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>#10235</td>
                          <td>2025-09-11</td>
                          <td>1 item</td>
                          <td>$45.00</td>
                          <td>
                            <span className="badge bg-warning text-dark">
                              Pending
                            </span>
                          </td>
                          <td>
                            <button className="btn btn-sm btn-outline-primary">
                              View
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* Wishlist */}
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed fw-bold"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseThree"
                  aria-expanded="false"
                  aria-controls="flush-collapseThree"
                >
                  Wishlist
                </button>
              </h2>
              <div
                id="flush-collapseThree"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body">
                  {/* Wishlist Stats */}
                  <div className="wishlist-stats mb-4 p-3">
                    <div className="row">
                      <div className="col-md-4">
                        <small className="text-muted">Total Items</small>
                        <div className="fw-bold">3</div>
                      </div>
                      <div className="col-md-4">
                        <small className="text-muted">Total Value</small>
                        <div className="fw-bold">$847.00</div>
                      </div>
                      <div className="col-md-4">
                        <small className="text-muted">Average Price</small>
                        <div className="fw-bold">$282.33</div>
                      </div>
                    </div>
                  </div>

                  {/* Wishlist Items */}
                  <div className="wishlist-container">
                    {/* Item 1 */}
                    <div className="wishlist-item p-3 mb-3">
                      <div className="row align-items-center">
                        <div className="col-md-2 col-3">
                          <img
                            src="../assets/images/vitamin c.webp"
                            alt="Eyelash serum"
                            className="img-fluid"
                          />
                        </div>
                        <div className="col-md-4 col-9">
                          <h6 className="mb-1">
                            Follicle Booster Eyelash Edition
                          </h6>
                          <small className="text-muted">Eyelash serum</small>
                          <div className="mt-1">
                            <small className="text-muted">
                              Added: Jan 15, 2025
                            </small>
                          </div>
                        </div>
                        <div className="col-md-2 col-6 text-center">
                          <div className="price">$299.00</div>
                          <small className="text-success">In Stock</small>
                        </div>
                        <div className="col-md-4 col-6">
                          <div className="d-flex gap-2 justify-content-end">
                            <button className="btn btn-sm add-btn">
                              Add to Cart
                            </button>
                            <button className="btn btn-sm remove-btn">
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Item 2 */}
                    <div className="wishlist-item p-3 mb-3">
                      <div className="row align-items-center">
                        <div className="col-md-2 col-3">
                          <img
                            src="../assets/images/Beesline Facial Cleanser.webp"
                            alt="Sheet Mask"
                            className="img-fluid"
                            style={{ borderRadius: "6px" }}
                          />
                        </div>
                        <div className="col-md-4 col-9">
                          <h6 className="mb-1">
                            Charcoal & Vitamin E Sheet Mask
                          </h6>
                          <small className="text-muted">Sheet Mask</small>
                          <div className="mt-1">
                            <small className="text-muted">
                              Added: Jan 12, 2025
                            </small>
                          </div>
                        </div>
                        <div className="col-md-2 col-6 text-center">
                          <div className="price">$189.00</div>
                          <small className="text-warning">Low Stock</small>
                        </div>
                        <div className="col-md-4 col-6">
                          <div className="d-flex gap-2 justify-content-end">
                            <button className="btn btn-sm add-btn">
                              Add to Cart
                            </button>
                            <button className="btn btn-sm remove-btn">
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Item 3 */}
                    <div className="wishlist-item p-3 mb-3">
                      <div className="row align-items-center">
                        <div className="col-md-2 col-3">
                          <img
                            src="../assets/images/Face Serum.jpg"
                            alt="Lip Oil"
                            className="img-fluid"
                            style={{ borderRadius: "6px" }}
                          />
                        </div>
                        <div className="col-md-4 col-9">
                          <h6 className="mb-1">Godly Pride Lip Oil</h6>
                          <small className="text-muted">Lip Oil</small>
                          <div className="mt-1">
                            <small className="text-muted">
                              Added: Jan 8, 2025
                            </small>
                          </div>
                        </div>
                        <div className="col-md-2 col-6 text-center">
                          <div className="price">$359.00</div>
                          <small className="text-danger">Out of Stock</small>
                        </div>
                        <div className="col-md-4 col-6">
                          <div className="d-flex gap-2 justify-content-end">
                            <button className="btn btn-sm add-btn">
                              Notify Me
                            </button>
                            <button className="btn btn-sm remove-btn">
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-4 pt-3 actions-footer">
                    <div className="d-flex gap-2 justify-content-between">
                      <button className="btn clear-btn">Clear Wishlist</button>
                      <button className="btn add-all-btn">Add All to Cart</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Settings */}
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed fw-bold"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseFour"
                  aria-expanded="false"
                  aria-controls="flush-collapseFour"
                >
                  Settings
                </button>
              </h2>
              <div
                id="flush-collapseFour"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body">
                  {/* App Preferences */}
                  <div className="settings-section mb-4">
                    <h6 className="fw-bold mb-3 settings-title">
                      App Preferences
                    </h6>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <div className="p-3 settings-card">
                          <label className="form-label fw-bold">Language</label>
                          <select className="form-select">
                            <option className="option">English</option>
                            <option className="option">Arabic</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="p-3 settings-card">
                          <label className="form-label fw-bold">Theme</label>
                          <select className="form-select">
                            <option className="option">Light Mode</option>
                            <option className="option">Dark Mode</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="settings-section mb-4">
                    <h6 className="fw-bold mb-3 settings-title">
                      Payment Method
                    </h6>
                    <div className="col-md-6">
                      <div className="p-3 settings-card">
                        <label className="form-label fw-bold">
                          Payment Method
                        </label>
                        <select className="form-select">
                          <option className="option">Cash on Delivery </option>
                          <option className="option">Digital Wallets</option>
                          <option className="option">Credit/Debit Cards</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Account Settings */}
                  <div className="settings-section mb-4">
                    <h6 className="fw-bold mb-3 settings-title">
                      Account Settings
                    </h6>
                    <div className="container d-flex justify-content-between align-items-center settings-card">
                      <div className="row g-3 align-items-center ">
                        <div className="col-auto ">
                          <label
                            htmlFor="oldPassword"
                            className="col-form-label fw-bold"
                          >
                            Old Password
                          </label>
                        </div>
                        <div className="col-auto">
                          <input
                            type="password"
                            id="oldPassword"
                            className="form-control"
                            aria-describedby="passwordHelpInline"
                          />
                        </div>
                        <div className="col-auto">
                          <span id="passwordHelpInline" className="form-text">
                            Must be 8-20 characters long.
                          </span>
                        </div>
                      </div>

                      <div className="row g-3 align-items-center my-3">
                        <div className="col-auto">
                          <label
                            htmlFor="newPassword"
                            className="col-form-label fw-bold"
                          >
                            New Password
                          </label>
                        </div>
                        <div className="col-auto">
                          <input
                            type="password"
                            id="newPassword"
                            className="form-control"
                            aria-describedby="passwordHelpInline"
                          />
                        </div>
                        <div className="col-auto">
                          <span id="passwordHelpInline" className="form-text">
                            Must be 8-20 characters long.
                          </span>
                        </div>
                      </div>
                    </div>
                    <button className="btn change-btn m-3">
                      Change Password
                    </button>
                    <div>
                      <button className="btn" onClick={() => {
                        localStorage.removeItem('auth_token')
                        navigate('/')

                      }}> <i className="bi bi-box-arrow-right fs-1"></i></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section></>) : (<>
          <div className="d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>

            <div style={{ backgroundColor: "#FFFFFF", height: "70vh" }} className="container rounded-5 d-flex justify-content-between  ">
              <div className="w-50 p-3 d-flex justify-content-center align-items-center flex-column">
                <div>
                  <p className="my-3 fs-1 fw-bold">Oops! you are not logged in</p>
                  <p className="fs-5" >Log in to access your account details, manage your orders, view your wishlist, and enjoy a smoother, faster, and more personalized shopping journey.</p>

                </div>
                <div className="w-100 mt-5 p-3">
                  <Link to='/login' className="btn w-100 mb-2" style={{ backgroundColor: "#F7838E" }}>Log In</Link>
                  <Link to='/signup' className="btn w-100 " style={{ backgroundColor: "#F7838E" }}>Sign Up </Link>
                </div>
              </div>
              <div className="w-50 d-flex align-items-center justify-content-center">
                <img src={signup} alt="signup" style={{ width: "70%", height: "60%" }} className="rounded-5" /></div>

            </div>

          </div>
        </>)}
    </>
  );
};

export default ProfilePage;