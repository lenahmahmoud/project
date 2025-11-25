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
// const { ObjectId } = require("mongodb");

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
    let cart = []
    let w = []
    let history = []
    let o = []
    const user = new Users(
        {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password,
            username: req.body.username,
            phonenumber: req.body.phonenumber,
            cartdata: cart,
            wishlist: w,
            orderhistory: history,
            orders: o
        }

    )
    await user.save()
    const data = {
        user: {
            id: user._id
        }
    }

    const token = jwt.sign(data, "secret_aurevia")
    res.json({ success: true, token })


})
// login
app.post("/login", async (req, res) => {
    let user = await Users.findOne({ email: req.body.email })
    if (user) {
        const comparepassword = user.password === req.body.password
        if (comparepassword) {
            const data = {
                user: {
                    id: user._id
                }
            }
            const token = jwt.sign(data, "secret_aurevia")
            res.json({ success: true, token })

        }
        else {
            res.json({ success: false, error: "invalid password" })
        }

    }
    else {

        res.json({ success: false, error: "invalid email " })
    }

})



const FetchUser = (req, res, next) => {
    const authHeader = req.header("Authorization");

    if (authHeader) {
        const token = authHeader.replace("Bearer ", "");
        try {
            const data = jwt.verify(token, "secret_aurevia");
            req.user = data.user;
        } catch (err) {
            console.log("Invalid token, proceeding as guest");
        }
    }
    next();
};




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
app.put("/products/:id", FetchUser, async (req, res) => {
    if (req.user && req.user.id) {
        const user = await Users.findById(req.user.id)

        const index = user.wishlist.findIndex((item) => item.id == req.body.id)

        if (index > -1) {
            const producttoadd = {
                id: req.body.id,
                price: req.body.price,
                image: JSON.parse(JSON.stringify(req.body.image)),
                title: req.body.title,
                quantity: req.body.quantity,
                category: req.body.category,
                discount: req.body.discount,
                date: Date.now()

            }
            user.wishlist[index] = producttoadd
            await user.save()
        }

    }

    const { id } = req.params;
    const product = await Product.findOneAndUpdate({ id }, req.body, { new: true });
    res.json(product || { message: "Product not found" });
});

app.patch("/products/:id", async (req, res) => {
    const { id } = req.params;
    const product = await Product.findOneAndUpdate({ id }, req.body, { new: true });
    res.json(product || { message: "Product not found" });
});
// // middle ware for checking the user



// getting cart list
app.get("/cartlist", FetchUser, async (req, res) => {
    try {
        let items = [];

        if (req.user && req.user.id) {
            const user = await Users.findById(req.user.id);
            items = user.cartdata;
        } else {
            items = await Cartlist.find();
        }

        res.json(items);

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Server error" });
    }
});


