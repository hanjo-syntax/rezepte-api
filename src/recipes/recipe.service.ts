import {
  createRecipe as createRecipeInDatabase,
  deleteRecipe as deleteRecipeInDatabase,
  getAllRecipes as getAllRecipesFromDatabase,
  getRecipeById as getRecipeByIdFromDatabase,
  updateRecipe as updateRecipeInDatabase,
} from "./recipe.repo.ts";
import type {
  CreateRecipeInput,
  RecipeDetails,
  RecipeFilters,
  RecipeIngredient,
  RecipeRow,
  UpdateRecipeInput,
} from "./recipe.repo.ts";
import { RecipeNotFoundError, ValidationError } from "./recipes.errors.ts";

export type Recipe = RecipeRow;
export type RecipeWithIngredients = RecipeDetails;
export type Ingredient = RecipeIngredient;

export async function getAllRecipes(
  category?: string,
  difficulty?: string,
  maxTime?: number,
): Promise<Recipe[]> {
  const filters: RecipeFilters = { category, difficulty, maxTime };
  return getAllRecipesFromDatabase(filters);
}

export async function getRecipeById(id: number): Promise<RecipeWithIngredients> {
  const recipe = await getRecipeByIdFromDatabase(id);

  if (!recipe) {
    throw new RecipeNotFoundError(id);
  }

  return recipe;
}

export async function createRecipe(data: CreateRecipeInput): Promise<Recipe> {
  validateTitle(data.title);
  return createRecipeInDatabase(data);
}

export async function deleteRecipe(id: number): Promise<boolean> {
  return deleteRecipeInDatabase(id);
}

export async function updateRecipe(id: number, data: UpdateRecipeInput): Promise<Recipe | null> {
  if (data.title !== undefined) {
    validateTitle(data.title);
  }

  return updateRecipeInDatabase(id, data);
}

function validateTitle(title: string): void {
  if (title.trim().length === 0) {
    throw new ValidationError("Ein Rezept braucht einen Titel");
  }
}
