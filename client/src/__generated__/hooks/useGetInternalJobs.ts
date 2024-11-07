import client from "@/shared/api/client";
import { useQuery, queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import type { GetInternalJobsQueryResponse, GetInternalJobsQueryParams, GetInternalJobs403 } from "../types/GetInternalJobs";
import type { QueryObserverOptions, UseQueryResult, QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from "@tanstack/react-query";

 type GetInternalJobsClient = typeof client<GetInternalJobsQueryResponse, GetInternalJobs403, never>;
type GetInternalJobs = {
    data: GetInternalJobsQueryResponse;
    error: GetInternalJobs403;
    request: never;
    pathParams: never;
    queryParams: GetInternalJobsQueryParams;
    headerParams: never;
    response: GetInternalJobsQueryResponse;
    client: {
        parameters: Partial<Parameters<GetInternalJobsClient>[0]>;
        return: Awaited<ReturnType<GetInternalJobsClient>>;
    };
};
export const getInternalJobsQueryKey = (params?: GetInternalJobs["queryParams"]) => [{ url: "/internal/jobs" }, ...(params ? [params] : [])] as const;
export type GetInternalJobsQueryKey = ReturnType<typeof getInternalJobsQueryKey>;
export function getInternalJobsQueryOptions(params?: GetInternalJobs["queryParams"], options: GetInternalJobs["client"]["parameters"] = {}) {
    const queryKey = getInternalJobsQueryKey(params);
    return queryOptions({
        queryKey,
        queryFn: async () => {
            const res = await client<GetInternalJobs["data"], GetInternalJobs["error"]>({
                method: "get",
                url: `/internal/jobs`,
                params,
                ...options
            });
            return res.data;
        },
    });
}
/**
 * @link /internal/jobs
 */
export function useGetInternalJobs<TData = GetInternalJobs["response"], TQueryData = GetInternalJobs["response"], TQueryKey extends QueryKey = GetInternalJobsQueryKey>(params?: GetInternalJobs["queryParams"], options: {
    query?: Partial<QueryObserverOptions<GetInternalJobs["response"], GetInternalJobs["error"], TData, TQueryData, TQueryKey>>;
    client?: GetInternalJobs["client"]["parameters"];
} = {}): UseQueryResult<TData, GetInternalJobs["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? getInternalJobsQueryKey(params);
    const query = useQuery({
        ...getInternalJobsQueryOptions(params, clientOptions) as unknown as QueryObserverOptions,
        queryKey,
        ...queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">
    }) as UseQueryResult<TData, GetInternalJobs["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}
export const getInternalJobsSuspenseQueryKey = (params?: GetInternalJobs["queryParams"]) => [{ url: "/internal/jobs" }, ...(params ? [params] : [])] as const;
export type GetInternalJobsSuspenseQueryKey = ReturnType<typeof getInternalJobsSuspenseQueryKey>;
export function getInternalJobsSuspenseQueryOptions(params?: GetInternalJobs["queryParams"], options: GetInternalJobs["client"]["parameters"] = {}) {
    const queryKey = getInternalJobsSuspenseQueryKey(params);
    return queryOptions({
        queryKey,
        queryFn: async () => {
            const res = await client<GetInternalJobs["data"], GetInternalJobs["error"]>({
                method: "get",
                url: `/internal/jobs`,
                params,
                ...options
            });
            return res.data;
        },
    });
}
/**
 * @link /internal/jobs
 */
export function useGetInternalJobsSuspense<TData = GetInternalJobs["response"], TQueryKey extends QueryKey = GetInternalJobsSuspenseQueryKey>(params?: GetInternalJobs["queryParams"], options: {
    query?: Partial<UseSuspenseQueryOptions<GetInternalJobs["response"], GetInternalJobs["error"], TData, TQueryKey>>;
    client?: GetInternalJobs["client"]["parameters"];
} = {}): UseSuspenseQueryResult<TData, GetInternalJobs["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? getInternalJobsSuspenseQueryKey(params);
    const query = useSuspenseQuery({
        ...getInternalJobsSuspenseQueryOptions(params, clientOptions) as unknown as UseSuspenseQueryOptions,
        queryKey,
        ...queryOptions as unknown as Omit<UseSuspenseQueryOptions, "queryKey">
    }) as UseSuspenseQueryResult<TData, GetInternalJobs["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}