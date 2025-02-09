import { CardMedia, Typography } from "@mui/material";

type Props = {
  title: string;
}

const BookCardTitle: React.FC<Props> = ({ title }) => {
  const formattedTitle = title.length > 20 ? title.slice(0, 20) + "..." : title;
  return (
    <Typography variant="h6" sx={{ fontWeight: 600, fontSize: "0.85rem" }}>
      {formattedTitle}
    </Typography>
  );
}

export default BookCardTitle;