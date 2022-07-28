require("dotenv").config();
const axios = require("axios");
const { Recipe, Diet } = require("../db.js");
const apikey = process.env.APIKEY19;
const LINK = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apikey}&number=100&addRecipeInformation=true`;

const getRecipesApi = async () => {
  const mapeable = await axios.get(LINK);
  const recipes = mapeable.data.results.map((recipe) => {
    return {
      id: recipe.id,
      name: recipe.title,
      image: recipe.image,
      summary: recipe.summary,
      healthScore: recipe.healthScore,
      diets:
        recipe.diets.length === 0 ? (recipe.diets = [`None`]) : recipe.diets,
      dishTypes: recipe.dishTypes,
      StepByStep:
        recipe.analyzedInstructions.length === 0
          ? (recipe.StepByStep = [`No steps available`])
          : recipe.analyzedInstructions
              .map((e) => {
                return e.steps.map((e) => {
                  return `*${e.step}*`;
                });
              })
              .flat(),
    };
  });
  const infoFinal = recipes.map((recipe) => {
    return {
      id: recipe.id,
      name: recipe.name,
      image: recipe.image,
      summary: recipe.summary,
      healthScore: recipe.healthScore,
      diets: recipe.diets,
      dishTypes: recipe.dishTypes,
      StepByStep: recipe.StepByStep.map((e) => {
        return e.split("*").filter((e) => e !== "");
      }),
    };
  });

  return infoFinal;
};

const getDiets = async () => {
  const recipes = await getRecipesApi();
  const diets = recipes.map((recipe) => recipe.diets);
  const dietsUnique = diets.flat().filter((e, i, a) => a.indexOf(e) === i);
  await Diet.bulkCreate(
    dietsUnique.map((e) => {
      return {
        name: e,
      };
    })
  );
};
getDiets();
console.log("Dietas obtenidas y guardadas");

const getRecipesDB = async () => {
  const recipesDB = await Recipe.findAll({
    include: [{ model: Diet, through: { attributes: [] } }],
  });
  const recipes = recipesDB.map((recipe) => {
    return {
      id: recipe.id,
      name: recipe.name,
      image: recipe.image,
      summary: recipe.summary,
      healthScore: recipe.healthScore,
      diets: recipe.diets.map((e) => e.name),
      dishTypes: recipe.dishTypes,
      StepByStep: recipe.StepByStep,
    };
  });
  return recipes;
};

const allRecipes = async () => {
  const recipesDB = await getRecipesDB();
  const recipesApi = await getRecipesApi();
  const recipes = recipesDB.concat(recipesApi);
  return recipes;
};

module.exports = { allRecipes };
