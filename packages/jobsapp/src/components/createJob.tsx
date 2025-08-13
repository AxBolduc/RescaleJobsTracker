import z from 'zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { useAppForm } from '@/hooks/job.form'

const CreateJobSchema = z.object({
  name: z.string().min(4, 'Job name is required'),
})

type CreateJob = z.infer<typeof CreateJobSchema>

export default function CreateJob() {
  const createJobMutation = useMutation({
    mutationKey: ['createJob'],
    mutationFn: async (createJobRequest: CreateJob) => {
      const response = await fetch(
        `${import.meta.env.VITE_PUBLIC_SERVER_URL}/api/jobs`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(createJobRequest),
        },
      )

      if (!response.ok) {
        throw new Error('Failed to create job')
      }

      return response.json()
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['jobs'],
      })
    },
  })

  const queryClient = useQueryClient()

  const form = useAppForm({
    defaultValues: {
      name: '',
    },
    validators: {
      onBlur: CreateJobSchema,
    },
    onSubmit: ({ value }) => {
      // TODO: Send to backend
      //
      createJobMutation.mutate(value)
      form.reset()
    },
  })

  return (
    <Card className-card="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Create Job</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
        >
          <div className="flex gap-4">
            <form.AppField
              name="name"
              children={(field) => (
                <field.FormInput placeholder="Job Name" className={'flex-1'} />
              )}
            />
            <form.AppForm>
              <form.FormButton label="Create" />
            </form.AppForm>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
