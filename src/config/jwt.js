const jwt = require("jsonwebtoken");

const generateSign = (id) => {
    return jwt.sign( { id }, process.env.jWT_SECRET, {expiresIn: "30d"})
};


const verifyJwt = (token) => {
    return jwt.verify(token, process.env.jWT_SECRET);
}

module.exports = { generateSign, verifyJwt}