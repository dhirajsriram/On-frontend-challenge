import { Grid, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Container } from "@mui/system";
import Button from "../components/Button";
import { useQuiz } from "../context/quizContext";

const Quiz = () => {
  const {
    state: { nextQuestion },
  } = useQuiz();
  const handleOptionClick = (id: number) => {};

  return (
    <Container sx={{ background: grey[800], minHeight: "100vh" }}>
      <Grid container sx={{ paddingTop: "25%" }} spacing={1}>
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
      <Grid container>
        <Grid
          item
          xs={12}
          sx={{
            color: "white",
            textAlign: "center",
            fontSize: "20px",
            marginTop: "25%",
          }}
        >
          {nextQuestion.copy}
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            color: "white",
            textAlign: "center",
            fontSize: "20px",
            marginTop: "25%",
          }}
        >
          <Grid container>
            {nextQuestion.answers.map((answer) => (
              <Grid item xs={12 / nextQuestion.answers.length}>
                <Button
                  variant="secondary"
                  onClick={() => handleOptionClick(answer.id)}
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
