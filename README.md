# frontend-challenge-on

## Abstract

A React application which handles the user's response and renders the results of shoes depending on the ratings. The data.json file is used as the source of truth for the data

## Installation

Kindly do an npm install at the root directory of the application to install the required packages. Following are the libraries that are used in front-end.

- React
- Material-UI
- React Router

```
npm install
```

## Serving Locally

Once the packages have been installed you may serve the application locally. You may run `npm start` on the root directory of the application to serve it locally. Following are the ports the application run on

- [http://localhost:3000](http://localhost:3000)

### Scripts

`npm run start` - Serves the app locally on [http://localhost:3000](http://localhost:3000)

`npm run build` - Builds a minified version of the frontend application. It correctly bundles React in production mode and optimizes the build for the best performance.

## Architecture

The application is designed with a context based approach wherein the **data manipulations are offloaded to the context** and the rendering components are kept as minimal in terms of their implementation.

## Description

The application works on multiple pages, they are

- Home
- Quiz
- Listing

## Design

### Folder structure

The application was designed to be as granular as possible in terms of functionality. Separation of concerns was the goal while designing the project. The folder structure of the application is as follows

`src/components` - Contains all the shared design- components such as Button etc

`src/pages` - The different pages of the application are placed here. At present,
the app runs on **Home** , **Quiz** and **Listing**

`src/assets` - Images necessary for the application are present here.

`src/theme` - Contains all the theme.ts file which provides the application's overall look and feel.

`src/types` - Contains all the shared types on the application.

### Application Design

Every component in the application has access to the data from the context. The components are also able to dispatch events to the context to manipulate the data

###### Context hook

```javascript
const {
  state: { nextQuestion },
  dispatch: dispatchQuiz,
} = useQuiz();
```

###### Dispatch actions

```javascript
dispatchQuiz({ type: "updateResponse", payload: { value } });
```

All the manipulation logic is abstracted out from the rendering components

###### Quiz context

Quiz context has the relevant logic related to data manipulation

```javascript
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
```

### UX Design

The application strongly uses components from the Material design.
