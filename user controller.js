import mongoose from "mongoose";
import User from "../models/usersmodel.js";


export const getallUser = async (req,res) =>{
    try {
        const user = await User.find()
        res.status(200).json({success: true, data : user})

    } catch (error) {
        console.log("error in fetching products:", error.message)
        res.status(500).json({success: false, message: "server error"})
        
    }
}

export const getUserbyID = async(req, res) =>{
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {   
        return res.status(404).json({success: false, message: "Invalid user Id"})
    }

    try {

        const user = await user.findById(id)
        res.status(200).json({success: true, data: user})

    } catch (error) {
        console.error("error in fetching user:", error.message)
        res.status(500).json({success: false, message: "server error"})
        
    }
}
  

export const createUser =  async (req,res) => {
    const user = req.body

     if(!user.firstname||!user.lastname ||!user.email || !user.password)
        res.status(404).json({success:false, message: "Please provide all fields"})

    //  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email))
    //      return res.status(404).json({success:false, message: "Invalid Email"})

     

    const newUser = new User(user)
    try {
         const existingUser = await User.findOne({email});
        if (existingUser) {
          return res.status(400).json({ message: 'User already exists' });
    }
        await newUser.save()
        //sendVerificationEmail(newUser)

        res.status(201).json({success: true, data: newUser, message: "User created successfully, please ceck your mail for verification"})


    } catch (error) {
        console.error ("Error in creating user", error.message)
        res.status(500).json({success: false, message: "Server Error"})
        
    }
    
}

// export const verify = async(req,res) =>{
//     const {token} = req.params

//     try {
//         const user = await User.find({verificationToken})
        
//         if(!user) {
//             return res.status(404).json({success: false, message: 'Invalid verification token'})
//         }
//         user.isVerified = true
//         await user.save()
//         res.status(200).json({success: true, message: 'Email verified successfully'})
//     } catch (error)
//      {
//       console.log('Error verifying email')
//       res.status(500).json({sucess: false, message: 'Server error'})  
    
//     }
// }



export const updateUser = async (req,res) =>{
    const {id} = req.params
    const user = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {   
        return res.status(404).json({success: false, message: "Invalid user Id"})
    }
try {
    const updatedUser= await User.findByIdAndUpdate(id, user, {new: true})
    res.status(200).json({success: true, message: "user updated", data: updatedUser})  
} catch (error) {
    console.log("Error in updating user:" , error.message)
    res.status(404).json({success: false , message: "Server Error"})
    
}}


export const deleteUser = async(req, res) =>{
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {   
        return res.status(404).json({success: false, message: "Invalid user Id"})
    }

    try {

        await User.findByIdAndDelete(id)
        res.status(200).json({success: true, message: "User deleted successfully"})
    } catch (error) {
        console.error("Error in deleting user:", error.message)
        res.status(500).json({success: false, message: "server error"})
        
        
    }
}

