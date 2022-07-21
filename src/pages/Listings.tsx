import { Grid } from "@mui/material";
import React from "react";
import { useQuiz } from "../context/quizContext";

const Listings = () => {
  const {
    state: { shoes },
  } = useQuiz();

  return (
    <Grid container>
      {shoes.map((shoe) => {
        return (
          <Grid item xs={12}>
            {shoe.name}
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Listings;
