export const workType = {
    "full-time": "full-time",
    "part-time": "part-time",
    "internship": "internship",
    "contract": "contract"
} as const;
export type WorkType = (typeof workType)[keyof typeof workType];