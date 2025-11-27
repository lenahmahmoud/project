const mongoose = require("mongoose")
const ordersschema = new mongoose.Schema({
    "email": String,
    "phonenumber": String,
    "city": String,
    "governorate": String,
    "paymentmethod": String,
    "firstname": String,
    "lastname": String,
    "items": [{
        "image": [String],
        "title": String,
        "price": Number,
        "quantity": Number,
        "discount": Number

    }],
    "subtotal": Number,
    "total": Number,
    "shippingfees": Number,
    "lastnamebilling": { type: String, default: " " },
    "firstnamebilling": { type: String, default: " " },
    "lastnamebilling": { type: String, default: " " },
    "phonenumberbilling": { type: String, default: " " },
    "governoratebilling": { type: String, default: " " },
    "citybilling": { type: String, default: " " }







})
module.exports = mongoose.model("orders", ordersschema)