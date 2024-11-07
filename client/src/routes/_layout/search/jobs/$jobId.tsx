import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import { Briefcase, Building2, ChevronLeft, ExternalLink } from "lucide-react";

import { Avatar } from "@/shared/ui/avatar";
import { CompanyCard } from "@/entity/company/ui/company-card";
import { formatSalary } from "@/entity/jobs/lib/salary-format";

import { Badge } from "../../../../shared/ui/badge";
import { Button } from "../../../../shared/ui/button";
import { JobCard } from "../../../../entity/jobs/ui/job-card";
import { useGetJobs, useGetJobsJobid } from "../../../../__generated__";
import { JOB_EXPERIENCE, JOB_WORK_TYPES } from "../../../../entity/jobs/constants";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../../shared/ui/card";

export const Route = createFileRoute("/_layout/search/jobs/$jobId")({
  component: JobDetailPage,
});

function JobDetailPage() {
  const { jobId } = Route.useParams();

  const { data: job, isFetched } = useGetJobsJobid(Number(jobId));

  const jobQuery = useGetJobs(
    {
      limit: 3,
      categoryId: job?.category?.id,
    },
    {
      query: {
        enabled: !!job?.category?.id,
      },
    },
  );

  const jobs = jobQuery.data?.items || [];

  if (!job && isFetched) {
    return <Navigate to={"/"} />;
  }

  if (!job) {
    return null;
  }

  const {
    title,
    minSalary,
    maxSalary,
    category,
    company,
    workType,
    experience,
    description,
    url,
    skills,
  } = job;

  return (
    <main className="container flex-grow px-4 py-8">
      <Link
        className="mb-6 flex items-center gap-2"
        to="/search/jobs"
      >
        <ChevronLeft />К вакансиям
      </Link>

      <div className="mx-auto mb-24 sm:mb-48">
        <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar
                      src={company?.logo}
                      alt={`${company?.name} logo`}
                      className="size-16 rounded-full object-cover"
                      fallback={<Briefcase className="size-16 text-gray-400" />}
                    />

                    <div>
                      <CardTitle className="text-2xl font-bold">{title}</CardTitle>
                      <p className="text-muted-foreground">{company?.name}</p>
                    </div>
                  </div>
                  <Badge
                    variant="secondary"
                    className="text-sm"
                  >
                    {JOB_EXPERIENCE[experience]}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center">
                    <Briefcase className="mr-2 h-4 w-4" />
                    <span>{JOB_WORK_TYPES[workType]}</span>
                  </div>
                  <div className="flex items-center">
                    <Building2 className="mr-2 h-4 w-4" />
                    <span>{category?.name}</span>
                  </div>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">Зарплата</h3>
                  <p>{formatSalary(minSalary, maxSalary)} в месяц</p>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">Описание</h3>
                  <p>
                    {description
                      .split("\n")
                      .flatMap((part, index, array) =>
                        index < array.length - 1 ? [part, <br key={index} />] : [part],
                      )}
                  </p>
                </div>
                {skills.length > 0 && (
                  <div>
                    <h3 className="mb-2 font-semibold">Требуемые навыки</h3>
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button asChild>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Подать заявку
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          </div>
          {company && <CompanyCard company={company} />}
        </div>
      </div>
      <h2 className="mb-8 text-center text-2xl font-bold tracking-tighter sm:text-3xl">
        Другие вакансии
      </h2>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
          />
        ))}
      </div>
    </main>
  );
}
