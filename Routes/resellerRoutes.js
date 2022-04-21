const { Router } = require("express")
const express = require("express");
const { loginReseller, logout, getReseller, registerreseller } = require("../controllers/resellerController")
const router = express.Router()
const { isAuthenticatedR, authRole, isAuthenticatedReseller } = require("../middleware/auth")
router.route("/reseller").get(isAuthenticatedReseller, getReseller);
router.route("/reseller/register").post(isAuthenticatedReseller, authRole("admin"), registerreseller);
router.route("/reseller/login").post(loginReseller);
router.route("/reseller/logout").get(logout);
module.exports = router;
