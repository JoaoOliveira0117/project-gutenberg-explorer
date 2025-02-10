import { z } from "zod"

export const redirectValidation = z.object({})

export const callbackValidation = z.object({
  query: z.object({
    code: z.string(),
  })
})

export const getByIdValidation = z.object({
  params: z.object({
    id: z.string(),
  })
})

export const updateMeValidation = z.object({
  body: z.object({
    username: z.string(),
    profile_pic: z.string(),
  }).partial(),
})