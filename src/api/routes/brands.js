const { isAdmin, isAuth } = require("../../middlewares/auth");
const upload = require("../../middlewares/files");
const { getBrands, getBrandByName, postBrand, updateBrand, deleteBrand } = require("../controllers/brands");

const brandsRouter = require("express").Router();

brandsRouter.get("/:name", [isAuth], getBrandByName);
brandsRouter.get("/", getBrands);
brandsRouter.post("/create", [isAdmin], upload.single("imgLogo"), postBrand);
brandsRouter.put("/:id", [isAdmin], upload.single("imgLogo"), updateBrand);
brandsRouter.delete("/:id", [isAdmin], deleteBrand);

module.exports = brandsRouter;