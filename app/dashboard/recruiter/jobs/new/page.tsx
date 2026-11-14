"use client"

import * as React from "react"
import Link from "next/link"
import {
  Building2,
  CalendarIcon,
  DollarSign,
  Globe,
  MapPin,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { creatjob } from "@/lib/actions/jobs"

const categories = [
  "Engineering & Tech",
  "Design",
  "Marketing",
  "Sales",
  "Customer Support",
  "Finance",
  "Operations",
]

const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"]

const frequencies = ["per/hour", "per/day", "per/month", "per/year"]

export type JobForm = {
  title: string
  company: string
  category: string
  jobType: string
  remote: boolean
  location: string
  deadline: string
  minSalary: string
  maxSalary: string
  frequency: string
  responsibilities: string
  qualifications: string
}

export const initialForm: JobForm = {
  title: "",
  company: "",
  category: "",
  jobType: "Full-time",
  remote: false,
  location: "",
  deadline: "",
  minSalary: "",
  maxSalary: "",
  frequency: "per/hour",
  responsibilities: "",
  qualifications: "",
}

function SectionHeading({
  step,
  title,
}: {
  step: number
  title: string
}) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex size-6 items-center justify-center rounded-full border border-border text-xs font-medium text-muted-foreground">
        {step}
      </span>
      <h2 className="text-base font-semibold">{title}</h2>
    </div>
  )
}

function FieldLabel({
  htmlFor,
  required,
  children,
}: {
  htmlFor: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <Label htmlFor={htmlFor} className="mb-2 block">
      {children}
      {required ? <span className="text-destructive"> *</span> : null}
    </Label>
  )
}

