import { z } from 'zod';

export const FreshdeskAgentSchema = z.object({
    available: z.boolean().optional(),
    occasional: z.boolean().optional(),
    id: z.number(),
    ticket_scope: z.number().optional(),
    created_at: z.string().optional(),
    updated_at: z.string().optional(),
    last_active_at: z.string().optional(),
    available_since: z.string().nullable().optional(),
    type: z.string().optional(),
    contact: z
        .object({
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
        })
        .optional(),
    signature: z.string().nullable(),
    freshcaller_agent: z.boolean().optional(),
    freshchat_agent: z.boolean().optional(),
    agent_level_id: z.number().optional(),
});

export type FreshdeskAgent = z.infer<typeof FreshdeskAgentSchema>;
