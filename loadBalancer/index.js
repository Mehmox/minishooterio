//lobifinder/index.js
import "dotenv/config";
import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";

import unRegister from "./src/unRegister.js";
import balancer from "./src/balancer.js";
import getToken from "./src/getToken.js";
import Log from "../shared/Log.js";

const TOKEN_KEYS = process.env;
const PORT = process.argv[2] || 5000;
const TimeoutInSec = 30;
const app = express();

const prioritys = new Map();
const servers = new Map();

app.use(cors());
app.use(express.json());

unRegister(TimeoutInSec, prioritys, servers);

app.post("/register", (req, res) => {
    Log(`/register`, "LoadBalancer");

    const { token, data } = req.body;

    if (!token) {
        res.status(401).send("Missing token");
        return;
    }

    try {
        jwt.verify(token, getToken(TOKEN_KEYS, data.SUB));
    } catch (error) {
        res.status(401).send("Invalid token");
        return;
    }

    const ServerId = `${data.SUB}:${data.PORT}`;

    if (servers.has(ServerId)) {
        Log(`Server ${ServerId} already used`, "LoadBalancer");
        res.status(409).send(`Server ${ServerId} already used`);
        return;
    }

    servers.set(ServerId, data);

    const priorityData = prioritys.get(data.priority) || [];

    prioritys.set(data.priority, [...priorityData, ServerId]);

    Log(`Server ${ServerId} registered to priority: ${data.priority}.`, "LoadBalancer");

    res.status(204).end();
});

app.post("/heartbeat", (req, res) => {
    const { token, data } = req.body;

    try {
        jwt.verify(token, getToken(TOKEN_KEYS, data.SUB));
    } catch (error) {
        res.status(401).send("Invalid token");
        return;
    }

    const ServerId = `${data.SUB}:${data.PORT}`;

    if (!servers.has(ServerId)) {
        res.status(404).send("ServerId not found");
        return;
    }

    const server = servers.get(ServerId);

    servers.set(ServerId, {
        ...server,
        count: data.count,
        LTUpdate: performance.now(),
    });

    res.status(204).end();
});

app.get("/connect", (req, res) => {
    const { SUB, ServerID } = balancer(prioritys, servers);

    if (ServerID === -1) {
        res.status(503).send("All servers full");
        return;
    }

    const token = jwt.sign({}, getToken(TOKEN_KEYS, SUB), { expiresIn: "1m" });

    const data = servers.get(ServerID);

    servers.set(ServerID, {
        ...data,
        count: data.count + 1
    });

    res.status(200).json({ token, SUB, PORT: data.PORT });
});

app.listen(PORT, () => Log(`listening port: ${PORT}`, "LoadBalancer"));