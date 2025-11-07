//token was signed using _id of user in mongodb which is found after decoding

// user authentication middleware

import jwt from "jsonwebtoken";

const authDoctor = async (req, res, next) => {
  try {
    const { dtoken } = req.headers;
    if (!dtoken) {
      return res.json({
        success: false,
        message: "Not Authorized, Login Again",
      });
    }

    // Verify the token
    const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET);
    req.docId = token_decode._id; 

    next();
  } catch (error) {
    console.log(error);
    // Handle specific JWT errors like 'TokenExpiredError' if you want
    res.json({ success: false, message: "Authentication Failed" });
  }
};

export default authDoctor;


