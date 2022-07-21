import { CssBaseline, ThemeProvider } from "@mui/material";
import React, { Suspense } from "react";
import AppRoutes from "./AppRoutes";
import { QuizProvider } from "./context/quizContext";
import { ShoesProvider } from "./context/shoesContext";
import theme from "./theme/theme";

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>...loading</div>}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ShoesProvider>
            <QuizProvider>
              <AppRoutes />
            </QuizProvider>
          </ShoesProvider>
        </ThemeProvider>
      </Suspense>
    </div>
  );
}

export default App;
