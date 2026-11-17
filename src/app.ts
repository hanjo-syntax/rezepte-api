import express from "express";
import { getRecipeHandler } from "./recipes/recipe.controller";
import recipeRoutes from "./recipes/recipe.routes";

const app = express();
app.use(express.json());

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