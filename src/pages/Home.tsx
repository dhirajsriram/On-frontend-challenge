import React from "react";
import { Grid, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import Athlete from "../assets/Background Image Start Screen.png";
import Button from "../components/Button";
import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();
  const navigateToQuiz = () => {
    navigate("/quiz");
  };
  return (
    <Grid
      container
      sx={{
        flexDirection: "column",
        minHeight: "100vh",
        padding: "16px",
        backgroundColor: grey[50],
        backgroundImage: `url('${Athlete}')`,
        backgroundSize: "75vh",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "bottom",
        ":before": {
          content: "''",
          backgroundImage:
            "linear-gradient(to top, rgba(239,239,239,255), rgba(239,239,239,0))",
          position: "absolute",
          height: "25%",
          right: "0",
          bottom: "0",
          left: "0",
        },
      }}
    >
      <Grid item xs={12} sx={{ justifyContent: "center" }}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography sx={{ fontSize: "32px" }}>
              Take the quiz and try your first pair!
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="primary"
              onClick={navigateToQuiz}
              label={"Try on Trial"}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography
              sx={{ fontSize: "12px", color: grey[500], fontWeight: "bold" }}
            >
              30 Days risk free
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Home;
