import { createFormHook } from '@tanstack/react-form'
import { fieldContext, formContext } from './job.form-context'
import FormButton from '@/components/form/formButton'
import FormInput from '@/components/form/formInput'

export const { useAppForm } = createFormHook({
  fieldComponents: {
    FormInput,
  },
  formComponents: {
    FormButton,
  },
  fieldContext,
  formContext,
})
