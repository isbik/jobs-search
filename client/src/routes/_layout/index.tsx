import { createFileRoute, Link } from "@tanstack/react-router";

import { Button } from "../../shared/ui/button";
import { useGetJobs } from "../../__generated__";
import { JobCard } from "../../entity/jobs/ui/job-card";

export const Route = createFileRoute("/_layout/")({
  component: () => <Index />,
});

export default function Index() {
  const { data } = useGetJobs({
    limit: 3,
    isFeatured: true,
  });
  const jobs = data?.items || [];

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="w-full bg-gray-100 py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Найдите работу своей мечты
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  Тысячи вакансий от лучших компаний России ждут вас. Начните свой поиск
                  сейчас!
                </p>
              </div>
              <Button asChild>
                <Link to="/search/jobs">Найти вакансию</Link>
              </Button>
            </div>
          </div>
        </section>
        <section className="w-full bg-gray-100 py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="mb-8 text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Актуальные вакансии
            </h2>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
              {jobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                />
              ))}
            </div>
            <div className="mt-8 text-center">
              <Button
                variant="outline"
                asChild
              >
                <Link to="/search/jobs">Показать больше вакансий</Link>
              </Button>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ищете талантливых сотрудников?
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  Разместите вашу вакансию на РаботаПоиск и найдите идеального кандидата
                  среди тысяч профессионалов.
                </p>
              </div>
              <Button
                size="lg"
                asChild
              >
                <Link to="/jobs/create">Разместить вакансию</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
