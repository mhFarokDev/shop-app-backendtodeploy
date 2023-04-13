
/**
 * Custom error handleing
 * @param {*} error 
 * @param {*} req 
 * @param {*} res 
 */
const errorHandler = (error, req, res, next) =>{
    const errorStatus = error.status || 500;
    const errorMessage = error.message;
    const errorStack = error.stack || "Unknown Error!";
    // responce send as error
    res.status(errorStatus).json({
        status : errorStatus,
        message : errorMessage,
        stack : errorStack
    })
}

export default errorHandler;