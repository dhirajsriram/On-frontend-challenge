import * as React from "react";
import data from "../data/data.json";
import { Question } from "../types/types";

export type Action = { type: "updateNextQuestion"; payload: { value: string } };
type Dispatch = (action: Action) => void;
export type State = {
  questions: Question[];
  step: number;
  nextQuestion: Question | null;
};
type QuizProviderProps = { children: React.ReactNode };
const QuizContext = React.createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

export const QuizReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "updateNextQuestion": {
      let answer = action.payload.value;
      let nextQuestionId = state.nextQuestion?.answers.find(
        (a) => a.copy === answer
      )?.nextQuestion;
      if (typeof nextQuestionId === "number") {
        let nextQuestion = state.questions[nextQuestionId];
        return { ...state, nextQuestion, step: state.step + 1 };
      }
      return { ...state, nextQuestion: null, step: state.step + 1 };
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
  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
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
