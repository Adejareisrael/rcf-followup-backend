import express from 'express'
import mongoose from 'mongoose'
import User from '../models/usersmodel.js'
import { getUser, getUserbyID, createUser,deleteUserbyID, updateUser} from '../controllers/user controller.js'
const router = express.Router()

router.get("/", getUser)
router.get("/:id", getUserbyID)
router.post ("/", createUser)
router.put("/:id", updateUser)
//router.delete("/:id", deletedUser)
router.delete("/:id", deleteUserbyID)


export default router;