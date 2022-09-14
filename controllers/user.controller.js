const User = require("../models/User");
const bcrypt = require("bcryptjs");

let emailPattern = /^\S+@\S+\.\S+$/;
let passwordPattern = /^(?=.{6,})(?=.*[A-Z])(?=.*[@#$%^&+*!=]).*$/;

// creating a user for making a post.
async function createUser(userData) {
  try {
    if (!userData) {
      return { message: "User Data is incorrect", status: "Error" };
    }
    if (!userData.name) {
      return { message: "Name is required", status: "Error" };
    }
    if (!userData.email) {
      return { message: "email is required", status: "Error" };
    } else {
      // checking the pattern of an email.
      isValidEmail = userData.email.match(emailPattern);
      if (!isValidEmail) {
        return { message: "Enter a valid email.", status: "Error" };
      }
      // checking the email, if it already exists then we will return an error.
      let isEmailExists = await User.findOne({ email: userData.email });
      if (isEmailExists) {
        return {
          message: "Email is already registered try different one.",
          status: "Error",
        };
      }
    }

    if (!userData.password) {
      return { message: "password is required", status: "Error" };
    } else {
      // checking the password pattern. A password should be minimum 6 charaters and one Capital and one special character is required.
      let isPasswordCorrect = userData.password.match(passwordPattern);
      if (isPasswordCorrect) {
        // we will store the hashed password inside our database and for that we are using bcryptjs.
        userData.password = await bcrypt.hash(userData.password, 10);
      } else {
        return { message: "password is not correct.", status: "Error" };
      }
    }
    let user = await User.create(userData);
    return {
      message: "Account successfully created",
      status: "Success",
      user,
    };
  } catch (error) {
    return { message: "Internal server Error", status: "Error" };
  }
}

module.exports = createUser;
