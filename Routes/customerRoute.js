const express = require("express");
const { getCustomer, loginCustomer, logout, registercustomer, addtellyaccount, resetPassword, forgotPassword } = require("../controllers/customerController")
const router = express.Router()
const { isAuthenticatedAdmin, isAuthenticatedCustomer, authRole } = require("../middleware/auth")
router.route("/customer").get(isAuthenticatedCustomer, getCustomer);
router.route("/customer/register").post(isAuthenticatedAdmin, registercustomer);
router.route("/customer/login").post(loginCustomer);
router.route("/customer/logout").get(logout);
router.route("/customer/addtellyaccount").post(isAuthenticatedCustomer, addtellyaccount);
router.route("/customer/password/forgot").post(forgotPassword);
router.route("/customer/password/reset/:token").put(resetPassword);
module.exports = router;
