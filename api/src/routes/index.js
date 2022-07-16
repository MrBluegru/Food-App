const { Router } = require("express");
const router = Router();

// Importar todos los routers;

const recipes = require("./routeRecipes");
// const diets = require("./routeRecipes");
// const createRecipe = require("./postRecipe");

// Configurar los routers

router.get("/recipes", recipes);

// router.get("/diets", diets);

// router.post("/recipes", createRecipe);



module.exports = router;
