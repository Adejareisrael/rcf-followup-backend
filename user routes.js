import express from 'express'
import mongoose from 'mongoose'
import User from '../models/usersmodel.js'
import { getallUser, getUserbyID, createUser,deleteUser, updateUser} from '../controllers/user controller.js'
import bycrypt from 'bcrypt'


const router = express.Router()

router.get("/", getallUser)
router.get("/:id", getUserbyID)
router.post ("/", createUser)
router.put("/:id", updateUser)
router.delete("/:id", deleteUser)


export default router;