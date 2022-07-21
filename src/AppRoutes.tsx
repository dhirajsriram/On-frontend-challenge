import React from "react";
import { Routes, Route } from "react-router-dom";

const Home = React.lazy(() => import("./pages/Home"));
const Quiz = React.lazy(() => import("./pages/Quiz"));
const Listings = React.lazy(() => import("./pages/Listings"));

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/results" element={<Listings />} />
    </Routes>
  );
};
export default AppRoutes;
