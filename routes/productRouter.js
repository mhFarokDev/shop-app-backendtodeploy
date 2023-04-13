import express from "express"
import { createNewProduct, getAllProduct, singleProduct, updateProduct, getAllTag, createTag, getAllCategory, createCategory, deleteCategory, deleteTag } from "../controller/productController.js";
import multer from "multer";
import path, { resolve } from 'path'
import { deleteProduct } from "../controller/productController.js";

// make dirname to go root file (class 3 * where is packge.json)
const __dirname = resolve()

// product photo upload by Multer
const storage = multer.diskStorage({
    filename : (req, file, cb)=>{

        cb(null, Date.now()+"_"+file.originalname)
    },
    destination : (req, file, cb) =>{
        if (file.fieldname == 'photo') {
            cb(null, path.join(__dirname, 'api/public/images/products/featured/'))
        } else {
            cb(null, path.join(__dirname, 'api/public/images/products/gallery/'))
        }
        
    }
})

// product multer
const productMulter = multer({
    storage
}).fields([
    {
        name : 'photo',
        maxCount : 1
    },
    {
        name : 'gallery_photo',
        maxCount : 3
    }
])





const router = express.Router()
router.route('/').get(getAllProduct).post(productMulter, createNewProduct)

// tag
router.route('/addtag').get(getAllTag).post( createTag)
router.route('/addtag/:id').delete(deleteTag)

// category
router.route('/addcategory').get(getAllCategory).post(createCategory)
router.route('/addcategory/:id').delete(deleteCategory)

router.route('/:id').get(singleProduct).put(updateProduct).delete(deleteProduct)






export default router;