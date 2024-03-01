
const { isAuth, isAdmin } = require("../../middlewares/auth");
const upload = require("../../middlewares/files");
const { getUsers, registerUser, login, updateUser, deleteUser } = require("../controllers/users");


const usersRouter = require("express").Router();

usersRouter.get("/", [isAdmin], getUsers);
usersRouter.post("/register", upload.single("imgUser"), registerUser);
usersRouter.post("/login", login);
usersRouter.put("/update/:id", upload.single("imgUser"), [isAdmin], updateUser);
usersRouter.delete("/delete/:id", [isAdmin], deleteUser)


module.exports = usersRouter;