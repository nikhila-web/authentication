const  express =  require("express");
const router = express.Router();

const User = require("./src/controllers/user.controller");


router.post("/register", User.register);
router.post("/login", User.login);
router.put("/changePassword", User.changePass);

module.exports =  router;