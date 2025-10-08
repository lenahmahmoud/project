const about = "/images/about.jpg"
const about2 = '/images/about_2.jpg'
import { Link } from 'react-router-dom';
import '../style/about.css'
function About() {
    return (<>
        <section className="container mt-5 pt-5">
            <div className="row gap-5 d-flex align-items-center justify-content-center">
                <div className="col-lg-5 col-sm-8 col-8">
                    <img src={about} className="shadow w-100" />
                </div>
                <div className="col-lg-6 col-sm-8 col-8">
                    <h2 className="mb-3 fs-1">Aurévia Products are </h2>
                    <ul className="fs-4 text-secondary">
                        <li>At <strong>Aurévia</strong>, we believe healthy, radiant skin starts with nature’s finest
                            ingredients.</li>
                        <li>Our skincare products are carefully crafted to nourish, protect, and restore your skin’s natural
                            glow.</li>
                        <li>We combine science with purity to create formulas that are gentle, effective, and suitable for
                            all skin types.</li>
                        <li>Our mission is to empower you to feel confident in your own skin, every single day.</li>
                    </ul>

                </div>
            </div>
        </section>
        <section className="container mt-5 pt-5 ">
            <div className="row gap-5 d-flex align-items-center justify-content-center ">
                <div className="col-lg-5 col-sm-8 col-8">
                    <img src={about} className="shadow w-100" />
                </div>
                <div className="col-lg-6 col-sm-8 col-8">
                    <h2 className="mb-3 fs-1">Why are our materials of "Premium Quality"
                    </h2>
                    <ul className="text-secondary fs-4">
                        <li>We use only high-quality, natural ingredients for safe and effective skincare.</li>
                        <li>Our products go through careful testing to ensure purity and performance.</li>
                        <li>Quality means formulas that are gentle on all skin types, yet deliver real results.</li>
                        <li>We believe healthy skin starts with trusted, premium care.</li>
                    </ul>

                </div>
            </div>
        </section>
        <section className="container mt-5 pt-5 mb-5 d-flex align-items-center justify-content-center">
            <div className="text-center">
                <h2 className="mb-3 fs-1">Our Story</h2>
                <p className="fs-4">Our story began with a simple vision — to create skincare that goes beyond surface beauty
                    and focuses on true
                    skin health. We noticed that many products on the market were filled with harsh chemicals, quick fixes,
                    or
                    short-term results, and we wanted to offer something different. Inspired by the power of pure, natural
                    ingredients and guided by the science of skincare, we dedicated ourselves to developing formulas that
                    are
                    safe, effective, and gentle for all skin types.

                    From the very beginning, our mission has been to combine nature and innovation. Each of our products is
                    carefully crafted using premium, responsibly sourced materials, chosen for their ability to nourish,
                    restore, and protect the skin. We believe that quality is not just about what goes into our products,
                    but
                    also about the care, transparency, and passion behind every step of the process.

                    Today, our journey continues as we share our products with people everywhere who seek healthier, radiant
                    skin. We are proud to stand for authenticity, sustainability, and trust — values that are at the heart
                    of
                    everything we do. Our story is not just about skincare, but about helping you feel confident, empowered,
                    and
                    comfortable in your own skin every single day.</p>


            </div>

        </section>


        <section className="mt-5 pt-5 parentabout container position-relative" style={{ height: "90vh" }}>
            <div className="position-absolute aboutimage " style={{ width: "450px" }}>
                <img
                    src={about2} className="w-100" />
            </div>

            <div className="text-center position-absolute aboutbutton" >
                <Link to="/shopall" className="btn btn-large text-center  rounded-0  text-dark" style={{ width: "450px", backgroundColor: "#f6f0ed" }} >shop now</Link>
            </div>
        </section>


    </>);
}

export default About;