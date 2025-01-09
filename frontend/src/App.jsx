import Counter from "./components/counter"
import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import TaskManager from "./components/TaskManager";
import "./App.css"
import AppBooking from "./components/AppBooking";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/task-manager" element={<TaskManager />} />
        <Route path="/counter" element={<Counter />} />
        <Route path="/booking" element={<AppBooking />} />
      </Routes>
    </>
  );
}

export default App
