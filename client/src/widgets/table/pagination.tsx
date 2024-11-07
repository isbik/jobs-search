import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/shared/ui/button";

type Props = {
  page: number;
  setPage: (page: number) => void;
  total: number;
};

const Pagination = ({ page, setPage, total }: Props) => {
  return (
    <div className="flex items-center justify-end space-x-2 border-t px-2 py-4">
      <span className="mr-auto text-sm font-medium">Всего вакансий: {total}</span>
      <span className="text-sm font-medium">
        {`Страница ${page} из ${Math.ceil(total / 10)}`}
      </span>
      <Button
        size={"sm"}
        variant="outline"
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>
      <Button
        size={"sm"}
        variant="outline"
        disabled={page === Math.ceil(total / 10)}
        onClick={() => setPage(page + 1)}
      >
        <ChevronRight className="h-5 w-5" />
      </Button>
    </div>
  );
};

export { Pagination };
