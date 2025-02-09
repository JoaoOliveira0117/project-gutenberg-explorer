import { Box, CardMedia, Typography } from "@mui/material";
import Chip from "../dummies/Chip";

type Props = {
  subjects: string[],
  tags: string[],
  language: string,
}

const BookCardChips: React.FC<Props> = ({ language, tags, subjects }) => {
  const displayedChips = [
    language,
    ...(subjects.length > 0 ? [subjects[0]] : []),
    ...(tags.length > 0 ? [tags[0]] : []),
  ]
  const remainingChips = Math.max(0, subjects.length + tags.length - 1);
  return (
    <Box>
      {displayedChips.map((tag) => (
        <Chip key={tag} text={tag} />
      ))}
      <Chip text={`${remainingChips}+`} />
    </Box>
  );
}

export default BookCardChips;