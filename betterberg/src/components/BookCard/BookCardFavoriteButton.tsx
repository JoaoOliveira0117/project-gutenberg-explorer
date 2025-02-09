import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Button } from "@mui/material";

type Props = {
  favorite: boolean;
}

const BookCardFavoriteButton: React.FC<Props> = ({ favorite }) => {
  return (
    <Button variant="outlined" style={{ borderColor: "var(--gray)" }}>
      { favorite ? <Favorite style={{ color: "red" }} /> : <FavoriteBorder /> }
    </Button>
  );
}

export default BookCardFavoriteButton;