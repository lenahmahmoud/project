const mongoose = require("mongoose")
const ReviewsSchema = new mongoose.Schema({
    "id": String,
    "firstname": String,
    "lastname": String,
    "text": String,
    "rating": Number,
    "productId": String
})

module.exports=mongoose.model("reviews" ,ReviewsSchema)