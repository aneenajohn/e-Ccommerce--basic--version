import { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { CartProvider } from "./cartContext";
import { ThemeProvider } from "./themeContext";
import { LocalisationProvider } from "./localisationContext";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <ThemeProvider>
      <LocalisationProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </LocalisationProvider>
    </ThemeProvider>
  </StrictMode>,
  rootElement
);
