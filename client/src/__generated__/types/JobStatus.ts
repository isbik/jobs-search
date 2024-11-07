export const jobStatus = {
    "pending": "pending",
    "approved": "approved",
    "rejected": "rejected"
} as const;
export type JobStatus = (typeof jobStatus)[keyof typeof jobStatus];