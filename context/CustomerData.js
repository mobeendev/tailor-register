import React, { useReducer } from "react";
import CustomerReducer from "../reducer/CustomersReducer";

const initialState = {
  customers: null,
};

export const CustomerDataContext = React.createContext(444);

export const CustomerDataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CustomerReducer, initialState);

  function initCustomersList(customers) {
    console.log("passed data", customers);

    dispatch({
      type: "SET_CUSTOMER",
      payload: customers,
    });
  }

  return (
    <CustomerDataContext.Provider
      value={{ customers: state.customers, initCustomersList }}
    >
      {children}
    </CustomerDataContext.Provider>
  );
};

export default CustomerDataProvider;
