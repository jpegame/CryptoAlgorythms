import express from "express";
import { createServer } from "http";
import path from "path";
import swaggerUi from "swagger-ui-express";
import cipherRoutes from "./routes/cipherRoutes";
import { swaggerSpec } from "./swagger";

const app = express();
const httpServer = createServer(app);

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin === "http://localhost:5173" || origin === "http://127.0.0.1:5173") {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

app.use(express.json());

app.use(express.static(path.resolve(__dirname, "../../frontend")));
app.get("/", (_req, res) => res.redirect("/sistema_de_criptografia.html"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api", cipherRoutes);

httpServer.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
  console.log("Swagger UI available at http://localhost:3000/api-docs");
});
