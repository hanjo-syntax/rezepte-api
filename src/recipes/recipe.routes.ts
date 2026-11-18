// Recipes Routes
import { Router } from "express";
import { getRecipesHandler, getRecipeHandler, createRecipeHandler, deleteRecipeHandler, updateRecipeHandler } from "./recipe.controller";

const router = Router();
router.get("/", getRecipesHandler);
router.get("/:id", getRecipeHandler);
router.post("/", createRecipeHandler);
router.delete("/:id", deleteRecipeHandler);
router.put("/:id", updateRecipeHandler);

export default router;