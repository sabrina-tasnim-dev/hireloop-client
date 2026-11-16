"use client"

import { useState } from "react"
import { Briefcase, MapPin, Users } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import type { JobForm } from "@/app/dashboard/recruiter/jobs/new/page"
import type { Job } from "@/lib/api/jobs"
import Deletejobs from "../../Deletejobs"

const frequencyLabels: Record<string, string> = {
  "per/hour": "/ hr",
  "per/day": "/ day",
  "per/month": "/ mo",
  "per/year": "/ yr",
}

function formatDate(iso: string) {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return iso
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

function formatCompensation(job: JobForm) {
  const suffix =
    frequencyLabels[job.frequency] ?? `/ ${job.frequency.replace("per/", "")}`
  return `€${job.minSalary}k – €${job.maxSalary}k ${suffix}`
}

function locationLine(job: JobForm) {
  return job.remote ? `Remote – ${job.location}` : job.location
}

function StatusBadge({ status }: { status: Job["status"] }) {
  if (status === "Active") {
    return (
      <Badge className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
        Active
      </Badge>
    )
  }
  if (status === "Expired") {
    return <Badge variant="destructive">Expired</Badge>
  }
  return <Badge variant="secondary">Paused</Badge>
}

function JobTitleCell({ job }: { job: Job }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">
        <Briefcase className="size-4" />
      </span>
      <div className="min-w-0">
        <p className="truncate font-medium text-foreground">{job.title}</p>
        <p className="truncate text-xs text-muted-foreground">{job.category}</p>
      </div>
    </div>
  )
}

function CompanyCell({ job }: { job: Job }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground">
        {job.company.charAt(0)}
      </span>
      <div className="min-w-0">
        <p className="truncate font-medium">{job.company}</p>
        <p className="flex items-center gap-1 truncate text-xs text-muted-foreground">
          <MapPin className="size-3 shrink-0" />
          {locationLine(job)}
        </p>
      </div>
    </div>
  )
}

function ApplicantsCell({ count }: { count: number }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-muted-foreground">
      <Users className="size-4" />
      {count} Candidates
    </span>
  )
}

function DeadlineCell({ job }: { job: Job }) {
  return (
    <div className="flex flex-col">
      <span className="text-sm">{formatDate(job.deadline)}</span>
      <span className="text-xs text-muted-foreground">
        {job.status === "Expired" ? "Expired" : "Open"}
      </span>
    </div>
  )
}

export function ManageJobsClient({ jobs: initialJobs }: { jobs: Job[] }) {
  const [jobs, setJobs] = useState<Job[]>(initialJobs)

  const handleDelete = (id: string) => {
    setJobs((prev) => prev.filter((job) => job.id !== id))
  }

  return (
    <Card className="w-full min-w-0">
      <CardContent className="min-w-0 p-0">
        {jobs.length === 0 ? (
          <p className="p-6 text-sm text-muted-foreground">
            No job posts yet. Create your first listing to get started.
          </p>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden min-w-0 md:block">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="pl-4 text-xs tracking-wide uppercase">
                      Job Title &amp; Dept
                    </TableHead>
                    <TableHead className="text-xs tracking-wide uppercase">
                      Company &amp; Location
                    </TableHead>
                    <TableHead className="text-xs tracking-wide uppercase">
                      Type
                    </TableHead>
                    <TableHead className="hidden text-xs tracking-wide uppercase xl:table-cell">
                      Compensation
                    </TableHead>
                    <TableHead className="hidden text-xs tracking-wide uppercase lg:table-cell">
                      Applicants
                    </TableHead>
                    <TableHead className="text-xs tracking-wide uppercase">
                      Status
                    </TableHead>
                    <TableHead className="hidden text-xs tracking-wide uppercase xl:table-cell">
                      Deadline
                    </TableHead>
                    <TableHead className="pr-4 text-right text-xs tracking-wide uppercase">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {jobs.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell className="py-3 pl-4">
                        <JobTitleCell job={job} />
                      </TableCell>
                      <TableCell className="py-3">
                        <CompanyCell job={job} />
                      </TableCell>
                      <TableCell className="py-3">
                        <Badge variant="outline">{job.jobType}</Badge>
                      </TableCell>
                      <TableCell className="hidden py-3 text-muted-foreground xl:table-cell">
                        {formatCompensation(job)}
                      </TableCell>
                      <TableCell className="hidden py-3 lg:table-cell">
                        <ApplicantsCell count={job.applicants} />
                      </TableCell>
                      <TableCell className="py-3">
                        <StatusBadge status={job.status} />
                      </TableCell>
                      <TableCell className="hidden py-3 xl:table-cell">
                        <DeadlineCell job={job} />
                      </TableCell>
                      <TableCell className="py-3 pr-4">
                        <div className="flex justify-end">
                          <Deletejobs job={job} onDelete={handleDelete} />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Mobile cards */}
            <ul className="divide-y divide-border md:hidden">
              {jobs.map((job) => (
                <li key={job.id} className="flex flex-col gap-3 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <JobTitleCell job={job} />
                    <StatusBadge status={job.status} />
                  </div>
                  <CompanyCell job={job} />
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                    <div>
                      <p className="text-xs text-muted-foreground">Type</p>
                      <Badge variant="outline" className="mt-1">
                        {job.jobType}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Compensation
                      </p>
                      <p className="mt-1 text-muted-foreground">
                        {formatCompensation(job)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Applicants
                      </p>
                      <p className="mt-1">
                        <ApplicantsCell count={job.applicants} />
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Deadline</p>
                      <div className="mt-1">
                        <DeadlineCell job={job} />
                      </div>
                    </div>
                  </div>
                  <div
                    className={cn(
                      "border-t border-border pt-3",
                      "flex items-center justify-between gap-2"
                    )}
                  >
                    <span className="text-xs text-muted-foreground">
                      {job.id}
                    </span>
                    <Deletejobs job={job} onDelete={handleDelete} />
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </CardContent>
    </Card>
  )
}
