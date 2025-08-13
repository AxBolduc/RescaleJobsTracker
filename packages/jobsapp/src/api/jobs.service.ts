import type { CreateJob } from '@/schemas/job';
import { JobSchema } from '@/schemas/job'

export const JobsService = {
  getJobs: async () => {
    const response = await fetch(
      `${import.meta.env.VITE_PUBLIC_SERVER_URL}/api/jobs`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    if (!response.ok) {
      throw new Error('Failed to fetch jobs')
    }

    const data = await response.json()

    return JobSchema.array().parse(data)
  },
  createJob: async ({ name }: CreateJob) => {
    const response = await fetch(
      `${import.meta.env.VITE_PUBLIC_SERVER_URL}/api/jobs`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
        }),
      },
    )

    if (!response.ok) {
      throw new Error('Failed to create job')
    }

    const data = await response.json()

    return JobSchema.parse(data)
  },
  queryKeys: {
    getJobs: ['jobs'],
    createJob: ['createJob'],
  },
}
