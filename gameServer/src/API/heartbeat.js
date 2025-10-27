import jwt from "jsonwebtoken";
import Log from "../../../shared/Log.js";

export default function heartbeat(uri, key, data) {
    setInterval(() => {
        const token = jwt.sign({}, key, { expiresIn: "1m" });

        fetch(uri + "/heartbeat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                token,
                data: {
                    SUB: data.SUB,
                    PORT: data.PORT,
                    count: data.io.sockets.sockets.size
                }
            })
        }).then(res => {
            if (res.status !== 204) {
                Log(res.status, "Server");
                Log(res.statusText, "Server");
            };
        });
    }, 10000);
}