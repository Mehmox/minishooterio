import jwt from "jsonwebtoken";

export default function verify(socket, next) {
    const token = socket.handshake.auth.token || "";

    if (!token) return next(new Error("Missing token"));

    try {
        jwt.verify(token, process.env.TOKEN_KEY);
        next();
    } catch (error) {
        next(new Error("Invalid token"));
    }
}