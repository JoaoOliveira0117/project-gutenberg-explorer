import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useState } from "react";

type Props = {
  id: string;
  favorite: boolean;
}

const BookCardFavoriteButton: React.FC<Props> = ({ id, favorite }) => {
  const [isFavorite, setFavorite] = useState(favorite);

  const handleClick = async () => {
    setFavorite(!isFavorite);

    fetch(`/api/books/${id}/favorite`, {
      method: isFavorite ? "DELETE" : "PUT",
    }).then((res) => {
      if (!res.ok) setFavorite(favorite);
    })
  }

  return (
    <Button variant="outlined" style={{ borderColor: "var(--gray)" }} onClick={handleClick}>
      { isFavorite ? <Favorite style={{ color: "red" }} /> : <FavoriteBorder /> }
    </Button>
  );
}

export default BookCardFavoriteButton;