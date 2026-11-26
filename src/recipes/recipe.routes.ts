// Recipes Routes
import { Router } from "express";
import {
  addIngredientToRecipeHandler,
  createRecipeHandler,
  deleteRecipeHandler,
  getRecipeHandler,
  getRecipesHandler,
  updateRecipeHandler,
} from "./recipe.controller.ts";
import { requireApiKey } from "../auth/auth.middleware.ts";

const router = Router();
router.get("/", getRecipesHandler);
router.get("/:id", getRecipeHandler);
router.post("/", requireApiKey, createRecipeHandler);
router.post("/:id/zutaten", requireApiKey, addIngredientToRecipeHandler);
router.delete("/:id", requireApiKey, deleteRecipeHandler);
router.put("/:id", requireApiKey, updateRecipeHandler);

export default router;
