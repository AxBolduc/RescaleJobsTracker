import z from 'zod'

export const JobSchema = z.object({
  id: z.number(),
  name: z.string(),
  status_log: z.array(z.object({ status_type: z.string() })),
})

export const CreateJobSchema = z.object({
  name: z.string().min(4, 'Job name is required'),
})

export type Job = z.infer<typeof JobSchema>
export type CreateJob = z.infer<typeof CreateJobSchema>
