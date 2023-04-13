import errorController from "../controller/ErrorController.js";
import jwt from "jsonwebtoken"

// authintation Check Is an user logedin.
const authMiddleware = (req, res, next) =>{
    
        try {
            // check cookies
            const cookies = req.cookies.access_token;
            if (!cookies) {
                return next(errorController(404, "you are not Authenticated!"))
            }

            // cookies validate
            const checkCookies = jwt.verify(cookies, process.env.JWT_SECRATE)
            if (!checkCookies) {
                return next(errorController(404, "Invalid token!"))
            }
            if (checkCookies) {
                req.user = checkCookies;
                next()
            }
            
        } catch (error) {
            next()
        }
        


        
}

export default authMiddleware;

