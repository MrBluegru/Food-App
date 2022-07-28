const initialState = {
  allrecipes: [],
  recipes: [],
  diets: [],
  recipesDetails: {},
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
    case "RECIPES_DETAILS":
      return {
        ...state,
        recipesDetails: action.payload,
      };
    case "ORDER_BY_NAME":
      const orderByName =
        action.payload === "asc"
          ? [...state.recipes].sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : [...state.recipes].sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });

      return {
        ...state,
        recipes: orderByName,
      };
    case "ORDER_BY_HEALTH_SCORE":
      const orderByHS =
        action.payload === "healthSAsc"
          ? [...state.recipes].sort(function (a, b) {
              if (a.healthScore > b.healthScore) {
                return 1;
              }
              if (b.healthScore > a.healthScore) {
                return -1;
              }
              return 0;
            })
          : [...state.recipes].sort(function (a, b) {
              if (a.healthScore > b.healthScore) {
                return -1;
              }
              if (b.healthScore > a.healthScore) {
                return 1;
              }
              return 0;
            });

      return {
        ...state,
        recipes: orderByHS,
      };
    case "GET_DIETS":
      return {
        ...state,
        diets: action.payload,
      };
    case "CREATE_RECIPE":
      return {
        ...state,
      };
    case "CLEAR_DETAILS":
      return {
        ...state,
        recipesDetails: {},
      };

    case "FILTER_DIET":
      const filtered =
        action.payload === "all"
          ? state.allrecipes
          : state.allrecipes.filter(
              (recipe) => recipe.diets && recipe.diets.includes(action.payload)
            );

      return {
        ...state,
        recipes: filtered,
      };

    default:
      return state;
  }
}
