import client from "@/shared/api/client";
import { useQuery, queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import type { GetJobsCategoriesQueryResponse } from "../types/GetJobsCategories";
import type { QueryObserverOptions, UseQueryResult, QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from "@tanstack/react-query";

 type GetJobsCategoriesClient = typeof client<GetJobsCategoriesQueryResponse, Error, never>;
type GetJobsCategories = {
    data: GetJobsCategoriesQueryResponse;
    error: Error;
    request: never;
    pathParams: never;
    queryParams: never;
    headerParams: never;
    response: GetJobsCategoriesQueryResponse;
    client: {
        parameters: Partial<Parameters<GetJobsCategoriesClient>[0]>;
        return: Awaited<ReturnType<GetJobsCategoriesClient>>;
    };
};
export const getJobsCategoriesQueryKey = () => [{ url: "/jobs/categories" }] as const;
export type GetJobsCategoriesQueryKey = ReturnType<typeof getJobsCategoriesQueryKey>;
export function getJobsCategoriesQueryOptions(options: GetJobsCategories["client"]["parameters"] = {}) {
    const queryKey = getJobsCategoriesQueryKey();
    return queryOptions({
        queryKey,
        queryFn: async () => {
            const res = await client<GetJobsCategories["data"], GetJobsCategories["error"]>({
                method: "get",
                url: `/jobs/categories`,
                ...options
            });
            return res.data;
        },
    });
}
/**
 * @link /jobs/categories
 */
export function useGetJobsCategories<TData = GetJobsCategories["response"], TQueryData = GetJobsCategories["response"], TQueryKey extends QueryKey = GetJobsCategoriesQueryKey>(options: {
    query?: Partial<QueryObserverOptions<GetJobsCategories["response"], GetJobsCategories["error"], TData, TQueryData, TQueryKey>>;
    client?: GetJobsCategories["client"]["parameters"];
} = {}): UseQueryResult<TData, GetJobsCategories["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? getJobsCategoriesQueryKey();
    const query = useQuery({
        ...getJobsCategoriesQueryOptions(clientOptions) as unknown as QueryObserverOptions,
        queryKey,
        ...queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">
    }) as UseQueryResult<TData, GetJobsCategories["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}
export const getJobsCategoriesSuspenseQueryKey = () => [{ url: "/jobs/categories" }] as const;
export type GetJobsCategoriesSuspenseQueryKey = ReturnType<typeof getJobsCategoriesSuspenseQueryKey>;
export function getJobsCategoriesSuspenseQueryOptions(options: GetJobsCategories["client"]["parameters"] = {}) {
    const queryKey = getJobsCategoriesSuspenseQueryKey();
    return queryOptions({
        queryKey,
        queryFn: async () => {
            const res = await client<GetJobsCategories["data"], GetJobsCategories["error"]>({
                method: "get",
                url: `/jobs/categories`,
                ...options
            });
            return res.data;
        },
    });
}
/**
 * @link /jobs/categories
 */
export function useGetJobsCategoriesSuspense<TData = GetJobsCategories["response"], TQueryKey extends QueryKey = GetJobsCategoriesSuspenseQueryKey>(options: {
    query?: Partial<UseSuspenseQueryOptions<GetJobsCategories["response"], GetJobsCategories["error"], TData, TQueryKey>>;
    client?: GetJobsCategories["client"]["parameters"];
} = {}): UseSuspenseQueryResult<TData, GetJobsCategories["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? getJobsCategoriesSuspenseQueryKey();
    const query = useSuspenseQuery({
        ...getJobsCategoriesSuspenseQueryOptions(clientOptions) as unknown as UseSuspenseQueryOptions,
        queryKey,
        ...queryOptions as unknown as Omit<UseSuspenseQueryOptions, "queryKey">
    }) as UseSuspenseQueryResult<TData, GetJobsCategories["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}