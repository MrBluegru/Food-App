const getRecipesApi = require("../data/recipes");

const recipes = async (req, res) => {
    const recipes = await getRecipesApi();
    res.json(recipes);

    
}


module.exports = recipes;
