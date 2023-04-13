import errorController from "./errorController.js";
import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken"
/**
 * 
 * @access public
 * @route api/user
 * @method GET 
 * 
 */
export const getAllUser = async (req, res, next) =>{
    try {
        const user = await User.find()
        if (!user) {
            return next(errorController(402, "user missing"))
        }
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}

/**
 * 
 * @access public
 * @route api/user/:id
 * @method GET 
 * 
 */
export const getSingleUser = async (req, res, next) =>{
    const stdId = req.params.id
    try {
        const user = await User.findById(stdId)
        if (!user) {
            return next(errorController(401, "Usere not found!"))
        }
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}


/**
 * 
 * @access public
 * @route api/user/:id
 * @method POST 
 * 
 */

export const addNewUser = async (req, res, next) =>{
    try {
        const saltPass = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password, saltPass)
        const addedUser = await User.create({...req.body, password})
        if (!addedUser) {
            return next(errorController(402, "Worng Information....."))
        }
        res.status(200).json(addedUser)
    } catch (error) {
        next(error)
    }
}


// update user
/**
 * 
 * @access public 
 * @route api/user/:id
 * @method PUT/PATCH 
 */
export const updateUser = async (req, res, next) =>{
    const id = req.params.id;
    try {
        const userData = await User.findById(id)
        if (!userData) {
            return next(errorController(401, "worng user!"))
        }
        const password = userData.password;
        const updateData = await User.findByIdAndUpdate(id, {userData, ...req.body, password},{new : true})
        res.status(200).json(updateData)
    } catch (error) {
        next(error)
    }
}


// delete delete
/**
 * 
 * @access public 
 * @route api/user/:id
 * @method DELETE
 * @returns 
 */
export const deleteuser = async (req, res, next) =>{
    const id = req.params.id;
    try {
        const userData = await User.findById(id)
        if (!userData) {
            return next(errorController(401, "worng user!"))
        }
        const deleteUserData = await User.findByIdAndDelete(id);
        res.status(200).json(deleteUserData)
    } catch (error) {
        next(error)
    }
}


// ===========================
// Authintation 
// ===========================

/**
 * 
 * @access public
 * @route api/user/login
 * @method POST 
 * @returns 
 */
export const loginUser = async (req, res, next) =>{
    const email = req.body.email;
    const password = req.body.password;
    try {
        // check email
        const loginUserData = await User.findOne({email : email})
        if (!loginUserData) {
            return next(errorController(402, "worng email!"))
        }

        // check password
        const checkPassword = await bcrypt.compare(password, loginUserData.password)
        if (!checkPassword) {
            return next(errorController(402, "worng password!"))
        }

        if (checkPassword) {
            const {password, _id, ...otherInfo} = loginUserData._doc;
            const jwtToken = jwt.sign({id : loginUserData._id, isAdmin : loginUserData.isAdmin}, process.env.JWT_SECRATE )
            res.cookie("access_token", jwtToken).status(200).json({
                token : jwtToken,
                user : otherInfo
            })
        }
        
    } catch (error) {
        next(error)
    }
}
// =========================
// Registation new user
// =========================
/**
 * 
 * @access public
 * @route api/user/:id
 * @method POST 
 * 
 */

export const registeredUser = async (req, res, next) =>{
    try {
        const saltPass = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password, saltPass)
        const addedUser = await User.create({...req.body, password})
        if (!addedUser) {
            return next(errorController(402, "Worng Information....."))
        }
        res.status(200).json(addedUser)
    } catch (error) {
        next(error)
    }
}