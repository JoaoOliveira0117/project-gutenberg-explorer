import db from "../config/db.js";

const getBookById = async (id: number, fields="tags") => {
  return db.from("books").select(fields).eq('id', id).single(); // id is unique
};

export { getBookById }