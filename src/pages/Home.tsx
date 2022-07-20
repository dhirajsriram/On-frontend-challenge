import { Grid, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";
import Athlete from "../assets/Background Image Start Screen.png";
import Button from "../components/Button";

const Home = () => {
  return (
    <Grid
      container
      sx={{
        flexDirection: "column",
        minHeight: "100vh",
        padding: "16px",
        backgroundColor: grey[50],
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
              onClick={() => {}}
              label={"Try on Trial"}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography sx={{ fontSize: "12px", color: grey[500], fontWeight: 'bold' }}>
              30 Days risk free
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <img src={Athlete} alt="athlete" style={{width: "100%", height: "100%"}} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Home;
