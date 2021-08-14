import User from '../model/user'

export const userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
      if (err || !user) {
        return res.status(400).json({
          err: "User not found"
        })
      }
      req.profile = user;
      next();
    })
  }
export const Read = (req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
  }
export const List = (req, res) => {
    User.find((err, data) => {
      if (err) {
        return res.status(400).json({
          error: "k tim thay user"
        })
      }
      res.json(data);
    })
  }
  export const Update = (req, res) => {
    User.findOneAndUpdate(
      { _id: req.profile.id },
      { $set: req.body },
      { new: true },
      (err, user) => {
        if (err) {
          return res.status(400).json({
            error: 'You are not authorized to perform in action'
          })
        }
        req.profile.hashed_password = undefined;
        req.profile.salt = undefined;
        res.json(user);
      }
    )
  }

  export const Delete = (req, res) => {
    let user = req.profile;
    user.remove((err, deleteUser) => {
      if (err) {
        return res.status(400).json({
          error: "k xoa duoc user"
        })
      }
      res.json({
        deleteUser,
        message: "xoa user thanh cong !"
      }
      )
    })
  }
