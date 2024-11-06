import Admin from "../Models/AdminModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    
    if (!username || !password) {
      return res.status(401).json({
        message: "All fields are required",
      });
    }

    let user = await Admin.findOne({ name: username });

    if (!user) {
      return res.status(401).json({
        message: "User not exists",
      });
    }
     
     const isMatch =await bcrypt.compare(password,user.password);

     if(!isMatch){
       return res.status(401).json({
          message:"Invalid password",
       })
     }

   
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1000 * 60 * 60 * 24, 
        httpOnly: true,
        sameSite: "strict", 
        secure: process.env.NODE_ENV === 'production', 
      })
      .json({
        message: "Login successful",
      });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const signup = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(401).json({
        message: "All fields are required",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await Admin.create({
      name: username,
      password: hashedPassword,
    });
     
    

    return res.status(200).json({
      message: "admin added successful",
    });
  } catch (error) {
    return res.status(401).json({
      message: error.message,
    });
  }
};
export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", null).json({
      message: "logout successfully",
    });
  } catch (error) {
    return res.status(401).json({
      message: error.message,
    });
  }
};
