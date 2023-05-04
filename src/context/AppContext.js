import * as React from "react";

const AppContext = React.createContext();

export default AppContext;

export const Provider = ({ children }) => {
  const [numOfElevators, setNumOfElevators] = React.useState(5);
  const [numOfFloors, setNumOfFloors] = React.useState(10);

  const contextData = {
    numOfElevators: numOfElevators,
    setNumOfElevators: setNumOfElevators,
    numOfFloors: numOfFloors,
    setNumOfFloors: setNumOfFloors,
  };

  return (
    <AppContext.Provider value={contextData}>{children}</AppContext.Provider>
  );
};
