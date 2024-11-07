import client from "@/shared/api/client";
import { useMutation } from "@tanstack/react-query";
import type { PutCompaniesCompanyidMutationRequest, PutCompaniesCompanyidMutationResponse, PutCompaniesCompanyidPathParams, PutCompaniesCompanyid403, PutCompaniesCompanyid404 } from "../types/PutCompaniesCompanyid";
import type { UseMutationOptions } from "@tanstack/react-query";

 type PutCompaniesCompanyidClient = typeof client<PutCompaniesCompanyidMutationResponse, PutCompaniesCompanyid403 | PutCompaniesCompanyid404, PutCompaniesCompanyidMutationRequest>;
type PutCompaniesCompanyid = {
    data: PutCompaniesCompanyidMutationResponse;
    error: PutCompaniesCompanyid403 | PutCompaniesCompanyid404;
    request: PutCompaniesCompanyidMutationRequest;
    pathParams: PutCompaniesCompanyidPathParams;
    queryParams: never;
    headerParams: never;
    response: PutCompaniesCompanyidMutationResponse;
    client: {
        parameters: Partial<Parameters<PutCompaniesCompanyidClient>[0]>;
        return: Awaited<ReturnType<PutCompaniesCompanyidClient>>;
    };
};
/**
 * @link /companies/:companyId
 */
export function usePutCompaniesCompanyid(options: {
    mutation?: UseMutationOptions<PutCompaniesCompanyid["response"], PutCompaniesCompanyid["error"], {
        companyId: PutCompaniesCompanyidPathParams["companyId"];
        data: PutCompaniesCompanyid["request"];
    }>;
    client?: PutCompaniesCompanyid["client"]["parameters"];
} = {}) {
    const { mutation: mutationOptions, client: clientOptions = {} } = options ?? {};
    return useMutation({
        mutationFn: async ({ companyId, data }) => {
            const res = await client<PutCompaniesCompanyid["data"], PutCompaniesCompanyid["error"], PutCompaniesCompanyid["request"]>({
                method: "put",
                url: `/companies/${companyId}`,
                data,
                ...clientOptions
            });
            return res.data;
        },
        ...mutationOptions
    });
}