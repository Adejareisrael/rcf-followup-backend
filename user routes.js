import express from 'express'
import mongoose from 'mongoose'
import User from '../models/usersmodel.js'
import { getallUser, getUserbyID, createUser,deleteUser, updateUser, verify} from '../controllers/user controller.js'
const router = express.Router()

router.get("/", getallUser)
router.get("/:id", getUserbyID)
router.get("/:token", verify)
router.post ("/", createUser)
router.put("/:id", updateUser)
router.delete("/:id", deleteUser)


export default router;