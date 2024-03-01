const { deleteFile } = require("../../utils/deleteFile");
const Brand = require("../models/brands");

const getBrands = async (req, res, next) => {
    try {
       const brands = await Brand.find();
       return res.status(200).json(brands) 
    } catch (error) {
        return res.status(400).json(error)
    }
};

const getBrandByName = async (req, res, next) => {
    try {
        const { name } = req.params;
        const nameBrand = await Brand.find({name});
        return res.status(200).json(nameBrand);
    } catch (error) {
        return res.status(400).json(error)
    }
};

const postBrand = async (req, res, next) => {
    try {
        const newBrand = new Brand({
            name: req.body.name,
            owner: req.body.owner,
            country: req.body.country,
            introduced: req.body.introduced,
            imgLogo: req.body.imgLogo
        });

        if (req.file) {
            newBrand.imgLogo = req.file.path
           }

        const brandCreated = await newBrand.save();
        return res.status(201).json(brandCreated);
    } catch (error) {
        return res.status(400).json(error)
    }
};

const updateBrand = async (req, res, next) => {
    try {
        const { id } = req.params;
        const brandModify = new Brand(req.body);
        brandModify._id = id;
        

        if (req.file) {
            brandModify.imgLogo =  req.file.path;
            const oldBrand = await Brand.findById(id);
            deleteFile(oldBrand.imgLogo)   
        }
       

        const brandUpdated = await Brand.findByIdAndUpdate(id, brandModify,
            {
              new: true,
            }
          )
        return res.status(200).json(brandUpdated);
    } catch (error) {
        return res.status(400).json(error)
    }
};

const deleteBrand = async (req, res, next) => {
    try {
        const { id } = req.params;
        const brandDeleted = await Brand.findByIdAndDelete(id);
    
        if (!brandDeleted) {
          return res.status(404).json({ message: "La marca no existe o ya fue eliminada" });
        }
    
        if (brandDeleted.imgLogo) {
          deleteFile(brandDeleted.imgLogo);
        }
    
        return res.status(200).json(brandDeleted);
    } catch (error) {
        console.error("Error al eliminar la marca:", error);
        return res.status(400).json("Error en la solicitud");
    }
  };

module.exports = { getBrands, getBrandByName, postBrand, updateBrand, deleteBrand}