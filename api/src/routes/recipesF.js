const { allRecipes } = require("../data/allData");
const { Recipe, Diet } = require("../db.js");

const recipeName_All = async (req, res) => {
  const { name } = req.query;
  const recipes = await allRecipes();
  try {
    if (name) {
      const filtered = await recipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(name.toLowerCase())
      );
      filtered.length !== 0
        ? res.send(filtered)
        : res.send("No se encontraron recetas");
    } else {
      res.send(recipes);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const recipeID = async (req, res) => {
  try {
    const { id } = req.params;
    const recipes = await allRecipes();
    const filtered = recipes.find(
      (recipe) => recipe.id === parseInt(id) || recipe.id === id
    );
    res.send(filtered);
  } catch (error) {
    res.status(500).send("Error al obtener la receta");
  }
};

const recipeCreate = async (req, res) => {
  try {
    const { name, image, summary, healthScore, StepByStep, dishTypes, diets } =
      req.body;
    const RecipeCreated = await Recipe.create({
      name,
      image,
      summary,
      healthScore,
      StepByStep,
      dishTypes,
      diets,
    });
    let dietsDB = await Diet.findAll({
      where: {
        name: diets,
      },
    });
    RecipeCreated.addDiet(dietsDB);
    res.send(RecipeCreated);
  } catch (error) {
    res.json(error);
  }
};


module.exports = { recipeName_All, recipeID, recipeCreate };
