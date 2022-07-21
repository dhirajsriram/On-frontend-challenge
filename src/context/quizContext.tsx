import * as React from "react";
import data from "../data/data.json";
import { Question, RatingIncrease, Shoe } from "../types/types";

export type Action =
  | { type: "updateResponse"; payload: { value: string } }
  | { type: "resetResponse" };
type Dispatch = (action: Action) => void;
export type State = {
  questions: Question[];
  step: number;
  nextQuestion: Question | null;
  shoes: Shoe[];
};
type QuizProviderProps = { children: React.ReactNode };
const QuizContext = React.createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

const initialState = {
  questions: data.questions,
  step: 0,
  nextQuestion: data.questions[0],
  shoes: data.shoes,
};

export const QuizReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "updateResponse": {
      let answer = action.payload.value;
      let nextQuestionId = state.nextQuestion?.answers.find(
        (a) => a.copy === answer
      )?.nextQuestion;
      let ratingIncrease: RatingIncrease | undefined =
        state.nextQuestion?.answers.find(
          (a) => a.copy === answer
        )?.ratingIncrease;
      let shoes = [...state.shoes];
      if (ratingIncrease) {
        for (let shoe of shoes) {
          shoe.rating = shoe.rating + ratingIncrease[shoe.id];
        }
        shoes.sort((a, b) => {
          return b.rating - a.rating;
        });
      }
      if (typeof nextQuestionId === "number") {
        let nextQuestion = state.questions[nextQuestionId];
        return { ...state, nextQuestion, step: state.step + 1, shoes };
      }
      return { ...state, nextQuestion: null, step: state.step + 1, shoes };
    }
    case "resetResponse": {
      return { ...initialState };
    }
    default: {
      throw new Error(`Unhandled action type`);
    }
  }
};
const QuizProvider = ({ children }: QuizProviderProps) => {
  const [state, dispatch] = React.useReducer(QuizReducer, { ...initialState });
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
