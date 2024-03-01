const { generateSign } = require("../../config/jwt");
const { deleteFile } = require("../../utils/deleteFile");
const User = require("../models/users");
const bcrypt = require("bcrypt");

const getUsers = async (req, res, next) => {
    try {
        const users = await User.find()
        return res.status(200).json(users)
    } catch (error) {
        return res.status(400).json(error)
    }
};

const registerUser = async (req, res, next) => {
    try {
        const newUser = new User({
            email: req.body.email,
            userName: req.body.userName,
            password: req.body.password,
            birthYear: req.body.birthYear,
            rol: "user",
            imgUser: req.body.imgUser
        });

        if (req.file) {
            newUser.imgUser = req.file.path
           }

        const duplicateUser = await User.findOne({userName: req.body.userName});

        if(duplicateUser) {
            return res.status(400).json("nombre de usuario no disponible")
        }

        const userSave = await newUser.save();
        return res.status(201).json(userSave)
    } catch (error) {
        return res.status(400).json(error)
    }
};

const login = async (req, res, next) => {
    try {
        const user = await User.findOne({userName: req.body.userName});

        if(!user) {
            return res.status(400).json("El usuario no existe 😕")
        }

        if(bcrypt.compareSync(req.body.password, user.password)) {
            const token = generateSign(user._id);
            return res.status(200).json( {user, token} )
        } else {
            return res.status(400).json("La contraseña es incorrecta 😰");
        }

    } catch (error) {
        return res.status(400).json("Todo mal")
    }
};

const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const modifyUser = new User(req.body);
        modifyUser._id = id;

        if (req.file) {
            modifyUser.imgUser = req.file.path;
            const oldUser = await User.findById(id);
            deleteFile(oldUser.imgUser)
        }

        const userUpdated = await User.findByIdAndUpdate(id,  modifyUser,
            {
              new: true,
            }
          )
        return res.status(201).json(userUpdated)
    } catch (error) {
        return res.status(400).json(error)
    }
};

const deleteUser = async (req, res, next) => {
    try {
       const { id } = req.params;
       const userDeleted = await User.findByIdAndDelete(id);
       deleteFile(userDeleted.imgUser);

       return res.status(200).json({
           mesaje: "El ususario ha sido eliminado",
           userDeleted,
       });
    } catch (error) {
       return res.status(400).json(error)
    }
};


module.exports = { getUsers, registerUser, login, updateUser, deleteUser}