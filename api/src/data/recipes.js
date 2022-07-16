require("dotenv").config();
const axios = require("axios");
const { Diet } = require("../db.js");
const APIKEY = process.env.APIKEY;
const link = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${APIKEY}&number=100&addRecipeInformation=true`;
const allDiets = [
  { id: "1", name: `Gluten Free` },
  { id: "2", name: `Ketogenic` },
  { id: "3", name: `Vegetarian` },
  { id: "4", name: `Lacto-Vegetarian` },
  { id: "5", name: `Ovo-Vegetarian` },
  { id: "6", name: `Vegan` },
  { id: "7", name: `Pescetarian` },
  { id: "8", name: `Paleo` },
  { id: "9", name: `Primal` },
  { id: "10", name: `Low FODMAP` },
  { id: "11", name: `Whole30` },
];

const getRecipesApi = async () => {
  const mapeable = await axios.get(link);
  const recipes = mapeable.data.results.map((recipe) => {
    return {
      id: recipe.id,
      name: recipe.title,
      image: recipe.image,
      summary: recipe.summary,
      healthScore: recipe.healthScore,
      diets: recipe.diets,
      dishTypes: recipe.dishTypes,
      StepByStep: recipe.analyzedInstructions.map((e) => {
        return {
          steps: e.steps
            .map((e) => {
              return {
                number: e.number,
                step: e.step,
              };
            })
            .flat(),
        };
      }),
    };
  });
  return recipes;
};

const createDietDB = async () => {
  const diets = allDiets;
  await Diet.bulkCreate(diets);
  console.log(`Se guardaron las Dietas`);
};
createDietDB();

module.exports = { getRecipesApi };
