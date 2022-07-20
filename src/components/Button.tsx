import { Button as MuiButton } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";

type ButtonProps = {
  variant: "primary" | "seccondary";
  onClick: () => void;
  label: string;
};

const Button = ({ variant, onClick, label }: ButtonProps) => {
  return (
    <MuiButton
      sx={{
        padding: "8px 30px",
        backgroundColor: variant === "primary" ? grey[900] : "transparent",
        color: variant === "primary" ? 'white' : grey[900],
        border: `1px solid ${variant === "primary" ? 'transparent' : grey[900]}`,
        textTransform: 'capitalize',
        borderRadius: '0px'
      }}
      onClick={onClick}
    >
      {label}
    </MuiButton>
  );
};

export default Button;
