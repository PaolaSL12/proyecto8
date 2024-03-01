
const { isAdmin, isAuth } = require("../../middlewares/auth");
const upload = require("../../middlewares/files");
const { getCars, getCarsById, postCar, deleteCar, updateCar } = require("../controllers/cars");

const carsRouter = require("express").Router();

carsRouter.get("/:id", [isAuth], getCarsById)
carsRouter.get("/", getCars);
carsRouter.post("/create", [isAdmin], upload.single("img"), postCar);
carsRouter.delete("/:id", [isAdmin], deleteCar)
carsRouter.put("/:id", [isAdmin], upload.single("img"), updateCar)

module.exports = carsRouter;