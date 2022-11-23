import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home/Home";
import AboutUs from "./Pages/About Us/AboutUs";
import MapPage from "./Pages/Map/Map";
import WhyUs from "./Pages/Why Us/WhyUs";
import HowToUse from "./Pages/How To Use/HowToUse";
import Login from "./Pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/whyUs" element={<WhyUs />} />
        <Route path="/howToUse" element={<HowToUse />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
