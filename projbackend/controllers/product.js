const Product = require('../models/product');
const formidable = require('formidable');
const _ = require("lodash");
const fs = require('fs');

exports.getPoductById = (req,res,next,id)=>{
    Product.findById(id)
    .populate("category")
    .exec((err,product)=>{
        if(err){
            res.status(400).json({
                error: 'Product not found in the DB'
            })
        }
        req.product = product;
        next();
    })
}

exports.createProduct = (req,res)=>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err,fields,file)=>{
        if(err){
            res.status(400).json({
                error: "Problem with image"
            })
        }
        //destructure te fields
        const {name, description, price, category, stock} = fields;

        if(!name || !description || !price || !category || !stock){
            return res.status(400).json({
                error: "Please include all fields"
            })
        }


        let product = new Product(fields);

        //handle file here
        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error: "File size too big"
                })
            }
            
                product.photo.data = fs.readFileSync(file.photo.filepath)
                product.photo.contentType = file.photo.mimetype
            
        }

        //save to te DB
        product.save((err,product)=>{
            if(err){
                res.status(400).json({
                    error: "Saving tshirt in DB is failed"
                })
            }
            res.json(product);
        })
    })
}

exports.getProduct = (req,res)=>{
    req.product.photo = undefined;
   return res.json(req.product);
}

//middleware
exports.photo = (req,res,next)=>{
    if(req.product.photo.data){
        res.set("Content-Type",req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }
    next();
}

//delete controller
exports.deleteProduct = (req,res)=>{
    let product = req.product;
    product.remove((err,deletedProduct)=>{
        if(err){
            return res.status(400).json({
                error: "Failed to delete the product"
            })
        }
        res.json({
            message: "Deletion was successfull",
            deletedProduct
        })
    });
}

//update controller
exports.updateProduct = (req,res)=>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err,fields,file)=>{
        if(err){
            res.status(400).json({
                error: "Problem with image"
            })
        }
        
        //updation code
        let product = req.product;
        product = _.extend(product, fields);

        //handle file here
        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error: "File size too big"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.filepath)
            product.photo.contentType = file.photo.type
        }

        //save to te DB
        product.save((err,product)=>{
            if(err){
                res.status(400).json({
                    error: "Updation of product failed"
                })
            }
            res.json(product);
        })
    })
}

//product listing
exports.getAllProducts = (req,res)=>{
    let limit = req.query.limit ? parseInt(req.query.limit) : 8
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id"
    Product.find()
    .select("-photo")
    .populate("category")
    .limit(limit)
    .sort([[sortBy, "asc"]])
    .exec((err,products)=>{
        if(err){
            return res.json(400).json({
                message: "No product found"
            })
        }
        res.json(products);
    })
}

exports.updateStock = (req,res,next)=>{
    let myOperations = req.body.order.products.map(prod=>{
        return {
            updateOne: {
                filter: {_id: prod.id},
                update: {$inc: {stock: -prod.count, sold: +prod.count}}
            }
        }
    })

    Product.bulkWrite(myOperations, {}, (err,products)=>{
        if(err){
            return res.status(400).json({
                error: "Bulk operations failed"
            })
        }
        next();
    })
}

exports.getAllUniqueCategories = (req,res)=>{
    Product.distinct("category", {}, (err, category)=>{
        if(err){
            res.status(400).json({
                error: "No category found"
            })
        }
        res.json(category);
    })
}