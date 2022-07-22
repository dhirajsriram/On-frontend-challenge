import React from "react";
import { Grid, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useQuiz } from "../context/quizContext";
import Button from "../components/Button";
import { useNavigate } from "react-router";

const Listings = () => {
  const navigate = useNavigate();
  const {
    state: { shoes },
    dispatch,
  } = useQuiz();

  const resetResponses = () => {
    dispatch({ type: "resetResponse" });
    navigate("/quiz");
  };

  return (
    <Grid container sx={{ background: grey[100], padding: "16px" }} spacing={5}>
      <Grid item xs={12}>
        <Typography sx={{ fontSize: "24px" }}>Congratulations</Typography>
        <Typography sx={{ fontSize: "16px", color: grey[500] }}>
          Based on your selection, he is the list of shoes sorted top-down by
          your preferences.
        </Typography>
      </Grid>
      {shoes.map((shoe) => {
        return (
          <Grid item xs={12} key={shoe.id}>
            <img
              src={require(`../assets/${shoe.name}.png`)}
              alt={shoe.name}
              style={{ objectFit: "contain", width: "100%", padding: "16px" }}
            ></img>
            <Typography
              sx={{
                fontSize: "20px",
                textAlign: "center",
                fontWeight: "bold",
                marginTop: "32px",
              }}
            >
              {shoe.name}
            </Typography>
            <Button
              variant="primary"
              label={"Shop Now"}
              sx={{ margin: "auto", display: "block", marginTop: "16px" }}
              onClick={() => {}}
            ></Button>
          </Grid>
        );
      })}
      <Grid item xs={12}>
        <Button
          variant="secondary"
          label={"Reset Responses"}
          sx={{
            margin: "auto",
            display: "block",
            borderColor: grey[900],
            color: grey[900],
          }}
          onClick={resetResponses}
        ></Button>
      </Grid>
    </Grid>
  );
};

export default Listings;
