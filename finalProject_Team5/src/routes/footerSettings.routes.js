const express = require("express");

const {
  getFooterSettings,
  updateFooterSettings,
} = require("../controllers/footerSettings.controller");

const authentication = require("../middlewares/auth.middleware");
const authorization = require("../middlewares/role.middleware");

const router = express.Router();

router.get("/", getFooterSettings);

router.patch(
  "/",
  authentication,
  authorization("Admin"),
  updateFooterSettings
);

module.exports = router;