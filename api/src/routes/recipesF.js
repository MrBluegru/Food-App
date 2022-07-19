const { Op } = require("sequelize");
const { allRecipes } = require("../data/dataRecipes");
const { Recipe, Diet } = require("../db.js");

const recipeName_All = async (req, res) => {
  const { name } = req.query;
  try {
    if (req.query.name) {
      const recipes = await allRecipes();
      const filtered = await recipes.filter((recipe) => {
        return recipe.name.toLowerCase().includes(name.toLowerCase());
      });
      filtered.length === 0
        ? res.send({ message: "No se encontraron recetas" })
        : res.send(filtered);
    } else {
      const recipes = await allRecipes();
      res.send(recipes);
    }
  } catch (error) {
    res.status(500).send({ message: "Error al obtener la receta" });
  }
};

const recipeID = async (req, res) => {
  try {
    const { id } = req.params;
    const recipes = await allRecipes();
    const filtered = recipes.find((recipe) => recipe.id === parseInt(id));
    res.send(filtered);
  } catch (error) {
    res.status(500).send({ message: "Error al obtener la receta" });
  }
};

const recipeCreate = async (req, res) => {
  try {
    const { name, image, summary, healthScore, StepByStep, diet } = req.body;
    const RecipeCreated = await Recipe.create({
      name,
      image,
      summary,
      healthScore,
      StepByStep,
      diet,
    });
    let dietsDB = await Diet.findAll({
      where: {
        name: diet,
      },
    });
    RecipeCreated.addDiet(dietsDB);
    res.send(RecipeCreated);
  } catch (error) {
    res.json(error);
  }
};

module.exports = { recipeName_All, recipeID, recipeCreate };
