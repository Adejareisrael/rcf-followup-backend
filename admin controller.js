import mongoose from "mongoose";
import Admin from "../models/admin model.js";
import bycrypt from 'bcrypt'


export const getallAdmin = async (req,res) =>{
    try {
        const admin = await Admin.find()
        res.status(200).json({success: true, data : admin})

    } catch (error) {
        console.log("error in fetching admin:", error.message)
        res.status(500).json({success: false, message: "server error"})
        
    }
}

export const getAdminbyID = async(req, res) =>{
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {   
        return res.status(404).json({success: false, message: "Invalid admin Id"})
    }

    try {

        const admin = await Admin.findById(id)
        res.status(200).json({success: true, data: admin})

    } catch (error) {
        console.error("error in fetching admin:", error.message)
        res.status(500).json({success: false, message: "server error"})
        
    }
}
  

export const createAdmin =  async (req,res) => {
    
   const {username, email, password} = req.body

     if(!username ||!email || !password)
       res.status(404).json({success:false, message: "Please provide all fields"})

     if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email))
         return res.status(404).json({success:false, message: "Invalid Email"}) 

    
    try {
         const existingAdmin = await Admin.findOne({email});
        if (existingAdmin) {
          return res.status(400).json({ message: 'Admin already exists' });
    }

    
    const newAdmin = new Admin({username, email, password})
        await newAdmin.save()
        

        res.status(201).json({success: true, message: "Admin created successfully, please check your mail for verification", data: newAdmin})


    } catch (error) {
        console.error ("Error in creating admin", error.message)
        res.status(500).json({success: false, message: "Server Error"})
        
    }
    
}



export const updateAdmin = async (req,res) =>{
    const {id} = req.params
    const admin = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {   
        return res.status(404).json({success: false, message: "Invalid admin Id"})
    }
try {
    const updatedAdmin = await Admin.findByIdAndUpdate(id, admin, {new: true})
    res.status(200).json({success: true, message: "Admin updated", data: updatedAdmin}) 

} catch (error) {
    console.log("Error in updating admin:" , error.message)
    res.status(404).json({success: false , message: "Server Error"})
    
}}



export const deleteAdmin = async(req, res) =>{
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {   
        return res.status(404).json({success: false, message: "Invalid admin Id"})
    }

    try {

        await Admin.findByIdAndDelete(id)
        res.status(200).json({success: true, message: "Admin deleted successfully"})

    } catch (error) {
        console.error("Error in deleting admin:", error.message)
        res.status(500).json({success: false, message: "server error"})
        
        
    }
}

