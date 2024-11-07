import { useForm } from "react-hook-form";
import { CircleUser, Terminal } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute, Link, Navigate } from "@tanstack/react-router";

import { Input } from "../../shared/ui/input";
import { Button } from "../../shared/ui/button";
import { useMe } from "../../entity/user/hooks/use-me";
import { Alert, AlertDescription, AlertTitle } from "../../shared/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "../../shared/ui/card";
import { PostAuthLoginMutationRequest, usePostAuthLogin } from "../../__generated__";

type LoginSearch = {
  redirect?: string;
};

export const Route = createFileRoute("/_auth/login")({
  component: () => <Login />,
  validateSearch: (params): LoginSearch => {
    return {
      redirect: params.redirect as string,
    };
  },
});

function Login() {
  const queryClient = useQueryClient();
  const { redirect } = Route.useSearch();
  const { data: me } = useMe();
  const { register, handleSubmit } = useForm<PostAuthLoginMutationRequest>();

  const { mutateAsync, error } = usePostAuthLogin();

  const onSubmit = handleSubmit((data) => {
    return mutateAsync({ data }).then((response) => {
      queryClient.invalidateQueries();
      queryClient.setQueryData(["Me"], response);
    });
  });

  if (me) {
    return (
      <Navigate
        to={redirect ?? "/jobs"}
        replace={true}
      />
    );
  }

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <div className="mb-4 flex size-10 items-center justify-center rounded border border-blue-100 p-1 text-blue-500 shadow">
          <CircleUser />
        </div>
        <CardTitle>Добро пожаловать</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          className="flex flex-col gap-2"
          onSubmit={onSubmit}
          autoComplete="off"
        >
          <p className="mb-4 text-sm">Заполните форму для входа</p>

          <div>
            <p className="text-sm font-medium">Почта</p>
            <Input
              {...register("email", { required: true })}
              name="email"
              type="email"
              placeholder="Почта"
            />
          </div>

          <div className="mb-6">
            <p className="text-sm font-medium">Пароль</p>
            <Input
              {...register("password", { required: true })}
              name="password"
              type="password"
              placeholder="Пароль"
            />
          </div>

          <Button
            className="mb-2"
            variant={"default"}
            type="submit"
          >
            Войти
          </Button>

          {error && (
            <Alert
              className="mb-4"
              variant={"destructive"}
            >
              <Terminal className="size-4" />
              <AlertTitle>Произошла ошибка</AlertTitle>
              <AlertDescription>{error.message}</AlertDescription>
            </Alert>
          )}

          <p className="text-xs">
            Нет аккаунта?{" "}
            <Link
              className="underline"
              to="/register"
            >
              Зарегистрируйтесь
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
