import client from "@/shared/api/client";
import type { ResponseConfig } from "@/shared/api/client";
import type { PostCompaniesMutationRequest, PostCompaniesMutationResponse } from "../types/PostCompanies";

 /**
 * @link /companies
 */
export async function postCompanies(data: PostCompaniesMutationRequest, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<PostCompaniesMutationResponse>["data"]> {
    const res = await client<PostCompaniesMutationResponse, PostCompaniesMutationRequest>({ method: "post", url: `/companies`, data, ...options });
    return res.data;
}