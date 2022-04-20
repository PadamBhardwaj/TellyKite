const { Router } = require("express")
const express = require("express");
const { getCustomer, loginCustomer, logout, registercustomer } = require("../controllers/customerController")
const router = express.Router()
const { isAuthenticatedAdmin, authRole } = require("../middleware/auth")
router.route("/customer").get(isAuthenticatedAdmin, getCustomer);
router.route("/customer/register").post(isAuthenticatedAdmin, authRole("admin"), registercustomer);
router.route("/customer/login").post(loginCustomer);
router.route("/customer/logout").get(logout);
module.exports = router;
