const users = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')

// add user
exports.addUserController = async(req,res)=>{
    console.log("inside addUserController");
    const {username,email,password} = req.body
    try{
        const existingUser = await users.findOne({email})
        if(existingUser){
            res.status(406).json("user already exists.. please login!!!")
        }else{
            const encryptedPassword = await bcrypt.hash(password,10)
            // console.log(encryptedPassword);
            
            const newUser = new users({
                username,email,password:encryptedPassword,profilePic:""
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    }catch(err){
        res.status(401).json(err)
    }

}

// login
exports.loginController = async (req, res) => {
    console.log("Inside loginController");
    const { email, password } = req.body;

    try {
        const existingUser = await users.findOne({ email });

        if (!existingUser) {
            console.log("User not found:", email);
            return res.status(404).json("Invalid email/password");
        }

        let isPasswordValid = false;

        // Check if the stored password is hashed (bcrypt hashes always start with $2b$10$)
        if (existingUser.password.startsWith("$2b$10$")) {
            isPasswordValid = await bcrypt.compare(password, existingUser.password);
        } else {
            // Directly compare plaintext passwords (for Admin)
            isPasswordValid = password === existingUser.password;
        }

        if (!isPasswordValid) {
            console.log("Password mismatch for user:", email);
            return res.status(401).json("Invalid email/password");
        }

        // Generate JWT Token
        const token = jwt.sign({ userId: existingUser._id }, process.env.JWTPASSWORD)

        console.log("Login successful for:", email);
        res.status(200).json({ user: existingUser, token })

    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};


// edit user
exports.editUserController = async(req,res)=>{
    console.log("inside editUserController");
    const {profilePic} = req.body
    const userId =req.userId
    try{
        const existingUser = await users.findById({_id:userId})
        existingUser.profilePic = profilePic
        await existingUser.save()
        res.status(200).json(existingUser)
    }catch(err){
        res.status(401).json(err)
    }

}

// get all user
exports.getAllUsersController = async(req,res)=>{
    console.log("Inside getAllUsersController");
    try {
        const allUsers = await users.find({ role: { $regex: /^user$/i } } )
        res.status(200).json(allUsers)
        
    } catch (err) {
        res.status(401).json(err)
    } 
}