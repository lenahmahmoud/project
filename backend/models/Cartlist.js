const mongoose = require("mongoose")
const CartlistSchema = new mongoose.Schema({
    "id": String,
    "title": String,
    "description": String,
    "price": Number,
    "category": String,
    "image": [String],
    "quantity": Number,
    "discount": Number,
    "stars": Number,
    "reviews": Number,
    "keyfeatures": [String],
    "product_id":String
})
module.exports=mongoose.model("cartlist" ,CartlistSchema)