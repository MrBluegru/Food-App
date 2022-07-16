const { Router } = require("express");
const router = Router();
const { Op } = require("sequelize");
const {getRecipesApi} = require("../data/recipes");
const { Recipe, Diet } = require("../db.js");

// Importar todos los routers;

// router.get("/recipes", async (req, res) => {
//   const { name } = req.query;
//   try {
//     if (req.query.name) {
//       const recipes = await getRecipesApi();
//       const filtered = await recipes.filter((recipe) => {
//         return recipe.name.toLowerCase().includes(name.toLowerCase());
//       });
//       if (filtered.length === 0) {
//         res.send({ message: "No se encontraron recetas" });
//       }
//       res.send(filtered);
//     } else {
//       const recipes = await getRecipesApi();
//       res.send(recipes);
//     }
//   } catch (error) {
//     res.status(500).send({ message: "Error al obtener la receta" });
//   }
// });

// router.get("/recipes/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const recipes = await getRecipesApi();
//     const filtered = recipes.find((recipe) => recipe.id === parseInt(id));
//     res.send(filtered);
//   } catch (error) {
//     res.status(500).send({ message: "Error al obtener la receta" });
//   }
// });


router.get("/diets", async (req, res) => {
  try {
    const diets = await Diet.findAll({
      attributes: ["id", "name"],
    });
    const dietsDB = await diets.map((diet) => {
      return {
        id: diet.id,
        name: diet.name,
      };
    });
    console.log(dietsDB);
    res.status(200).send(dietsDB);
  } catch (error) {
    res.status(500).send({ message: "Error al obtener las dietas" });
  }
});

// router.post("/recipes", async (req, res) => {
//   try {
//     const { name, image, summary, healthScore, diet, StepByStep } = req.body;
//     const RecipeCreated = await Recipe.create({
//       name,
//       image,
//       summary,
//       healthScore,
//       StepByStep,
//     });
//     let dietsDB = await Diet.findAll({
//       where: {
//         id: { [Op.ilike]: diet },
//       },
//     });
//     RecipeCreated.addRecipes(dietsDB);
//     res.json({ msj: `Se creo la Receta` });
//   } catch (error) {
//     res.json({ msj: `No se pudo crear la Receta` });
//   }
// });

module.exports = router;
