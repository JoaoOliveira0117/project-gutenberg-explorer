import { useBooks } from "@/hooks/useBooks";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useState } from "react";

type Props = {
  id: string;
  favorite: boolean;
}

const BookCardFavoriteButton: React.FC<Props> = ({ id, favorite }) => {
  const [isFavorite, setIsFavorite] = useState(favorite);
  const { setFavorite, removeFavorite } = useBooks();

  const handleClick = async () => {
    isFavorite ? removeFavorite(id, setIsFavorite) : setFavorite(id, setIsFavorite);
  }

  return (
    <Button variant="outlined" style={{ borderColor: "var(--gray)" }} onClick={handleClick}>
      { isFavorite ? <Favorite style={{ color: "red" }} /> : <FavoriteBorder /> }
    </Button>
  );
}

export default BookCardFavoriteButton;