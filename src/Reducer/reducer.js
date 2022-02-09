import { actions } from "./action";

const reducer = (state, action) => {
  console.log(state);
  console.log(action);
  switch (action.type) {
    case actions.SET_TOKEN:
      return {
        ...state,
        token: action.token,
      };
    case actions.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case actions.SET_SHOPDETAILS:
      return {
        ...state,
        shopDetails: action.shopDetails,
      };
    case actions.LOGOUT:
      return {
        ...state,
        token: null,
        user: null,
      };
    case actions.DATA:
      return {
        ...state,
        categories: action.payload.categories,
        frameStyles: action.payload.frameStyles,
        companyNames: action.payload.companyNames,
      };
    default:
      return { ...state };
  }
};

export default reducer;
