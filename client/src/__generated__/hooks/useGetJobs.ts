import client from "@/shared/api/client";
import { useQuery, queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import type { GetJobsQueryResponse, GetJobsQueryParams } from "../types/GetJobs";
import type { QueryObserverOptions, UseQueryResult, QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from "@tanstack/react-query";

 type GetJobsClient = typeof client<GetJobsQueryResponse, Error, never>;
type GetJobs = {
    data: GetJobsQueryResponse;
    error: Error;
    request: never;
    pathParams: never;
    queryParams: GetJobsQueryParams;
    headerParams: never;
    response: GetJobsQueryResponse;
    client: {
        parameters: Partial<Parameters<GetJobsClient>[0]>;
        return: Awaited<ReturnType<GetJobsClient>>;
    };
};
export const getJobsQueryKey = (params?: GetJobs["queryParams"]) => [{ url: "/jobs" }, ...(params ? [params] : [])] as const;
export type GetJobsQueryKey = ReturnType<typeof getJobsQueryKey>;
export function getJobsQueryOptions(params?: GetJobs["queryParams"], options: GetJobs["client"]["parameters"] = {}) {
    const queryKey = getJobsQueryKey(params);
    return queryOptions({
        queryKey,
        queryFn: async () => {
            const res = await client<GetJobs["data"], GetJobs["error"]>({
                method: "get",
                url: `/jobs`,
                params,
                ...options
            });
            return res.data;
        },
    });
}
/**
 * @link /jobs
 */
export function useGetJobs<TData = GetJobs["response"], TQueryData = GetJobs["response"], TQueryKey extends QueryKey = GetJobsQueryKey>(params?: GetJobs["queryParams"], options: {
    query?: Partial<QueryObserverOptions<GetJobs["response"], GetJobs["error"], TData, TQueryData, TQueryKey>>;
    client?: GetJobs["client"]["parameters"];
} = {}): UseQueryResult<TData, GetJobs["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? getJobsQueryKey(params);
    const query = useQuery({
        ...getJobsQueryOptions(params, clientOptions) as unknown as QueryObserverOptions,
        queryKey,
        ...queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">
    }) as UseQueryResult<TData, GetJobs["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}
export const getJobsSuspenseQueryKey = (params?: GetJobs["queryParams"]) => [{ url: "/jobs" }, ...(params ? [params] : [])] as const;
export type GetJobsSuspenseQueryKey = ReturnType<typeof getJobsSuspenseQueryKey>;
export function getJobsSuspenseQueryOptions(params?: GetJobs["queryParams"], options: GetJobs["client"]["parameters"] = {}) {
    const queryKey = getJobsSuspenseQueryKey(params);
    return queryOptions({
        queryKey,
        queryFn: async () => {
            const res = await client<GetJobs["data"], GetJobs["error"]>({
                method: "get",
                url: `/jobs`,
                params,
                ...options
            });
            return res.data;
        },
    });
}
/**
 * @link /jobs
 */
export function useGetJobsSuspense<TData = GetJobs["response"], TQueryKey extends QueryKey = GetJobsSuspenseQueryKey>(params?: GetJobs["queryParams"], options: {
    query?: Partial<UseSuspenseQueryOptions<GetJobs["response"], GetJobs["error"], TData, TQueryKey>>;
    client?: GetJobs["client"]["parameters"];
} = {}): UseSuspenseQueryResult<TData, GetJobs["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? getJobsSuspenseQueryKey(params);
    const query = useSuspenseQuery({
        ...getJobsSuspenseQueryOptions(params, clientOptions) as unknown as UseSuspenseQueryOptions,
        queryKey,
        ...queryOptions as unknown as Omit<UseSuspenseQueryOptions, "queryKey">
    }) as UseSuspenseQueryResult<TData, GetJobs["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}