const mongoose = require("mongoose")
const WishlitsSchema = new mongoose.Schema({
    "id": String,
    "price": Number,
    "image": [
        String
    ],
    "title": String,
    "category": String,
    "quantity": Number,
    "discount":Number
}
)
module.exports = mongoose.model("wishlists", WishlitsSchema)