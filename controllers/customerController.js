
const Customer = require("../models/customerModel")
// const Customer = require("../Models/customerModel")
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncError = require("../middleware/catchAsyncError");
const sendToken = require("../utils/jwtToken");
const bcrypt = require("bcryptjs");
exports.registercustomer = catchAsyncError(async (req, res, next) => {
    const { name, email, password, username } = req.body;
    const customer = await Customer.create({
        name,
        email,
        password,
        username
    })
    console.log(req.body);
    // console.log("Controller")
    sendToken(customer, 200, res);

});
exports.getCustomer = catchAsyncError(async (req, res) => {

    const customer = await Customer.findById(req.customer.id);
    if (!customer) {
        res.status(400);
    }
    res.status(200).json({
        success: true,
        customer
    })
});

exports.loginCustomer = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;


    if (!email || !password) {
        return next(new ErrorHandler("Please enter email and password", 400));

    }
    const customer = Customer.findOne({ email }).select("+password");

    if (!customer) {
        return next(new ErrorHandler("Invalid username ", 401));

    }
    const isPasswordMatched = await customer.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid  password", 401));

    }

    sendToken(customer, 200, res);
}
)

//logut client
exports.logout = catchAsyncError(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({

        success: true,
        message: "Logged out successfully"
    })
})