// add item in the cart
app.post("/cartlist", FetchUser, async (req, res) => {
    try {
        if (req.user && req.user.id) {
            const user = await Users.findById(req.user.id);
            const existedIndex = user.cartdata.findIndex(item => item.id === req.body.id);

            if (existedIndex > -1) {
                user.cartdata[existedIndex].quantity += req.body.quantity;
            } else {

                const productObject = {
                    id: req.body.id,
                    title: req.body.title,
                    price: req.body.price,
                    quantity: req.body.quantity,
                    discount: req.body.discount,
                    reviews: req.body.reviews,
                    image: JSON.parse(JSON.stringify(req.body.image)),
                    keyfeatures: JSON.parse(JSON.stringify(req.body.keyfeatures))
                };
                user.cartdata.push(productObject);
            }

            await user.save();
            res.json({ success: true, source: "user", cart: user.cartdata });

        } else {
            let existed = await Cartlist.findOne({ id: req.body.id });

            if (existed) {
                existed.quantity += req.body.quantity;
                await existed.save();
                res.json({ success: true, source: "guest", cart: existed });
            } else {
                const item = await Cartlist.create(req.body);
                res.json({ success: true, source: "guest", cart: item });
            }


        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Server error" });
    }
});


// delete item in the cart
app.delete("/cartlist/:id", FetchUser, async (req, res) => {
    const { id } = req.params;

    if (req.user && req.user.id) {
        const user = await Users.findById(req.user.id);
        const index = user.cartdata.findIndex(item => item.id === id);

        if (index > -1) {
            const deletedItem = user.cartdata.splice(index, 1)[0];
            await user.save();
            res.json({ message: "Deleted", item: deletedItem });
        } else {
            res.status(404).json({ message: "Item not found" });
        }
    } else {
        const deletedItem = await Cartlist.findOneAndDelete({ id });
        if (deletedItem) {
            res.json({ message: "Deleted", item: deletedItem });
        } else {
            res.status(404).json({ message: "Item not found" });
        }
    }
});


// delete item from the wishlist
app.delete("/wishlists/:id", FetchUser, async (req, res) => {
    const { id } = req.params;

    if (req.user && req.user.id) {
        const user = await Users.findById(req.user.id);

        const index = user.wishlist.findIndex(item => item.id === id);

        if (index > -1) {
            const deletedItem = user.wishlist.splice(index, 1)[0];
            await user.save();
            return res.json(deletedItem);
        } else {
            return res.status(404).json({ message: "Item not found" });
        }

    } else {
        const item = await Wishlist.findOneAndDelete({ id });

        if (item) {
            return res.json({ message: "Deleted", item });
        } else {
            return res.status(404).json({ message: "Item not found" });
        }
    }
});

// getting the wishlists
app.get("/wishlists", FetchUser, async (req, res) => {
    try {
        let items = [];

        if (req.user && req.user.id) {
            const user = await Users.findById(req.user.id);
            items = user.wishlist;
        } else {
            items = await Wishlist.find();
        }

        res.json(items);

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Server error" });
    }


});

app.post("/wishlists", FetchUser, async (req, res) => {


    const productToAdd = {
        id: req.body.id,
        price: req.body.price,
        image: JSON.parse(JSON.stringify(req.body.image)),
        title: req.body.title,
        quantity: req.body.quantity,
        category: req.body.category,
        discount: req.body.discount,
        date: Date.now()
    };


    if (req.user && req.user.id) {
        const user = await Users.findById(req.user.id);
        user.wishlist.push(productToAdd);
        await user.save();
        res.json({ success: true, source: "user", wishlist: user.wishlist });
    } else {
        const newItem = await Wishlist.create(productToAdd);

        res.json(newItem);
    }
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




// user info 
app.get("/users", FetchUser, async (req, res) => {
    try {
        if (req.user && req.user.id) {
            const user = await Users.findById(req.user.id)
            res.json(user)
        }
    } catch {
        res.status(404).json({ message: "user is not logged in" })

    }



})
app.put("/users", FetchUser, async (req, res) => {
    try {
        if (req.user && req.user.id) {
            const user = await Users.findOneAndUpdate(
                { _id: req.user.id },
                req.body,
                { new: true }
            ); res.json(user)

        }

    }
    catch {
        res.status(500).json({ message: " server error" })

    }
})
// wishlist section
app.post("/wishlist/cart", FetchUser, async (req, res) => {
    if (req.user && req.user.id) {
        try {
            const user = await Users.findById(req.user.id);
            const wishlistitems = user.wishlist;
            const itemsToAdd = wishlistitems.map(item => ({
                ...item.toObject(),
                quantity: 1
            }));
            user.cartdata.push(...itemsToAdd);
            // for (let wItem of wishlistitems) {
            //     const product = await Product.findById(new ObjectId(wItem.id));
            //     if (product) {
            //         product.quantity = product.quantity - 1;
            //         await product.save();
            //     }
            // }


            user.wishlist = [];
            await user.save();



            res.json({
                message: "All wishlist items moved to cart",
                cart: user.cartdata,
                wishlist: user.wishlist,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "server error" });
        }
    } else {
        res.status(401).json({ message: "unauthorized" });
    }
});
app.delete('/wishlists', FetchUser, async (req, res) => {
    try {
        if (req.user && req.user.id) {
            const user = await Users.findById(req.user.id)
            user.wishlist = []
            await user.save()
            res.json({ message: "deleted succefully", wishlist: user.wishlist })
        }
        else {
            res.status(401).json({ message: "unauthorized" })
        }

    }
    catch {
        res.status(500).json({ message: "server error" })

    }
})
app.delete("/users", FetchUser, async (req, res) => {
    try {
        if (req.user && req.user.id) {
            await Users.findByIdAndDelete(req.user.id)
            res.json({ message: "deleted successfully" })

        }
        else {
            res.status(401).json({ message: "unauthorized" })

        }
    }
    catch {
        res.status(500).json({ message: "server error" })

    }


})
// app.post("/orders", FetchUser, async (req, res) => {

// })

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
});
