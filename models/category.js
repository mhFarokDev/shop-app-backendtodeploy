import mongoose from "mongoose";


const productCategory = mongoose.Schema({
    ctgName : {
        type : String,
        required : true
    }
})


export default mongoose.model('category', productCategory)