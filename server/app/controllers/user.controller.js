const User = require('../models/User.model')
const responses = require('../utils/responses')

//bcrypt
const bcrypt = require('bcryptjs')

// exports.addUser = async (req, res) => {
//     try {
//         const user = new User(req.body)
        
//         const saveUser = await user.save()
//         res.json(saveUser)
//     }
//     catch (error) {
//         res.json({ msg: error })
//     }
// }

exports.addUser = async (req, res) => {
    try {
        // let validate = await validation(req.body);
    
        // if (validate.error) {
        //   return responses.badRequestResponse(
        //     res,
        //     validate.error.details[0].message
        //   );
        // }
    
        const salt = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(req.body.password, salt);
        req.body.password = hash_password
    
        let new_user = await User.create(req.body)
        if (!new_user) {
          return responses.serverErrorResponse(res, "Error while creating user.")
        }
        return responses.successfullyCreatedResponse(res, new_user)
      } catch (error) {
        console.log(error)
        return responses.serverErrorResponse(res)
      }
}

exports.getUser = async (req, res) => {
    try {
        const user = await User.find()
        res.json(user)
    }
    catch (error) {
        res.json({ msg: error })
    }
    // console.log('get user');
}

exports.getUserById = async (req, res) => {
    try {
        const getUserById = await User.findById(req.params.userId)
        res.json(getUserById)
    }
    catch (error) {
        res.json({ msg: error })
    }
}

exports.updateUser = async (req, res) => {
    try {
        const updateUser = await User.findByIdAndUpdate(req.params.userId, req.body)
        res.json(updateUser)
    }
    catch (error) {
        res.json({ msg: error })
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const deleteUser = await User.remove({ _id: req.params.userId })
        res.json(deleteUser)
    }
    catch (error) {
        res.json({ msg: error })
    }
}

exports.login = async (req, res) => {
    console.log("e ", req.body.email);
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user)
                res.status(404).json({ error: "No user found" })
            else {
                console.log("s ", user.password);
                bcrypt.compare(req.body.password, user.password, (error, result) => {
                    if (error)
                        res.status(500).json(error)
                    else if (result)
                        res.status(200).json(user)
                    else
                        res.status(403).json({ error: "Password is incorrect" })
                })
            }
        })
        .catch(error => {
            res.status(500).json(error)
        })
}

