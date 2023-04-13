import Category from "../models/category.js"
import Product from "../models/productModel.js"
import Tag from "../models/tag.js"
import errorController from "./errorController.js"
import fs from 'fs'
import path, { resolve } from 'path'
const __dirname = resolve()


// get all product
export const getAllProduct = async (req, res, next) =>{
    
    try {
        const products = await Product.find()
        res.status(200).json(products)
    } catch (error) {
        next(error)
    }

}


// create new product
export const createNewProduct = async (req, res, next) =>{
    try {
        // console.log(req.files.photo[0].filename);
        const product_details = req.body;

        // get gallery images
        let gallImages = []
        for (let i = 0; i < req.files.gallery_photo.length; i++) {
            gallImages.push(req.files.gallery_photo[i].filename);
        }
        let upCat = req.body.categorys.split(",");
        let upTag = req.body.tags.split(",");
        const product = await Product.create({
            ...product_details,
            photo : req.files.photo[0].filename,
            categorys : upCat,
            tags : upTag,
            gallery_photo : gallImages
        })
        if (!product) {
            next(errorController(401, "Product added failed"))
        }
        res.status(200).json(product)
    } catch (error) {
        next(error)
    }
}


// find single product
export const singleProduct = async (req, res, next) =>{
    try {
        const id = req.params.id;
        const product = await Product.findById(id)
        if(!product){
            next(errorController(401, "Product Not found"))
        }
        res.send(product)
    } catch (error) {
        next(error)
    }
}


// update product
export const updateProduct = async (req, res, next) => {
    try {
        const updateData  = req.body;
        const id = req.params.id;
        const product = await Product.findOneAndUpdate(id, updateData, {new : true})
        if (!product) {
            next(errorController(401, "Data Update Faile"))
        }
        res.status(200).json(product)
    } catch (error) {
        next(error)
    }
}


// delete product
export const deleteProduct =  async (req, res, next) =>{
    try {
        const id = req.params.id
        const product = await Product.findByIdAndDelete(id)
        if (!product) {
            next(errorController(401, "Data delete Faile"))
        }
        fs.unlinkSync(path.join(__dirname, `api/public/images/products/featured/${product.photo}`));
        
        if (product.gallery_photo) {
            product.gallery_photo.map(data=>{
                fs.unlinkSync(path.join(__dirname, `api/public/images/products/gallery/${data}`));
                console.log(data);
            })
        }
        
        res.status(200).json(product)
    } catch (error) {
        next(error)
    }
}


// tag
// get all tag
export const getAllTag = async (req, res, next) =>{
    
    try {
        const tags = await Tag.find()
        if (!tags) {
            next(errorController(401, "Tags Not Fount!"))
        }
        res.status(200).json(tags)
    } catch (error) {
        next(error)
    }
}

// add new tag
export const createTag = async(req, res, next) => {
    try {
        const tagDetails = req.body;
        const tag = await Tag.create(tagDetails)
        if (!tag) {
            next(errorController(401, "tag added failed"))
        }
        res.status(200).json(tag)
    } catch (error) {
        next(error)
    }
}
// delete tag
export const deleteTag = async (req, res, next) =>{
    try {
        let selData = await Tag.findByIdAndDelete(req.params.id)
        res.status(200).json(selData)
    } catch (error) {
        next(error)
        
    }
}





// category

// get all category
export const getAllCategory = async (req, res, next) =>{
    try {
        const category = await Category.find()
        if (!category) {
            next(errorController(401, "Tags Not Fount!"))
        }
        res.status(200).json(category)
    } catch (error) {
        next(error)
    }
}


// add new category
export const createCategory = async(req, res, next) => {
    try {
        const categoryDetails = req.body;
        const category = await Category.create(categoryDetails)
        if (!category) {
            next(errorController(401, "tag added failed"))
        }
        res.status(200).json(category)
    } catch (error) {
        next(error)
    }
}


// delete category
export const deleteCategory = async (req, res, next) =>{
    try {
        let selData = await Category.findByIdAndDelete(req.params.id)
        res.status(200).json(selData)
    } catch (error) {
        next(error)
        
    }
}
