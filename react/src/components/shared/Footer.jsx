import { Link } from "react-router-dom";
import logo from '../../assets/images/Logo Brand.png';

function Footer() {
  return (
    <footer className="footer mt-5 pt-5 text-center text-md-start">
      <div className="container-fluid">
        <div className="row">
          {/* Brand */}
          <div className="col-lg-3 col-md-6 col-sm-12">
            <h3 className="fw-bold mb-5">
              <img
                src={logo}
                alt="Aurévia Logo"
                width="40"
                height="40"
                className="me-2"
              />
              Aurévia
            </h3>
            <p className="w-75 text-secondary mx-auto">
              Discover Aurévia’s natural, science-backed skincare designed to protect, nourish, and glow every day.F            </p>

          </div>

          {/* Links */}
          <div className="col-lg-3 col-md-6 col-sm-12 fw-bold">
            <p className="mb-5 fs-5 mt-sm-5 mt-md-0">Links</p>
            <ul className="navbar-nav mx-auto text-secondary">
              <li className="nav-item">
                <Link className="nav-link mb-md-3" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link mb-md-3" to="/shop">Shop</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link mb-md-3" to="/about">About</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link mb-5" to="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div className="col-lg-3 col-md-6 col-sm-12 fw-bold">
            <p className="mb-5 fs-5 mt-sm-5 mt-md-0">Help</p>
            <ul className="navbar-nav mx-auto text-secondary">
              <li className="nav-item">
                <Link className="nav-link mb-3" to="/paymentoptions">Payment Options</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link mb-3" to="/shippingfees">Shipping Fees</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link mb-5" to="/privacypolicy">Privacy Policy</Link>
              </li>
            </ul>
          </div>


          {/* Subscribe Form */}
          <div className="col-lg-3 col-md-6 col-sm-12 fw-bold">
            <p className="mb-5 fs-5 mt-sm-5 mt-md-0">Join Our Mailing List</p>

            <form>
              <div className="form-group my-3">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email here"
                  style={{ backgroundColor: "#f6f0ed" }}
                  className="form-control p-1 fs-6"
                />
              </div>

              <div className="form-group mb-3">
                <input type="checkbox" id="sub" name="subscription" />
                <label htmlFor="sub" className="p-0 text-secondary">
                  Yes, Subscribe me
                </label>
              </div>

              <button className="btn btn-large text-white bg-dark rounded-0 w-100 text-center">
                Subscribe Now
              </button>
            </form>
          </div>

          {/* Copyright */}
          <div className="border-top">
            <p
              className="text-center my-4 text-body-tertiary"
              style={{ fontSize: "0.8rem" }}
            >
              Copyright &copy; 2025 Aurévia, All rights reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
