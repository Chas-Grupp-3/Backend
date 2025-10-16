import jwt from "jsonwebtoken";
export function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // "Bearer TOKEN"
    if (!token) {
        res.status(401).json({ message: "Access denied. No token provided." });
        return;
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            res.status(403).json({ message: "Invalid or expired token." });
            return;
        }
        req.user = user;
        next();
    });
}
