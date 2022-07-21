import axios from "axios";

export function getRecipes() {
  return async function (dispatch) {
    const response = await axios.get(`http://localhost:3001/recipes`);
    dispatch({
      type: "GET_RECIPES",
      payload: response.data,
    });
  };
}

export function getRecipesName(name) {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `http://localhost:3001/recipes?name=${name}`
      );
      return dispatch({
        type: "GET_RECIPES_BY_NAME",
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
