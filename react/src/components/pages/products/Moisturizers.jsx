import { useState, useEffect } from "react";
import { getcategory, addtocart, decrementquantity,addToWishList } from "../../../../utils/Api";
import { Link } from "react-router-dom";
import '../../style/shop.css'
const logo = '/images/Logo Brand.png';

function Moisturizers({ searchInput }) {
  // moisturizers to be rendered
  const [moisturizers, setMoisturizers] = useState([]);

  // template
  const [originalMoisturizers, setOriginalProducts] = useState([]);

  // search state
  const [searched, setSearched] = useState([])

  // filters
  const [filters, setFilters] = useState({
    sortAlphabetically: "",
    sortPrice: "",
    priceRange: [10, 500],
  });

  // intial values
  useEffect(() => {
    getcategory("moisturizers").then(res => {
      setMoisturizers(res.data);
      setOriginalProducts(res.data);
    });
  }, []);

  // search handling
  useEffect(() => {
    if (searchInput === " ") {
      setSearched([])
      setMoisturizers(originalMoisturizers)
    }
    else {
      const filtered = originalMoisturizers.filter((p) => {
        p.title.toLowerCase().includes(searchInput.toLowerCase())

      })
      setSearched(filtered)
      setMoisturizers(filtered)
    }

  }, [searchInput])



  const applyFilters = () => {
    let result
    searched.length > 0 ? (result = [...searched]) : (result = [...originalMoisturizers])

    // Sort Alphabetically
    if (filters.sortAlphabetically === "A-Z") result.sort((a, b) => a.title.localeCompare(b.title));
    if (filters.sortAlphabetically === "Z-A") result.sort((a, b) => b.title.localeCompare(a.title));

    // Sort Price
    if (filters.sortPrice === "low-to-high") result.sort((a, b) => a.price - b.price);
    if (filters.sortPrice === "high-to-low") result.sort((a, b) => b.price - a.price);

    // Filter by Price Range
    result = result.filter(p => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]);

    setMoisturizers(result);
  };

  function clearFilters() {
    setFilters({
      sortAlphabetically: "",
      sortPrice: "",
      priceRange: [200, 700],
    });
    if (searched.length > 0) {
      setMoisturizers(searched)
    }
    else {
      setMoisturizers(originalMoisturizers)
    }

  }
  return (
    <>
      {/* HEADER */}
      <header className="header-section mt-5 pt-4">
        <div className="headingText text-center py-5 my-5">
          <img src={logo} alt="Aurévia Logo" width="70" height="70" className="mb-4" />
          <h1 className="fw-bold" style={{ fontSize: "4rem", letterSpacing: "0.3rem" }}>Moisturizers</h1>
          <p className="mt-3"><span className="fw-bold"> Home </span>moisturizers-page</p>
        </div>
      </header>

      {/* FILTER SECTION */}
      <section className="controls py-3" style={{ backgroundColor: "rgb(230, 216, 228)" }}>
        <div className="container">
          <Link
            to="#"
            data-bs-toggle="offcanvas"
            data-bs-target="#filterpage"
            aria-controls="filterpage"
            className="link-opacity-50-hover link-underline-opacity-0 fs-3 text-dark"
          >
            <i className="bi bi-filter fs-3"></i> filter & sort
          </Link>

          <div
            className="offcanvas offcanvas-end pt-2 container"
            tabIndex="-1"
            id="filterpage"
            aria-labelledby="filterlabel"
          >
            <div className="offcanvas-header">
              <h3 className="offcanvas-title" id="filterlabel">
                Filter & Sort
              </h3>
              <button
                type="button"
                className="btn-close text-reset"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <hr />

            <div className="offcanvas-body">
              <form>
                {/* Sort Alphabetically */}
                <div className="category">
                  <h4>Sort Alphabetically:</h4>
                  <div className="formgroup d-flex flex-column">
                    <div>
                      <input
                        type="checkbox"
                        value="A-Z"
                        checked={filters.sortAlphabetically === "A-Z"}
                        onChange={() =>
                          setFilters({
                            ...filters,
                            sortAlphabetically:
                              filters.sortAlphabetically === "A-Z" ? "" : "A-Z",
                          })
                        }
                      />
                      <label htmlFor="alpha-asc" className="form-label fs-5 mx-2">
                        A to Z
                      </label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        value="Z-A"
                        checked={filters.sortAlphabetically === "Z-A"}
                        onChange={() =>
                          setFilters({
                            ...filters,
                            sortAlphabetically:
                              filters.sortAlphabetically === "Z-A" ? "" : "Z-A",
                          })
                        }
                      />
                      <label htmlFor="alpha-desc" className="form-label fs-5 mx-2">
                        Z to A
                      </label>
                    </div>
                  </div>
                </div>

                {/* Sort by Price */}
                <div className="price mt-5">
                  <h4>Sort by Price:</h4>
                  <div className="formgroup d-flex flex-column">
                    <div>
                      <input
                        type="checkbox"
                        value="low-to-high"
                        checked={filters.sortPrice === "low-to-high"}
                        onChange={() =>
                          setFilters({
                            ...filters,
                            sortPrice:
                              filters.sortPrice === "low-to-high" ? "" : "low-to-high",
                          })
                        }
                      />
                      <label htmlFor="low-high" className="form-label fs-5 mx-2">
                        Price (Low to High)
                      </label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        value="high-to-low"
                        checked={filters.sortPrice === "high-to-low"}
                        onChange={() =>
                          setFilters({
                            ...filters,
                            sortPrice:
                              filters.sortPrice === "high-to-low" ? "" : "high-to-low",
                          })

                        }

                      />
                      <label htmlFor="high-low" className="form-label fs-5 mx-2">
                        Price (High to Low)
                      </label>
                    </div>
                  </div>
                </div>

                {/* Price Range */}
                <div className="range mt-5">
                  <h4>Price Range:</h4>
                  <h6>from £E200 to £E700</h6>
                  <div className="form-group">
                    <input
                      type="range"
                      name="price_range"
                      className="form-range"
                      min="200"
                      max="700"
                      value={filters.priceRange[1]}
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          priceRange: [filters.priceRange[0], Number(e.target.value)],
                        })
                      }
                    />
                    <p>Max Price: £E{filters.priceRange[1]}</p>
                  </div>
                </div>

                <button
                  type="button"
                  className="btn btn-large text-dark form-control mt-5 rounded"
                  style={{ backgroundColor: "#eadac7" }}
                  onClick={
                    applyFilters

                  }
                >
                  Apply Filters
                </button>
                <button
                  type="button"
                  className="btn btn-large text-dark form-control mt-2 rounded"
                  style={{ backgroundColor: "#eadac7" }}
                  onClick={clearFilters}
                >
                  Clear Filters
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>


      {/* moisturizers */}
      <section className="mt-5" id="shop">
        <div className="container">
          <div className="row justify-content-center shopsec g-5 text-center">
            {moisturizers.map(moisturizer => (
              moisturizer.quantity > 0 ? (<div key={moisturizer.id} className="col-9 col-sm-8 col-lg-3">
                <div className="parent">
                  <img src={moisturizer.image[0]} alt={moisturizer.title} className="rounded w-100" />
                  <div className="overlay d-flex justify-content-around w-100 align-items-center">
                    <button onClick={() => {
                      const productToAdd = { ...moisturizer, quantity: 1 }
                      addtocart(productToAdd)
                      decrementquantity(moisturizer, moisturizer.id, 1)

                    }} className="btn border-0"><i className="bi bi-bag-heart fs-4 rounded-circle p-2 bg-white"></i></button>                                        <Link to="#"><i className="bi bi-share rounded-circle p-2 bg-white"></i></Link>
                    <Link to={`/details/${moisturizer.id}`}><i className="bi bi-eye rounded-circle p-2 bg-white"></i></Link>
                    <button className="btn border-0"
                      onClick={async () => {
                        const productToAddToWishList = {
                          id: moisturizer.id,
                          price: moisturizer.price,
                          image: moisturizer.image,
                          title: moisturizer.title,
                        };
                        addToWishList(productToAddToWishList);

                      }} >
                      <i className="bi bi-suit-heart rounded-circle p-2 bg-white"></i>
                    </button>                                    </div>
                </div>
                <div className="text">
                  <p className="fs-5 fw-bold">{moisturizer.title} - <span className="fs-6 text-danger">${moisturizer.price}</span></p>
                  <p>
                    {Array.from({ length: 5 }, (_, i) => (
                      <span key={i} style={{ color: i < moisturizer.stars ? "#ffc107" : "#b4b4b4ff" }}>&#9733;</span>
                    ))}
                    <span className="text-muted"> {moisturizer.reviews} reviews</span>
                  </p>
                </div>
              </div>) : (null)

            ))}
          </div>
        </div>
      </section>
      <div className="py-5 mt-5" style={{ backgroundColor: "#eadac7" }}>
        <div className="container-fluid">
          <div className="row py-4">
            <div className="col-lg-3 col-md-6 col-sm-12 text-sm-center text-md-start">
              <div className="d-flex justify-content-center justify-content-md-start mt-sm-4 mt-lg-0">
                <i className="bi bi-trophy fs-1 me-2"></i>
                <div className="mt-2">
                  <h3 className="fw-bold fs-4">High Quality</h3>
                  <p className="text-secondary mb-sm-5">Crafted from top materials</p>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-12 text-sm-center text-md-start">
              <div className="d-flex justify-content-center justify-content-md-start mt-sm-4 mt-lg-0">
                <i className="bi bi-patch-check fs-1 me-2"></i>
                <div className="mt-2">
                  <h3 className="fw-bold fs-4">Warranty Protection</h3>
                  <p className="text-secondary mb-sm-5">Over 2 years</p>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-12 text-sm-center text-md-start">
              <div className="d-flex justify-content-center justify-content-md-start mt-sm-4 mt-lg-0">
                <i className="bi bi-truck fs-1 me-2"></i>
                <div className="mt-2">
                  <h3 className="fw-bold fs-4">Free Shipping</h3>
                  <p className="text-secondary mb-sm-5">Order over 150 $</p>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-12 text-sm-center text-md-start">
              <div className="d-flex justify-content-center justify-content-md-start mt-sm-4 mt-lg-0">
                <i className="bi bi-headset fs-1 me-2"></i>
                <div className="mt-2">
                  <h3 className="fw-bold fs-4">24 / 7 Support</h3>
                  <p className="text-secondary">Dedicated support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Moisturizers;
