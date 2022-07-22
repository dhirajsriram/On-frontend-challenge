import React, { Suspense } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import AppRoutes from "./AppRoutes";
import { QuizProvider } from "./context/quizContext";
import theme from "./theme/theme";

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>...loading</div>}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <QuizProvider>
            <AppRoutes />
          </QuizProvider>
        </ThemeProvider>
      </Suspense>
    </div>
  );
}

export default App;
