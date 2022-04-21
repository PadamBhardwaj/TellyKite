
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
    // console.log(req)
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
    const reseller = await Reseller.findOne({ email }).select("+password");

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

// Forgot Password
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
    const reseller = await Reseller.findOne({ email: req.body.email });

    if (!reseller) {
        return next(new ErrorHandler("User not found", 404));
    }

    // Get ResetPassword Token
    const resetToken = reseller.getResetPasswordToken();

    await reseller.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${req.protocol}://${req.get(
        "host"
    )}/password/reset/${resetToken}`;

    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

    try {
        await sendEmail({
            email: user.email,
            subject: `TallyKite Password Recovery`,
            message,
        });

        res.status(200).json({
            success: true,
            message: `Email sent to ${reseller.email} successfully`,
        });
    } catch (error) {
        reseller.resetPasswordToken = undefined;
        reseller.resetPasswordExpire = undefined;

        await reseller.save({ validateBeforeSave: false });

        return next(new ErrorHandler(error.message, 500));
    }
});


// Reset Password
exports.resetPassword = catchAsyncError(async (req, res, next) => {
    // creating token hash
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

    const reseller = await Reseller.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    if (!reseller) {
        return next(
            new ErrorHandler(
                "Reset Password Token is invalid or has been expired",
                400
            )
        );
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password does not password", 400));
    }

    reseller.password = req.body.password;
    reseller.resetPasswordToken = undefined;
    reseller.resetPasswordExpire = undefined;

    await reseller.save();

    sendToken(reseller, 200, res);
});
