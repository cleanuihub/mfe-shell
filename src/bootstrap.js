import React from "react";
import {createRoot} from "react-dom/client";
import { StoreProvider } from 'Shell/store'

import Main from "./App.jsx";

const App = () => {
    return (
        <StoreProvider>
            <Main />
        </StoreProvider>
    )
}

const container = document.getElementById("root");
const root = createRoot(container);


root.render(<App />, );
