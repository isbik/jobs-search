import client from "@/shared/api/client";
import { useQuery, queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import type { GetUsersMeQueryResponse } from "../types/GetUsersMe";
import type { QueryObserverOptions, UseQueryResult, QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from "@tanstack/react-query";

 type GetUsersMeClient = typeof client<GetUsersMeQueryResponse, Error, never>;
type GetUsersMe = {
    data: GetUsersMeQueryResponse;
    error: Error;
    request: never;
    pathParams: never;
    queryParams: never;
    headerParams: never;
    response: GetUsersMeQueryResponse;
    client: {
        parameters: Partial<Parameters<GetUsersMeClient>[0]>;
        return: Awaited<ReturnType<GetUsersMeClient>>;
    };
};
export const getUsersMeQueryKey = () => [{ url: "/users/me" }] as const;
export type GetUsersMeQueryKey = ReturnType<typeof getUsersMeQueryKey>;
export function getUsersMeQueryOptions(options: GetUsersMe["client"]["parameters"] = {}) {
    const queryKey = getUsersMeQueryKey();
    return queryOptions({
        queryKey,
        queryFn: async () => {
            const res = await client<GetUsersMe["data"], GetUsersMe["error"]>({
                method: "get",
                url: `/users/me`,
                ...options
            });
            return res.data;
        },
    });
}
/**
 * @link /users/me
 */
export function useGetUsersMe<TData = GetUsersMe["response"], TQueryData = GetUsersMe["response"], TQueryKey extends QueryKey = GetUsersMeQueryKey>(options: {
    query?: Partial<QueryObserverOptions<GetUsersMe["response"], GetUsersMe["error"], TData, TQueryData, TQueryKey>>;
    client?: GetUsersMe["client"]["parameters"];
} = {}): UseQueryResult<TData, GetUsersMe["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? getUsersMeQueryKey();
    const query = useQuery({
        ...getUsersMeQueryOptions(clientOptions) as unknown as QueryObserverOptions,
        queryKey,
        ...queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">
    }) as UseQueryResult<TData, GetUsersMe["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}
export const getUsersMeSuspenseQueryKey = () => [{ url: "/users/me" }] as const;
export type GetUsersMeSuspenseQueryKey = ReturnType<typeof getUsersMeSuspenseQueryKey>;
export function getUsersMeSuspenseQueryOptions(options: GetUsersMe["client"]["parameters"] = {}) {
    const queryKey = getUsersMeSuspenseQueryKey();
    return queryOptions({
        queryKey,
        queryFn: async () => {
            const res = await client<GetUsersMe["data"], GetUsersMe["error"]>({
                method: "get",
                url: `/users/me`,
                ...options
            });
            return res.data;
        },
    });
}
/**
 * @link /users/me
 */
export function useGetUsersMeSuspense<TData = GetUsersMe["response"], TQueryKey extends QueryKey = GetUsersMeSuspenseQueryKey>(options: {
    query?: Partial<UseSuspenseQueryOptions<GetUsersMe["response"], GetUsersMe["error"], TData, TQueryKey>>;
    client?: GetUsersMe["client"]["parameters"];
} = {}): UseSuspenseQueryResult<TData, GetUsersMe["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? getUsersMeSuspenseQueryKey();
    const query = useSuspenseQuery({
        ...getUsersMeSuspenseQueryOptions(clientOptions) as unknown as UseSuspenseQueryOptions,
        queryKey,
        ...queryOptions as unknown as Omit<UseSuspenseQueryOptions, "queryKey">
    }) as UseSuspenseQueryResult<TData, GetUsersMe["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}