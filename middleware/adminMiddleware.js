import errorController from "../controller/ErrorController.js";
import jwt from "jsonwebtoken"
const adminMiddleware = (req, res, next) =>{

    try {
        const id = req.params.id;
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
            if (!checkCookies.isAdmin) {
                return next(errorController(404, "only admin can add."))
            }
            req.user = checkCookies;
            next()
    } catch (error) {
        next(error)
    }
}

export default adminMiddleware;