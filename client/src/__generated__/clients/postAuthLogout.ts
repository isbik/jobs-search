import client from "@/shared/api/client";
import type { ResponseConfig } from "@/shared/api/client";
import type { PostAuthLogoutMutationResponse } from "../types/PostAuthLogout";

 /**
 * @link /auth/logout
 */
export async function postAuthLogout(options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<PostAuthLogoutMutationResponse>["data"]> {
    const res = await client<PostAuthLogoutMutationResponse>({ method: "post", url: `/auth/logout`, ...options });
    return res.data;
}