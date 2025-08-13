import { useStore } from '@tanstack/react-form'
import { Input } from '../ui/input'
import FormError from './formError'
import type { ComponentProps } from 'react'
import { useFieldContext } from '@/hooks/job.form-context'
import { cn } from '@/lib/utils'

type FormInputProps = { inputClassName?: string } & ComponentProps<typeof Input>

const FormInput = ({
  placeholder,
  className,
  inputClassName,
  ...props
}: FormInputProps) => {
  const field = useFieldContext<string>()
  const errors = useStore(field.store, (state) => state.meta.errors)

  return (
    <div className={className}>
      <Input
        {...props}
        value={field.state.value}
        placeholder={placeholder}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        className={cn(inputClassName, errors.length > 0 && 'border-red-500')}
      />
      {field.state.meta.isTouched && <FormError errors={errors} />}
    </div>
  )
}

export default FormInput
