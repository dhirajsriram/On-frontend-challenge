import { QuizReducer, Action, State } from "./quizContext";
import data from "../data/data.json";
describe("quizContext", () => {
  test("updates the next question as expected", () => {
    const state: State = {
      questions: data.questions,
      step: 0,
      nextQuestion: data.questions[0],
      shoes: data.shoes,
    };
    const action: Action = {
      type: "updateResponse",
      payload: {
        value: "Male",
      },
    };
    expect(QuizReducer(state, action)).toMatchObject({
      nextQuestion: data.questions[1],
    });
  });

  test("updates the next question based on the response", () => {
    const state: State = {
      questions: data.questions,
      step: 0,
      nextQuestion: data.questions[1],
      shoes: data.shoes,
    };
    const action: Action = {
      type: "updateResponse",
      payload: {
        value: "Running Shoe",
      },
    };
    expect(QuizReducer(state, action)).toMatchObject({
      nextQuestion: data.questions[3],
    });
  });
  test("updates the step", () => {
    const state: State = {
      questions: data.questions,
      step: 1,
      nextQuestion: data.questions[1],
      shoes: data.shoes,
    };
    const action: Action = {
      type: "updateResponse",
      payload: {
        value: "Running Shoe",
      },
    };
    expect(QuizReducer(state, action)).toMatchObject({
      step: 2,
    });
  });
  test("updates the shoe rating", () => {
    const state: State = {
      questions: data.questions,
      step: 1,
      nextQuestion: data.questions[1],
      shoes: data.shoes,
    };
    const action: Action = {
      type: "updateResponse",
      payload: {
        value: "Running Shoe",
      },
    };
    console.log(QuizReducer(state, action));
    expect(QuizReducer(state, action)).toMatchObject({
      // Takes into account the data changes from the previous steps
      shoes: [
        { id: "cloudsurfer", name: "Cloudsurfer", rating: 15 },
        {
          id: "cloudventure_waterproof",
          name: "Cloudventure Waterproof",
          rating: 15,
        },
        { id: "cloudflyer", name: "Cloudflyer", rating: 15 },
        { id: "cloud", name: "Cloud", rating: 9 },
        { id: "cloudx", name: "Cloud X", rating: 8 },
        { id: "cloudflow", name: "Cloudflow", rating: 7 },
        { id: "cloudventure", name: "Cloudventure", rating: 5 },
        { id: "cloudventure_peak", name: "Cloudventure Peak", rating: 5 },
      ],
    });
  });
});
