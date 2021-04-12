import { createContext, useContext, useState } from "react";

export const LocalisationContext = createContext();

export const LocalisationProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");
  return (
    <LocalisationContext.Provider value={{ language, setLanguage }}>
      {children}
    </LocalisationContext.Provider>
  );
};

export const useLocalisation = () => {
  return useContext(LocalisationContext);
};
