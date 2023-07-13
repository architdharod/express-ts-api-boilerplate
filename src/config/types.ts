import { z } from 'zod';

export const FreshdeskAgentSchema = z.object({
    available: z.boolean(),
    occasional: z.boolean(),
    id: z.number(),
    signature: z.string().nullable(),
    ticket_scope: z.number(),
    created_at: z.string(),
    updated_at: z.string(),
    available_since: z.string().nullable(),
    type: z.string(),
    contact: z.object({
        active: z.boolean(),
        email: z.string().email(),
        job_title: z.string().nullable(),
        language: z.string(),
        last_login_at: z.string(),
        mobile: z.string().nullable(),
        name: z.string(),
        phone: z.string().nullable(),
        time_zone: z.string(),
        created_at: z.string(),
        updated_at: z.string(),
    }),
});

export type FreshdeskAgent = z.infer<typeof FreshdeskAgentSchema>;
