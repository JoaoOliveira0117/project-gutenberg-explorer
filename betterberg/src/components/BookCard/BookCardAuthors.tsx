import Text from "../dummies/Text";

type Props = {
  authors: string[];
}

const BookCardAuthors: React.FC<Props> = ({ authors }) => {
  const formattedAuthors = authors.map((author, index) => {
    return author
      .replace(/\s*\d{3,4}-\d{3,4}/g, "")
      .replace(/\s*\[Editor\]/g, "")
      .replace(/\?/g, "")
      .replace(/,\s*$/, "")
      .trim(); 
  })
  return (
    <Text text={formattedAuthors.join(" & ")} length={50} variant="body2" sx={{ fontSize: "0.75rem", color: "var(--dark-gray)" }} />
  );
}

export default BookCardAuthors;