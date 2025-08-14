import { MoreHorizontal } from 'lucide-react'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
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
import { JobsService } from '@/api/jobs.service'

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
        <Table>
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
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Delete Job</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete this job?
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="destructive"
          onClick={() => {
            onClose()
          }}
        >
          Delete
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}

function UpdateStatusDialogContent({ onClose, jobId }: DialogContentProps) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Update Status</DialogTitle>
        <DialogDescription>Update the status of this job</DialogDescription>
      </DialogHeader>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select a status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="PENDING">Pending</SelectItem>
          <SelectItem value="COMPLETED">Completed</SelectItem>
        </SelectContent>
      </Select>
      <DialogFooter>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="default"
          onClick={() => {
            onClose()
          }}
        >
          Update
        </Button>
      </DialogFooter>
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