export default function NewJobPage() {
  const [form, setForm] = React.useState<JobForm>(initialForm)

  const update = <K extends keyof JobForm>(key: K, value: JobForm[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit=async(event: React.FormEvent<HTMLFormElement>)=> {
    event.preventDefault();
    const jobData:JobForm={...form}
    // Collected job data — replace with an API call when ready
    console.log("New job payload:", form)
    window.alert("Job data collected — check the console for the payload.")
  
const result= await creatjob(jobData);
console.log(result)
}

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-4xl flex-col gap-6 p-4 sm:p-6"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <nav aria-label="Breadcrumb" className="mb-2 text-sm text-muted-foreground">
            <Link href="/dashboard/recruiter/jobs" className="hover:text-foreground">
              Manage Jobs
            </Link>
            <span className="mx-1.5">/</span>
            <span className="text-foreground">Create New Listing</span>
          </nav>
          <h1 className="text-2xl font-semibold tracking-tight">
            Post a New Job
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Fill the position specifications to attract qualified talent across
            our network.
          </p>
        </div>
       
      </div>

      {/* 1. Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>
            <SectionHeading step={1} title="Basic Information" />
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <div className="grid gap-5">
            <div>
              <FieldLabel htmlFor="title" required>
                Job Title
              </FieldLabel>
              <Input
                id="title"
                required
                placeholder="Frontend Developer"
                value={form.title}
                onChange={(e) => update("title", e.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <FieldLabel htmlFor="company" required>
                Company Name
              </FieldLabel>
              <div className="relative">
                <Building2 className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="company"
                  required
                  placeholder="HireLoop Network"
                  className="pl-8"
                  value={form.company}
                  onChange={(e) => update("company", e.target.value)}
                />
              </div>
            </div>
            <div>
              <FieldLabel htmlFor="category" required>
                Job Category
              </FieldLabel>
              <Select
                value={form.category || ''}
                onValueChange={(value) => update("category", value ?? "")}
              >
                <SelectTrigger id="category" className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <span className="mb-2 block text-sm font-medium">
              Job Type <span className="text-destructive">*</span>
            </span>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {jobTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => update("jobType", type)}
                  className={cn(
                    "rounded-lg border px-3 py-2 text-sm font-medium transition-colors",
                    form.jobType === type
                      ? "border-border bg-muted text-foreground"
                      : "border-input bg-transparent text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                  )}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 2. Location, Compensation & Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>
            <SectionHeading
              step={2}
              title="Location, Compensation & Timeline"
            />
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <div className="flex items-center justify-between gap-4 rounded-lg border border-border p-3.5">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-muted">
                <Globe className="size-4 text-muted-foreground" />
              </span>
              <div>
                <p className="text-sm font-medium">
                  Remote Work Allowed (Offline)
                </p>
                <p className="text-xs text-muted-foreground">
                  Enable worldwide or distributed candidate applications
                </p>
              </div>
            </div>
            <Switch
              checked={form.remote}
              onCheckedChange={(checked) => update("remote", checked)}
              aria-label="Allow remote work"
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <FieldLabel htmlFor="location">Job Location (optional)</FieldLabel>
              <div className="relative">
                <MapPin className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="location"
                  placeholder="New York, USA"
                  className="pl-8"
                  value={form.location}
                  onChange={(e) => update("location", e.target.value)}
                />
              </div>
            </div>
            <div>
              <FieldLabel htmlFor="deadline">Application Deadline</FieldLabel>
              <div className="relative">
                <Input
                  id="deadline"
                  type="date"
                  className="pr-8 [&::-webkit-calendar-picker-indicator]:opacity-60"
                  value={form.deadline}
                  onChange={(e) => update("deadline", e.target.value)}
                />
                <CalendarIcon className="pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            <div>
              <FieldLabel htmlFor="minSalary">Min Salary / Rate</FieldLabel>
              <div className="relative">
                <DollarSign className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="minSalary"
                  type="number"
                  min="0"
                  placeholder="25"
                  className="pl-8"
                  value={form.minSalary}
                  onChange={(e) => update("minSalary", e.target.value)}
                />
              </div>
            </div>
            <div>
              <FieldLabel htmlFor="maxSalary">Max Salary / Rate</FieldLabel>
              <div className="relative">
                <DollarSign className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="maxSalary"
                  type="number"
                  min="0"
                  placeholder="40"
                  className="pl-8"
                  value={form.maxSalary}
                  onChange={(e) => update("maxSalary", e.target.value)}
                />
              </div>
            </div>
            <div>
              <FieldLabel htmlFor="frequency">Frequency</FieldLabel>
              <Select
                value={form.frequency}
                onValueChange={(value) => {
                  if (value) update("frequency", value)
                }}
              >
                <SelectTrigger id="frequency" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {frequencies.map((frequency) => (
                    <SelectItem key={frequency} value={frequency}>
                      {frequency}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 3. Responsibilities & Requirements */}
      <Card>
        <CardHeader>
          <CardTitle>
            <SectionHeading
              step={3}
              title="Responsibilities & Requirements"
            />
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <div>
            <FieldLabel htmlFor="responsibilities" required>
              Key Responsibilities
            </FieldLabel>
            <Textarea
              id="responsibilities"
              required
              rows={4}
              placeholder="Describe the key responsibilities for this role…"
              value={form.responsibilities}
              onChange={(e) => update("responsibilities", e.target.value)}
            />
          </div>
          <div>
            <FieldLabel htmlFor="qualifications" required>
              Qualifications & Requirements
            </FieldLabel>
            <Textarea
              id="qualifications"
              required
              rows={5}
              placeholder={"• 3+ years of experience…\n• Strong communication skills…"}
              value={form.qualifications}
              onChange={(e) => update("qualifications", e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end sm:hidden">
        <Button type="submit" variant="brand" size="lg" className="gap-2">
          Post a Job
          <span aria-hidden>→</span>
        </Button>
      </div>
      <section>
         <Button type="submit" variant="brand" size="lg" className="gap-2">
          Post a Job
          <span aria-hidden>→</span>
        </Button>
      </section>
    </form>
  )
}
