const { Router } = require("express");
const express = require("express");
const { getAdmin, loginAdmin, logout, forgotPassword, updateProfileCustomer, updateProfileReseller, resetPassword, registeradmin, deleteCustomer, deleteReseller } = require("../controllers/adminController")
const router = express.Router();
const { isAuthenticatedAdmin, authRole } = require("../middleware/auth");
router.route("/admin").get(isAuthenticatedAdmin, getAdmin);
router.route("/admin/register").post(registeradmin);
router.route("/admin/updatereseller/:resellerId").put(isAuthenticatedAdmin, updateProfileReseller);
router.route("/admin/updatecustomer/:customerId").put(isAuthenticatedAdmin, updateProfileCustomer);
router.route("/admin/login").post(loginAdmin);
router.route("/admin/logout").get(logout);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/admin/deletereseller/:resellerId").delete(isAuthenticatedAdmin, deleteReseller);
router.route("/admin/deletecustomer/:customerId").delete(isAuthenticatedAdmin, deleteCustomer);
module.exports = router;
