const { Router } = require("express")
const express = require("express");
const { loginReseller, logout, getReseller, registerreseller } = require("../controllers/resellerController")
const router = express.Router()
const { isAuthenticatedAdmin, authRole } = require("../middleware/auth")
router.route("/reseller").get(isAuthenticatedAdmin, getReseller);
router.route("/reseller/login").post(loginReseller);
router.route("/reseller/logout").get(logout);
module.exports = router;
