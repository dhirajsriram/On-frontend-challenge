import { Grid, Step, Stepper } from "@mui/material";
import React from "react";

const Quiz = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  return (
    <Stepper activeStep={activeStep} orientation="vertical">
      <Step></Step>
    </Stepper>
  );
};

export default Quiz;
