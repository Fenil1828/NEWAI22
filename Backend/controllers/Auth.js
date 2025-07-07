const Otp = require("../models/Otp")
const User = require("../models/User")
const mailSender = require("../utils/mailSender")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")

const {
    generateAuthUrl,
    getTokens,
    verifyIdToken
} = require('../config/googleOAuth')
const ProfileUser = require("../models/ProfileUser")

 function generateOtp(){
    return Math.floor(100000 + Math.random() * 900000).toString() // 6 digit
}

//otp send
exports.sendOtp = async (req, res) => {
    const email  = req.body.email

    try{
        //check if user already registred
        if(await User.exists({ email })){
            return res.status(409).json({
                message: "User Already Exists"
            })
        }

        const otp = generateOtp()
        await Otp.create({ email , otp , expiresAt: Date.now() + 5 * 60 * 1000})
        await mailSender(email ,  `Your OTP is ${otp}`)

        return res.status(200).json({
            message: "Otp Sent"
        })

    }
    catch(error){
        console.log(error)
        console.error(error)
        return res.status(401).json({
            success:false,
            message: error.message
        })
    }
}

// verify otp
exports.verifyOtp = async (req ,res) => {
    
    const { email , otp } = req.body
    
    try{
        const record = await Otp.findOne({ email , otp})

        if(!record || record.expiresAt < Date.now()){
            return res.status(400).json({
                message: "Otp invalid or expired"
            })
        }

        return res.status(200).json({
            message:"Otp Verified"
        })

    }
    catch(error){
        console.log(error)
    }
}


//user registered
exports.register = async (req,res) => {
    const { email, firstName , lastName , password} = req.body

    if(await User.exists({ email })){
        return res.status(409).json({
            message: "User is already exists"
        })
    }

    const hashPassword = await bcrypt.hash(password , 10)
    await User.create({ 
        email, 
        firstName, 
        lastName, 
        password:hashPassword})

        return res.status(200).json({
            message: "Registration Successful"
        })
}

//sign in
exports.login = async (req,res) => {

    const { email , password} = req.body

    try{
        //check user is prsent
        if(!email || !password){
            return res.status(401).json({
                success:false,
                message: "All field are required"
            })
        }

        //find user by emails
        const user = await User.findOne({ email })

        if(!user){
            return res.status(404).json({
                success:false,
                message: "User Not Found"
            })
        }

        //comapre password
        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.status(401).json({
                success:false,
                message:"Invalid Credentials"
            })
        }

        //generate JWT token

        const token = jwt.sign(
            {
            userId: user._id,
            email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
         )

         res.json({ token })

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message: "Server Error",
            error: error.message
        })
    }

}

//for google auth url
exports.googleAuthUrl = (req, res) => {
  const state = crypto.randomBytes(16).toString('hex');
  req.session.oauthState = state;
  console.log('Session ID (url):', req.sessionID);
  console.log('State set:', state);
  const url = generateAuthUrl(state);
  res.json({ url });
};

//for google url respose to front end with success
exports.googleCallback = async (req, res) => {
  const { code, state } = req.query;

  // ... (state validation code)
  if (!code || !state || state !== req.session.oauthState) {
    return res.status(400).json({ error: 'Invalid state or code' });
  }

  try {
    const { id_token } = await getTokens(code);
    const userInfo = await verifyIdToken(id_token);

    // Extract user info from Google
    const { sub: googleId, email, name, picture } = userInfo;

    // Split name into firstName and lastName
    let firstName = "", lastName = "";
    if (name) {
      const parts = name.split(" ");
      firstName = parts[0];
      lastName = parts.slice(1).join(" ");
    }

    // Find user by Google ID or email
    let user = await ProfileUser.findOne({ $or: [{ googleId }, { email }] });

    if (!user) {
      // Create new user entry
      user = await ProfileUser.create({
        googleId,
        email,
        firstName,
        lastName,
        image :`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
      });
    } else if (!user.googleId) {
      // Link Google account to existing user (if registered by email before)
      user.googleId = googleId;
      user.firstName = user.firstName || firstName;
      user.lastName = user.lastName || lastName;
      user.picture = user.picture || picture;
      await user.save();
    }

    // Save user info in session or create JWT
    req.session.user = user;

    // Redirect to frontend with success
    // res.redirect(`http://localhost:5173/auth/success?name=${encodeURIComponent(user.firstName)}`);
    // New redirect line with image
res.redirect(`http://localhost:5173/auth/success?name=${encodeURIComponent(user.firstName)}&image=${encodeURIComponent(user.image)}`);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Google authentication failed" });
  }
};

// Get current user profile (for sidebar/profile)
exports.getMe = async (req, res) => {
  try {
    const user = await ProfileUser.findById(req.user.userId).select("firstName lastName email image");
    console.log("user is : " , user)
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



exports.login = async (req,res) => {
    try{
        //fetch data
        const {email,password} = req.body;
        //validation
        if(!email || !password){
            return res.status(403).json({
                success:false,
                message:"All field is required",
            });
        }

        //user chrck
        const user = await User.findOne({email})


        if(!user){
            return res.status(401).json({
                success:false,
                message:"User is not Registered, please signUp first",
            });
        }
        // //generate JWT, after password matching
        if (await bcrypt.compare(password , user.password)){

            const payload = {
                email:user.email,
                id: user._id,
                accountType:user.accountType,
            }

            const token = jwt.sign(payload, process.env.JWT_SECRET , {
                expiresIn:"10d",
            });
         
            console.log("this is a create time token: ",token);

            user.token = token;
            user.password = undefined;

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
				httpOnly: true,
            }
            //create cookies and send response
            res.cookie("token" , token , options).status(200).json({
                success:true,
                token,
                user,
                message:"Logged in Successfully",
            })
        }

        else{
            console.log(password);
            return res.status(401).json({
                success:false,
                message:"Password is incorrect"
                
            })
        }
    }catch(error){
        console.error(error);
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Login Failure, Please try again",
        })
    }
};