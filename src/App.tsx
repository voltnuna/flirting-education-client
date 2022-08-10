import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import loadable from "@loadable/component";

const LogIn = loadable(() => import("@pages/Login"));
const SignUp = loadable(() => import("@pages/Signup"));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogIn />}>
          <Route index element={<SignUp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
