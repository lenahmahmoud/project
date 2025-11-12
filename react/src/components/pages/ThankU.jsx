const verify= "../../../public/images/verification.png";
function ThankU({ closeThankU }) {
  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
      style={{ backgroundColor: "rgba(0,0,0,0.4)", zIndex: 9999 }}
    >
      <div className="bg-white rounded-4 shadow p-4 text-center" style={{ maxWidth: "500px", width: "90%" }}>
        
        <div className="d-flex justify-content-end">
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => closeThankU(false)}
          ></button>
        </div>
        <div className="verifyImage">
             <img src={verify} alt="verify" style={{ width: 50, height: 50 }} className="me-2 mb-3" />
        </div>
        <div className="mb-4">
          <h2 className="fw-bold text-dark">
            Thank you — your order is complete!
          </h2>
        </div>

        <p className="text-secondary mb-4 px-3">
          Your order has been placed successfully and will be processed as soon
          as possible. A confirmation email containing your order details and
          invoice has been sent.
        </p>

        <button
          className="btn btn-dark w-100 rounded-pill py-2 mb-3"
          onClick={() => (window.location.href = "/")}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

export default ThankU;
