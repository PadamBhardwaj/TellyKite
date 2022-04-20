const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const resellerSchema = new mongoose.Schema({
    reseller_id: {
        type: mongoose.Schema.Types.ObjectId
    },
    role: "reseller",
    name: String,
    // address:String,
    // Date:Date,
    // contactno:Number,
    email: {
        type: String,
        unique: true,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: [true, 'please enter your password'],
        minlength: [6, 'min length of password should be 6'],
        select: false
    },


});
resellerSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});
//JWT
resellerSchema.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
}
//compare password
resellerSchema.methods.comparePassword = async function (enteredPassword) {
    // console.log(bcrypt.compare(enteredPassword,this.password));
    const bool = await bcrypt.compare(enteredPassword, this.password);
    // console.log(bool);
    return bool;
}

module.exports = mongoose.model("Reseller", resellerSchema);