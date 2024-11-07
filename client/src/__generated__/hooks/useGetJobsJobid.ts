import client from "@/shared/api/client";
import { useQuery, queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import type { GetJobsJobidQueryResponse, GetJobsJobidPathParams, GetJobsJobid404 } from "../types/GetJobsJobid";
import type { QueryObserverOptions, UseQueryResult, QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from "@tanstack/react-query";

 type GetJobsJobidClient = typeof client<GetJobsJobidQueryResponse, GetJobsJobid404, never>;
type GetJobsJobid = {
    data: GetJobsJobidQueryResponse;
    error: GetJobsJobid404;
    request: never;
    pathParams: GetJobsJobidPathParams;
    queryParams: never;
    headerParams: never;
    response: GetJobsJobidQueryResponse;
    client: {
        parameters: Partial<Parameters<GetJobsJobidClient>[0]>;
        return: Awaited<ReturnType<GetJobsJobidClient>>;
    };
};
export const getJobsJobidQueryKey = (jobId: GetJobsJobidPathParams["jobId"]) => [{ url: "/jobs/:jobId", params: { jobId: jobId } }] as const;
export type GetJobsJobidQueryKey = ReturnType<typeof getJobsJobidQueryKey>;
export function getJobsJobidQueryOptions(jobId: GetJobsJobidPathParams["jobId"], options: GetJobsJobid["client"]["parameters"] = {}) {
    const queryKey = getJobsJobidQueryKey(jobId);
    return queryOptions({
        queryKey,
        queryFn: async () => {
            const res = await client<GetJobsJobid["data"], GetJobsJobid["error"]>({
                method: "get",
                url: `/jobs/${jobId}`,
                ...options
            });
            return res.data;
        },
    });
}
/**
 * @link /jobs/:jobId
 */
export function useGetJobsJobid<TData = GetJobsJobid["response"], TQueryData = GetJobsJobid["response"], TQueryKey extends QueryKey = GetJobsJobidQueryKey>(jobId: GetJobsJobidPathParams["jobId"], options: {
    query?: Partial<QueryObserverOptions<GetJobsJobid["response"], GetJobsJobid["error"], TData, TQueryData, TQueryKey>>;
    client?: GetJobsJobid["client"]["parameters"];
} = {}): UseQueryResult<TData, GetJobsJobid["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? getJobsJobidQueryKey(jobId);
    const query = useQuery({
        ...getJobsJobidQueryOptions(jobId, clientOptions) as unknown as QueryObserverOptions,
        queryKey,
        ...queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">
    }) as UseQueryResult<TData, GetJobsJobid["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}
export const getJobsJobidSuspenseQueryKey = (jobId: GetJobsJobidPathParams["jobId"]) => [{ url: "/jobs/:jobId", params: { jobId: jobId } }] as const;
export type GetJobsJobidSuspenseQueryKey = ReturnType<typeof getJobsJobidSuspenseQueryKey>;
export function getJobsJobidSuspenseQueryOptions(jobId: GetJobsJobidPathParams["jobId"], options: GetJobsJobid["client"]["parameters"] = {}) {
    const queryKey = getJobsJobidSuspenseQueryKey(jobId);
    return queryOptions({
        queryKey,
        queryFn: async () => {
            const res = await client<GetJobsJobid["data"], GetJobsJobid["error"]>({
                method: "get",
                url: `/jobs/${jobId}`,
                ...options
            });
            return res.data;
        },
    });
}
/**
 * @link /jobs/:jobId
 */
export function useGetJobsJobidSuspense<TData = GetJobsJobid["response"], TQueryKey extends QueryKey = GetJobsJobidSuspenseQueryKey>(jobId: GetJobsJobidPathParams["jobId"], options: {
    query?: Partial<UseSuspenseQueryOptions<GetJobsJobid["response"], GetJobsJobid["error"], TData, TQueryKey>>;
    client?: GetJobsJobid["client"]["parameters"];
} = {}): UseSuspenseQueryResult<TData, GetJobsJobid["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? getJobsJobidSuspenseQueryKey(jobId);
    const query = useSuspenseQuery({
        ...getJobsJobidSuspenseQueryOptions(jobId, clientOptions) as unknown as UseSuspenseQueryOptions,
        queryKey,
        ...queryOptions as unknown as Omit<UseSuspenseQueryOptions, "queryKey">
    }) as UseSuspenseQueryResult<TData, GetJobsJobid["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}