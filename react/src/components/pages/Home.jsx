import { Link } from "react-router-dom";
import '../style/home.css';
import { useEffect, useState } from "react";
import { addtocart, decrementquantity } from "../../../utils/Api";

const oils = "/images/categories/oils_cat.jpg";
const serums = "/images/categories/serums_cat.jpg";
const moisturizers = '/images/categories/moisturizers_cat.jpg';
const masks = '/images/categories/masks_cat.jpg';
const cleansers = '/images/categories/cleansers_cat.jpg';
const toners = '/images/categories/toners_cat.jpg';
const image_1 = '/images/image_1.jpg';
const image_2 = '/images/image_2.jpg';
const image_3 = '/images/image_3.jpg';
const image_4 = '/images/image_4.jpg';
const about = '/images/about_section.jpg';


import { getsales, getbestselling } from "../../../utils/Api";

function Home() {
    const [sales, setSales] = useState([]);
    const [bestselling, setBestselling] = useState([]);

    useEffect(() => {
        getsales().then(res => setSales(res.data));
        getbestselling().then(res => setBestselling(res.data));
    }, []);

    return (
        <>
            <header className="p-5 mt-5">
                <div className="text">
                    <h1 className="display-4 fw-bold">Be Your Own kind Of Beauty</h1>
                    <p className="text-secondary fs-3 fs-lg-3 fs-md-2">
                        Aurévia – Crafting Natural Beauty, One Glow at a Time"                    </p>
                </div>
                <div className="button">
                    <Link to="/shopall" className="btn btn-large bg-dark px-4 text-white">
                        Shop Now
                    </Link>
                </div>
            </header>

            {/* Categories Section */}
            <section className="mt-5">
                <div className="container">
                    <div className="text-center">
                        <h2 className="fs-2">Our Picks For you</h2>
                        <p className="text-secondary my-3 fs-3">our products are designed for everyone</p>
                    </div>

                    <div className="categories row justify-content-center fs-3">
                        {[{ img: oils, link: '/oils', name: 'oils' },
                        { img: serums, link: '/serums', name: 'serums' },
                        { img: toners, link: '/toners', name: 'toners' },
                        { img: masks, link: '/masks', name: 'masks' },
                        { img: moisturizers, link: '/moisturizers', name: 'moisturizers' },
                        { img: cleansers, link: '/cleansers', name: 'cleansers' }]
                            .map((cat, index) => (
                                <div key={index} className="col-lg-4 col-xl-3 col-md-9 col-sm-8 col-11 text-sm-center rounded-circle">
                                    <figure>
                                        <Link to={cat.link}>
                                            <img src={cat.img} alt={`${cat.name} set`} className="rounded-circle w-100" />
                                        </Link>
                                        <figcaption className="text-center my-3">{cat.name}</figcaption>
                                    </figure>
                                </div>
                            ))}
                    </div>
                </div>
            </section>

            {/* Hero Section */}
            <section style={{ height: "170vh" }} className="position-relative mt-5 d-flex align-items-center">
                <div className="position-absolute w-100" style={{ height: "90vh", backgroundColor: "#e0d4c2" }}></div>

                <div className="position-absolute image_one" style={{ width: "35%" }}>
                    <img src={image_1} className="w-100" />
                </div>
                <div className="position-absolute image_two" style={{ width: "20%" }}>
                    <img src={image_2} className="w-100" />
                </div>

                <div className="position-absolute w-50 fw-bold text-center Text">
                    <h2 className="display-4 text-center">
                        Because You Need Time for Yourself. Blend Beauty in You
                    </h2>
                    <p className="text-secondary my-5 fs-4 text-center w-75 mx-auto">
                        Discover skincare that nourishes, restores, and enhances your natural beauty, leaving your skin healthy, radiant, and glowing every day                    </p>
                    <div>
                        <Link to="../Shopall" className="btn btn-large bg-dark border-0 text-white">
                            Shop Now
                        </Link>
                    </div>
                </div>

                <div className="position-absolute image_three" style={{ width: "15%" }}>
                    <img src={image_3} className="w-100" />
                </div>
                <div className="position-absolute image_four" style={{ width: "10%" }}>
                    <img src={image_4} className="w-100" />
                </div>
            </section>

            {/* Special Sales */}
            <section className="sales py-5">
                <div className="container text-center">
                    <h2 className="mb-4 fs-2">✨ Special Sales ✨</h2>
                    <p className="mb-5 text-secondary fs-3">
                        Discover our limited-time offers on top skincare products.
                    </p>
                    <div className="row g-4 text-center">
                        {sales.map(product => (
                            <div className="col-md-3 col-sm-9 text-sm-center" key={product.id}>
                                <div className="card shadow-sm">
                                    <div className="position-relative parent">
                                        <img
                                            src={product.image[0]}
                                            className="card-img-top"
                                            alt={product.title}
                                            style={{ height: "45vh" }}
                                        />
                                        <p className="badge bg-danger m-2 position-absolute top-0 end-0 fs-4">
                                            -{product.discount}%
                                        </p>

                                        <div className="overlay d-flex justify-content-around w-100 align-items-center">
                                            <button className="btn border-0" onClick={() => {
                                                const productToAdd = { ...product, quantity: 1 }
                                                addtocart(productToAdd)
                                                decrementquantity(product, product.id, 1)



                                            }}><i className="bi bi-bag-heart fs-4 rounded-circle p-2 bg-white"></i></button>
                                            <Link><i className="bi bi-share rounded-circle p-2 bg-white"></i></Link>
                                            <Link to={`/details/${product.id}`}><i className="bi bi-eye rounded-circle p-2 bg-white"></i></Link>
                                            <Link><i className="bi bi-suit-heart rounded-circle p-2 bg-white"></i></Link>
                                        </div>
                                    </div>

                                    <div className="card-body">
                                        <h5 className="card-title">Face Serum</h5>
                                        <p>
                                            <del>£E {product.price}</del>{" "}
                                            <strong className="text-success">
                                                £E {product.price - (product.price * product.discount) / 100}
                                            </strong>
                                        </p>
                                        <p>
                                            {Array.from({ length: 5 }, (_, i) => (
                                                <span key={i} style={{ color: i < product.stars ? "#ffc107" : "#b4b4b4ff" }}>
                                                    &#9733;
                                                </span>
                                            ))}
                                            <span className="text-muted"> {product.reviews} reviews</span>
                                        </p>
                                        <Link to="/" className="btn btn-dark">Buy Now</Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="text-center col-12 my-3">
                    <Link to="/shopall" className="btn btn-large px-5 border-2 bg-white">
                        Shop All Products
                    </Link>
                </div>
            </section>

            {/* Best Selling */}
            <section className="best-selling py-5">
                <div className="container text-center bestselling">
                    <h2 className="mb-4 fs-2">✨ Best Selling ✨</h2>
                    <p className="mb-5 text-secondary fs-3">
                        Our Customers’ Favorites — Tried, Loved, and Highly Rated!
                    </p>
                    <div className="row g-4">
                        {bestselling.map(product => (
                            product.quantity > 0 ? (
                                <div className="col-md-3" key={product.id}>
                                    <div className="card shadow-sm">
                                        <div className="parent position-relative">
                                            <img src={product.image[0]} className="card-img-top" alt={product.title} />
                                            {product.discount ? (
                                                <p className="badge bg-danger m-2 position-absolute top-0 end-0 fs-4">
                                                    -{product.discount}%
                                                </p>
                                            ) : (null)}


                                            <div className="overlay d-flex justify-content-around w-100 align-items-center">
                                                <button className="btn border-0" onClick={
                                                    () => {
                                                        const productToAdd = { ...product, quantity: 1 }
                                                        addtocart(productToAdd)
                                                        decrementquantity(product, product.id, 1)

                                                    }
                                                }><i className="bi bi-bag-heart fs-4 rounded-circle p-2 bg-white"></i></button>
                                                <Link><i className="bi bi-share rounded-circle p-2 bg-white"></i></Link>
                                                <Link to={`details/${product.id}`}><i className="bi bi-eye rounded-circle p-2 bg-white"></i></Link>
                                                <Link><i className="bi bi-suit-heart rounded-circle p-2 bg-white"></i></Link>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <h5 className="card-title">{product.title}</h5>
                                            <p>
                                                {product.discount ? (
                                                    <>
                                                        <del>£E{product.price}</del>{" "}
                                                        <strong className="text-success">
                                                            £E{product.price - (product.price * product.discount) / 100}
                                                        </strong>
                                                    </>
                                                ) : (
                                                    <>£E{product.price}</>
                                                )}
                                            </p>
                                            <p>
                                                {Array.from({ length: 5 }, (_, i) => (
                                                    <span key={i} style={{ color: i < product.stars ? "#ffc107" : "#b4b4b4ff" }}>
                                                        &#9733;
                                                    </span>
                                                ))}
                                                <span className="text-muted"> {product.reviews} reviews</span>
                                            </p>
                                            <Link to="#" className="btn btn-dark">Buy Now</Link>
                                        </div>
                                    </div>
                                </div>) : (null)

                        ))}
                    </div>
                </div>

                <div className="text-center col-12 my-3">
                    <Link to="/shopall" className="btn btn-large px-5 border-2 bg-white">Shop All Products</Link>
                </div>
            </section>

            {/* About Section */}
            <section className="about-section py-5">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <h2 className="fw-bold mb-3">About Us</h2>
                            <p className="text-muted mb-4">
                                At <span className="fw-semibold">Aurévia</span>, we believe that beauty starts with healthy skin.
                                Our mission is to provide natural and dermatologically tested products that nourish your skin and bring out
                                your natural glow.
                            </p>
                            <Link to="/about" className="btn btn-dark px-4 py-2">Learn More</Link>
                        </div>
                        <div className="col-md-6 my-5">
                            <img src={about} alt="About Us" className="img-fluid rounded shadow" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Home;
