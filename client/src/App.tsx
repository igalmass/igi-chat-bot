import React from 'react';
import './App.css';
import MainPage from "./components/_main/MainPage";
import {Provider} from "react-redux";
import store from "./store/Store";

function App() {
  return (
      <Provider store={store}>
        <MainPage/>
      </Provider>
  );
}

export default App;
