const endpoint = "/api/books";

const getAllBooks = async (search?: string, page = 1, pageSize = 25) => {
  const query = new URLSearchParams({
    search: search || "",
    page: String(page) || "",
    pageSize: String(pageSize) || ""
  })
  const res = await fetch(`${endpoint}?${query.toString()}`);
  const data = await res.json();
  return data.result.data || [];
}

const putBookFavorite = async (bookId: string) => {
  return fetch(`${endpoint}/${bookId}/favorite`, {
    method: "PUT",
  });
}

const deleteBookFavorite = async (bookId: string) => {
  return fetch(`${endpoint}/${bookId}/favorite`, {
    method: "DELETE",
  });
}

export {
  getAllBooks,
  putBookFavorite,
  deleteBookFavorite,
}