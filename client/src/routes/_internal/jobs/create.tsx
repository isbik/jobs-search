import { X } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { Badge } from "@/shared/ui/badge";

import { Input } from "../../../shared/ui/input";
import { Button } from "../../../shared/ui/button";
import { Textarea } from "../../../shared/ui/textarea";
import { JOB_WORK_TYPES, JOB_EXPERIENCE } from "../../../entity/jobs/constants";
import { useJobCategories } from "../../../entity/jobs/hooks/use-job-categories";
import { Card, CardContent, CardHeader, CardTitle } from "../../../shared/ui/card";
import {
  getInternalJobsQueryKey,
  PostJobsMutationRequest,
  usePostJobs,
} from "../../../__generated__";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../shared/ui/select";

export const Route = createFileRoute("/_internal/jobs/create")({
  component: JobsCreate,
});

function JobsCreate() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { register, handleSubmit, control } = useForm<
    Omit<PostJobsMutationRequest, "skills"> & {
      skills: { value: string }[];
    }
  >({
    defaultValues: {
      workType: "full-time",
      experience: "from_1_year_to_3_years",
    },
  });

  const { categories } = useJobCategories();

  const { mutateAsync } = usePostJobs();

  const onSubmit = handleSubmit((data) => {
    mutateAsync({
      data: {
        ...data,
        skills: data.skills.map(({ value }) => value),
      },
    }).then(() => {
      queryClient.invalidateQueries({
        queryKey: getInternalJobsQueryKey(),
      });

      navigate({ to: "/jobs" });
    });
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills",
  });

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Добавить вакансию</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={onSubmit}
          className="flex flex-col gap-2"
        >
          <div>
            <p className="text-sm font-medium">Название вакансии</p>
            <Input
              {...register("title", { required: true })}
              name="title"
              placeholder="Название вакансии"
            />
          </div>

          <div>
            <p className="text-sm font-medium">Категория</p>
            <Controller
              name="categoryId"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value?.toString()}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Категория" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(({ id, name }) => (
                      <SelectItem
                        key={id}
                        value={String(id)}
                      >
                        {name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div>
            <p className="text-sm font-medium">Ссылка</p>
            <Input
              {...register("url")}
              name="url"
              placeholder="Ссылка"
              type="url"
            />
          </div>

          <div>
            <p className="text-sm font-medium">Описание</p>
            <Textarea
              {...register("description", { required: true })}
              name="description"
              placeholder="Описание"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-sm font-medium">Мин. зарплата</p>
              <Input
                {...register("minSalary")}
                name="minSalary"
                placeholder="Мин. зарплата"
                type="number"
              />
            </div>
            <div>
              <p className="text-sm font-medium">Макс. зарплата</p>
              <Input
                {...register("maxSalary")}
                name="maxSalary"
                placeholder="Макс. зарплата"
                type="number"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-sm font-medium">Формат работы</p>
              <Controller
                name="workType"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Формат работы" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(JOB_WORK_TYPES).map(([key, value]) => (
                        <SelectItem
                          key={key}
                          value={key}
                        >
                          {value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div>
              <p className="text-sm font-medium">Опыт работы</p>
              <Controller
                name="experience"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Опыт работы" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(JOB_EXPERIENCE).map(([key, value]) => (
                        <SelectItem
                          key={key}
                          value={key}
                        >
                          {value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          <div>
            <p className="text-sm font-medium">Теги</p>
            <div className="flex flex-wrap items-center gap-2">
              {fields.map((tag, index) => {
                return (
                  <Badge
                    variant={"outline"}
                    key={tag.id}
                    className="flex items-center"
                  >
                    {tag.value}
                    <button
                      className="ml-1"
                      type="button"
                      onClick={() => remove(index)}
                    >
                      <X className="size-4" />
                    </button>
                  </Badge>
                );
              })}
              <Input
                placeholder="Добавить тег"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    const value = e.currentTarget.value.trim();

                    if (value) {
                      append({ value });
                      e.currentTarget.value = "";
                    }
                  }
                }}
              />
            </div>
          </div>
          <Button
            type="submit"
            className="mt-4"
          >
            Опубликовать вакансию
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
