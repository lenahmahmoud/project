import { Link } from "react-router-dom";
import '../style/home.css'
const oils = "/images/categories/oils_cat.jpg"
const serums = "/images/categories/serums_cat.jpg"
const moisturizers = '/images/categories/moisturizers_cat.jpg'
const masks = '/images/categories/masks_cat.jpg'
const cleansers = '/images/categories/cleansers_cat.jpg'
const toners = '/images/categories/toners_cat.jpg'
const image_1 = '/images/image_1.jpg'
const image_2 = '/images/image_2.jpg'
const image_3 = '/images/image_3.jpg'
const image_4 = '/images/image_4.jpg'
const about='/images/about_section.jpg'
function Home() {
    return (<>
        <header className="p-5 mt-5">
            <div className="text">
                <h1 className=" display-4 fw-bold ">Be Your Own kind Of Beauty</h1>
                <p className="text-secondary fs-3 fs-lg-3 fs-md-2">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi, cumque.
                </p>
            </div>
            <div className="button">
                <Link to="/shopall" className="btn btn-large bg-dark px-4 text-white">Shop Now </Link>
            </div>
        </header>
        <section className="mt-5 ">
            <div className="container ">
                {/* <!-- title --> */}
                <div className="text-center">
                    <h2 className="fs-2">Our Picks For you</h2>
                    <p className="text-secondary my-3 fs-3">our products are designed for everyone</p>
                </div>
                {/* <!-- categories --> */}
                <div className="categories row justify-content-center fs-3 ">

                    <div className="col-lg-4 col-xl-3 col-md-9 col-sm-8  col-11 text-sm-center rounded-circle ">
                        <figure>
                            <Link to='/oils'> <img src={oils} alt="oils set" className="rounded-circle w-100 " /></Link>
                            <figcaption className="text-center my-3">oils</figcaption>
                        </figure>
                    </div>

                    <div className="col-lg-4  col-xl-3  col-md-9  col-sm-8  col-11 text-sm-center rounded-circle ">
                        <figure>
                            <Link to="/serums"> <img src={serums} alt="serums set" className="rounded-circle w-100" /></Link>
                            <figcaption className="text-center my-3">serums</figcaption>
                        </figure>

                    </div>

                    <div className="col-lg-4  col-xl-3  col-md-9  col-sm-8  col-11 text-sm-center  rounded-circle">
                        <figure>
                            <Link to="/toners"> <img src={toners} alt="toners set" className="rounded-circle w-100" /></Link>
                            <figcaption className="text-center my-3">toners</figcaption>
                        </figure>
                    </div>

                    <div className="col-lg-4  col-xl-3  col-md-9  col-sm-8  col-11 text-sm-center rounded-circle ">
                        <figure>
                            <Link to="/masks">
                                <img src={masks} alt="masks set" className="rounded-circle w-100" />
                            </Link>
                            <figcaption className="text-center my-3">masks</figcaption>
                        </figure>
                    </div>

                    <div className="col-lg-4  col-xl-3  col-md-9  col-sm-8  col-11 rounded-circle ">
                        <figure>
                            <Link to='/moisturizers'> <img src={moisturizers} alt="moisturizers" className="rounded-circle w-100" />  </Link>
                            <figcaption className="text-center my-3">moisturizers</figcaption>
                        </figure>
                    </div>

                    <div className="col-lg-4  col-xl-3  col-md-9 col-11  col-sm-8 text-sm-center  rounded-circle">
                        <figure>
                            <Link to="/cleansers"> <img src={cleansers} alt="cleansers" className="rounded-circle w-100" /></Link>
                            <figcaption className="text-center my-3">cleansers</figcaption>
                        </figure>
                    </div>

                </div>
            </div>

        </section>
        <section style={{ height: "170vh" }} className="position-relative mt-5  d-flex align-items-center ">
            {/* <!-- background --> */}
            <div className="position-absolute  w-100 " style={{ height: "90vh", backgroundColor: "#e0d4c2" }}>
            </div>


            {/* <!-- image number 1 --> */}
            <div className="position-absolute image_one" style={{ width: "35%" }}><img src={image_1}
                className="w-100" />
            </div>

            {/* <!-- image 2 --> */}
            <div className="position-absolute image_two" style={{ width: "20%" }}><img src={image_2} className="w-100" /></div>

            {/* <!-- text --> */}
            <div className="position-absolute w-50 fw-bold text-center Text">
                <h2 className=" display-4 text-center">Because You Need Time for Yourself. Blend Beauty in You
                </h2>
                <p className="text-secondary my-5 fs-4 text-center w-75 mx-auto">
                    Lorem ipsum dolor sit amet consectetur, adipisicing lotrm5
                    Lorem ipsum dolor sit amet.
                </p>
                <div><Link to="../Shopall" className="btn btn-large bg-dark border-0  text-white"> Shop Now</Link></div>

            </div>

            {/* <!-- image 3 --> */}
            <div className="position-absolute image_three " style={{ width: "15%" }}><img src={image_3}
                className="w-100" /></div>
            {/* <!-- image_4 --> */}
            <div className="position-absolute image_four" style={{ width: "10%" }}><img src={image_4} className="w-100" />
            </div>

        </section>

        <section className="about-section py-5">
            <div className="container">
                <div className="row align-items-center">

                    {/* <!-- text --> */}
                    <div className="col-md-6">
                        <h2 className="fw-bold mb-3">About Us</h2>
                        <p className="text-muted mb-4">
                            At <span className="fw-semibold">Aurévia</span>, we believe that beauty starts with healthy skin.
                            Our mission is to provide natural and dermatologically tested products that nourish your skin and bring out
                            your natural glow.
                        </p>
                        <Link to="/about" className="btn btn-dark px-4 py-2">Learn More</Link>
                    </div>

                    {/* <!--image--> */}
                    <div className="col-md-6 my-5">
                        <img src={about} alt="About Us" className="img-fluid rounded shadow"/>
                    </div>

                </div>
            </div>
        </section>



    </>);
}

export default Home;
