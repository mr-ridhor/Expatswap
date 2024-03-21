const User = require("../models/User");

exports.createUser = async (userData) => {
  try {
    const newUser = new User(userData);
    await newUser.save();
    return newUser;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.getAllUsers = async () => {
    try {
      const allUsers = await User.find();
      return allUsers;
    } catch (error) {
      throw new Error(error.message);
    }
  };
