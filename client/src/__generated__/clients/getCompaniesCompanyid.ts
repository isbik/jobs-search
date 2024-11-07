import client from "@/shared/api/client";
import type { ResponseConfig } from "@/shared/api/client";
import type { GetCompaniesCompanyidQueryResponse, GetCompaniesCompanyidPathParams } from "../types/GetCompaniesCompanyid";

 /**
 * @link /companies/:companyId
 */
export async function getCompaniesCompanyid(companyId: GetCompaniesCompanyidPathParams["companyId"], options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<GetCompaniesCompanyidQueryResponse>["data"]> {
    const res = await client<GetCompaniesCompanyidQueryResponse>({ method: "get", url: `/companies/${companyId}`, ...options });
    return res.data;
}