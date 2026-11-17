// Recipe Controller
import { Request, Response, NextFunction } from "express";
import { getAllRecipes, getRecipeById } from "./recipe.service";

export async function getRecipesHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const rezepte = await getAllRecipes();
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