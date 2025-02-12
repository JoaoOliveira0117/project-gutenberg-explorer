import { Book } from "@/types";
import { Card, CardContent } from "../ui/card";
import Text from "../dummies/Text";
import Tags from "./Tags";
import { Button } from "../ui/button";
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { useState } from "react";

type Props = {
  book: Book;
  onToggleFavorite: (id: string, callback: (v: boolean) => void) => void;
  onClickRead: (id: string) => void;
}

const BookCard: React.FC<Props> = ({ book, onToggleFavorite, onClickRead }) => {
  const [favorite, setFavorite] = useState(!!book.user_favorite_books);;
  return (
    <Card className="w-full max-w-xs flex flex-col items-center p-2 shadow-md rounded-lg">
      <div className="h-56 overflow-hidden flex justify-center items-center shadow-lg rounded-lg my-6">
        <img
          src={`https://www.gutenberg.org/cache/epub/${book.book_id}/pg${book.book_id}.cover.medium.jpg`}
          alt={book.title}
          className="object-contain h-full w-full shadow-lg"
        />
      </div>
      
      <CardContent className="flex flex-col gap-2 text-center">
        <Text as="h3" text={book.title} length={35} className="text-lg font-bold" />
        <Text as="p" text={book.language} length={20} className="text-sm text-gray-500" />
        <Text as="p" text={book.authors.join(", ")} length={25} className="text-sm text-gray-500" />
      </CardContent>
  
      <CardContent className="flex flex-col gap-2 mt-auto p-[0]">
        <div className="flex flex-wrap justify-center gap-1">
          <Tags subjects={book.subjects} tags={book.tags} />
        </div>
        <div className="flex flex-wrap justify-end gap-2 mt-2">
          <Button variant="ghost" onClick={() => onToggleFavorite(book.id, setFavorite)} className="">
            {favorite ? <AiFillHeart className="text-red-600 text-3xl" /> : <AiOutlineHeart className="text-3xl" />}
          </Button>
          <Button variant="link" onClick={() => onClickRead(book.id)} className="
            bg-gradient-to-r from-blue-500 to-blue-400 text-white
            hover:from-blue-600 hover:to-blue-500
            focus:from-blue-600 focus:to-blue-500
            active:from-blue-700 active:to-blue-600
          ">Read Now</Button>
        </div>
      </CardContent>
    </Card>

  );
}

export default BookCard;