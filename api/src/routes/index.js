const { Router } = require("express");
const router = Router();
// Importar todos los routers;
const routeRecipes = require("./routeRecipes");
const routeDiets = require("./routeDiets");


router.use("/diets", routeDiets);
router.use("/recipes", routeRecipes);

module.exports = router;
