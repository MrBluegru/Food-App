const initialState = {
  allrecipes: [],
  recipes: [],
  diets: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_RECIPES":
      return {
        ...state,
        recipes: action.payload,
        allrecipes: action.payload,
      };
    case "GET_RECIPES_BY_NAME":
      return {
        ...state,
        recipes: action.payload,
      };
    default:
      return state;
  }
}
