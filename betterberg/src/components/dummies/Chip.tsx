import { Chip as MuiChip } from "@mui/material";
import Text from "./Text";

type Props = {
  text: string;
  textLength?: number;
}

const Chip: React.FC<Props> = ({ text, textLength = 10 }) => {
  return (
    <MuiChip
      label={<Text text={text} length={textLength} sx={{ fontSize: "0.575rem" }} />}
      variant="filled"
      color="primary"
      sx={{
        height: "fit-content",
        fontSize: "10px",
        paddingY: "3px",
        m: "0.05rem",
      }}
    />
  );
}

export default Chip;