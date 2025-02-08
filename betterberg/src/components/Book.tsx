"use client";

import { useEffect, useState } from "react";

export default function BookViewer({ id }: { id: string }) {
  const [bookText, setBookText] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/proxy?id=${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch book");
        return res.text();
      })
      .then(setBookText)
      .catch((err) => setError(err.message));
  }, [id]);

  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!bookText) return <p>Loading...</p>;

  return (
    <pre className="whitespace-pre-wrap break-words p-4 rounded-md">
      {bookText}
    </pre>
  );
}
