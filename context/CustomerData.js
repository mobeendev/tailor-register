import React, { useReducer } from "react";
import CustomerReducer from "../reducer/CustomersReducer";

const initialState = {
  customers: null,
};

export const CustomerDataContext = React.createContext();

export const CustomerDataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CustomerReducer, initialState);

  function initCustomersList(customers) {
    // console.log("passed data", customers);

    dispatch({
      type: "SET_CUSTOMER",
      payload: customers,
    });
  }

  function updateCustomersList() {
    console.log("updating...");

    dispatch({
      type: "EDIT_CUSTOMER",
    });
  }

  return (
    <CustomerDataContext.Provider
      value={{
        customers: state.customers,
        initCustomersList,
        updateCustomersList,
      }}
    >
      {children}
    </CustomerDataContext.Provider>
  );
};

export default CustomerDataProvider;
