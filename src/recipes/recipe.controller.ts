// Recipe Controller
import { Request, Response, NextFunction } from "express";
import { getAllRecipes, getRecipeById } from "./recipe.service";

export async function getRecipesHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const category = typeof req.query.category === "string" ? req.query.category : undefined;
    const difficulty = typeof req.query.difficulty === "string" ? req.query.difficulty : undefined;
    const maxTimeValue = typeof req.query.max_time === "string" ? Number(req.query.max_time) : undefined;
    const maxTime = maxTimeValue !== undefined && Number.isFinite(maxTimeValue) ? maxTimeValue : undefined;

    const rezepte = await getAllRecipes(category, difficulty, maxTime);
    res.json(rezepte);
  } catch (err) {
    next(err);
  }
}

export async function getRecipeHandler(req: Request, res: Response, next: NextFunction) {
  if (isNaN(Number(req.params.id))) {
    res.status(400).json({ error: "Ungültige Rezept-ID" });
    return;
  }
  const id = Number(req.params.id);
  try {
    const recipe = await getRecipeById(id);
    if (!recipe) {
      res.status(404).json({ error: "Rezept nicht gefunden" });
      return;
    }
    res.json(recipe);
  } catch (err) {
    next(err);
  }
}