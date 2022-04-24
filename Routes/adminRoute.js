const express = require("express");
const { getAdmin, loginAdmin, logout, forgotPassword, getAllCustomers, getAllResellers, updateProfileCustomer, updateProfileReseller, resetPassword, registeradmin, deleteCustomer, deleteReseller } = require("../controllers/adminController")
const router = express.Router();
const { isAuthenticatedAdmin, authRole } = require("../middleware/auth");
router.route("/admin").get(isAuthenticatedAdmin, getAdmin);
router.route("/admin/register").post(registeradmin);
router.route("/admin/updatereseller/:resellerId").put(isAuthenticatedAdmin, updateProfileReseller);
router.route("/admin/updatecustomer/:customerId").put(isAuthenticatedAdmin, updateProfileCustomer);
router.route("/admin/login").post(loginAdmin);
router.route("/admin/logout").get(logout);
router.route("/admin/getallcustomers").get(isAuthenticatedAdmin, getAllCustomers);
router.route("/admin/getallresellers").get(isAuthenticatedAdmin, getAllResellers);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/admin/deletereseller/:resellerId").delete(isAuthenticatedAdmin, deleteReseller);
router.route("/admin/deletecustomer/:customerId").delete(isAuthenticatedAdmin, deleteCustomer);
module.exports = router;
