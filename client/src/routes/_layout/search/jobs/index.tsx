import { Controller, useForm } from "react-hook-form";
import { createFileRoute } from "@tanstack/react-router";
import { useInfiniteQuery } from "@tanstack/react-query";

import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { Combobox } from "@/shared/ui/combobox";
import { Skeleton } from "@/shared/ui/skeleton";
import { JobCard } from "@/entity/jobs/ui/job-card";
import { clearSearch } from "@/shared/lib/clean-search";
import { JOB_WORK_TYPES } from "@/entity/jobs/constants";
import { getJobs, GetJobsQueryParams } from "@/__generated__";
import { useInfiniteScroll } from "@/shared/hooks/use-load-more";
import { useJobCategories } from "@/entity/jobs/hooks/use-job-categories";

export const Route = createFileRoute("/_layout/search/jobs/")({
  component: SearchJobsPage,
  validateSearch: (params): GetJobsQueryParams => {
    return params;
  },
});

const DEFAULT_VALUES: GetJobsQueryParams = {
  search: "",
  minSalary: null,
  categoryId: null,
  workType: null,
};

export default function SearchJobsPage() {
  const params = Route.useSearch();
  const navigate = Route.useNavigate();

  const {
    control,
    register,
    formState: { isDirty },
    reset,
    handleSubmit,
  } = useForm<GetJobsQueryParams>({
    defaultValues: DEFAULT_VALUES,
    values: Object.assign({}, DEFAULT_VALUES, params),
  });

  const onSubmit = handleSubmit((data) => {
    navigate({ search: clearSearch(data), replace: true });
  });

  const onReset = () => {
    reset(DEFAULT_VALUES);
    navigate({ search: {}, replace: true });
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } =
    useInfiniteQuery({
      queryKey: ["jobs", "search", params],
      queryFn: ({ pageParam = 1 }) =>
        getJobs({ offset: pageParam, limit: 12, ...params }),
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

  const { categories } = useJobCategories();

  const jobs = data?.pages.flatMap((page) => page.items) || [];

  const hasFilters = Object.keys(params).length > 0;

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Список вакансий</h1>

      <div className="flex flex-col gap-4 md:flex-row">
        <form
          onSubmit={onSubmit}
          className="top-4 flex h-fit min-w-72 flex-col gap-3 rounded border bg-white p-4 md:sticky"
        >
          <h2 className="text-xl font-semibold">Фильтры</h2>
          <Input
            {...register("search")}
            type="text"
            placeholder="Название вакансии"
          />
          <Controller
            name="categoryId"
            control={control}
            render={({ field }) => (
              <Combobox
                className="w-full"
                value={field.value?.toString()}
                onChange={field.onChange}
                items={categories.map((category) => ({
                  value: category.id.toString(),
                  label: category.name,
                }))}
                placeholder="Категория"
              ></Combobox>
            )}
          />
          <Controller
            name="workType"
            control={control}
            render={({ field }) => (
              <Combobox
                className="w-full"
                value={field.value?.toString()}
                onChange={field.onChange}
                items={Object.entries(JOB_WORK_TYPES).map(([key, value]) => ({
                  value: key,
                  label: value,
                }))}
                placeholder="Тип работы"
              ></Combobox>
            )}
          />

          <Input
            type="number"
            {...register("minSalary")}
            placeholder="Минимальная зарплата"
          />

          {isDirty && <Button>Применить</Button>}

          {hasFilters && (
            <Button
              type="button"
              variant={"outline"}
              onClick={onReset}
            >
              Сбросить
            </Button>
          )}
        </form>

        {jobs.length === 0 && !isFetching && (
          <p className="text-center">
            Ничего не нашлось. Попробуйте изменить параметры поиска.
          </p>
        )}

        <div className="grid grow grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
          {jobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
            />
          ))}
          {isFetching &&
            Array.from({ length: 12 }).map((_, index) => (
              <Skeleton
                className="h-[260px]"
                key={index}
              />
            ))}

          {hasNextPage && <div ref={loadMoreRef}></div>}
        </div>
      </div>
    </main>
  );
}
