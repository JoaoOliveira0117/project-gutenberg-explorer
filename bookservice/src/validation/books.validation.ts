import { z } from "zod";
import { AI_SLUGS } from "../config/prompts/index.js";

export const userValidation = z.object({
  params: z.object({
    user_id: z.string().uuid()
  })
})

export const getAllValidation = z.object({
  query: z.object({
    page: z.coerce.number().int(),
    pageSize: z.coerce.number().int(),
    search: z.string(),
    fields: z.string(),
    user_id: z.string()
  }).partial()
});

export const getAllFavoritesValidation = z.object({
  query: z.object({
    page: z.coerce.number().int(),
    pageSize: z.coerce.number().int(),
    fields: z.string(),
    user_id: z.string()
  }).partial()
});

export const getAllLastSeenValidation = z.object({
  query: z.object({
    page: z.coerce.number().int(),
    pageSize: z.coerce.number().int(),
    fields: z.string(),
    user_id: z.string()
  }).partial()
});

export const getByIdValidation = z.object({
  params: z.object({
    id: z.string(),
  }),
  query: z.object({
    fields: z.string()
  }).partial()
});

export const postFavoriteBookValidation = z.object({
  params: z.object({
    book_id: z.string(),
  })
});

export const deleteFavoriteBookValidation = z.object({
  params: z.object({
    book_id: z.string(),
  })
});

export const postLastSeenBookValidation = z.object({
  params: z.object({
    book_id: z.string(),
  })
});

export const aiValidation = z.object({
  params: z.object({
    book_id: z.string(),
    type: z.enum(Object.values(AI_SLUGS) as [string, ...string[]])
  })
})