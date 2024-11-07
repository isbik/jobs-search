import client from "@/shared/api/client";
import type { ResponseConfig } from "@/shared/api/client";
import type { GetUsersMeQueryResponse } from "../types/GetUsersMe";

 /**
 * @link /users/me
 */
export async function getUsersMe(options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<GetUsersMeQueryResponse>["data"]> {
    const res = await client<GetUsersMeQueryResponse>({ method: "get", url: `/users/me`, ...options });
    return res.data;
}