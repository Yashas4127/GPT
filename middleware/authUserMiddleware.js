import jwt from "jsonwebtoken";
import User from "../model/userSchema.js";
const authUserMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        console.log("TOKEN:", JSON.stringify(token));

        if (!token) {
            return res.status(401).json({
                message: "You need to login first"
            });
        }

        const payload = jwt.verify(token, process.env.JWT_KEY);

        const existingUser = await User.findById(payload._id);

        if (!existingUser) {
            return res.status(404).json({
                message: "User does not exist"
            });
        }

        req.user = existingUser;

        next();

    } catch (err) {
        console.log("JWT ERROR:", err.message);

        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};
export default authUserMiddleware