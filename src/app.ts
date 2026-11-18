import express from "express";
import { getRecipeHandler } from "./recipes/recipe.controller";
import recipeRoutes from "./recipes/recipe.routes";
import { logger } from "./logger/logger.middelware";

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

export default app;