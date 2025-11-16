const express = require("express");
const cors = require("cors");
const data = require("./data.json"); 
const app = express();

app.use(cors());
app.use(express.json());

//products route
app.get("/products", (req, res) => {
  let products = data.products;

  if (req.query.category) {
    products = products.filter(p => p.category === req.query.category);
  }

  res.json(products);
});

// get  product route
app.get("/products/:id", (req, res) => {
  const product = data.products.find(p => p.id == req.params.id);
  res.json(product || {});
});


// update a product
app.put("/products/:id", (req, res) => {
  const product = data.products.find(p => p.id == req.params.id);
  if (product) {
    Object.assign(product, req.body);
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

app.patch("/products/:id", (req, res) => {
  const product = data.products.find(p => p.id == req.params.id);
  if (product) {
    Object.assign(product, req.body);
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

// get reviews
app.get("/reviews", (req, res) => {
  res.json(data.reviews);
});

// add a review
app.post("/reviews", (req, res) => {
  data.reviews.push(req.body); 
  res.json(req.body);
});

// get the users
app.get("/users", (req, res) => {
  const { email, password } = req.query;
  let users = data.users;

  if (email && password) {
    users = users.filter(u => u.email === email && u.password === password);
  }

  res.json(users);
});

// add a user
app.post("/users", (req, res) => {
  data.users.push(req.body); 
  res.json(req.body);
});


// getting the cartlist items
app.get("/cartlist", (req, res) => {
  res.json(data.cartlist || []);
});
// add a cartlist item
app.post("/cartlist", (req, res) => {
  data.cartlist.push(req.body);
  res.json(req.body);
});

// delete a cartlist item
app.delete("/cartlist/:id", (req, res) => {
  data.cartlist = data.cartlist.filter(item => item.id !== req.params.id);
  res.json({ message: "Deleted" });
});

// get the products from the wishlist
app.get("/wishlists", (req, res) => {
  res.json(data.wishlists || []);
});

// add a product to the wishlist
app.post("/wishlists", (req, res) => {
  data.wishlists.push(req.body);
  res.json(req.body);
});

// delete a product from teh wishlist
app.delete("/wishlists/:id", (req, res) => {
  data.wishlists = data.wishlists.filter(item => item.id !== req.params.id);
  res.json({ message: "Deleted" });
});



// runnoing the server 
app.listen(5000, () => {
  console.log("Backend running on port 5000");
});
