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
    "keyfeatures": [String]
})
module.exports=mongoose.model("cartlist" ,CartlistSchema)