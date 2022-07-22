import React from "react";
import { Button as MuiButton, SxProps } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Theme } from "@mui/system";

type ButtonProps = {
  variant: "primary" | "secondary";
  onClick: () => void;
  label: string;
  sx?: SxProps<Theme>;
};

// Button component, Handles the primary and secondary button styles
const Button = ({ variant, onClick, label, sx }: ButtonProps) => {
  return (
    <MuiButton
      sx={{
        padding: "8px 30px",
        backgroundColor: variant === "primary" ? grey[900] : "transparent",
        color: "white",
        border: `1px solid ${variant === "primary" ? "transparent" : "white"}`,
        textTransform: "capitalize",
        borderRadius: "0px",
        // Allows passing custom  styes to buttons
        ...sx,
      }}
      onClick={onClick}
    >
      {label}
    </MuiButton>
  );
};

export default Button;
