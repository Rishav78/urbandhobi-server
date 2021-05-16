import React from "react";
import "./App.css";
import { Routes } from "./routes";
import "@urbandhobi/lib/constants/styles/index.css";
import { Provider } from "react-redux";
import { store } from "@urbandhobi/redux/store";

function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}

export default App;
