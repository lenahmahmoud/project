import '../style/footerpages.css'
import { Link } from 'react-router-dom';
function Contact() {
  return (
    <>
      <main className="my-5 pt-5">
        <div className="container">
          <form className="w-50 mx-auto">
            <h1 className="fw-bold mb-3">Contact Us</h1>

            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control py-4"
                id="floatingName"
                placeholder="Name"
              />
              <label htmlFor="floatingName">Name</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control py-4"
                id="floatingInput"
                placeholder="Email address"
              />
              <label htmlFor="floatingInput">Email address</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="tel"
                className="form-control py-4"
                id="floatingPhone"
                placeholder="Phone"
              />
              <label htmlFor="floatingPhone">Phone</label>
            </div>

            <div className="form-floating mb-3">
              <textarea
                className="form-control py-5"
                id="floatingMessage"
                placeholder="Message"
              ></textarea>
              <label htmlFor="floatingMessage">Message</label>
            </div>

            <button className="btn btn-large px-5 bg-dark text-white">
              Send
            </button>
          </form>
        </div>
      </main>

      <section className="d-flex justify-content-center align-items-center backimage mt-5">
        <Link to="/shopall" className="btn btn-large text-dark">
          Return To Shop
        </Link>
      </section>
    </>
  );
}

export default Contact;
