import { Book } from "@/types";
import { Card, CardContent } from "./ui/card";
import Text from "./dummies/Text";

type Props = {
  book: Book;
  onToggleFavorite: (book: Book) => void;
}

const NewBookCard: React.FC<Props> = ({ book, onToggleFavorite }) => {
  return (
    <Card className="w-full max-w-xs flex flex-col items-center p-4 px-2 shadow-md rounded-lg">
      <div className="h-56 overflow-hidden flex justify-center items-center shadow-lg rounded-lg mb-6">
        <img
          src={`https://www.gutenberg.org/cache/epub/${book.book_id}/pg${book.book_id}.cover.medium.jpg`}
          alt={book.title}
          className="object-contain h-full w-full shadow-lg"
        />
      </div>
      <CardContent className="flex flex-col gap-2 text-center self-end">
        <Text as="h3" text={book.title} length={50} className="text-lg font-bold" />
        <Text as="p" text={book.language} length={20} className="text-sm text-gray-500" />
        <Text as="p" text={book.authors.join(", ")} length={40} className="text-sm text-gray-500" />
        <div className="flex flex-wrap justify-center self-end gap-1 mt-2">
          {book.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default NewBookCard;