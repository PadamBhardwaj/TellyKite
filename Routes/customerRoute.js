const express = require("express");
const { getCustomer, loginCustomer, logout, registercustomer } = require("../controllers/customerController")
const router = express.Router()
const { isAuthenticatedAdmin, isAuthenticatedCustomer, authRole } = require("../middleware/auth")
router.route("/customer").get(isAuthenticatedCustomer, getCustomer);
router.route("/customer/register").post(isAuthenticatedAdmin, registercustomer);
router.route("/customer/login").post(loginCustomer);
router.route("/customer/logout").get(logout);
module.exports = router;
