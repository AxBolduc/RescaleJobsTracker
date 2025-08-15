import type { CreateJob, UpdateJobStatus } from '@/schemas/job'
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
  updateJobStatus: async (jobId: string, updateJobRequest: UpdateJobStatus) => {
    const response = await fetch(
      `${import.meta.env.VITE_PUBLIC_SERVER_URL}/api/jobs/${jobId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateJobRequest),
      },
    )

    if (!response.ok) {
      throw new Error('Failed to update job status')
    }

    const data = await response.json()
    return JobSchema.parse(data)
  },
  deleteJob: async (id: string) => {
    const response = await fetch(
      `${import.meta.env.VITE_PUBLIC_SERVER_URL}/api/jobs/${id}`,
      {
        method: 'DELETE',
      },
    )

    if (!response.ok) {
      throw new Error('Failed to delete job')
    }
  },
  queryKeys: {
    getJobs: ['jobs'],
    createJob: ['createJob'],
    updateJobStatus: (jobId: string) => ['updateJobStatus', { jobId, status }],
    deleteJob: (jobId: string) => ['deleteJob', jobId],
  },
}
