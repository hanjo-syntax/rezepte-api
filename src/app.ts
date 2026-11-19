import express from "express";
import { getRecipeHandler } from "./recipes/recipe.controller.ts";
import recipeRoutes from "./recipes/recipe.routes.ts";
import { logger } from "./logger/logger.middelware.ts";
import { errorHandler } from "./error/error.middleware.ts";

const app = express();

app.use(express.json());

app.use(logger); 
app.get("/", (_, res) => {
  res.send("Willkommen bei der Rezepte-API 👋");
});

// Health-Check: läuft der Server?
app.get("/health", (_, res) => {
  res.json({ status: "ok" });
});

app.use("/recipes", recipeRoutes);
app.get("/recipe/:id", getRecipeHandler);
app.use((req, res, next) => {
  res.status(404).json({
    fehler: `Route ${req.method} ${req.originalUrl} existiert nicht`,
  });
});
app.use(errorHandler);

export default app;