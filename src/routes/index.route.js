const express = require("express");
const entityRoute = require("./entity.route");
const sendResponse = require("../config/response.config");
const passport = require("passport");
const isAuthenticated = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/api/v1/health", (req, res) => {
  sendResponse(req, res, 200, { message: "ok" });
});

router.use("/api/v1/entity", isAuthenticated, entityRoute);

module.exports = router;
