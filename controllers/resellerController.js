
const Reseller = require("../Models/resellerModel")
// const Customer = require("../Models/customerModel")
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncError = require("../middleware/catchAsyncError");
const sendToken = require("../utils/jwtToken");
const bcrypt = require("bcryptjs");
exports.registerreseller = catchAsyncError(async (req, res, next) => {
    const { name, email, password, username } = req.body;
    const reseller = await Reseller.create({
        name,
        email,
        password,
        username
    })
    console.log(req.body);
    // console.log("Controller")
    sendToken(reseller, 200, res);

});
exports.getReseller = catchAsyncError(async (req, res) => {

    const reseller = await Reseller.findById(req.reseller.id);
    if (!reseller) {
        res.status(400);
    }
    res.status(200).json({
        success: true,
        reseller
    })
});



exports.loginReseller = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;


    if (!email || !password) {
        return next(new ErrorHandler("Please enter email and password", 400));

    }
    const reseller = Reseller.findOne({ email }).select("+password");

    if (!reseller) {
        return next(new ErrorHandler("Invalid username ", 401));

    }
    const isPasswordMatched = await reseller.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid  password", 401));

    }

    sendToken(reseller, 200, res);
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

