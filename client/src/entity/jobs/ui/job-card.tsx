import { Link } from "@tanstack/react-router";
import { Briefcase, ChartNoAxesColumn, ExternalLink, Tag } from "lucide-react";

import { cn } from "@/shared/lib";
import { Avatar } from "@/shared/ui/avatar";

import { Job } from "../../../__generated__";
import { Badge } from "../../../shared/ui/badge";
import { formatSalary } from "../lib/salary-format";
import { JOB_EXPERIENCE, JOB_WORK_TYPES } from "../constants";
import { Card, CardContent, CardDescription, CardTitle } from "../../../shared/ui/card";

type Props = {
  job: Job;
};

function JobCard({ job }: Props) {
  const {
    title,
    minSalary,
    maxSalary,
    category,
    company,
    workType,
    experience,
    isFeatured,
  } = job;

  return (
    <Card
      className={cn(
        "max-w-full",
        isFeatured && "border-blue-400 shadow-lg shadow-blue-200",
      )}
    >
      <CardContent className="py-5 pb-2">
        <div className="mb-2 flex gap-3">
          <Avatar
            src={company?.logo}
            alt={`${company?.name} logo`}
            className="size-16 rounded-full object-cover"
            fallback={<Briefcase className="size-16 text-gray-400" />}
          />

          <div>
            <CardTitle className="text-xl font-semibold">{title}</CardTitle>
            <CardDescription className="text-sm text-gray-500">
              {company?.name}
            </CardDescription>
          </div>
          <Link
            className="ml-auto"
            to={"/search/jobs/" + job.id}
          >
            <ExternalLink className="size-4" />
          </Link>
        </div>

        <h3 className="mb-2 text-2xl font-bold">{title}</h3>

        <div className="mb-2 flex items-center">
          <Tag className="mr-2 size-4 text-gray-500" />
          <span className="text-sm">{category?.name}</span>
        </div>
        <div className="mb-4 flex items-center">
          <ChartNoAxesColumn className="mr-2 size-4 text-gray-500" />
          <span className="text-sm">{JOB_EXPERIENCE[experience]}</span>
        </div>
        <div className="gap mb-2 flex flex-wrap items-center justify-between gap-2">
          <p className="font-bold">{formatSalary(minSalary, maxSalary)} в месяц</p>
          <Badge className="shrink-0">{JOB_WORK_TYPES[workType]}</Badge>
        </div>
      </CardContent>
    </Card>
  );
}

export { JobCard };
