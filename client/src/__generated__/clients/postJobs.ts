import client from "@/shared/api/client";
import type { ResponseConfig } from "@/shared/api/client";
import type { PostJobsMutationRequest, PostJobsMutationResponse } from "../types/PostJobs";

 /**
 * @link /jobs
 */
export async function postJobs(data: PostJobsMutationRequest, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<PostJobsMutationResponse>["data"]> {
    const res = await client<PostJobsMutationResponse, PostJobsMutationRequest>({ method: "post", url: `/jobs`, data, ...options });
    return res.data;
}