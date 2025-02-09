import { Chip as MuiChip } from "@mui/material";
import { useState, MouseEvent } from "react";

type Props = {
  text: string;
}

const Chip: React.FC<Props> = ({ text }) => {
  return (
    <MuiChip
      label={text}
      variant="filled"
      color="primary"
      sx={{
        height: "fit-content",
        fontSize: "10px",
        padding: "2px"
      }}
    />
  );
}

export default Chip;