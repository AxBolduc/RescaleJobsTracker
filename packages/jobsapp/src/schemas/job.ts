import z from 'zod'

export const JobSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  status_log: z.array(
    z.object({
      id: z.string(),
      status_type: z.string(),
      timestamp: z.string(),
    }),
  ),
})

export const CreateJobSchema = z.object({
  name: z.string().min(4, 'Job name is required'),
})

export type Job = z.infer<typeof JobSchema>
export type CreateJob = z.infer<typeof CreateJobSchema>
