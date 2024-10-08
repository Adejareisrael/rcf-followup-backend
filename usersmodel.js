import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    
  },
  lastname: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    
  },

  password: {
    type: String,
    required: true
  }
  // verificationToken:{
  //   type: String,
  // },
  // isVerified:{
  //   type: Boolean,
  //   default: false
  // }
});

// const sendVerificationEmail = async (user) => {
//   const trans = nodemailer.createTransport({
//     service: 'gmail',
//     auth:{
//       user: 'followuprcfunilag@gmail.com',
//       pass: 'Ebenezer9#'
//     }

//   })
//   const mailOptions = {
//     from: 'followuprcfunilag@gmail.com',
//     to: user.email,
//     subject: 'Email Verification',
//     // html: `
//     //   <p>Please click the following link to verify your email:</p>
//     //   <a href="http://rcffollowupwebsite.com/verify/${user.verificationToken}">Verify Email</a>
//     // `
//   };

//   await trans.sendMail(mailOptions);
// }


userSchema.pre('save', async function (next) { 
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();

  this.verificationToken = Math.random().toString(20).substring(2, 9)
  next()
});


const User = mongoose.model('user', userSchema);

export default User;