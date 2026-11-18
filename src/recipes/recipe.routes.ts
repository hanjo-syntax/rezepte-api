// Recipes Routes
import { Router } from "express";
import { getRecipesHandler, getRecipeHandler, createRecipeHandler, deleteRecipeHandler, updateRecipeHandler } from "./recipe.controller";
import { requireApiKey } from "../auth/auth.middleware";

const router = Router();
router.get("/", getRecipesHandler);
router.get("/:id", getRecipeHandler);
router.post("/", requireApiKey, createRecipeHandler);
router.delete("/:id", requireApiKey, deleteRecipeHandler);
router.put("/:id", requireApiKey, updateRecipeHandler);

export default router;