import * as React from "react";
import data from "../data/data.json";
import { Question } from "../types/types";

export type Action = { type: "updateNextQuestion" };
type Dispatch = (action: Action) => void;
export type State = {
  questions: Question[];
  step: number;
  nextQuestion: Question;
};
type QuizProviderProps = { children: React.ReactNode };
const QuizContext = React.createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

export const QuizReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "updateNextQuestion": {
      return state;
    }
    default: {
      throw new Error(`Unhandled action type`);
    }
  }
};

const QuizProvider = ({ children }: QuizProviderProps) => {
  const [state, dispatch] = React.useReducer(QuizReducer, {
    questions: data.questions,
    step: 0,
    nextQuestion: data.questions[0],
  });
  const value = { state, dispatch };
  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};

function useQuiz() {
  const context = React.useContext(QuizContext);
  if (context === undefined) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
}

export { QuizProvider, useQuiz };
