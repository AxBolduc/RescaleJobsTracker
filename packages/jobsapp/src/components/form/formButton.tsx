import { Button } from '../ui/button'
import { useFormContext } from '@/hooks/job.form-context'

const FormButton = ({ label }: { label: string }) => {
  const form = useFormContext()

  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <Button type="submit" disabled={isSubmitting}>
          {label}
        </Button>
      )}
    </form.Subscribe>
  )
}

export default FormButton
