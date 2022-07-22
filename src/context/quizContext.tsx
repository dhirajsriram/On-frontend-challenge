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
    // Update the response
    // 1. Adds the nextQuestion in queue
    // 2. Updates the rating values to the shoes
    case "updateResponse": {
      const answerCopy = action.payload.value;
      let answer = state.nextQuestion?.answers.find(
        (a) => a.copy === answerCopy
      );
      let nextQuestionId = answer?.nextQuestion;
      let ratingIncrease: RatingIncrease | undefined = answer?.ratingIncrease;
      // Creating a copy of the arrays so we dont make changes to the reference
      let shoes = [...state.shoes];
      if (ratingIncrease) {
        for (let shoe of shoes) {
          shoe.rating = shoe.rating + ratingIncrease[shoe.id];
        }
        // Sort desc by rating
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
      // Resets the respnse from with the value from data.json
      state.shoes.forEach((shoe) => (shoe.rating = 0));
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
