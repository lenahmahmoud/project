const mongoose = require("mongoose")
const WishlitsSchema = new mongoose.Schema({
    "id": String,
    "price": Number,
    "image": [
        String
    ],
    "title": String
}
)
module.exports = mongoose.model("wishlists", WishlitsSchema)