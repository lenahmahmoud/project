const mongoose = require("mongoose")
const UserSchema = new mongoose.Schema({
    "id": String,
    "firstname": String,
    "lastname": String,
    "username": String,
    "phonenumber": { type: String, unique: true },
    "email": { type: String, unique: true },
    "password": String,
    "city": String,
    "governorate": String,
    "paymentmethod":String
    ,
    "cartdata": [
        {
            "id": String,
            "product_id": String,
            "title": String,
            "price": Number,
            "image": [String],
            "quantity": Number,
            "discount": Number,
            "stars": Number,
            "reviews": Number,
            "keyfeatures": [String]
        }
    ],
    "wishlist": [
        {
            "id": String,
            "price": Number,
            "image": [
                String
            ],
            "title": String,
            "category": String,
            "quantity": Number
        }

    ],
    "orders": [
        {
            "id": String,
            "items": Number,
            "status": String,
            "total": Number,
            "date": {
                type: Date,
                default: Date.now
            }
        }
    ]



})
module.exports = mongoose.model("users", UserSchema)



