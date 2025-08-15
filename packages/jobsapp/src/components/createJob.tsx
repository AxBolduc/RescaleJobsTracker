import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { useAppForm } from '@/hooks/job.form'
import { CreateJobSchema } from '@/schemas/job'
import { JobsService } from '@/api/jobs.service'

export default function CreateJob() {
  const createJobMutation = useMutation({
    mutationKey: JobsService.queryKeys.createJob,
    mutationFn: JobsService.createJob,
    onSuccess: () => {
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
      createJobMutation.mutate(value)
      form.reset()
    },
  })

  return (
    <Card className="w-full">
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
