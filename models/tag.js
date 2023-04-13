import mongoose from "mongoose";


const productTag = mongoose.Schema({
    tagName : {
        type : String,
        required : true
    }
})


export default mongoose.model('tag', productTag)