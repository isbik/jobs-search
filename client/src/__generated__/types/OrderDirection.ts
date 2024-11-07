export const orderDirection = {
    "asc": "asc",
    "desc": "desc"
} as const;
export type OrderDirection = (typeof orderDirection)[keyof typeof orderDirection];