const UserService = require("../services/user.service");
const bcrypt=require('bcrypt')

module.exports = class User {
  static async register(req, res) {
      const hash = await bcrypt.hash(req.body.password, 10);
      if (!hash) {
        return res.json({ message: "Error in Hashing password" });
      }
      const createuser = {
        onboarded:true,
        email: req.body.email,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password:hash
      };
      const findUser = await UserService.getUser({ email: req.body.email });
      if (findUser) {
        return res.status(400).json({
          error: `${createuser.email} Already exist`, 
          success: false
        });
      }
      const user = await UserService.create(createuser);
      return res.status(200).json({
        message: "User registered successfully",
        user:{
          first_name:user.first_name,
          last_name:user.last_name,
          email:user.email
        }
      });
  }

  static async login(req, res) {
      const findUser = await UserService.getUser({
        email: req.body.email,
        onboarded: true
      });
      if (findUser) {
        if (bcrypt.compareSync(req.body.password, findUser.password)) {
          res.status(200).json({
            status: "success",
            message: "user found!!",
           user:{
              first_name:findUser.first_name,
              last_name:findUser.last_name,
              email:findUser.email
           },
          });
        } else {
          res.status(400).json({
            status: "error",
            message: "Invalid password"
          });
        }
      } else {
        res.status(404).json({
          status: "error",
          message: "user not found"
        });
      }
  }

  static async changePass(req, res) {
      const user = await UserService.getUser({ email: req.body.email });
      if (user) {
        const new_password = req.body.new_password;
        const changed_password = await bcrypt.hash(new_password, 10);
        UserService.update(
          { email: req.body.email },
          { password: changed_password }
        )
          .then((data) => {
            res.status(200).json({
              status: "success",
              message: "password changed sucessfully",
              user:{
                first_name:data.first_name,
                last_name:data.last_name,
                email:data.email
              }
            });
          })
          .catch((error) => {
            res.status(500).json({ error: "error in updating user" });
          });
      }else{
        res.status(404).json({
          status: "error",
          message: "user not found"
        });
      }
  }
};
