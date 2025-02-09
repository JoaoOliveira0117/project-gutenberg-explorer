import { Tooltip, Typography, TypographyTypeMap } from "@mui/material";

type Props = TypographyTypeMap['props'] & {
  text: string;
  length?: number;
}

const Text: React.FC<Props> = ({ text, length, ...rest }: Props) => {
  const formattedTitle = length && text.length > length ? text.slice(0, length - 3) + "..." : text;
  return (
    length && text.length > length ? 
      <Tooltip title={text} placement="top">
        <Typography variant="h6" sx={{ fontWeight: 600, fontSize: "0.85rem" }} {...rest}>
          {formattedTitle}
        </Typography>
      </Tooltip> 
    : 
      <Typography variant="h6" sx={{ fontWeight: 600, fontSize: "0.85rem" }} {...rest}>
        {formattedTitle}
      </Typography>
  );
}

export default Text;