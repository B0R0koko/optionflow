import React from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import HomePage from "@pages/HomePage"
import OnBoardPage from "@pages/OnBoardPage"

// reset margins and paddings with reset css
import BaseCSS from "@styles/index"


function App() {
    return <div>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<OnBoardPage />}></Route>
                <Route path="/home" element={<HomePage />}></Route>
            </Routes>
        </BrowserRouter>
    </div>
}

const root = createRoot(
    document.getElementById("root")
);

root.render(<App />);


