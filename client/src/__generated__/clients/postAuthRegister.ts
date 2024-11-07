import client from "@/shared/api/client";
import type { ResponseConfig } from "@/shared/api/client";
import type { PostAuthRegisterMutationRequest, PostAuthRegisterMutationResponse } from "../types/PostAuthRegister";

 /**
 * @link /auth/register
 */
export async function postAuthRegister(data: PostAuthRegisterMutationRequest, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<PostAuthRegisterMutationResponse>["data"]> {
    const res = await client<PostAuthRegisterMutationResponse, PostAuthRegisterMutationRequest>({ method: "post", url: `/auth/register`, data, ...options });
    return res.data;
}