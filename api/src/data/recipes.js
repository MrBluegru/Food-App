require("dotenv").config();
const axios = require("axios");
const APIKEY = process.env.APIKEY;
const link = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${APIKEY}&number=100&addRecipeInformation=true`

const getRecipesApi = async () => {
  const mapeable = await axios.get(link);
  const recipes = mapeable.data.results.map((recipe) => {
    return {
      id: recipe.id,
      title: recipe.title,
      image: recipe.image,
      summary: recipe.summary,
      healthScore: recipe.healthScore,
      diets: recipe.diets,
      dishTypes: recipe.dishTypes,
      StepByStep: recipe.analyzedInstructions.map((e) => {
        return {
          steps: e.steps.map((e) => {
            return {
              number: e.number,
              step: e.step,
            };
          }).flat(),
        };
      }),
    };
  });

  return recipes;
};

module.exports = getRecipesApi;
