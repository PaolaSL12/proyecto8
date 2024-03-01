const User = require("../api/models/users");
const { verifyJwt } = require("../config/jwt");


const isAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization;

    if (!token) {
      return res.status(400).json("no estas autorizado");
    }

    const parsedToken = token.replace("Bearer ", "");
   
    const { id } = verifyJwt(parsedToken);

    const user = await User.findById(id);
    user.password = null;
    req.user = user;
    next();
    } catch (error) {
        return res.status(400).json("no estas autorizado");
    }
};

const isAdmin = async (req, res, next) => {
    try {
      const token = req.headers.authorization;
      
      if (!token) {
        return res.status(400).json("no estas autorizado");
      }
  
      const parsedToken = token.replace("Bearer ", "");
    
      const { id } = verifyJwt(parsedToken);
 
      const user = await User.findById(id);
  
      if (user.rol === "admin") {
        user.password = null;
        req.user = user;
        next();
      } else {
          return res.status(400).json("no eres admin");
      }
    } catch (error) {
      return res.status(400).json("no estas autorizadooooo");
    }
  };

  module.exports = { isAuth, isAdmin}