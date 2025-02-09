import Chip from "../dummies/Chip";

type Props = {
  subjects: string[],
  tags: string[],
  language: string,
}

const BookTextChips: React.FC<Props> = ({ language, tags, subjects }) => {
  const displayedChips = [
    language,
    ...subjects || [],
    ...tags || []
  ]
  return (
    <>
      {displayedChips.map((tag) => (
        <Chip key={tag} text={tag} textLength={200} />
      ))}
    </>
  );
}

export default BookTextChips;