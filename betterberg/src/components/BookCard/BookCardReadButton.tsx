import { Button, CardMedia } from "@mui/material";
import Link from "next/link";

type Props = {
  bookId: string;
}

const BookCardReadButton: React.FC<Props> = ({ bookId }) => {
  return (
    <Link href={`/book/${bookId}`}>
      <Button variant="contained">Read now</Button>
    </Link>
  );
}

export default BookCardReadButton;