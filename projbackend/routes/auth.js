const express = require("express");
const router = express.Router();
const { signout, signup, signin, isSignedIn } = require("../controllers/auth");
const { body, validationResult } = require("express-validator");

router.post(
  "/signup",
  body("name")
    .isLength({ min: 3 })
    .withMessage("must be at least 3 chars long"),
  body("email").isEmail().withMessage("email is required"),
  body("password")
    .isLength({ min: 3 })
    .withMessage("password should be at least 3 char"),
  signup
);


router.post(
  "/signin",
  body("email").isEmail().withMessage("email is required"),
  body("password")
    .isLength({ min: 1 })
    .withMessage("password field is requied"),
  signin
);


router.get("/signout", signout);


module.exports = router;
