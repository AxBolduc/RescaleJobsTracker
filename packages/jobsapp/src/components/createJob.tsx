import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'

export default function CreateJob() {
  // TODO: Add tanstack form stuff

  return (
    <Card className-card="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Create Job</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="flex gap-4">
            <Input placeholder="Job Name" />
            <Button type="submit">Create</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
