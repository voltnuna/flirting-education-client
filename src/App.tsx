import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import loadable from "@loadable/component";

const LogIn = loadable(() => import("@pages/Login"));
const SignUp = loadable(() => import("@pages/Signup"));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<SignUp />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/" element={<LogIn />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
