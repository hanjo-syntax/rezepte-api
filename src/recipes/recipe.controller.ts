// Recipe Controller
import { Request, Response, NextFunction } from "express";
import { getAllRecipes, getRecipeById, createRecipe, deleteRecipe, updateRecipe } from "./recipe.service";

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
    res.json(recipe);
  } catch (err) {
    next(err);
  }
}

export async function createRecipeHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const newRecipe = await createRecipe(req.body);
    res.status(201).json(newRecipe);
  } catch (err) {
    next(err);
  }
}

export async function deleteRecipeHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const deleted = await deleteRecipe(id);
    if (!deleted) {
      res.status(404).json({ error: "Rezept nicht gefunden" });
      return;
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

export async function updateRecipeHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const updatedRecipe = await updateRecipe(id, req.body);
    if (!updatedRecipe) {
      res.status(404).json({ error: "Rezept nicht gefunden" });
      return;
    }
    res.json(updatedRecipe);
  } catch (err) {
    next(err);
  }
}