const User = require("../models/User");
const asyncErrorHandler = require("../util/asyncErrorHandler");
const errors = require("../constant/errors");

class UserController {
  all_get = async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json({ data: users });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "very fucking bad" });
    }
  };

  get_customers = async (req, res) => {
    try {
      const users = await User.find().where("role").equals("CUSTOMER");
      res.status(200).json({ data: users });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "very fucking bad" });
    }
  };

  update_profile = asyncErrorHandler(async (req, res, next) => {
    const { id } = req.params;
    const { user } = req.body;
    
    const updatedUser = await User.findById(id);
    if (!updatedUser) {
      const error = new Error(errors.userNotFound.code);
      next(error);
    }

    await User.findByIdAndUpdate(id, user);
    return res.status(200).json(updatedUser);
  });
}



module.exports = new UserController();
