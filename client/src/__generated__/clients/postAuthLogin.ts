import client from "@/shared/api/client";
import type { ResponseConfig } from "@/shared/api/client";
import type { PostAuthLoginMutationRequest, PostAuthLoginMutationResponse } from "../types/PostAuthLogin";

 /**
 * @link /auth/login
 */
export async function postAuthLogin(data: PostAuthLoginMutationRequest, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<PostAuthLoginMutationResponse>["data"]> {
    const res = await client<PostAuthLoginMutationResponse, PostAuthLoginMutationRequest>({ method: "post", url: `/auth/login`, data, ...options });
    return res.data;
}