import { useCart } from "./cartContext";
import { useRef, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
// import { ThemeContext } from "./themeContext";
import { useTheme } from "./themeContext";
import { useLocalisation } from "./localisationContext";
import { lang } from "./langContent";
import "./styles.css";

export function ProductListing() {
  const products = [
    {
      id: uuidv4(),
      name: "coolers",
      price: 5000
    },
    {
      id: uuidv4(),
      name: "pizza",
      price: 300
    },
    {
      id: uuidv4(),
      name: "momos",
      price: 100
    },
    {
      id: uuidv4(),
      name: "Earpods",
      price: 8000
    }
  ];
  const { setItemsInCart } = useCart();
  const {
    colors: { productBg }
  } = useTheme();
  const { language } = useLocalisation();
  return (
    <div>
      <h1 className="heading">{lang[language].productHeader}</h1>
      {products.map((item) => (
        <div
          className="row"
          key={item.id}
          style={{
            border: "1px solid black",
            margin: "1rem",
            padding: "1rem",
            background: `${productBg}`
          }}
        >
          <div className="col--1">
            <h2 className="heading--sub">{item.name}</h2>
            <p className="para">Rs.{item.price}</p>
          </div>
          <div className="col--2">
            <button
              className="btn btn--primary"
              onClick={() => setItemsInCart((items) => [...items, item])}
            >
              {lang[language].addToCart}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export function CartHeader() {
  // Without destucturing
  // const value = useContext(CartContext);
  // return <h1> Items in cart {value.cartItems}</h1>;
  const { itemsInCart } = useCart();
  const { language } = useLocalisation();
  console.log({ itemsInCart });
  return (
    <h1 className="heading">
      {lang[language].cartHeader} : {itemsInCart.length}
    </h1>
  );
}

export function Cart() {
  const { itemsInCart } = useCart();
  const { language } = useLocalisation();
  return (
    <div
      style={{
        height: "100vh"
      }}
    >
      <h1 className="heading">{lang[language].cartTitle}</h1>
      {itemsInCart.map((item) => (
        <ul key={item.id}>{<ShowItems item={item} />}</ul>
      ))}
      <h1>
        {lang[language].total}:{" "}
        {itemsInCart.reduce((acc, item) => {
          return acc + item.price;
        }, 0)}
      </h1>
    </div>
  );
}

function ShowItems({ item }) {
  const {
    colors: { productBg }
  } = useTheme();
  return (
    <div
      className="row"
      key={item.id}
      style={{
        border: "1px solid black",
        margin: "1rem",
        padding: "1rem",
        background: `${productBg}`
      }}
    >
      <h2 className="heading--sub">{item.name}</h2>
      <p className="para">Rs.{item.price}</p>
    </div>
  );
}

export function CheckOut() {
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleSubmit = () => {
    const cardDetails = inputRef.current.value;
    console.log({ cardDetails });
  };

  const { language } = useLocalisation();
  return (
    <div
      style={{
        height: "100vh"
      }}
    >
      <h1 className="heading">{lang[language].checkoutHeader}</h1>
      <div class="form">
        <input
          ref={inputRef}
          class="form__input"
          type="text"
          required
          style={{ display: "inline" }}
        />
        <label class="form__label">Credit Card Number</label>
        <button onClick={handleSubmit} className="btn btn--primary">
          Submit
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [route, setRoute] = useState("products");
  const {
    isLightTheme,
    toggle,
    colors: { bgColor, fontColor }
  } = useTheme();
  console.log({ isLightTheme });
  console.log(bgColor, fontColor);
  // console.log({bgColor});
  // console.log(colors.bgColor);
  // console.log({bgColor});
  // const handleTheme = ({theme}) => {
  //   settheme((!theme) => )
  // }
  const { language, setLanguage } = useLocalisation();
  // console.log({content});

  console.log(lang[language]);
  return (
    <div
      style={{
        height: "100%",
        backgroundColor: `${bgColor}`,
        color: `${fontColor}`
      }}
    >
      <div className="App">
        <button
          className="btn btn--secondary theme"
          onClick={() => setLanguage(language === "en" ? "ta" : "en")}
        >
          {language === "en" ? "தமிழ்" : "English"}
        </button>
        <h1 className="app-header heading fs-h1">{lang[language].appHeader}</h1>
        <button className="btn btn--secondary theme" onClick={toggle}>
          {isLightTheme ? "Light" : "Dark"}
        </button>
        <button
          className="btn btn--primary"
          onClick={() => setRoute("products")}
        >
          {lang[language].productHeader}
        </button>
        <button className="btn btn--primary" onClick={() => setRoute("cart")}>
          {" "}
          {lang[language].cartTitle}
        </button>
        <button
          className="btn btn--primary"
          onClick={() => setRoute("checkOut")}
        >
          {lang[language].checkoutHeader}
        </button>
        <div className="app-body">
          <CartHeader />
          {route === "cart" && <Cart />}
          {route === "products" && <ProductListing />}
          {route === "checkOut" && <CheckOut />}
        </div>
      </div>
    </div>
  );
}
