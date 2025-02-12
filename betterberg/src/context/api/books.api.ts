const endpoint = "/api/books";

export const getAllBooks = async (search?: string, page = 1, pageSize = 25) => {
  const query = new URLSearchParams({
    search: search || "",
    page: String(page) || "",
    pageSize: String(pageSize) || ""
  })
  console.log(`${endpoint}?${query.toString()}`)
  const res = await fetch(`${endpoint}?${query.toString()}`);
  const data = await res.json();
  return data.result || [];
}

export const getBookById = async (bookId: string) => {
  const res = await fetch(`${endpoint}/${bookId}`);
  const data = await res.json();
  return data.result
}

export const putBookFavorite = async (bookId: string) => {
  return fetch(`${endpoint}/${bookId}/favorite`, {
    method: "PUT",
  });
}

export const deleteBookFavorite = async (bookId: string) => {
  return fetch(`${endpoint}/${bookId}/favorite`, {
    method: "DELETE",
  });
}