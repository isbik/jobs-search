import client from "@/shared/api/client";
import type { ResponseConfig } from "@/shared/api/client";
import type { GetInternalJobsQueryResponse, GetInternalJobsQueryParams } from "../types/GetInternalJobs";

 /**
 * @link /internal/jobs
 */
export async function getInternalJobs(params?: GetInternalJobsQueryParams, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<GetInternalJobsQueryResponse>["data"]> {
    const res = await client<GetInternalJobsQueryResponse>({ method: "get", url: `/internal/jobs`, params, ...options });
    return res.data;
}