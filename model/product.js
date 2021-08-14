import mongoose from 'mongoose';
const { ObjectId } =  mongoose.Schema;

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    description: {
        type: String,
        // required: true,
        maxlength: 2000
    },
    price: {
        type: Number,
        // required: true,
        maxlength: 32
    },
    image: {
        type: String
    },
    quantity : {
        type : Number
    },
    status : {
        type : Boolean,
        required : true     
    },
    categoryId : {
        type : ObjectId,
        ref : "Category",
        required : true
    }

}, { timestamps: true})

module.exports = mongoose.model("Product", productSchema)