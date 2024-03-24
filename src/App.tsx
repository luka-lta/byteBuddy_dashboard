import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Commands from "./pages/Commands";

function App() {
  return (
      <BrowserRouter>
        <Routes>
            <Route path="/commands" element={<Commands />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
