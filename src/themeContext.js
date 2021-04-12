import { createContext, useState, useContext } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // let bgColor, fontColor, productBg;
  let colors;
  const [isLightTheme, setLightTheme] = useState(true);
  const toggle = () => {
    setLightTheme(!isLightTheme);
  };
  if (isLightTheme) {
    colors = {
      bgColor: "inherit",
      fontColor: "inherit",
      productBg: "#D1D5DB"
    };
  } else {
    colors = {
      bgColor: "#374151",
      fontColor: "white",
      productBg: "#6B7280"
    };
  }
  return (
    <ThemeContext.Provider value={{ isLightTheme, toggle, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
