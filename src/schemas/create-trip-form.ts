import { z } from "zod";

const emailSchema = z.string({ required_error: "E-mail é obrigatório" }).email({ message: "E-mail inválido!" })

export const createTripFormSchema = z.object({
  destination: z
    .string({ required_error: "Destino é obrigatório" })
    .min(3, { message: "Destino deve conter pelo menos 3 letras" }),
  trip_start_and_end_dates: z.object({
    from: z.date(),
    to: z.date()
  }),
  emailsToInvite: z.array(emailSchema).min(1, { message: "Convide pelo menos uma pessoa para a viagem" }),
  ownerName: z.string({ required_error: "Nome é obrigatório" }).min(3, { message: "Nome deve conter pelo menos 3 letras" }),
  ownerEmail: emailSchema,
})

export type CreateTripFormData = z.infer<typeof createTripFormSchema>