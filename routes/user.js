import express from 'express'
import {isAdmin, isAuth, checkPassword} from '../controller/auth'
import {List, Delete, Read, Update, userById} from '../controller/user'
const router = express.Router();

router.get('/secret/:userId', isAuth, isAdmin, (req, res) => {
    res.json({
        user: req.profile
    })
});

router.get('/users',List);

router.delete('/users/:userId/:userId',isAuth,isAdmin,Delete);

router.get('/users/:userId',Read);

router.get('/users/:userId',isAuth,Read);

router.put('/users/:userId/:userId',isAuth,isAdmin,Update);

router.post('/checkpassword/:userId',checkPassword);



router.param('userId',userById);

module.exports = router;