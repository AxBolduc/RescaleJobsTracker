import { MoreHorizontal } from 'lucide-react'
import { AlertDialogTitle } from '@radix-ui/react-alert-dialog'
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
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from './ui/alert-dialog'
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
                  <JobDropdown />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}

function JobDropdown() {
  const [jobToDelete, setJobToDelete] = useState<string | null>(null)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8">
          <span className="sr-only">Open options</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Update Status</DropdownMenuItem>
        <AlertDialog
          open={!!jobToDelete}
          onOpenChange={(open) => !open && setJobToDelete(null)}
        >
          <AlertDialogTrigger asChild>
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault()
                setJobToDelete('true')
              }}
            >
              Delete
            </DropdownMenuItem>
          </AlertDialogTrigger>
          <DeleteJobDialogContent
            onClose={() => setJobToDelete(null)}
            onDelete={() => console.log('deleted')}
          />
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

interface AlertDialogContentProps {
  onDelete: () => void
  onClose: () => void
}

function DeleteJobDialogContent({
  onDelete,
  onClose,
}: AlertDialogContentProps) {
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Delete Job</AlertDialogTitle>
        <AlertDialogDescription>
          Are you sure you want to delete this job?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="destructive"
          onClick={() => {
            onDelete()
            onClose()
          }}
        >
          Delete
        </Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  )
}
