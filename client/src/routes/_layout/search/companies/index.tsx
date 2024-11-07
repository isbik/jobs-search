import { useInfiniteQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";

import { getCompanies } from "@/__generated__";
import { CompanyCard } from "@/entity/company/ui/company-card";
import { useInfiniteScroll } from "@/shared/hooks/use-load-more";

export const Route = createFileRoute("/_layout/search/companies/")({
  component: CompanyList,
});

function CompanyList() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["companies", "search"],
    queryFn: ({ pageParam = 1 }) => getCompanies({ offset: pageParam, limit: 12 }),
    getNextPageParam: (lastPage, allPages) => {
      const loadedItems = allPages.flatMap((page) => page.items).length;
      if (loadedItems >= lastPage.total) return undefined;
      return loadedItems;
    },
    initialPageParam: 0,
  });

  const loadMoreRef = useInfiniteScroll<HTMLDivElement>(fetchNextPage, {
    enabled: hasNextPage && !isFetchingNextPage,
  });

  const companies = data?.pages.flatMap((page) => page.items) || [];

  return (
    <div className="container my-8">
      <h1 className="mb-6 text-3xl font-bold">Список компаний</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {companies.map((company) => (
          <Link
            key={company.id}
            to={`/search/companies/${company.id}`}
            className="block"
          >
            <CompanyCard company={company} />
          </Link>
        ))}
        {hasNextPage && <div ref={loadMoreRef}></div>}
      </div>
    </div>
  );
}
