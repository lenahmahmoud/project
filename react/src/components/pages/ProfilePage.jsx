const signup = '/images/lock2.jpg'
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getuserinfo, isloggedin, savechanges, removeWishlistitem, addAllToCart, removeALLwishlist, removeAccount ,logout} from "../../../utils/Api";
import { useState } from "react";
import '../style/profile.css'
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
  },[loggedin])
  function totalvalue(wishlist) {
    if (!wishlist) return 0;
    return wishlist.reduce((acc, item) => {
      return acc + (item.price - (item.price * item.discount / 100));
    }, 0);
  }


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
                  className="accordion-button collapsed fw-bold fs-5"
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
                <form>
                  <div className="input-group mb-3 mt-3 ml-3">
                    <label className="input-group-text" id="name">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      aria-label="Sizing example input"
                      aria-describedby="name"
                      value={userinfo.firstname + " " + userinfo.lastname}
                      onChange={(e) => {
                        const full = e.target.value.trim();
                        const parts = full.split(" ");
                        setUserInfo({
                          ...userinfo,
                          firstname: parts[0] || "",
                          lastname: parts.slice(1).join(" ") || ""
                        });
                      }}

                      required

                    />
                  </div>
                  <div className="input-group mb-3">
                    <label className="input-group-text" id="phone">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      aria-label="Sizing example input"
                      aria-describedby="phone"
                      value={userinfo.phonenumber}
                      onChange={(e) => {
                        setUserInfo({
                          ...userinfo,
                          phonenumber: e.target.value
                        })
                      }}
                      required
                    />
                  </div>
                  <div className="input-group mb-3">
                    <label className="input-group-text" id="email">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      aria-label="Sizing example input"
                      aria-describedby="email"
                      value={userinfo.email}
                      onChange={(e) => {
                        setUserInfo({
                          ...userinfo,
                          email: e.target.value
                        })
                      }}
                    />
                  </div>
                  <div className="row mb-3 g-2">
                    <div className="col-md-4 input-group w-25">
                      <label htmlFor="city" className="input-group-text">city</label>
                      <input
                        type="text"
                        className="form-control"
                        aria-label="Sizing example input"
                        aria-describedby="city"
                        value={
                          userinfo.city ? (userinfo.city) : (" ")

                        }
                        onChange={(e) => {
                          setUserInfo({
                            ...userinfo,
                            city: e.target.value
                          })

                        }}
                      />
                    </div>
                    <div className="col-md-4">
                      <select
                        id="governorates"
                        name="governorates"
                        className="form-control "
                        value={userinfo.governorate ? (userinfo.governorate) : (" ")}
                        onChange={(e) => {
                          setUserInfo({
                            ...userinfo,
                            governorate: e.target.value
                          })
                        }}
                        required

                      >
                        {/* <option value="" disabled selected>Governorate</option> */}
                        <option value="alexandria">Alexandria</option>
                        <option value="aswan">Aswan</option>
                        <option value="asyut">Asyut</option>
                        <option value="beheira">Beheira</option>
                        <option value="beni_suef">Beni Suef</option>
                        <option value="cairo">Cairo</option>
                        <option value="dakahlia">Dakahlia</option>
                        <option value="damietta">Damietta</option>
                        <option value="faiyum">Faiyum</option>
                        <option value="giza">Giza</option>
                        <option value="gharbia">Gharbia</option>
                        <option value="ismailia">Ismailia</option>
                        <option value="kafr_el_sheikh">Kafr El Sheikh</option>
                        <option value="luxor">Luxor</option>
                        <option value="matrouh">Matrouh</option>
                        <option value="minya">Minya</option>
                        <option value="monufia">Monufia</option>
                        <option value="new_valley">New Valley</option>
                        <option value="north_sinai">North Sinai</option>
                        <option value="port_said">Port Said</option>
                        <option value="qalyubia">Qalyubia</option>
                        <option value="qena">Qena</option>
                        <option value="red_sea">Red Sea</option>
                        <option value="sharqia">Sharqia</option>
                        <option value="sohag">Sohag</option>
                        <option value="south_sinai">South Sinai</option>
                        <option value="suez">Suez</option>
                        <option value="helwan">Helwan</option>
                        <option value="6_october">6th of October</option>

                      </select>
                    </div>


                  </div>
                  <div className="col-md-4">
                    <select
                      id="paymentmethod"
                      name="paymentmethod"
                      className="form-control "
                      value={userinfo.paymentmethod}
                      onChange={(e) => {
                        setUserInfo({
                          ...userinfo,
                          paymentmethod: e.target.value
                        })
                      }}
                      required

                    >
                      <option className="option" disabled value="" selected>Payment Method</option>
                      <option className="option">Cash on Delivery </option>
                      <option className="option">Via (Card / Wallets / Installments / Debit / Credit)</option>

                    </select>
                  </div>

                  <button type="submit" className="btn my-3 px-5 border-1 border-dark fw-bold" onClick={(e) => {
                    e.preventDefault()
                    savechanges(userinfo)
                  }}
                    style={{ backgroundColor: "#F6F0ED" }}>
                    Save Changes
                  </button>

                </form>
              </div>
            </div>

            {/* Order History */}
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed fw-bold fs-5"
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
                  className="accordion-button collapsed fw-bold fs-5"
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
                        <div className="fw-bold">{userinfo.wishlist?.length}</div>
                      </div>
                      <div className="col-md-4">
                        <small className="text-muted">Total Value</small>
                        <div className="fw-bold">£E {totalvalue(userinfo.wishlist)}</div>
                      </div>
                      <div className="col-md-4">
                        <small className="text-muted">Average Price</small>
                        <div className="fw-bold">£E {isNaN((totalvalue(userinfo.wishlist) / userinfo.wishlist?.length)) ? (<>0</>) : ((totalvalue(userinfo.wishlist) / userinfo.wishlist?.length))}</div>
                      </div>
                    </div>
                  </div>

                  {/* Wishlist Items */}
                  <div className="wishlist-container">
                    {
                      userinfo.wishlist?.length > 0 ? (<>
                        {
                          userinfo.wishlist.map((product) =>
                          (
                            <div className="wishlist-item p-3 mb-3">
                              <div className="row align-items-center">
                                <div className="col-md-2 col-3">
                                  <img
                                    src={product.image[0]}
                                    alt={product.title}
                                    className="img-fluid"
                                    style={{ borderRadius: "6px", width: "30%", height: "100px" }}
                                  />
                                </div>
                                <div className="col-md-4 col-9">
                                  <h6 className="mb-1">{product.title}</h6>
                                  <small className="text-muted"></small>
                                  <div className="mt-1">
                                    <small className="text-muted">
                                      Added: {product.date}
                                    </small>
                                  </div>
                                </div>
                                <div className="col-md-2 col-6 text-center">
                                  <div className="price">£E {product.price - (product.price * product.discount / 100)}</div>
                                  <small
                                    className={
                                      product.quantity === 0
                                        ? "text-danger"
                                        : product.quantity < 5
                                          ? "text-warning"
                                          : "text-success"
                                    }
                                  >
                                    {product.quantity === 0
                                      ? "Out of stock"
                                      : product.quantity < 5
                                        ? "Low stock"
                                        : "In stock"}
                                  </small>

                                </div>
                                <div className="col-md-4 col-6">
                                  <div className="d-flex gap-2 justify-content-end">
                                    <button className="btn btn-sm add-btn">
                                      Notify Me
                                    </button>
                                    <button className="btn btn-sm remove-btn" onClick={() => {
                                      removeWishlistitem(product.id)
                                    }}>

                                      Remove
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>)
                          )}
                        <div className="mt-4 pt-3 actions-footer">
                          <div className="d-flex gap-2 justify-content-between">
                            <button className="btn clear-btn" onClick={removeALLwishlist}>Clear Wishlist</button>
                            <button className="btn add-all-btn" onClick={addAllToCart}>
                              Move All to Cart
                            </button>

                          </div>
                        </div>

                      </>) : (null)


                    }

                  </div>


                </div>
              </div>
            </div>

            {/* Settings */}
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed fw-bold fs-5"
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
                        <div className=" settings-card">
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


                  {/* Account Settings */}
                  <div className="settings-section mb-4">
                    <h6 className="fw-bold mb-3 settings-title">
                      Reset Password
                    </h6>
                    <form>

                      <div className="d-flex w-75 justify-content-between my-3">
                        <div classname="input-group">
                          <label htmlFor="oldpassword" className="fw-bold ">Old Password</label>
                          <input type="text" id="oldpassword" className=" border border-light-subtle rounded py-1 mx-2" />
                          <span style={{ color: "#575A5E" }}>  Must be 6-20 characters long.
                          </span>

                        </div>
                        <div classname="input-group">
                          <label htmlFor="newpassword" className="fw-bold ">New Password</label>
                          <input type="text" id="newpassword" className=" border border-light-subtle rounded py-1 mx-2" />
                          <span style={{ color: "#575A5E" }}>  Must be 6-20 characters long.
                          </span>

                        </div>
                        <div>


                        </div>

                      </div>
                      <button className="btn my-3 px-5 border-1 border-dark fw-bold" style={{ backgroundColor: "#F6F0ED" }}>
                        Change Password
                      </button>
                    </form>
                    <div className="mt-3">
                      <p className="settings-title fw-bold">Log Out</p>
                      <div>
                        <button className="btn" onClick={async() => {
                          const res= await logout()
                          if(res){
                          navigate('/')}

                        }}> <i className="bi bi-box-arrow-right fs-1"></i></button>
                      </div>


                    </div>
                    <div className="mt-3">
                      <p className="settings-title fw-bold">Delete Account</p>
                      <div>
                        <button className="btn fs-1" onClick={async() => {
                          const res= await removeAccount()
                          if(res){
                            navigate('/')
                          }
                        
                        }

                        }><i class="bi bi-person-x"></i></button>
                      </div>


                    </div>



                  </div>
                </div>
              </div>
            </div>
          </div>
        </section></>) : (<>
          <div className="d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>

            <div style={{ backgroundColor: "#FFFFFF", height: "70vh" }} className="container rounded-5 d-flex justify-content-between  ">
              <div className="w-50 p-3 d-flex justi fy-content-center align-items-center flex-column">
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
        </>)
      }
    </>
  );
};

export default ProfilePage;