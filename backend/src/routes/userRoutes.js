const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const validationMiddleware = require('../middlewares/ValidateMiddleware');


router.post(
  "/register",
  validationMiddleware.validateUserRegistration,
  userController.registerUser
);
router.get("/", userController.getAllUsers);

module.exports = router;
