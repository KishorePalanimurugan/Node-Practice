const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization");

    console.log("Received Token:", token);

    if (!token) {
        return res.status(401).json({ message: "Access Denied: No Token" });
    }

    try {
        const cleanToken = token.replace("Bearer ", "");
        console.log("Clean Token:", cleanToken); 

        const decoded = jwt.verify(cleanToken, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error);
        res.status(400).json({ message: "Invalid Token" });
    }
};

module.exports = authMiddleware;
