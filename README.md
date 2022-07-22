# frontend-challenge-on

## Abstract

A React application which handles the user's response and renders the results of shoes depending on the ratings. The **data.json** file is used as the source of truth for the data

## Installation

Kindly do an npm install at the root directory of the application to install the required packages.

```
npm install
```

Following are the libraries that are used in front-end.

- React
- Material-UI
- React Router

## Serving Locally

Once the packages have been installed you may serve the application locally. You may run `npm start` on the root directory of the application to serve it locally. Following are the ports the application run on

- [http://localhost:3000](http://localhost:3000)

### Scripts

`npm run start` - Serves the app locally on [http://localhost:3000](http://localhost:3000)

`npm run build` - Builds a minified version of the frontend application. It correctly bundles React in production mode and optimizes the build for the best performance.

## Architecture

### React Suspense

React suspense has been used to help us manage the loading state of our code-split application. Suspense suspends rendering and automatically displays the fallback which is the Loader component in our case until the components chunks are available in the dom.

### React Router

Routing is enabled through react-router. All the routes in the application are managed in a single file called **routes.ts** which could be found at [`src/routes.ts`](./src/routes.ts)

### Functional Components

The components in the application are stateless functional components. Hooks have been used if components need to maintain a state.

### Typescript

Typescript is preferred over the regular javascript due to the advantages such as

- Great tooling support with IntelliSense
- Optional static typing
- Ahead-Of-Time type checking
- Type Inference, which gives some of the benefits of types, without actually using them

## Design

### Folder structure

The application was designed to be as granular as possible in terms of functionality. Separation of concerns was the goal while designing the project. The folder structure of the application is as follows

```
├── 📁public
├── 📁node_modules
├── 📄package.json
├── 📄README.md
└── 📁src
    ├── 📁assets
    ├── 📁components
    ├── 📁pages
    ├── 📁data
    ├── 📁context
    ├── 📁theme
    ├── 📁types
    ├── 📄App.tsx
    ├── 📄App.test.tsx
    ├── 📄index.tsx
    ├── 📄logo.svg
    └── 📄routes.ts
```

`src/components` - Contains all the shared design- components such as Button etc

`src/pages` - The different pages of the application are placed here. At present,
the app runs on **Home** , **Quiz** and **Listing**

`src/assets` - Images necessary for the application are present here.

`src/theme` - Contains all the theme.ts file which provides the application's overall look and feel.

`src/context` - Contains the context which is responsible for all the data manipulation

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

## Things to improve

- **Testing:** The application require unit test and e2e test coverege. The context needs to be tested with mock data

  - Test to check if the ratings are increased aptly
  - Test to check if the nextQuestion is selected appropriately

- **Responsiveness:** Needs to be extended to fit the desktop viewports

## Comments

I noticed a coupe of anomalies in the data while working on the solution

- Answers do not consistenly have an id and refering the answer by the copy is possible to cause issues when extended further in the future
- I also noticed that question 2 and question 6 are very similar with different impact on the rating.
