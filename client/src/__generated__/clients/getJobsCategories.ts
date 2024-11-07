import client from "@/shared/api/client";
import type { ResponseConfig } from "@/shared/api/client";
import type { GetJobsCategoriesQueryResponse } from "../types/GetJobsCategories";

 /**
 * @link /jobs/categories
 */
export async function getJobsCategories(options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<GetJobsCategoriesQueryResponse>["data"]> {
    const res = await client<GetJobsCategoriesQueryResponse>({ method: "get", url: `/jobs/categories`, ...options });
    return res.data;
}