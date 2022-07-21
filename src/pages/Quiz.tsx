import { Grid, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Container } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router";
import Button from "../components/Button";
import { useQuiz } from "../context/quizContext";

const Quiz = () => {
  const {
    state: { nextQuestion },
    dispatch: dispatchQuiz,
  } = useQuiz();
  const navigate = useNavigate();
  const handleOptionClick = (value: string) => {
    dispatchQuiz({ type: "updateResponse", payload: { value } });
  };

  React.useEffect(() => {
    if (!nextQuestion) {
      navigate("/results");
    }
  });

  return (
    <Container
      sx={{
        background: grey[800],
        minHeight: "100vh",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography
            sx={{
              color: "white",
              textAlign: "center",
              fontSize: "8px",
              fontWeight: "bold",
              letterSpacing: "3px",
            }}
          >
            TRY ON QUIZ
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography
            sx={{
              color: "white",
              textAlign: "center",
              fontSize: "8px",
              fontWeight: "bold",
              letterSpacing: "3px",
            }}
          >
            30 DAYS RISK FREE
          </Typography>
        </Grid>
      </Grid>
      <Grid
        container
        sx={{ flex: 1, flexDirection: "column", justifyContent: "center" }}
      >
        <Grid
          item
          xs={12}
          sx={{
            color: "white",
            textAlign: "center",
            fontSize: "22px",
          }}
        >
          {nextQuestion?.copy}
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            color: "white",
            textAlign: "center",
            fontSize: "20px",
            marginTop: "100px",
          }}
        >
          <Grid container>
            {nextQuestion?.answers.map((answer) => (
              <Grid item xs={12 / nextQuestion.answers.length}>
                <Button
                  variant="secondary"
                  onClick={() => handleOptionClick(answer.copy)}
                  label={answer.copy}
                ></Button>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Quiz;
