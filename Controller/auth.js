const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendMailCustom } = require("../helpers/helper");
const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.signup = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    const existingEmail = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ err: true, msg: "Username already exists" });
    } else if (existingEmail) {
      return res.status(400).json({ err: true, msg: "Email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();
    return res
      .status(200)
      .json({ err: false, msg: "User registered successfully!" });
  } catch (error) {
    return res.status(500).json({
      err: false,
      msg: "server error",
      error: "Internal server error please try after sometime",
    });
    // res.status(500).json({ error: 'Server error' });
  }
};

exports.signin = async (req, res) => {
  try {
    const { password } = req.body;

    // Check if user exists
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(400).json({
        err: true,
        msg: "User with that username does not exist. Please signup",
      });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        err: true,
        msg: "Invalid username or password",
      });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.cookie("t", token, { expire: new Date() + 9999 });

    const { _id, username, email, role } = user;

    return res.json({
      err: false,
      msg: "Login successful!",
      token,
      user: { _id, username, email, role },
    });
  } catch (error) {
    return res.status(500).json({
      err: true,
      msg: "server error",
      error: "Internal server error please try after sometime",
    });
  }
};

// forgetPassword,
exports.forgetPassword = async (req, res) => {
  const { email } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      console.log("err", "error User with that email does not exist");
      return res.status(400).json({
        err: true,
        msg: "User with that email does not exist",
        // error: '',
      });
    }

    let respose = await sendMailCustom(email);

    if (respose) {
      const result = await User.updateOne(
        { email },
        { $set: { otp: respose.toString() } }
      );
      return res.json({ err: false, msg: "OTP send to requested mail!" });
    } else {
      return res.json({
        err: true,
        msg: "Something went wrrong please try again after sometime",
      });
    }
  } catch (e) {
    console.log("error", e);
    return res.status(500).json({
      err: true,
      msg: "server error",
      error: "Internal server error please try after sometime",
    });
  }
};

// submitOtp
exports.submitOtp = async (req, res) => {
  const { email, otp } = req.body;
  try {
    let user = await User.findOne({ email });

    // findByIdAndDelete(req.params.id);
    if (user.otp != otp) {
      return res.status(404).json({ err: true, msg: "Please enter valid OTP" });
    }

    return res.status(200).json({ err: false, msg: "Validation success!" });
  } catch (error) {
    console.log("error in otp submit", error);
    return res.status(500).json({
      err: true,
      msg: "Internal server error please try after sometime",
    });
  }
};

// confirmPassword
exports.confirmPassword = async (req, res) => {
  const { email, password, cpassword } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await User.updateOne(
      { email },
      { $set: { password: hashedPassword } }
    );

    if (result) {
      return res
        .status(200)
        .json({ err: false, msg: "Password updated successfully!" });
    } else {
      return res.status(400).json({ err: true, msg: "Password not updated" });
    }
  } catch (error) {
    console.log("error in otp submit", error);
    return res.status(500).json({
      err: true,
      msg: "Internal server error please try after sometime",
    });
  }
};

function generateOTP(length) {
  const characters = "0123456789";
  let otp = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    otp += characters.charAt(randomIndex);
  }

  return otp;
}

exports.googleLogin = async (req, res) => {
  const { idToken } = req.body;

  try {
    await client
      .verifyIdToken({ idToken, audience: GOOGLE_CLIENT_ID })
      .then(async(response) => {
        const { email_verified, username, email, picture } = response.payload;
        if (email_verified) {
          const user = await User.findOne({ email: email });

          if (user) {
            const token = jwt.sign(
              { _id: user._id },
              process.env.JWT_SECRET,
              { expiresIn: "2d" }
            );

            return res.json({
              err: false,
              "msg": "Login successful!",
              token,
              "user":{
                  "_id": user._id ,
                  "username": user.username,
                  "email": user.email,
                  "role": 0
              }
              // username:user.username,
              // profilePicUrl: picture,
              // roles: 0,
            });
          } else {
            let password = email + process.env.JWT_SECRET;
            
          const newUser = new User({
              username: email.split("@")[0]+generateOTP(4),
              email,
              password,
              profilePicUrl: picture,
              roles: 0,
            });
            newUser.save(async function (err, data) {
              if (err) {
                console.log("ERROR GOOGLE LOGIN ON USER SAVE", err);
                return res.status(400).json({
                  err: true,
                  error: "User signup failed with google",
                });
              }
              const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
              return res.json({
                err: false,
                "msg": "Login successful!",
                token,
                "user":{
                    "_id": user._id ,
                    "username": username,
                    "email": email,
                    "role": 0
                }
              });
            });
          }

        } else {
          return res
            .status(400)
            .json({ err: true, msg: "Google login failed. Try again" });
        }
      });
  } catch (e) {
    console.log("error Google login server error 500", e);
    return res
      .status(400)
      .json({ err: true, msg: "Google login failed. Try again" });
  }
};
