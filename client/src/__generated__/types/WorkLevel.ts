export const workLevel = {
    "no_experience": "no_experience",
    "from_1_year_to_3_years": "from_1_year_to_3_years",
    "from_3_years_to_6_years": "from_3_years_to_6_years",
    "more_than_6_years": "more_than_6_years"
} as const;
export type WorkLevel = (typeof workLevel)[keyof typeof workLevel];