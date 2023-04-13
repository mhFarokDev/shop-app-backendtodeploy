import express from "express";
import { addNewUser, deleteuser, getAllUser, getSingleUser, loginUser, registeredUser, updateUser } from "../controller/userControllet.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import authMiddleware from "../middleware/authMiddleware.js";
import userAuthintation from "../middleware/userAuthintation.js";
const router = express.Router()
router.route('/').get(authMiddleware, getAllUser).post(adminMiddleware, addNewUser)
router.route('/:id').get(userAuthintation, getSingleUser).put(userAuthintation, updateUser).patch(userAuthintation, updateUser).delete(userAuthintation, deleteuser)


// authintation
router.post('/login', loginUser)
router.post('/register', registeredUser)
export default router;