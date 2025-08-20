import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import https from "https";
import fs from "fs";

import authRoutes from "../routes/auth.js";
import blogRoutes from "../routes/blogs.js";
import imageRoutes from "../routes/image.js";

dotenv.config();

const mongoUri = process.env.MONGO_URI;
mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch((err) => console.error("❌ Error de conexión a MongoDB:", err));

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is up");
});
app.use("/api/login", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/image", imageRoutes);

console.log(process.env.NODE_ENV);

const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV === "development") {
  const httpsOptions = {
    key: fs.readFileSync("certs/localhost-key.pem"),
    cert: fs.readFileSync("certs/localhost.pem"),
  };

  https.createServer(httpsOptions, app).listen(PORT, () => {
    console.log(`Servidor HTTPS escuchando en puerto ${PORT}`);
  });
} else {
  app.listen(PORT, () => console.log(`Servidor escuchando en puerto ${PORT}`));
}
