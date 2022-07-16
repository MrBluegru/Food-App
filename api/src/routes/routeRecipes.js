const { Router } = require("express");
const router = Router();
const { getRecipesApi} = require("../data/recipes");

// router.get("/", async (req, res) => {
//   const recipes = await getRecipesApi();
//   // const filtered = await recipes.filter((recipe) => {
//   //   return recipe.name.toLowerCase().includes(name.toLowerCase());
//   // });
//   res.send(recipes);
// });

// const recipesID = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const recipes = await filterById(id);
//     res.json(recipes);
//     console.log(recipes);
//   } catch (error) {
//     console.log(error);
//   }
// }

// module.exports = router;
// module.exports = recipesID;
