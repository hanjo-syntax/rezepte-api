import { getPostgresPool } from "../pool.postgres.ts";

export type RecipeRow = {
  id: number;
  title: string;
  description: string | null;
  category: string;
  time_in_minutes: number;
  portions: number;
  difficulty: string;
};

export type RecipeIngredient = {
  name: string;
  quantity: string | null;
  unit: string | null;
};

export type RecipeDetails = RecipeRow & {
  ingredients: RecipeIngredient[];
};

export type RecipeFilters = {
  category?: string;
  difficulty?: string;
  maxTime?: number;
};

const pool = getPostgresPool();

export async function getAllRecipes(filters: RecipeFilters = {}): Promise<RecipeRow[]> {
  const conditions: string[] = [];
  const values: Array<string | number> = [];

  if (filters.category) {
    values.push(filters.category);
    conditions.push(`LOWER(category) = LOWER($${values.length})`);
  }

  if (filters.difficulty) {
    values.push(filters.difficulty);
    conditions.push(`LOWER(difficulty) = LOWER($${values.length})`);
  }

  if (filters.maxTime !== undefined) {
    values.push(filters.maxTime);
    conditions.push(`time_in_minutes <= $${values.length}`);
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";
  const result = await pool.query<RecipeRow>(
    `SELECT id, title, description, category, time_in_minutes, portions, difficulty
     FROM recipes
     ${whereClause}
     ORDER BY id`,
    values,
  );

  return result.rows;
}

export async function getRecipeById(id: number): Promise<RecipeDetails | null> {
  const recipeResult = await pool.query<RecipeRow>(
    `SELECT id, title, description, category, time_in_minutes, portions, difficulty
     FROM recipes
     WHERE id = $1`,
    [id],
  );
  const recipe = recipeResult.rows[0];

  if (!recipe) {
    return null;
  }

  const ingredientsResult = await pool.query<RecipeIngredient>(
    `SELECT ingredients.name, recipe_ingredients.quantity, recipe_ingredients.unit
     FROM recipe_ingredients
     JOIN ingredients ON ingredients.id = recipe_ingredients.ingredient_id
     WHERE recipe_ingredients.recipe_id = $1
     ORDER BY recipe_ingredients.position`,
    [id],
  );

  return { ...recipe, ingredients: ingredientsResult.rows };
}
