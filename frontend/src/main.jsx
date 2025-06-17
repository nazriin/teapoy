import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Router from './Router.jsx'
import '../src/index.css'
import {Provider} from "react-redux";
import {store} from "./store/store.js";
import {ToastContainer} from "react-toastify";

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Provider store={store}>
          <Router />
          <ToastContainer position="top-right" autoClose={3000} />
      </Provider>
  </StrictMode>,
)
