import client from "@/shared/api/client";
import type { ResponseConfig } from "@/shared/api/client";
import type { PutCompaniesCompanyidMutationRequest, PutCompaniesCompanyidMutationResponse, PutCompaniesCompanyidPathParams } from "../types/PutCompaniesCompanyid";

 /**
 * @link /companies/:companyId
 */
export async function putCompaniesCompanyid(companyId: PutCompaniesCompanyidPathParams["companyId"], data: PutCompaniesCompanyidMutationRequest, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<PutCompaniesCompanyidMutationResponse>["data"]> {
    const res = await client<PutCompaniesCompanyidMutationResponse, PutCompaniesCompanyidMutationRequest>({ method: "put", url: `/companies/${companyId}`, data, ...options });
    return res.data;
}