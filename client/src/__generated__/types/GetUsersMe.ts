import type { User } from "./User";

 /**
 * @description Get current user
*/
export type GetUsersMe200 = User;
/**
 * @description Get current user
*/
export type GetUsersMeQueryResponse = User;
export type GetUsersMeQuery = {
    Response: GetUsersMeQueryResponse;
};