'use client'

import { useRouter } from 'next/navigation'
import Card from "./Card";
import { Book } from '@/types';

type Props = {
  books: Book[];
  addFavorite: (id: string, callback: (v: boolean) => void) => void;
  removeFavorite: (id: string, callback: (v: boolean) => void) => void;
}

const BookCardGrid: React.FC<Props> = ({ books, addFavorite, removeFavorite }: Props) => {
  const router = useRouter();

  const handleReadBook = (id: string) => {
    router.push(`/books/${id}`);
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book, i) => (
          <Card 
            key={`${book.id}-${i}`} 
            book={book} 
            addFavorite={addFavorite} 
            removeFavorite={removeFavorite} 
            onClickRead={handleReadBook} 
          />
        ))}
      </div>
    </div>
  );
}

export default BookCardGrid;
