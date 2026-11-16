import type { JobForm } from "@/app/dashboard/recruiter/jobs/new/page"

const BASE_URL=process.env.NEXT_PUBLIC_API_BASE_URL||"http://localhost:5000"

export type Job = JobForm & {
  id: string
  status: "Active" | "Expired" | "Paused"
  applicants: number
}

export type ApiJob = Partial<JobForm> & {
  _id?: string
  id?: string
  status?: Job["status"]
  applicants?: number
}

const resolveStatus = (job: ApiJob): Job["status"] => {
  if (job.status) return job.status
  const deadline = job.deadline ? new Date(job.deadline) : null
  if (!deadline || Number.isNaN(deadline.getTime())) return "Active"
  return deadline.getTime() < Date.now() ? "Expired" : "Active"
}

const normalizeJob = (job: ApiJob): Job =>
  ({
    ...job,
    id: job._id ?? job.id ?? "",
    status: resolveStatus(job),
    applicants: job.applicants ?? 0,
  }) as Job

export const getJobs=async():Promise<Job[]>=>{
    const res=await fetch(`${BASE_URL}/jobs`,{cache:"no-store"});

    if (!res.ok){
        throw new Error("Failed to fetch jobs")
    }
    const data:ApiJob[]=await res.json();
    return data.map(normalizeJob);
}
