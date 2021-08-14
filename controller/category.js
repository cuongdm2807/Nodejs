import Category from '../model/category'

export const create = (req,res) => {
  
    let category = new Category(req.body);

    category.save((err,data)=>{
        if(err){
            res.status(400).json({
                error : "Thêm danh mục không thành công"
            })
        }   
        res.json(data);
    })
}

export const categoryID = ( req,res,next,id) =>{
    Category.findById(id).exec((err,category) =>{
        if(err){
            return res.status(400).json({
                error : " k tìm thấy sản phẩm"
            })
        }
        req.category = category ;
        next();
    })
  }

  export const read = (req,res) =>{
    return res.json(req.category);
}

export const update = (req, res) => {
    const category = req.category;
    category.name = req.body.name;
    category.save((err,data)=>{
        if(err){
            res.status(400).json({
                error : "Danh mục không thành công"
            })
        }   
        res.json(data);
    })
}

export const remove = (req,res) =>{
    let category = req.category;

    category.remove((err,deletecategory)=>{
      if(err){
        return res.status(400).json({
          error : "k xoa duoc category"
        })
      }
      res.json({
        deletecategory,
        message : "xoa category thanh cong !"
      }
      )
    })
}


export const list = (req, res) => {
    Category.find((err, categores) => {
        if(err) {
            error: "Không tìm thấy danh mục"
        }
        res.json(categores)
    })
  }