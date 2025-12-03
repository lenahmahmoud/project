import  { useRef } from "react";
import emailjs from "@emailjs/browser";
import "../style/footerpages.css";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
function Contact() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_lyj80rl", "template_3a5lhe1", form.current, {
        publicKey: "2sUw4F15554jjE7NT",
      })
      .then(
        Swal.fire({
               title: "Message sent successfully!",
               icon: "success",
               draggable: true,
               confirmButtonColor: "#000000",
           }),
        (error) => {
          console.error("FAILED...", error.text);
          alert("Failed to send message. Please try again.");
        }
      );
  };

  return (
    <>
      <main className="my-5 pt-5">
        <div className="container">
          <form ref={form} onSubmit={sendEmail} className="w-50 mx-auto">
            <h1 className="fw-bold mb-3" >Contact Us</h1>

            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control py-4"
                id="floatingName"
                name="user_name"
                //placeholder="Name"
                required
              />
              <label htmlFor="floatingName" className="p-2">Name</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control py-4"
                id="floatingInput"
                name="user_email"
               
                required
              />
              <label htmlFor="floatingInput" className="p-2">Email address</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="tel"
                className="form-control py-4"
                id="floatingPhone"
                name="user_phone"
              
              />
              <label htmlFor="floatingPhone"  className="p-2">Phone</label>
            </div>

            <div className="form-floating mb-3">
              <textarea
                className="form-control py-5"
                id="floatingMessage"
                name="message"
                
                required
              ></textarea>
              <label htmlFor="floatingMessage"  className="p-2">Message</label>
            </div>

            <button type="submit" className="btn btn-large px-5 bg-dark text-white">
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

