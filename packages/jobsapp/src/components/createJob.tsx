import z from 'zod'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { useAppForm } from '@/hooks/job.form'

const JobSchema = z.object({
  name: z.string().min(4, 'Job name is required'),
})

export default function CreateJob() {
  const form = useAppForm({
    defaultValues: {
      name: '',
    },
    validators: {
      onBlur: JobSchema,
    },
    onSubmit: ({ value }) => {
      // TODO: Send to backend
      console.log(value)
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
