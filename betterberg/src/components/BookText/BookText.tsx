import { Typography } from "@mui/material";
import { useEffect, useState } from "react";

type Props = {
  text: string;
}

const BookText: React.FC<Props> = ({ text }) => {
  const [file, setFile] = useState('')

  useEffect(() => {
    fetch(text)
      .then((response) => response.text())
      .then((text) => {
        text.replace(/\\r/g, '\r').replace(/\\n/g, '\n');
        setFile(text);
      });
  }, [text])

  return (
    <Typography variant="body1" sx={{ p: 8, whiteSpace: "pre-wrap" }}>
      {file}
    </Typography>
  );
}

export default BookText;