import { z } from "zod";

export const getAllValidation = z.object({
  query: z.object({
    page: z.coerce.number().int(),
    pageSize: z.coerce.number().int(),
    search: z.string(),
    fields: z.array(z.string())
  }).partial()
});

export const getByIdValidation = z.object({
  params: z.object({
    id: z.string()
  }),
  query: z.object({
    fields: z.string().transform((v, ctx) => 1)
  }).partial()
});

export const postFavoriteBookValidation = z.object({
  params: z.object({
    book_id: z.string()
  })
});

export const postLastSeenBookValidation = z.object({
  params: z.object({
    book_id: z.string()
  })
});