import { CardMedia } from "@mui/material";

type Props = {
  image: string;
  alt: string;
}

const BookCardImage: React.FC<Props> = ({ image, alt }) => {
  return (
    <CardMedia
      component="img"
      image={image}
      alt={alt}
      sx={{
        boxShadow: "-0.25rem 0.5rem 0.625rem 0.05rem rgba(0, 0, 0, 0.4)"
      }}
    />
  );
}

export default BookCardImage;