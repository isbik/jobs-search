import client from "@/shared/api/client";
import { useQuery, queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import type { GetCompaniesCompanyidQueryResponse, GetCompaniesCompanyidPathParams, GetCompaniesCompanyid404 } from "../types/GetCompaniesCompanyid";
import type { QueryObserverOptions, UseQueryResult, QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from "@tanstack/react-query";

 type GetCompaniesCompanyidClient = typeof client<GetCompaniesCompanyidQueryResponse, GetCompaniesCompanyid404, never>;
type GetCompaniesCompanyid = {
    data: GetCompaniesCompanyidQueryResponse;
    error: GetCompaniesCompanyid404;
    request: never;
    pathParams: GetCompaniesCompanyidPathParams;
    queryParams: never;
    headerParams: never;
    response: GetCompaniesCompanyidQueryResponse;
    client: {
        parameters: Partial<Parameters<GetCompaniesCompanyidClient>[0]>;
        return: Awaited<ReturnType<GetCompaniesCompanyidClient>>;
    };
};
export const getCompaniesCompanyidQueryKey = (companyId: GetCompaniesCompanyidPathParams["companyId"]) => [{ url: "/companies/:companyId", params: { companyId: companyId } }] as const;
export type GetCompaniesCompanyidQueryKey = ReturnType<typeof getCompaniesCompanyidQueryKey>;
export function getCompaniesCompanyidQueryOptions(companyId: GetCompaniesCompanyidPathParams["companyId"], options: GetCompaniesCompanyid["client"]["parameters"] = {}) {
    const queryKey = getCompaniesCompanyidQueryKey(companyId);
    return queryOptions({
        queryKey,
        queryFn: async () => {
            const res = await client<GetCompaniesCompanyid["data"], GetCompaniesCompanyid["error"]>({
                method: "get",
                url: `/companies/${companyId}`,
                ...options
            });
            return res.data;
        },
    });
}
/**
 * @link /companies/:companyId
 */
export function useGetCompaniesCompanyid<TData = GetCompaniesCompanyid["response"], TQueryData = GetCompaniesCompanyid["response"], TQueryKey extends QueryKey = GetCompaniesCompanyidQueryKey>(companyId: GetCompaniesCompanyidPathParams["companyId"], options: {
    query?: Partial<QueryObserverOptions<GetCompaniesCompanyid["response"], GetCompaniesCompanyid["error"], TData, TQueryData, TQueryKey>>;
    client?: GetCompaniesCompanyid["client"]["parameters"];
} = {}): UseQueryResult<TData, GetCompaniesCompanyid["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? getCompaniesCompanyidQueryKey(companyId);
    const query = useQuery({
        ...getCompaniesCompanyidQueryOptions(companyId, clientOptions) as unknown as QueryObserverOptions,
        queryKey,
        ...queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">
    }) as UseQueryResult<TData, GetCompaniesCompanyid["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}
export const getCompaniesCompanyidSuspenseQueryKey = (companyId: GetCompaniesCompanyidPathParams["companyId"]) => [{ url: "/companies/:companyId", params: { companyId: companyId } }] as const;
export type GetCompaniesCompanyidSuspenseQueryKey = ReturnType<typeof getCompaniesCompanyidSuspenseQueryKey>;
export function getCompaniesCompanyidSuspenseQueryOptions(companyId: GetCompaniesCompanyidPathParams["companyId"], options: GetCompaniesCompanyid["client"]["parameters"] = {}) {
    const queryKey = getCompaniesCompanyidSuspenseQueryKey(companyId);
    return queryOptions({
        queryKey,
        queryFn: async () => {
            const res = await client<GetCompaniesCompanyid["data"], GetCompaniesCompanyid["error"]>({
                method: "get",
                url: `/companies/${companyId}`,
                ...options
            });
            return res.data;
        },
    });
}
/**
 * @link /companies/:companyId
 */
export function useGetCompaniesCompanyidSuspense<TData = GetCompaniesCompanyid["response"], TQueryKey extends QueryKey = GetCompaniesCompanyidSuspenseQueryKey>(companyId: GetCompaniesCompanyidPathParams["companyId"], options: {
    query?: Partial<UseSuspenseQueryOptions<GetCompaniesCompanyid["response"], GetCompaniesCompanyid["error"], TData, TQueryKey>>;
    client?: GetCompaniesCompanyid["client"]["parameters"];
} = {}): UseSuspenseQueryResult<TData, GetCompaniesCompanyid["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? getCompaniesCompanyidSuspenseQueryKey(companyId);
    const query = useSuspenseQuery({
        ...getCompaniesCompanyidSuspenseQueryOptions(companyId, clientOptions) as unknown as UseSuspenseQueryOptions,
        queryKey,
        ...queryOptions as unknown as Omit<UseSuspenseQueryOptions, "queryKey">
    }) as UseSuspenseQueryResult<TData, GetCompaniesCompanyid["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}