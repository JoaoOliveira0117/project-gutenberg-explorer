import { Typography } from "@mui/material";

type Props = {
  text: string;
}

const BookText: React.FC<Props> = ({ text }) => {
  const formattedText = text.replace(/\\r/g, '\r').replace(/\\n/g, '\n');
  return (
    <Typography variant="body1" sx={{ p: 8, whiteSpace: "pre-wrap" }}>
      {formattedText}
    </Typography>
  );
}

export default BookText;