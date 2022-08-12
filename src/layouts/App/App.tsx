import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import loadable from "@loadable/component";

const LogIn = loadable(() => import("@pages/Login"));
const SignUp = loadable(() => import("@pages/Signup"));
const Workspace = loadable(() => import("@layouts/Workspace"));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/channel" element={<Workspace />}></Route>
        <Route path="/channel/:channel" element={<Workspace />}></Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/" element={<Workspace />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
