console.log("INDEX.JS LOADED -", new Date().toISOString());

import "dotenv/config";
import express from "express";
import cors from "cors";
import { listRouter } from "./routes/list.js";

console.log("INDEX.JS LOADED -", new Date().toISOString());

const app = express();
const PORT = Number(process.env.PORT || 3001);

app.use(express.json());
app.use(cors({ origin: process.env.CORS_ORIGIN || "*"}));

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

app.use("/list", listRouter);

app.listen(PORT, () => console.log(`Backend server running on port ${PORT}`));
