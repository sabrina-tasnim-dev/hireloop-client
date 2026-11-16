import Link from "next/link"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { getJobs } from "@/lib/api/jobs"
import { ManageJobsClient } from "./jobs-client"

export default async function ManageJobsPage() {
  const jobs = await getJobs()

  return (
    <div className="flex w-full max-w-7xl min-w-0 flex-col gap-6 p-4 sm:p-6">
      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
        <Link
          href="/dashboard/recruiter/jobs"
          className="hover:text-foreground"
        >
          Manage Jobs
        </Link>
        <span className="mx-1.5">/</span>
        <span className="text-foreground">Job Listings &amp; Postings</span>
      </nav>

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Manage Job Posts
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            View, edit, pause, and archive job listings across your
            organization.
          </p>
        </div>
        <Button
          variant="brand"
          nativeButton={false}
          render={<Link href="/dashboard/recruiter/jobs/new" />}
        >
          <Plus />
          New Job Post
        </Button>
      </div>

      <ManageJobsClient jobs={jobs} />
    </div>
  )
}
