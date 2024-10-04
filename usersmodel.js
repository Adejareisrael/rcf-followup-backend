import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    
  },

  email: {
    type: String,
    required: true,
    validate: {
      validator: (email) => {
        // Add a more robust email validation if needed
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email);
      },
      message: 'Invalid email format'
    }
  },

  password: {
    type: String,
    required: true
  }
});

userSchema.pre('save', async function (next) {
  const saltRounds = 10; // Adjust the salt rounds as needed
  const salt = await bcrypt.genSalt(saltRounds);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model('user', userSchema);

export default User;