const { Router } = require("express");
const express = require("express");
const { getAdmin, loginAdmin, logout, forgotPassword, resetPassword } = require("../controllers/adminController")
const router = express.Router();
const { isAuthenticatedAdmin, authRole } = require("../middleware/auth");
router.route("/admin").get(isAuthenticatedAdmin, getAdmin);
router.route("/admin/login").post(loginAdmin);
router.route("/admin/logout").get(logout);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
module.exports = router;
