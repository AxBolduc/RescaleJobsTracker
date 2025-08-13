import { createFileRoute } from '@tanstack/react-router'
import CreateJob from '@/components/createJob'
import JobsTable from '@/components/jobsTable'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div>
      <main className="min-h-screen flex flex-col items-center justify-center bg-[#282c34] text-white text-[calc(10px+2vmin)]">
        <div className="container mx-auto py-8 max-w-2xl">
          <h1 className="text-4xl font-bold mb-4">Rescale Jobs Tracker</h1>
          <div className="flex flex-col w-full gap-4">
            <CreateJob />
            <JobsTable />
          </div>
        </div>
      </main>
    </div>
  )
}
