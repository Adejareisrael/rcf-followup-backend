import express from 'express'
import mongoose from 'mongoose'
import Admin from '../models/admin model.js'
import { createAdmin, getAdminbyID, getallAdmin, deleteAdmin, updateAdmin } from '../controllers/admin controller.js'
import bycrypt from 'bcrypt'



const router = express.Router()

router.get("/", getallAdmin)
router.get("/:id", getAdminbyID)
router.post ("/", createAdmin)
router.put("/:id", updateAdmin)
router.delete("/:id", deleteAdmin)


export default router;