import { ExternalLink } from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";
import { useInfiniteQuery } from "@tanstack/react-query";

import { Button } from "@/shared/ui/button";
import { CompanyCard } from "@/entity/company/ui/company-card";
import { useInfiniteScroll } from "@/shared/hooks/use-load-more";

import { JobCard } from "../../../../entity/jobs/ui/job-card";
import { getJobs, useGetCompaniesCompanyid } from "../../../../__generated__";

export const Route = createFileRoute("/_layout/search/companies/$companyId")({
  component: CompanyDetailPage,
});

function CompanyDetailPage() {
  const { companyId } = Route.useParams();

  const { data: company } = useGetCompaniesCompanyid(Number(companyId));

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["jobs", "company", companyId],
    queryFn: ({ pageParam = 1 }) =>
      getJobs({ offset: pageParam, limit: 12, companyId: Number(companyId) }),
    getNextPageParam: (lastPage, allPages) => {
      const loadedItems = allPages.flatMap((page) => page.items).length;
      if (loadedItems >= lastPage.total) return undefined;
      return loadedItems;
    },
    initialPageParam: 0,
    enabled: Boolean(companyId),
  });

  const loadMoreRef = useInfiniteScroll<HTMLDivElement>(fetchNextPage, {
    enabled: hasNextPage && !isFetchingNextPage,
  });

  const jobs = data?.pages.flatMap((page) => page.items) || [];

  return (
    <main className="container flex-grow px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto mb-24 flex items-center justify-center sm:mb-32">
        {company && (
          <CompanyCard
            company={company}
            className="w-full max-w-lg"
            action={
              <Button
                variant="outline"
                className="w-full"
                asChild
              >
                <a
                  href={company?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Сайт компании
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            }
          />
        )}
      </div>
      <h2 className="mb-8 text-center text-2xl font-bold tracking-tighter sm:text-3xl">
        Вакансии компании
      </h2>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
          />
        ))}
        {hasNextPage && <div ref={loadMoreRef}></div>}
      </div>
    </main>
  );
}
