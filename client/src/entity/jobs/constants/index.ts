import { WorkType, WorkLevel, JobStatus } from "../../../__generated__";

export const JOB_WORK_TYPES: Record<WorkType, string> = {
  "full-time": "Полная занятость",
  "part-time": "Частичная занятость",
  contract: "Контракт",
  internship: "Стажировка",
};

export const JOB_EXPERIENCE: Record<WorkLevel, string> = {
  no_experience: "Без опыта",
  from_1_year_to_3_years: "От 1 года до 3 лет",
  from_3_years_to_6_years: "От 3 до 6 лет",
  more_than_6_years: "Более 6 лет",
};

export const JOB_STATUSES: Record<JobStatus, string> = {
  pending: "В ожидании",
  approved: "Одобрено",
  rejected: "Отклонено",
};

export const JOB_STATUSES_COLOR: Record<JobStatus, string> = {
  pending: "bg-neutral-200 text-neutral-900",
  approved: "bg-green-200 text-green-900",
  rejected: "bg-red-200 text-red-900",
};
