const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require("../models/users")

const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(409).json({ message: 'User is already exist,You can login', success: false });
    }

    const userModel = new UserModel({ name, email, password, role});
    userModel.password = await bcrypt.hash(password, 10);
    await userModel.save();

      res.status(201). json({ message: " Signup successfully", success:true, 
        user: {
        id: userModel._id,        
        name: userModel.name,     
        email: userModel.email,   
        role: userModel.role,     
        createdAt: userModel.createdAt
      }});
  }
  catch(err) { 
    console.error(" Signup Error:", err); 
    res.status(500). json({ message: " Internal server error", success:false });
  }

}

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    const errorMsg = 'Auth failed email or password is wrong'
    if (!user) {
      return res.status(403).json({ message: errorMsg , success: false });
    }
    const isPassEqual = await bcrypt.compare(password, user.password);
    if(!isPassEqual){
       return res.status(403).json({ message: errorMsg , success: false });
    }

    const jwtToken = jwt.sign(
      {
        email:user.email,
        id:user._id,  
        role: user.role 
      },
      process.env.JWT_SECRET,
      { expiresIn : '24h'}
    );


      res.status(200). json({ message: " Login success", success:true,
        jwtToken,
        email,
        name:user.name,
        role: user.role
       });
  }
  catch(err) { 
    res.status(500). json({ message: " Internal server error", success:false });
  }

}

const getProfile = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }
    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, password } = req.body;
    const updateData = {};

    if (name) updateData.name = name;
    if (password) updateData.password = await bcrypt.hash(password, 10);

    const user = await UserModel.findByIdAndUpdate(req.user._id, updateData, { new: true }).select("-password");

    res.status(200).json({ success: true, message: "Profile updated", user });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
};


module.exports = {
  signup,
  login,
  getProfile,
  updateProfile
}