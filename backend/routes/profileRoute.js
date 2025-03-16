import express from 'express'
import { getProfile, updateProfile } from '../controllers/profileController.js'
import authMiddleware from '../middlewares/authMiddleware.js'
import multer from 'multer'

const profileRouter = express.Router()

//multer setup for profile picture upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/profile_pics/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({ storage })

profileRouter.get('/:user_Id', getProfile)

profileRouter.put('/', verifyToken, upload.single('profile_pic'), updateProfile)

export default profileRouter