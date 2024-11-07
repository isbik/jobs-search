import client from "@/shared/api/client";
import type { ResponseConfig } from "@/shared/api/client";
import type { GetCompaniesQueryResponse, GetCompaniesQueryParams } from "../types/GetCompanies";

 /**
 * @link /companies
 */
export async function getCompanies(params?: GetCompaniesQueryParams, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<GetCompaniesQueryResponse>["data"]> {
    const res = await client<GetCompaniesQueryResponse>({ method: "get", url: `/companies`, params, ...options });
    return res.data;
}