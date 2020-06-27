import React, { useReducer } from "react";
import AppReducer from "../AppReducer";

const initialState = {
  customers: [
    {
      id: 9999,
      firstname: "Abdul",
      lastname: "Mobeen",
      chest: 77,
      collar_size: 34,
      collar_type: 1,
      arm: 7,
      arm_hole: 34,
      contact: 97987987,
      shirt_style: 34,
      shoulder: 88,
      trouser_length: 7,
      waist: 88,
    },
  ],
};

export const CustomerDataContext = React.createContext(initialState);

export const CustomerDataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  return (
    <CustomerDataContext.Provider value={initialState}>
      {children}
    </CustomerDataContext.Provider>
  );
};

export default CustomerDataProvider;
