// Recipe Service
import { RecipeNotFoundError, ValidationError } from "./recipes.errors.ts";

// Datentyp für Rezepte definieren
export type Recipe = {
  id: number;
  title: string;
  description: string;
  category: string;
  time_in_minutes: number;
  portions: number;
  difficulty: string;
  ingredients: string[];
  instructions: string[];
};

// Daten der Rezepte
let recipes: Recipe[] = [
  { id: 1, title: "Spaghetti Carbonara", description: "Leckeres italienisches Nudelgericht", category: "Hauptgericht", time_in_minutes: 20, portions: 2, difficulty: "mittel", ingredients: ["Spaghetti", "Eier", "Speck", "Parmesan", "Pfeffer"], instructions: ["Spaghetti kochen", "Speck anbraten", "Eier und Parmesan verquirlen", "Alles zusammenmischen"] },
  { id: 2, title: "Schokoladenkuchen", description: "Saftiger Schokoladenkuchen", category: "Dessert", time_in_minutes: 45, portions: 8, difficulty: "einfach", ingredients: ["Mehl", "Zucker", "Kakaopulver", "Eier", "Butter"], instructions: ["Ofen vorheizen", "Teig zubereiten", "In Form füllen", "Backen"] },
  { id: 3, title: "Caesar Salad", description: "Frischer Salat mit Caesar-Dressing", category: "Vorspeise", time_in_minutes: 15, portions: 2, difficulty: "einfach", ingredients: ["Römersalat", "Hähnchenbrust", "Croutons", "Parmesan", "Caesar-Dressing"], instructions: ["Salat waschen und schneiden", "Hähnchenbrust anbraten", "Alles zusammenmischen", "Mit Dressing servieren"] },
  { id: 4, title: "Tomatensuppe", description: "Wärmende Tomatensuppe", category: "Vorspeise", time_in_minutes: 30, portions: 4, difficulty: "einfach", ingredients: ["Tomaten", "Zwiebeln", "Knoblauch", "Gemüsebrühe", "Sahne"], instructions: ["Zwiebeln und Knoblauch anbraten", "Tomaten hinzufügen und köcheln lassen", "Mit Brühe aufgießen", "Pürieren und mit Sahne verfeinern"] },
  { id: 5, title: "Pancakes", description: "Fluffige Pancakes zum Frühstück", category: "Frühstück", time_in_minutes: 20, portions: 4, difficulty: "einfach", ingredients:  ["Mehl", "Milch", "Eier", "Backpulver", "Zucker"], instructions: ["Teig zubereiten", "In Pfanne ausbacken", "Mit Ahornsirup servieren"] },
  { id: 6, title: "Ratatouille", description: "Französisches Gemüsegericht", category: "Hauptgericht", time_in_minutes: 60, portions: 4, difficulty: "mittel", ingredients: ["Zucchini", "Aubergine", "Paprika", "Tomaten", "Zwiebeln"], instructions: ["Gemüse schneiden", "In Pfanne anbraten", "Im Ofen schmoren lassen"] },
  { id: 7, title: "Minestrone", description: "Italienische Gemüsesuppe", category: "Vorspeise", time_in_minutes: 40, portions: 4, difficulty: "einfach", ingredients: ["Gemüsebrühe", "Zucchini", "Karotten", "Bohnen", "Nudeln"], instructions: ["Gemüse schneiden", "In Brühe kochen", "Nudeln hinzufügen und garen"] },
  { id: 8, title: "Quiche Lorraine", description: "Herzhafte Quiche mit Speck und Käse", category: "Hauptgericht", time_in_minutes: 50, portions: 6, difficulty: "mittel", ingredients: ["Mürbeteig", "Speck", "Eier", "Sahne", "Käse"], instructions: ["Teig vorbereiten", "Füllung zubereiten", "In Form füllen", "Backen"] },
  { id: 9, title: "Bananenbrot", description: "Saftiges Bananenbrot mit Walnüssen", category: "Dessert", time_in_minutes: 60, portions: 8, difficulty: "einfach", ingredients: ["Bananen", "Mehl", "Zucker", "Eier", "Walnüsse"], instructions: ["Bananen zerdrücken", "Teig zubereiten", "In Form füllen", "Backen"] },
  { id: 10, title: "Hühnercurry", description: "Würziges Hühnercurry mit Kokosmilch", category: "Hauptgericht", time_in_minutes: 45, portions: 4, difficulty: "mittel", ingredients: ["Hähnchenbrust", "Zwiebeln", "Knoblauch", "Currypaste", "Kokosmilch"], instructions: ["Hähnchen anbraten", "Zwiebeln und Knoblauch hinzufügen", "Currypaste einrühren", "Mit Kokosmilch köcheln lassen"] }
  // ...
];

// Alle Rezepte zurückgeben
// Filterbar nach Kategorie, Schwierigkeit und maximaler Zubereitungszeit
export async function getAllRecipes(category?: string, difficulty?: string, maxTime?: number): Promise<Recipe[]> {
    let filteredRecipes = recipes;

    if (category) {
        filteredRecipes = filteredRecipes.filter((r) => r.category.toLowerCase() === category.toLowerCase());
    }

    if (difficulty) {
        filteredRecipes = filteredRecipes.filter((r) => r.difficulty.toLowerCase() === difficulty.toLowerCase());
    }

    if (maxTime !== undefined) {
        filteredRecipes = filteredRecipes.filter((r) => r.time_in_minutes <= maxTime);
    }

    return filteredRecipes;
}

// Ein Rezept anhand seiner ID zurückgeben
export async function getRecipeById(id: number): Promise<Recipe> {
  const recipe = recipes.find((r) => r.id === id);
  if (!recipe) {
    throw new RecipeNotFoundError(id);
  }
  return recipe;

}

let nextId = 3;

export async function createRecipe(data: Omit<Recipe, "id">): Promise<Recipe> {
  if (typeof data.title !== "string" || data.title.trim().length === 0) {
    throw new ValidationError("Ein Rezept braucht einen Titel");
  }

  const newRecipe: Recipe = { id: nextId++, ...data };
  recipes.push(newRecipe);
  return newRecipe;
}

export async function deleteRecipe(id: number): Promise<boolean> {
    const countBefore = recipes.length;
    recipes = recipes.filter((r) => r.id !== id);
    const countAfter = recipes.length;
    return countAfter < countBefore;
}

// Usage of Partial<Omit<Recipe, "id">> to allow updating only specific fields of a recipe
// The "id" field is omitted because it should not be updated
// The function returns the updated recipe or null if the recipe with the given ID does not exist
export async function updateRecipe(id: number, data: Partial<Omit<Recipe, "id">>): Promise<Recipe | null> {
    const recipeIndex = recipes.findIndex((r) => r.id === id);
    if (recipeIndex === -1) {
        return null;
    }
    const updatedRecipe = { ...recipes[recipeIndex], ...data };
    recipes[recipeIndex] = updatedRecipe;
    return updatedRecipe;
}
