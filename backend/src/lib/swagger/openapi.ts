import { z } from "zod";

interface RequestJsonBody<T> {
  schema: z.Schema<T>;
  example?: T;
}

export const requestBodyJson = <T>({ schema, example }: RequestJsonBody<T>) => {
  return {
    body: {
      content: {
        "application/json": {
          schema,
          example,
        },
      },
    },
  };
};

interface SuccessJsonResponseParams<T> {
  schema: z.Schema<T>;
  description: string;
}

export const successJsonResponse = <T>({
  schema,
  description,
}: SuccessJsonResponseParams<T>) => {
  return {
    content: {
      "application/json": {
        schema,
      },
    },
    description,
  };
};

interface ErrorResponseParams {
  description: string;
}

export const errorJsonResponse = ({ description }: ErrorResponseParams) => {
  return {
    content: {
      "application/json": {
        schema: z.object({
          message: z.string(),
        }),
      },
    },
    description,
  };
};

interface PaginatedJsonResponseParams<T> {
  schema: z.Schema<T>;
  description: string;
}

export const paginatedJsonResponse = <T>({
  schema,
  description,
}: PaginatedJsonResponseParams<T>) => {
  return {
    content: {
      "application/json": {
        schema: z.object({
          total: z.number(),
          items: z.array(schema),
        }),
      },
    },
    description,
  };
};
