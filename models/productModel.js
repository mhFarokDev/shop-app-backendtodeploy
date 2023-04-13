import mongoose from "mongoose";

const ProductSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true
    },
    regular_price : {
        type : Number,
    },
    sell_price : {
        type : Number,
        required : true,
    },
    stock : {
        type : Number,
        require : true
    },
    photo : {
        type : String,
        default : 'p.png'
    },
    gallery_photo : {
        type : Array,
    },
    categorys : {
        type : Array,
    },
    tags : {
        type : Array,
    }

},{
    timestamps : true
})

export default mongoose.model('Product', ProductSchema)