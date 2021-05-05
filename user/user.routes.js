const { Router } = require("express");
const userController = require("./user.controller");

const router = Router();

router.get("/user", userController.authorization, userController.currentUser);
router.post(
  "/users",
  userController.registerValidation,
  userController.createUser,
);
router.patch("/users", userController.userLogin);
router.patch("/logout", userController.authorization, userController.userLogout);

module.exports = router;
