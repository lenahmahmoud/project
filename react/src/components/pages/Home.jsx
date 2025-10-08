import { Link } from "react-router-dom";
import '../style/home.css'
const oils = "/images/oils_cat.jpg"
const serums = "/images/serums_cat.jpg"
const moisturizers = '/images/moisturizers_cat.jpg'
const masks = '/images/masks_cat.jpg'
const cleansers = 'images/cleansers_cat.jpg'
const toners = '/images/toners_cat.jpg'
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
                <Link to="#" className="btn btn-large bg-dark px-4 text-white">Shop Now </Link>
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
                            <img src={serums} alt="serums set" className="rounded-circle w-100" />
                            <figcaption className="text-center my-3">serums</figcaption>
                        </figure>

                    </div>

                    <div className="col-lg-4  col-xl-3  col-md-9  col-sm-8  col-11 text-sm-center  rounded-circle">
                        <figure>
                            <img src={toners} alt="toners set" className="rounded-circle w-100" />
                            <figcaption className="text-center my-3">toners</figcaption>
                        </figure>
                    </div>

                    <div className="col-lg-4  col-xl-3  col-md-9  col-sm-8  col-11 text-sm-center rounded-circle ">
                        <figure>
                            <img src={masks} alt="masks set" className="rounded-circle w-100" />
                            <figcaption className="text-center my-3">masks</figcaption>
                        </figure>
                    </div>

                    <div className="col-lg-4  col-xl-3  col-md-9  col-sm-8  col-11 rounded-circle ">
                        <figure>
                            <img src={moisturizers} alt="moisturizers" className="rounded-circle w-100" />
                            <figcaption className="text-center my-3">moisturizers</figcaption>
                        </figure>
                    </div>

                    <div className="col-lg-4  col-xl-3  col-md-9 col-11  col-sm-8 text-sm-center  rounded-circle">
                        <figure>
                            <img src={cleansers} alt="" className="rounded-circle w-100" />
                            <figcaption className="text-center my-3">cleansers</figcaption>
                        </figure>
                    </div>

                </div>
            </div>

        </section>

    </>);
}

export default Home;