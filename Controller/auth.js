const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = async(req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    const existingEmail = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({err:true, msg: 'Username already exists' });
    }else if(existingEmail){
      return res.status(400).json({err:true, msg: 'Email already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role
    });

    await newUser.save();
    return res.status(200).json({err:false, msg: 'User registered successfully!' });
  } catch (error) {
    return res.status(500).json({ "error": error });
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
            err:true,
            msg: 'User with that username does not exist. Please signup'
           });
        }
    
        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(400).json({ 
            err:true,msg: 'Invalid username or password' });
        }
    
        const token = jwt.sign({ _id: user._id }, 'jgvuujbjk');
        res.cookie('t', token, { expire: new Date() + 9999 });
    
        const { _id, username, email, role } = user;
    
        return res.json({err:false,msg:'Login successful!', token, user: { _id, username, email, role } });
      } catch (error) {
        res.status(500).json({ error: 'Server error' });
      }
};