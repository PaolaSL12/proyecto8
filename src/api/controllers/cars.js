const { deleteFile } = require("../../utils/deleteFile");
const Car = require("../models/cars")

const getCars = async (req, res, next) => {
    try {
       const cars = await Car.find();
       return res.status(200).json(cars) 
    } catch (error) {
        return res.status(400).json(error)
    }
};

const getCarsById = async (req, res, next) => {
    try {
       const { id } = req.params;
       const car = await Car.findById(id)
       return res.status(200).json(car) 
    } catch (error) {
        return res.status(400).json(error)
    }
};

const postCar = async (req, res, next) => {
    try {
       const newCar = new Car({
        model: req.body.model,
        manufacturer: req.body.manufacturer,
        price: req.body.price,
        production: req.body.production,
        img: req.body.img
       })

       if (req.file) {
        newCar.img = req.file.path
       }

       const carCreated = await newCar.save();
       return res.status(201).json(carCreated)
    } catch (error) {
        return res.status(400).json(error)
    }
};

const updateCar = async (req, res, next) => {
    try {
       const { id } = req.params;
       const carModify = new Car({
        model: req.body.model,
        manufacturer: req.body.manufacturer,
        price: req.body.price,
        production: req.body.production,
        img: req.body.img
       });
       carModify._id = id;

       

       const carUpdated = await Car.findByIdAndUpdate(id,
        { ...req.body, img: req.file ? req.file.path : 'not image' },
        {
          new: true,
        }
      );

       return res.status(200).json(carUpdated)
    } catch (error) {
        return res.status(400).json(error)
    }
};

const deleteCar = async (req, res, next) => {
    try {
       const { id } = req.params;
       const deletedCar = await Car.findByIdAndDelete(id);
       if (deleteCar.img) deleteFile(deletedCar.img);
       return res.status(200).json(deletedCar)
    } catch (error) {
        return res.status(400).json(error)
    }
};

module.exports = { getCars, getCarsById, postCar, deleteCar, updateCar}