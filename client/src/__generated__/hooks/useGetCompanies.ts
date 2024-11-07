import client from "@/shared/api/client";
import { useQuery, queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import type { GetCompaniesQueryResponse, GetCompaniesQueryParams } from "../types/GetCompanies";
import type { QueryObserverOptions, UseQueryResult, QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from "@tanstack/react-query";

 type GetCompaniesClient = typeof client<GetCompaniesQueryResponse, Error, never>;
type GetCompanies = {
    data: GetCompaniesQueryResponse;
    error: Error;
    request: never;
    pathParams: never;
    queryParams: GetCompaniesQueryParams;
    headerParams: never;
    response: GetCompaniesQueryResponse;
    client: {
        parameters: Partial<Parameters<GetCompaniesClient>[0]>;
        return: Awaited<ReturnType<GetCompaniesClient>>;
    };
};
export const getCompaniesQueryKey = (params?: GetCompanies["queryParams"]) => [{ url: "/companies" }, ...(params ? [params] : [])] as const;
export type GetCompaniesQueryKey = ReturnType<typeof getCompaniesQueryKey>;
export function getCompaniesQueryOptions(params?: GetCompanies["queryParams"], options: GetCompanies["client"]["parameters"] = {}) {
    const queryKey = getCompaniesQueryKey(params);
    return queryOptions({
        queryKey,
        queryFn: async () => {
            const res = await client<GetCompanies["data"], GetCompanies["error"]>({
                method: "get",
                url: `/companies`,
                params,
                ...options
            });
            return res.data;
        },
    });
}
/**
 * @link /companies
 */
export function useGetCompanies<TData = GetCompanies["response"], TQueryData = GetCompanies["response"], TQueryKey extends QueryKey = GetCompaniesQueryKey>(params?: GetCompanies["queryParams"], options: {
    query?: Partial<QueryObserverOptions<GetCompanies["response"], GetCompanies["error"], TData, TQueryData, TQueryKey>>;
    client?: GetCompanies["client"]["parameters"];
} = {}): UseQueryResult<TData, GetCompanies["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? getCompaniesQueryKey(params);
    const query = useQuery({
        ...getCompaniesQueryOptions(params, clientOptions) as unknown as QueryObserverOptions,
        queryKey,
        ...queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">
    }) as UseQueryResult<TData, GetCompanies["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}
export const getCompaniesSuspenseQueryKey = (params?: GetCompanies["queryParams"]) => [{ url: "/companies" }, ...(params ? [params] : [])] as const;
export type GetCompaniesSuspenseQueryKey = ReturnType<typeof getCompaniesSuspenseQueryKey>;
export function getCompaniesSuspenseQueryOptions(params?: GetCompanies["queryParams"], options: GetCompanies["client"]["parameters"] = {}) {
    const queryKey = getCompaniesSuspenseQueryKey(params);
    return queryOptions({
        queryKey,
        queryFn: async () => {
            const res = await client<GetCompanies["data"], GetCompanies["error"]>({
                method: "get",
                url: `/companies`,
                params,
                ...options
            });
            return res.data;
        },
    });
}
/**
 * @link /companies
 */
export function useGetCompaniesSuspense<TData = GetCompanies["response"], TQueryKey extends QueryKey = GetCompaniesSuspenseQueryKey>(params?: GetCompanies["queryParams"], options: {
    query?: Partial<UseSuspenseQueryOptions<GetCompanies["response"], GetCompanies["error"], TData, TQueryKey>>;
    client?: GetCompanies["client"]["parameters"];
} = {}): UseSuspenseQueryResult<TData, GetCompanies["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? getCompaniesSuspenseQueryKey(params);
    const query = useSuspenseQuery({
        ...getCompaniesSuspenseQueryOptions(params, clientOptions) as unknown as UseSuspenseQueryOptions,
        queryKey,
        ...queryOptions as unknown as Omit<UseSuspenseQueryOptions, "queryKey">
    }) as UseSuspenseQueryResult<TData, GetCompanies["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}