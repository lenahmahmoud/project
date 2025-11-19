// server.js
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken")
// Models
const Product = require("./models/Products");
const Users = require("./models/Users");
const Cartlist = require("./models/Cartlist");
const Wishlist = require("./models/Wishlists");
const Review = require("./models/Reviews");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// connectiion 
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("MongoDB connection error:", err));



// sign up

app.post("/signup", async (req, res) => {

    let check = await Users.findOne({
        $or: [
            { email: req.body.email },
            { phonenumber: req.body.phonenumber }
        ]
    });
    if (check) {
        return res.status(400).json({ success: false, error: "the account is already existed" })
    }
    let cart = {}
    for (let i = 0; i < 300; i++) {
        cart[i] = 0
    }
    const users = new Users(
        {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password,
            username: req.body.username,
            phonenumber: req.body.phonenumber,
            cartdata: cart

        }

    )
    await users.save()
    const data = {
        user: {
            id: users.id
        }
    }

    const token = jwt.sign(data, "secret_aurevia")
    res.json({ success: true, token })


})






// products 
app.get("/products", async (req, res) => {
    let query = {};
    if (req.query.category) query.category = req.query.category;
    const products = await Product.find(query);
    res.json(products);
});

// product by id
app.get("/products/:id", async (req, res) => {
    const { id } = req.params;
    const product = await Product.findOne({ id });
    res.json(product || {});
});

// update a product
app.put("/products/:id", async (req, res) => {
    const { id } = req.params;
    const product = await Product.findOneAndUpdate({ id }, req.body, { new: true });
    res.json(product || { message: "Product not found" });
});

app.patch("/products/:id", async (req, res) => {
    const { id } = req.params;
    const product = await Product.findOneAndUpdate({ id }, req.body, { new: true });
    res.json(product || { message: "Product not found" });
});

// getting cart list
app.get("/cartlist", async (req, res) => {
    const items = await Cartlist.find();
    res.json(items);
});
// update item in the cart
app.post("/cartlist", async (req, res) => {
    const item = await Cartlist.create(req.body);
    res.json(item);
});

// delete item in the cart
app.delete("/cartlist/:id", async (req, res) => {
    const { id } = req.params;
    const deletedItem = await Cartlist.findOneAndDelete({ id });
    res.json({ message: "Deleted", item: deletedItem });
});

// delete item from the wishlist
app.delete("/wishlists/:id", async (req, res) => {
    const { id } = req.params;

    const deletedItem = await Wishlist.findOneAndDelete({ id });

    res.json({ message: "Deleted", item: deletedItem });
});

// getting the wishlists
app.get("/wishlists", async (req, res) => {
    const items = await Wishlist.find();
    res.json(items);
});

app.post("/wishlists", async (req, res) => {
    const item = await Wishlist.create(req.body);
    res.json(item);
});


// getting users
app.get("/users", async (req, res) => {
    const { email, password } = req.query;
    let users = await User.find();
    if (email && password) {
        users = await User.find({ email, password });
    }
    res.json(users);
});

// add users
app.post("/users", async (req, res) => {
    const user = await User.create(req.body);
    res.json(user);
});

// getting reviews
app.get("/reviews", async (req, res) => {
    const reviews = await Review.find();
    res.json(reviews);
});
// add a review
app.post("/reviews", async (req, res) => {
    const review = await Review.create(req.body);
    res.json(review);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
});

