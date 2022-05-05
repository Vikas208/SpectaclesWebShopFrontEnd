import { actions } from "./action";

const reducer = (state, action) => {
  //console.log(state);
  //console.log(action);
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
    case actions.SETCART:
      return {
        ...state,
        NumberOfCartProducts: action.NumberOfCartProducts,
      };
    case actions.GLASSTYPE:
      return {
        ...state,
        glassTypeDetails: action.glassTypeDetails,
      };
    case actions.TAXDETAILS:
      return {
        ...state,
        taxDetails: action.taxDetails,
      };
    case actions.RELOADCARTPRICING:
      return {
        ...state,
        reloadCartPricing: action.reloadCartPricing,
      };
    case actions.SETORDERADDRESS:
      return {
        ...state,
        orderDetails: {
          ...state.orderDetails,
          orderAddress: action.orderAddress,
        },
      };
    case actions.SETORDERPAYMENT:
      return {
        ...state,
        orderDetails: {
          ...state.orderDetails,
          orderPayment: action.orderPayment,
        },
      };
    case actions.SETORDERPRODUCTS:
      return {
        ...state,
        orderDetails: {
          ...state.orderDetails,
          orderProducts: action.orderProducts,
        },
      };
    case actions.ISCARTORDER:
      return {
        ...state,
        isCardOrder: action.isCardOrder,
      };
    case actions.SETSHOPNOWPRODUCT:
      return {
        ...state,
        shopNowProduct: action.shopNowProduct,
      };
    case actions.SETSHOWORDERDIALOG:
      return {
        ...state,
        showOrderProductDialog: action.showOrderProductDialog,
      };
    default:
      return { ...state };
  }
};

export default reducer;
