const mongoose = require("mongoose")
const UserSchema = new mongoose.Schema({
    "id": String,
    "firstname": String,
    "lastname": String,
    "username": String,
    "phonenumber": { type: String, unique: true },
    "email": { type: String, unique: true },
    "password": String,
    "cartdata": [
        {
            product_id: String,
            title: String,
            price: Number,
            image: [String],
            quantity: { type: Number, default: 1 },
            discount: Number,
            stars: Number,
            reviews: Number,
            keyfeatures: [String]
        }
    ]


})
module.exports = mongoose.model("users", UserSchema)



