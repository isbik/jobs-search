import { useState } from "react";
import { Eye, Trash } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";

import { Card } from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Checkbox } from "@/shared/ui/checkbox";
import { useMe } from "@/entity/user/hooks/use-me";
import { Pagination } from "@/widgets/table/pagination";
import { currencyFormatter } from "@/shared/lib/currency";
import { useAdminJobs } from "@/entity/jobs/hooks/use-admin-jobs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import {
  JOB_EXPERIENCE,
  JOB_STATUSES,
  JOB_STATUSES_COLOR,
  JOB_WORK_TYPES,
} from "@/entity/jobs/constants";
import {
  usePatchInternalJobsJobid,
  getInternalJobsQueryKey,
  JobStatus,
  GetInternalJobsQueryResponse,
  useDeleteJobsJobid,
} from "@/__generated__";

export const Route = createFileRoute("/_internal/jobs/")({
  component: InternalJobsPage,
});

function InternalJobsPage() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const { data: me } = useMe();

  const params = {
    userId: me?.isAdmin ? undefined : me?.id,
    limit: 10,
    offset: (page - 1) * 10,
  };

  const { data, isLoading } = useAdminJobs(params, {
    enabled: Boolean(me?.id),
  });

  const { mutate: deleteJob } = useDeleteJobsJobid({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: getInternalJobsQueryKey(params),
        });
      },
    },
  });

  const { mutate } = usePatchInternalJobsJobid({
    mutation: {
      onSuccess: (_, { data, jobId }) => {
        queryClient.setQueryData<GetInternalJobsQueryResponse>(
          getInternalJobsQueryKey(params),
          (cached) => {
            if (!cached) return;

            return {
              ...cached,
              items: cached.items.map((item) => {
                if (item.id === jobId) {
                  return {
                    ...item,
                    ...data,
                  };
                }
                return item;
              }),
            };
          },
        );
      },
    },
  });

  const jobs = data?.items || [];
  const total = data?.total || 0;
  const isAdmin = me?.isAdmin;

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Номер</TableHead>
            {isAdmin && <TableHead>Продвигаемая</TableHead>}
            <TableHead>Статус</TableHead>
            <TableHead>Название</TableHead>
            <TableHead>Мин. Зарплата</TableHead>
            <TableHead>Макс. Зарплата</TableHead>
            <TableHead>Категория</TableHead>
            <TableHead>Тип работы</TableHead>
            <TableHead>Уровень</TableHead>
            <TableHead>Теги</TableHead>
            <TableHead>Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobs.map((job) => (
            <TableRow key={job.id}>
              <TableCell>
                <Link
                  className="flex items-center gap-2"
                  to={`/search/jobs/${job.id}`}
                >
                  <Eye className="size-4" />
                  {job.id}
                </Link>
              </TableCell>
              {isAdmin && (
                <TableCell>
                  <Checkbox
                    checked={job.isFeatured}
                    onCheckedChange={(checked) => {
                      mutate({
                        jobId: job.id,
                        data: {
                          isFeatured: Boolean(checked),
                        },
                      });
                    }}
                  />
                </TableCell>
              )}
              <TableCell>
                {me?.isAdmin ? (
                  <Select
                    value={String(job.status)}
                    onValueChange={(value) => {
                      mutate({
                        jobId: job.id,
                        data: {
                          status: value as JobStatus,
                        },
                      });
                    }}
                  >
                    <SelectTrigger className={JOB_STATUSES_COLOR[job.status]}>
                      <SelectValue placeholder="Категория" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(JOB_STATUSES).map(([value, name]) => (
                        <SelectItem
                          key={value}
                          value={value}
                        >
                          {name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Badge
                    variant={"outline"}
                    className={JOB_STATUSES_COLOR[job.status]}
                  >
                    {JOB_STATUSES[job.status]}
                  </Badge>
                )}
              </TableCell>
              <TableCell>
                <a
                  target="_blank"
                  className="underline"
                  href={job.url}
                  rel="noreferrer"
                >
                  {job.title}
                </a>
              </TableCell>
              <TableCell>{currencyFormatter.format(job.minSalary)}</TableCell>
              <TableCell>{currencyFormatter.format(job.maxSalary)}</TableCell>
              <TableCell>{job.category?.name}</TableCell>

              <TableCell>{JOB_WORK_TYPES[job.workType]}</TableCell>
              <TableCell>{JOB_EXPERIENCE[job.experience]}</TableCell>
              <TableCell>{job.skills.join(", ")}</TableCell>

              <TableCell>
                <Button
                  variant={"destructive"}
                  size={"icon"}
                  type="button"
                  onClick={() => deleteJob({ jobId: job.id })}
                >
                  <Trash className="size-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination
        total={total}
        setPage={setPage}
        page={page}
      />
    </Card>
  );
}
