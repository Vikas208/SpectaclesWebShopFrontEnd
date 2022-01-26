import { createContext, useReducer, useContext } from "react";

const DataLayerContext = createContext();

export const DataLayer = ({ initialvalue, reducer, children }) => {
  return (
    <DataLayerContext.Provider value={useReducer(reducer, initialvalue)}>
      {children}
    </DataLayerContext.Provider>
  );
};
export const useDataLayerValue = () => useContext(DataLayerContext);
