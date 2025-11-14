import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../style/navbar.css";
import * as HoverCard from "@radix-ui/react-hover-card";
const logo = "/images/Logo Brand.png";

function Navbar({ setSearchInput }) {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const location = useLocation();

    // Pages where search should be hidden
    const hideSearchOn = ["/home", "/about", "/contact", "/cart", "/checkout", "/details","/paymentoptions","/privacypolicy","/shippingfees"];
    const shouldHideSearch = hideSearchOn.includes(location.pathname);

    const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

    function reset() {
        setSearchInput("");
        toggleSearch();
    }

    return (
        <nav className="navbar navbar-expand-md shadow fixed-top mb-5 bg-white">
            <div className="container-fluid">
                <Link
                    className="navbar-brand fs-2 fw-bold"
                    to="/"
                    style={{
                        fontFamily:
                            "Cambria, Cochin, Georgia, Times, 'Times New Roman', serif",
                    }}
                >
                    <img src={logo} alt="logo" style={{ width: 40, height: 40 }} className="me-2" />
                    Aurévia
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#mainNav"
                    aria-controls="mainNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse w-75 justify-content-center" id="mainNav">
                    <ul className="navbar-nav mx-auto mt-sm-4 mt-md-0">
                        <li className="nav-item mx-1">
                            <Link className="nav-link" to="/home">Home</Link>
                        </li>
                        <li className="nav-item mx-1">
                            <Link className="nav-link" to="/shopall">Shop</Link>
                        </li>
                        <li className="nav-item mx-1">
                            <Link className="nav-link" to="/about">About</Link>
                        </li>
                        <li className="nav-item mx-1">
                            <Link className="nav-link" to="/contact">Contact</Link>
                        </li>
                    </ul>
                </div>

                <div className="collapse navbar-collapse mt-md-0 mt-2" id="iconsNav">
                    {/* Only show search if it's not a hidden page */}
                    {!shouldHideSearch && (
                        <>
                            {isSearchOpen ? (
                                <>
                                    <button className="btn border-0" onClick={reset}>
                                        <i className="bi bi-x"></i>
                                    </button>
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        className="form-control input-special"
                                        onChange={(e) => setSearchInput(e.target.value)}
                                    />
                                </>
                            ) : (
                                <button onClick={toggleSearch} className="btn btn-special">
                                    <i className="bi bi-search text-dark mx-lg-3 mx-2 fs-4"></i>
                                </button>
                            )}
                        </>
                    )}
                    {/* profile icon */}
                    <HoverCard.Root>
                    <HoverCard.Trigger asChild>
                    <Link to="/profile">
                        <i className="bi bi-person-exclamation text-dark mx-lg-3 mx-2 fs-4"></i>
                    </Link>
                    </HoverCard.Trigger>

                    <HoverCard.Portal>
                    <HoverCard.Content
                     side="top"          
                     align="center"
                     className="tooltip-content"
                  >
                      Profile
                    </HoverCard.Content>
                    </HoverCard.Portal>
                    </HoverCard.Root>

                   {/* wishlist icon */}
                    <HoverCard.Root>
                    <HoverCard.Trigger asChild>
                    <Link to="/wishlist">
                        <i className="bi bi-heart text-dark mx-lg-3 mx-2 fs-4"></i>
                    </Link>
                    </HoverCard.Trigger>
                    <HoverCard.Portal>
                    <HoverCard.Content
                     side="top"          
                     align="center"
                     className="tooltip-content"
                  >
                      Wishlist 
                    </HoverCard.Content>
                    </HoverCard.Portal>
                    </HoverCard.Root>

                    {/* cart icon */}
                    <HoverCard.Root>
                    <HoverCard.Trigger asChild>
                    <Link to="/cart">
                        <i className="bi bi-bag-heart text-dark mx-lg-3 mx-2 fs-4"></i>
                    </Link>
                    </HoverCard.Trigger>
                    <HoverCard.Portal>
                    <HoverCard.Content
                     side="top"          
                     align="center"
                     className="tooltip-content"
                  >
                      Cart
                    </HoverCard.Content>
                    </HoverCard.Portal>
                    </HoverCard.Root>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
