const User = require("../models/User");

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
}
module.exports = new UserController();
