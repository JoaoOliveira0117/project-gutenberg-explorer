import HttpError from "@/http/error";
import toQueryString from "@/utils/toQueryString";

const endpoint = "/api/books";

const call = async (url: string, method = 'GET') => {
  if (typeof window === 'undefined') {
    throw new Error("This function can't be executed in the browser");
  }

  const response = await fetch(url, { method })

  if (!response.ok) {
    if (response.headers.get("content-type")?.includes("application/json")) {
      const resBody = await response.json()
      throw new HttpError(
        resBody.message,
        "Client Error",
        resBody.error?.formatted || [],
        resBody.error?.raw || [],
        resBody.status,
      )
    }
  
    throw new HttpError(
      "Failed to fetch data",
      "Client Error",
    )
  }

  return response.json();
}

export const getAllBooks = async (search?: string, page = 1, pageSize = 25) => {
  const query = toQueryString({ search, page, pageSize });
  return call(`${endpoint}${query}`)
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