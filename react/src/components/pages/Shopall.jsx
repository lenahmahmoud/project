import { useState, useEffect } from "react";
import { getproducts, addtocart, decrementquantity, addToWishList } from "../../../utils/Api";
import { Link } from "react-router-dom";
import "../style/shop.css";
import * as HoverCard from "@radix-ui/react-hover-card";
const logo = "/images/Logo Brand.png";

function Shopall({ searchInput }) {
  // products to be rendered 
  const [products, setProducts] = useState([]);

  // template 
  const [originalProducts, setOriginalProducts] = useState([])

  // search state to be traced
  const [searched, setSearched] = useState([])

  // filters from the form
  const [filters, setFilters] = useState({
    sortAlphabetically: "",
    sortPrice: "",
    priceRange: [200, 700],
  });

  // render products
  useEffect(() => {
    getproducts().then((res) => {
      setProducts(res.data);
      setOriginalProducts(res.data)
    });

  }, []);

  // search handling
  useEffect(() => {
    if (searchInput === " ") {
      setProducts(originalProducts);
      setSearched([]);
    } else {
      const filtered = originalProducts.filter((p) =>
        p.title.toLowerCase().includes(searchInput.toLowerCase())
      );
      setProducts(filtered);
      setSearched(filtered);
    }
  }, [searchInput]);


  // apply filterd 
  function applyFilters() {
    let result
    searched.length > 0 ? (result = [...searched]) : (result = [...originalProducts])

    // Sort alphabetically
    if (filters.sortAlphabetically === "A-Z") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (filters.sortAlphabetically === "Z-A") {
      result.sort((a, b) => b.title.localeCompare(a.title));
    }

    // Sort by price
    if (filters.sortPrice === "low-to-high") {
      result.sort((a, b) => a.price - b.price);
    } else if (filters.sortPrice === "high-to-low") {
      result.sort((a, b) => b.price - a.price);
    }

    // Filter by price range
    result = result.filter(
      (p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    // update state
    setProducts(result);
  }


  function clearFilters() {
    setFilters({
      sortAlphabetically: "",
      sortPrice: "",
      priceRange: [200, 700],
    });
    if (searched.length > 0) {
      setProducts(searched)
    }
    else {
      setProducts(originalProducts)
    }

  }

  return (
    <>
      {/* HEADER */}
      <header className="header-section mt-5 pt-4">
        <div className="headingText text-center py-5 my-5">
          <img src={logo} alt="Aurévia Logo" width="70" height="70" className="mb-4" />
          <h1 className="fw-bold" style={{ fontSize: "4rem", letterSpacing: "0.3rem" }}>
            shop page
          </h1>
          <p className="mt-3">
            <span className="fw-bold">Home</span> shop-page
          </p>
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

      {/* PRODUCTS SECTION */}
      <section className="mt-5" id="shop">
        <div className="container">
          <div className="row justify-content-center shopsec g-5 text-center">
            {products.map((product) =>
              product.quantity > 0 ? (
                <div key={product.id} className="col-9 col-sm-8 col-lg-3">
                  <div className={`parent ${product.discount > 0 ? "position-relative" : ""}`}>
                    <img
                      src={product.image[0]}
                      alt={product.title}
                      className="rounded w-100"
                    />

                    {product.discount > 0 && (
                      <p className="badge bg-danger m-2 position-absolute top-0 end-0 fs-4">
                        -{product.discount}%
                      </p>
                    )}

                    <div className="overlay d-flex justify-content-around w-100 align-items-center">
                      <HoverCard.Root>
                        <HoverCard.Trigger asChild>
                          <button
                            className="btn border-0"
                            onClick={() => {
                              const productToAdd = { ...product, quantity: 1 };
                              addtocart(productToAdd);
                              decrementquantity(product, product.id, 1);
                            }}
                          >
                            <i className="bi bi-bag-heart fs-4 rounded-circle p-2 bg-white"></i>
                          </button>
                        </HoverCard.Trigger>

                        <HoverCard.Portal>
                          <HoverCard.Content
                            side="top"
                            align="center"
                            className="tooltip-content"
                          >
                            Add to Cart
                          </HoverCard.Content>
                        </HoverCard.Portal>
                      </HoverCard.Root>

                      <HoverCard.Root>
                        <HoverCard.Trigger asChild>
                          <Link>
                            <i className="bi bi-share rounded-circle p-2 bg-white"></i>
                          </Link>
                        </HoverCard.Trigger>

                        <HoverCard.Portal>
                          <HoverCard.Content
                            side="top"
                            align="center"
                            className="tooltip-content"
                          >
                            Share
                          </HoverCard.Content>
                        </HoverCard.Portal>
                      </HoverCard.Root>

                      <HoverCard.Root>
                        <HoverCard.Trigger asChild>

                          <Link to={`/details/${product.id}`}>
                            <i className="bi bi-eye rounded-circle p-2 bg-white"></i>
                          </Link>
                        </HoverCard.Trigger>

                        <HoverCard.Portal>
                          <HoverCard.Content
                            side="top"
                            align="center"
                            className="tooltip-content"
                          >
                            quick view
                          </HoverCard.Content>
                        </HoverCard.Portal>
                      </HoverCard.Root>


                      <HoverCard.Root>
                        <HoverCard.Trigger asChild>
                          <button
                            className="btn border-0"
                            onClick={() => {
                              const productToAddToWishList = {
                                id: product.id,
                                price: product.price,
                                image: product.image,
                                title: product.title,
                                category: product.category,
                                quantity: product.quantity,
                                discount: product.discount

                              };
                              addToWishList(productToAddToWishList);
                            }}
                          >
                            <i className="bi bi-suit-heart rounded-circle p-2 bg-white"></i>
                          </button>
                        </HoverCard.Trigger>

                        <HoverCard.Portal>
                          <HoverCard.Content
                            side="top"
                            align="center"
                            className="tooltip-content"
                          >
                            wishlist
                          </HoverCard.Content>
                        </HoverCard.Portal>
                      </HoverCard.Root>
                    </div>
                  </div>

                  <div className="text">
                    <p className="fs-5 fw-bold">
                      {product.title} -{" "}
                      <span className="fs-6 text-danger">
                        £E{" "}
                        {product.discount > 0 ? (
                          <>
                            <del>{product.price}</del>{" "}
                          </>
                        ) : (
                          <>{product.price}</>
                        )}
                      </span>
                    </p>

                    <p>
                      {Array.from({ length: 5 }, (_, i) => (
                        <span
                          key={i}
                          style={{
                            color: i < product.stars ? "#ffc107" : "#b4b4b4ff",
                          }}
                        >
                          &#9733;
                        </span>
                      ))}
                      <span className="text-muted"> {product.reviews} reviews</span>
                    </p>
                  </div>
                </div>
              ) : null
            )}
          </div>
        </div>

      </section >

      {/* FEATURES SECTION */}
      < div className="py-5 mt-5" style={{ backgroundColor: "#eadac7" }
      }>
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
      </div >
    </>
  );
}

export default Shopall;
