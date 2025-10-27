import { join } from "path";
import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname } from "path";
import Log from "../shared/Log.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.argv[2] || 3001;

app.use(cors());

app.use(express.static(join(__dirname, "./build")));

Log("build served\n");

app.get("/", (req, res) => {
    Log("GET /");
    res.sendFile(join(__dirname, "./build", "index.html"));
});

app.listen(PORT, () => Log(`Listening web server on port: ${PORT}`));