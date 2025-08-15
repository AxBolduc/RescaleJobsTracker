import { MoreHorizontal } from 'lucide-react'
import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import type { UpdateJobStatus } from '@/schemas/job'
import { UpdateJobStatusSchema } from '@/schemas/job'
import { JobsService } from '@/api/jobs.service'
import { JOB_STATUSES } from '@/constants'
import { useAppForm } from '@/hooks/job.form'

export default function JobsTable() {
  const { data: jobs, isLoading } = useQuery({
    queryKey: JobsService.queryKeys.getJobs,
    queryFn: JobsService.getJobs,
  })

  return (
    <div className="border rounded-xl bg-white overflow-hidden">
      {isLoading ? (
        <>Loading...</>
      ) : (
        <Table id="jobs-table">
          <TableHeader>
            <TableRow>
              <TableHead className="text-lg font-bold">Job Name</TableHead>
              <TableHead className="text-lg font-bold">Status</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-black">
            {jobs?.map((job) => (
              <TableRow key={job.name}>
                <TableCell>{job.name}</TableCell>
                <TableCell>{job.status_log[0].status_type}</TableCell>
                <TableCell className="w-[70px]">
                  <JobDropdown jobId={job.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}

type DialogMode = 'DELETE' | 'UPDATE_STATUS' | 'CLOSED'

interface DialogContentProps {
  onClose: () => void
  jobId: string
}

function DeleteJobDialogContent({ jobId, onClose }: DialogContentProps) {
  const queryClient = useQueryClient()

  const { mutate, isPending, isError } = useMutation({
    mutationKey: JobsService.queryKeys.deleteJob(jobId),
    mutationFn: () => {
      return JobsService.deleteJob(jobId)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: JobsService.queryKeys.getJobs,
      })
      onClose()
    },
  })

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Delete Job</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete this job?
        </DialogDescription>
      </DialogHeader>
      {isPending && (
        <div className="py-2 ">
          <p>Deleting job...</p>
        </div>
      )}
      {isError && (
        <div className="py-2 text-destructive">
          <p>Failed to delete job, please try again.</p>
        </div>
      )}
      <DialogFooter>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="destructive"
          onClick={() => {
            mutate()
          }}
        >
          Delete
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}

function UpdateStatusDialogContent({ onClose, jobId }: DialogContentProps) {
  const form = useAppForm({
    defaultValues: {
      status: '',
    },

    validators: {
      onChange: UpdateJobStatusSchema,
    },

    onSubmit: ({ value: formData }) => {
      mutate(formData)
    },
  })

  const queryClient = useQueryClient()

  const { mutate, isError, isPending } = useMutation({
    mutationKey: JobsService.queryKeys.updateJobStatus(jobId),
    mutationFn: (updateJobStatus: UpdateJobStatus) =>
      JobsService.updateJobStatus(jobId, updateJobStatus),
    onSuccess: () => {
      console.log('success', jobId)
      queryClient.invalidateQueries({
        queryKey: JobsService.queryKeys.getJobs,
      })
      onClose()
    },
  })

  return (
    <DialogContent>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
        onReset={(e) => {
          e.preventDefault()
          form.reset()
        }}
      >
        <DialogHeader>
          <DialogTitle>Update Status</DialogTitle>
          <DialogDescription>Update the status of this job</DialogDescription>
        </DialogHeader>
        <div className="py-2 flex flex-col gap-2">
          <form.AppField
            name="status"
            children={(field) => {
              return (
                <Select
                  name={field.name}
                  value={field.state.value}
                  onValueChange={field.handleChange}
                  onOpenChange={field.handleBlur}
                  disabled={isPending}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(JOB_STATUSES).map(
                      ([dbValue, displayValue]) => {
                        return (
                          <SelectItem
                            key={`${dbValue}-${displayValue}`}
                            value={dbValue}
                          >
                            {displayValue}
                          </SelectItem>
                        )
                      },
                    )}
                  </SelectContent>
                </Select>
              )
            }}
          />
          {isPending && (
            <div className="text-gray-700">
              <p>Updating job status...</p>
            </div>
          )}
          {isError && (
            <div className="text-destructive">
              <p>Failed to update job status, please try again.</p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="secondary" onClick={onClose} type="reset">
            Cancel
          </Button>
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <Button
                variant="default"
                type="submit"
                disabled={!canSubmit || isSubmitting || isPending}
              >
                Update
              </Button>
            )}
          />
        </DialogFooter>
      </form>
    </DialogContent>
  )
}

function JobDropdown({ jobId }: { jobId: string }) {
  const [dialogMode, setDialogMode] = useState<DialogMode>('CLOSED')

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8">
          <span className="sr-only">Open options</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <Dialog
          open={dialogMode !== 'CLOSED'}
          onOpenChange={(open) => !open && setDialogMode('CLOSED')}
        >
          <DialogTrigger asChild>
            <>
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault()
                  setDialogMode('UPDATE_STATUS')
                }}
              >
                Update Status
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-500"
                onSelect={(e) => {
                  e.preventDefault()
                  setDialogMode('DELETE')
                }}
              >
                Delete
              </DropdownMenuItem>
            </>
          </DialogTrigger>
          {dialogMode === 'DELETE' ? (
            <DeleteJobDialogContent
              onClose={() => setDialogMode('CLOSED')}
              jobId={jobId}
            />
          ) : (
            <UpdateStatusDialogContent
              onClose={() => setDialogMode('CLOSED')}
              jobId={jobId}
            />
          )}
        </Dialog>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
