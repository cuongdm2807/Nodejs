import User from '../model/user'
import jwt from 'jsonwebtoken'
import expressJwt from 'express-jwt'
// const nodemailer = require ("nodemailer");
// const expressJwt = require ('express-jwt');



export const signup = (req, res) => {
    const user = new User(req.body);
    user.save((err, user) => {
        if (err) {
            res.status(400).json({
                error: "k thể thêm user"
            })
        }
        user.salt = undefined
        user.hashed_password = undefined
        res.json(user)
    })
}

export const accountActivation = (req, res) => {
    console.log(req.body);
    const { token } = req.body;
    if (token) {
        jwt.verity(token, process.env.JWT_ACCOUNT_ACCTIVATION, function (err, decode){
            if (err) {
                console.log('Lỗi token', err);
                return res.status(400).json({
                    error: "lỗi, đăng ký lại"
                })
            }
            const { name, email, hashed_password } = jwt.decode(token);
            const user = new User ({ name, email, hashed_password});
            user.save((error, user) => {
                if (error) {
                    return res.status.json({
                        error: "Không thể đăng ký tài khoản"
                    })
                }
                user.salt = undefined
                user.hashed_password = undefined
                res.json({ user })
            })
        })
    }
}

export const signin = (req, res) => {
    // find the user base on email
    const { email, password } = req.body; // datlt2306@gmail.com | aaaaa1
    User.findOne({ email }, (error, user) => {
        if (error || !user) {
            return res.status(400).json({
                error: 'User with that email does not exist. Please signup'
            })
        }
        // if user is found make sure email and password match
        // create authenticate method in user model
        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: 'Email and password not match'
            })
        }
        // Tự động tạo ra một mã cùng với user và mã secret
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        // persist the token as 't' in cookie with  
        res.cookie('t', token, { expire: new Date() + 9999 });
        // return response with user and token to frontend client
        const { _id, name, email, role } = user;
        return res.json(
            {
                token,
                user: { _id, email, name, role }
            }
        )
    })
};

export const checkPassword = (req,res)=>{
    let user = req.profile; 
    let id = user._id;
    const { password } = req.body;
    User.findOne({_id:id}, (err, user) => {
        if (!user.authenticate(password)) {
            return res.status(400).json({
                error: "Password not match !"
            })
        }
        res.json({password})
    })
}

export const signout = (req, res) => {
    res.clearCookie('userSignIn');
    res.json({
        message: 'SignOut Success'
    })
}

export const requireSignin = expressJwt({
    secret: "cuongnehihi",
    algorithms: ["HS256"], // added later
    userProperty: "auth",
});

export const isAdmin = (req,res,next)=>{

    if(req.profile.role == 0){
        return res.status(403).json({
            error : "Bạn không phải là Admin !"
        })
    }
    next();
}

export const isAuth = (req,res,next)=>{
    // console.log(req.auth);

    let user = req.profile && req.auth && req.profile._id == req.auth._id;
    if(!user){ 
        return res.status(403).json({
            error : "Bạn không phải là thành viên  !"
        })
    }
    next();
}