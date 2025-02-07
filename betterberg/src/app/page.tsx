'use client'

import { useEffect, useState } from "react";

export default function Home() {
  const [books, setBooks] = useState([] as any)
  
  useEffect(() => {
    fetch("http://localhost:3000")
      .then(res => res.json())
      .then(data => setBooks(data.data))
  }, [])

  return (
    <div>
      <h1>Hello World</h1>
      <ul>
        {books.map((book: any) => (
          <li key={book.id}>{book.title}</li>
        ))}
      </ul>
    </div>
  );
}
