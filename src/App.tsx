import React from "react";
import AppRoutes from "./AppRoutes";
import { ShoesProvider } from "./context/shoesContext";

function App() {
  return (
    <div className="App">
      <ShoesProvider>
        <AppRoutes />
      </ShoesProvider>
    </div>
  );
}

export default App;
