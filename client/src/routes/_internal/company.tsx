import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { useMe } from "@/entity/user/hooks/use-me";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import {
  PostCompaniesMutationRequest,
  usePostCompanies,
  usePutCompaniesCompanyid,
} from "@/__generated__";

export const Route = createFileRoute("/_internal/company")({
  component: InternalCompanyPage,
});

function InternalCompanyPage() {
  const queryClient = useQueryClient();
  const { data: me } = useMe();
  const company = me?.company;

  const {
    register,
    handleSubmit,
    formState: { isDirty },
  } = useForm<PostCompaniesMutationRequest>({
    values: {
      email: company?.email ?? "",
      name: company?.name ?? "",
      url: company?.url ?? "",
      logo: company?.logo ?? "",
    },
  });

  const { mutateAsync: createCompany } = usePostCompanies({
    mutation: {
      onSuccess: ({ id }, { data }) => {
        queryClient.setQueryData(["Me"], {
          ...me,
          company: { id, ...data },
        });
      },
    },
  });

  const { mutateAsync: updateCompany } = usePutCompaniesCompanyid({
    mutation: {
      onSuccess: (data) => {
        queryClient.setQueryData(["Me"], {
          ...me,
          company: data,
        });
      },
    },
  });

  const onSubmit = handleSubmit((data) => {
    if (company?.id) {
      return updateCompany({ companyId: company.id, data: data });
    } else {
      return createCompany({ data });
    }
  });

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Информация о компании</CardTitle>
      </CardHeader>

      <CardContent>
        <form
          className="flex flex-col gap-2"
          onSubmit={onSubmit}
        >
          <div>
            <p className="text-sm font-medium">
              Email адрес компании <span className="text-red-500">*</span>
            </p>
            <Input
              {...register("email", {
                required: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Некорректная почта",
                },
              })}
              name="email"
              placeholder="Email"
              type="email"
            />
          </div>

          <div>
            <p className="text-sm font-medium">
              Полное название компании <span className="text-red-500">*</span>
            </p>
            <Input
              {...register("name", {
                required: {
                  value: true,
                  message: "Данное поле обязательно для заполнения",
                },
              })}
              name="name"
              placeholder="Название компании"
            />
          </div>
          <div>
            <p className="text-sm font-medium">
              Ссылка на компанию <span className="text-red-500">*</span>
            </p>
            <Input
              {...register("url", {
                required: {
                  value: true,
                  message: "Данное поле обязательно для заполнения",
                },
              })}
              name="url"
              placeholder="https://example.com"
              type="url"
            />
          </div>

          <div className="mb-2">
            <p className="text-sm font-medium">
              Ссылка на логотип компании <span className="text-red-500">*</span>
            </p>
            <Input
              {...register("logo", {
                required: {
                  value: true,
                  message: "Данное поле обязательно для заполнения",
                },
              })}
              name="logo"
              placeholder="https://example.com/logo.png"
            />
          </div>
          <Button disabled={!isDirty}>Сохранить</Button>
        </form>
      </CardContent>
    </Card>
  );
}
