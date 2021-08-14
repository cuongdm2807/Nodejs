import express from 'express'
import {isAuth, isAdmin, requireSignin} from '../controller/auth'
import { userById } from '../controller/user'
import {list, create, read, remove, update, categoryID} from '../controller/category'

const router = express.Router();

router.get("/categories", list)
router.post("/categories/create/:userId",requireSignin,isAuth, isAdmin, create);
router.get("/categories/:categoryId",read);
router.delete("/categories/:categoryId/:userId",requireSignin,isAuth, isAdmin, remove);
router.put("/categories/:categoryId/:userId",requireSignin,isAuth, isAdmin, update);

router.param('categoryId',categoryID);
router.param('userId',userById);

module.exports = router;