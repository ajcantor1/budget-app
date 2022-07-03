import { createRoot } from "react-dom/client";
import React from 'react'
import App from './app'
import {Provider} from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './redux/store'
import { BrowserRouter as Router } from "react-router-dom";
const rootElement = document.getElementById("app");
const root = createRoot(rootElement);

root.render(
    <>
        <Provider store={store}>
         
                <Router>
                    <App/>
                </Router>

        </Provider>
    </>
);