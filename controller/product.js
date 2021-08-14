import Product from '../model/product'
import _ from 'lodash'

export const create = (req, res) => {
    const product = new Product(req.body);
    console.log(product);
    product.save((err, result) => {
        
        if(err){
            res.status(400).json({
                errors: 'Khong them duoc san pham'
            })
        }
        res.json(result);
    })
}



export const productByID = (req, res, next, id) => {
    Product.findById(id).exec((err, product) => {
        if (err || !product) {
            res.status(400).json({
                error: 'Product not found'
            })
        }
        req.product = product;
        next();
    })
} 

export const read = (req, res) => {
    
    return res.json(req.product)
}

export const update = (req, res) => {
    console.log(req.product);
    Product.findOneAndUpdate(
        { _id  : req.product._id },
        { $set : req.body},
        {new : true },(err,product)=>{
          if(err){
            res.status(400).json({
              error : "Không thể update được product"
            })
          }
          res.json(product);
        }
      )
}

export const remove = (req, res) => {
    let product = req.product;
    product.remove((err, deletedProduct) => {
        if(err) {
            return res.status(400).json({
                error: "Không xóa được sản phẩm"
            })
        }
        res.json({
            deletedProduct,
            message: "Sản phẩm đã được xóa thành công"
        })
    })
}

export const list = (req, res) => {
    Product.find((err, data) => {
        if(err) {
            error: "Không tìm thấy sản phẩm"
        }
        res.json(data)
    })
  }
