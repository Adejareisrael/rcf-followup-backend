import mongoose from "mongoose";
import User from "../models/usersmodel.js";

export const getUser = async (req,res) =>{
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

    if (!mongoose.Types.ObjectId.isValid(id)) {   //this line of code checks if the id provided is a monogdb id
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
    const user = req.body // the user will send this data

    if(!user.username ||!user.email || !user.password)
        return res.status(404).json({success:false, message: "Please peovide all fields"})

    const newUser = new User(user)

    try {
         const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ message: 'User already exists' });
    }
        await newUser.save()
        res.status(201).json({success: true, data: newProduct, message: "User saved successfully"})


    } catch (error) {
        console.error ("Error in creating user", error.message)
        res.status(500).json({success: false, message: "Server Error"})
        
    }
    
}

export const updateUser = async (req,res) =>{
    const {id} = req.params
    const user = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {   //this line of code checks if the id provided is a monogdb id
        return res.status(404).json({success: false, message: "Invalid user Id"})
    }
try {
    const updatedUser= await User.findByIdAndUpdate(id, user, {new: true})
    res.status(200).json({success: true, message: "product updated", data: updatedUser})  
} catch (error) {
    console.log("Error in updating user:" , error.message)
    res.status(404).json({success: false , message: "Server Error"})
    
}}

// export const deletedUser = async (req,res) =>{
//     const {id} = req.params

//     if (!mongoose.Types.ObjectId.isValid(id)) {   //this line of code checks if the id provided is a monogdb id
//         return res.status(404).json({success: false, message: "Invalid product Id"})
//     }
// try {
//     await User.findByIdAndDelete(id)
//     res.status(200).json({success: true, message: "user deleted"})    
// } catch (error) {
//     console.log("Error in deleting user:" , error.message)
//     res.status(500).json({success: false , message: "Server error"})
    
// }}

export const deleteUserbyID = async(req, res) =>{
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {   //this line of code checks if the id provided is a monogdb id
        return res.status(404).json({success: false, message: "Invalid user Id"})
    }

    try {

        await user.findByIdAndDelete(id)
        res.status(200).json({success: true, message: "User deleted successfully"})
    } catch (error) {
        console.error("Error in deleting user:", error.message)
        res.status(500).json({success: false, message: "server error"})
        
        
    }
}
