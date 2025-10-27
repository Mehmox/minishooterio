import jwt from "jsonwebtoken";
import Log from "../../../shared/Log.js";

export default async function register(uri, key, data) {
    const token = jwt.sign({}, key, { expiresIn: "1m" });
    Log(uri + "/register", "Server");

    return await fetch(uri + "/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ token, data })
    }).then(res => res.status === 204);
}