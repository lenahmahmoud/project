const mongoose = require("mongoose")
const UserSchema = new mongoose.Schema({
    "id": String,
    "firstname": String,
    "lastname": String,
    "username": String,
    "phonenumber": { type: String, unique: true },
    "email": { type: String, unique: true },
    "password": String,
    "cartdata": Object
})
module.exports = mongoose.model("users", UserSchema)



