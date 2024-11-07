import { type db } from "@/db";
import { categoryTable } from "../schema";

const categories = [
  {
    name: "Разработка",
  },
  {
    name: "Дизайн",
  },
  {
    name: "Маркетинг",
  },
  {
    name: "Продажи",
  },
  {
    name: "Финансы",
  },
  {
    name: "HR",
  },
  {
    name: "Логистика",
  },
  {
    name: "Образование",
  },
];

export default async function seed(db: db) {
  await db.insert(categoryTable).values(categories);
}
