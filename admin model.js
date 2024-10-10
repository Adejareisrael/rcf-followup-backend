import mongoose from "mongoose";
import bycrypt from 'bcrypt'

const adminSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
    },

    email:{
        type: String,
        required: true,
    },

    password:{
        type: String,
        required: true,
    },
      
})

adminSchema.pre('save', async function name(next) {
    const salt = await bycrypt.genSalt(12)
    this.password = await bycrypt.hash(this.password, salt)
    next()

    this.verificationToken = Math.random().toString(20).substring(2,9)
    
})

const Admin = mongoose.model('admin', adminSchema);

export default Admin;
