export default (state, action) => {
  switch (action.type) {
    case "REMOVE_CUSTOMER":

    case "ADD_CUSTOMER":

    case "EDIT_CUSTOMER":
      return {
        ...state,
      };
    case "SET_CUSTOMER":
      // console.log("updating state with...", action.payload);

      if (action.payload) {
        return {
          ...state,
          customers: action.payload,
        };
      } else {
        return {
          ...state,
          customers: null,
        };
      }

    default:
      return state;
  }
};
