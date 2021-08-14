import express from 'express';
import {isAuth, isAdmin, requireSignin} from '../controller/auth'
import { userById } from '../controller/user'
import {list, create, read, remove, update, productByID} from '../controller/product'

const router = express.Router();

router.get("/products", list)
router.post("/products/create/:userId",requireSignin,isAuth,isAdmin, create);
router.get("/products/:productId", read);
router.delete("/products/:productId/:userId",requireSignin,isAuth,isAdmin, remove);
router.put("/products/:productId/:userId",requireSignin,isAuth,isAdmin, update);

router.param("productId", productByID)
router.param('userId',userById);



module.exports = router;