// Recipes Routes
import { Router } from "express";
import { getRecipesHandler, getRecipeHandler } from "./recipe.controller";

const router = Router();
router.get("/", getRecipesHandler);
// Route GET "/:id" auf getRecipeHandler registrieren
router.get("/:id", getRecipeHandler);

export default router;