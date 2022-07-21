import * as React from "react";
import data from "../data/data.json";
import { Question, RatingIncrease, Shoe } from "../types/types";

let dataObject = Object.assign({}, data);

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
        console.log(dataObject.shoes);
      }
      if (typeof nextQuestionId === "number") {
        let nextQuestion = state.questions[nextQuestionId];
        return { ...state, nextQuestion, step: state.step + 1, shoes };
      }
      return { ...state, nextQuestion: null, step: state.step + 1, shoes };
    }
    case "resetResponse": {
      state.shoes.forEach((shoe) => shoe.rating = 0);
      return {
        ...state,
        questions: dataObject.questions,
        step: 0,
        nextQuestion: dataObject.questions[0],
      };
    }
    default: {
      throw new Error(`Unhandled action type`);
    }
  }
};
const QuizProvider = ({ children }: QuizProviderProps) => {
  const [state, dispatch] = React.useReducer(QuizReducer, {
    questions: dataObject.questions,
    step: 0,
    nextQuestion: dataObject.questions[0],
    shoes: dataObject.shoes,
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
