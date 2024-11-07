import { useForm } from "react-hook-form";
import { CircleUser, Rocket, Terminal } from "lucide-react";
import { createFileRoute, Link, Navigate } from "@tanstack/react-router";

import { Input } from "../../shared/ui/input";
import { Button } from "../../shared/ui/button";
import { useMe } from "../../entity/user/hooks/use-me";
import { Alert, AlertDescription, AlertTitle } from "../../shared/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "../../shared/ui/card";
import {
  PostAuthRegisterMutationRequest,
  usePostAuthRegister,
} from "../../__generated__";

export const Route = createFileRoute("/_auth/register")({
  component: () => <Register />,
});

function Register() {
  const { data: me } = useMe();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PostAuthRegisterMutationRequest & { confirmPassword: string }>();

  const { mutate, isSuccess, error } = usePostAuthRegister();

  const onSubmit = handleSubmit((data) => {
    return mutate({ data });
  });

  if (me) {
    return (
      <Navigate
        to={me.isAdmin ? "/admin/jobs" : "/jobs"}
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
        <CardTitle>Создание аккаунта</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          className="flex flex-col gap-2"
          onSubmit={onSubmit}
        >
          <div>
            <p className="text-sm font-medium">Почта</p>
            <Input
              {...register("email", { required: true })}
              name="email"
              type="email"
              placeholder="Почта"
            />
          </div>

          <div>
            <p className="text-sm font-medium">Пароль</p>
            <Input
              {...register("password", { required: true })}
              name="password"
              type="password"
              placeholder="Пароль"
            />
          </div>

          <div className="mb-6">
            <p className="text-sm font-medium">Повторите пароль</p>
            <Input
              {...register("confirmPassword", {
                required: true,
                validate: (value) => value === watch("password") || "Пароли не совпадают",
              })}
              name="confirmPassword"
              type="password"
              placeholder="Повторите пароль"
            />
            {errors.confirmPassword && (
              <p className="text-xs text-red-500">{errors.confirmPassword.message}</p>
            )}
          </div>

          <Button
            className="mb-2"
            variant={"default"}
            type="submit"
          >
            Регистрация
          </Button>

          {isSuccess && (
            <Alert
              className="mb-4"
              variant={"success"}
            >
              <Rocket className="size-4" />
              <AlertTitle>Аккаунт создан!</AlertTitle>
              <AlertDescription>Теперь вы можете войти в свой аккаунт</AlertDescription>
            </Alert>
          )}

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
            Есть аккаунт?{" "}
            <Link
              className="underline"
              to="/login"
            >
              Войти
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
