import db from "../config/db.js";

const getAllBooks = async (page: number = 1, limit: number = 10, search: string = "Civil") => {
  let query = db.from("books").select("id,book_id,title,authors,issue_date,created_at").range((page - 1) * limit, page * limit - 1);

  if (search.trim()) {
    const conditions = [
      `title.ilike.%${search}%`,
    ];

    conditions.push(`tags.cs.{${search}}`);
    conditions.push(`subjects.cs.{${search}}`);

    if (!isNaN(Number(search))) {
      conditions.push(`id.eq.${search}`);
      conditions.push(`book_id.eq.${search}`);
    }

    query = query.or(conditions.join(","));
  }

  return query;
};

export { getAllBooks }