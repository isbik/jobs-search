import { Briefcase } from "lucide-react";
import { Link } from "@tanstack/react-router";

import { cn } from "@/shared/lib";
import { Job } from "@/__generated__";
import { Button } from "@/shared/ui/button";
import { Avatar } from "@/shared/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

type Props = {
  company: Job["company"];
  className?: string;
  action?: React.ReactNode;
};

const CompanyCard = ({ company, className, action }: Props) => {
  if (!company) {
    return null;
  }

  return (
    <Card className={cn("h-fit", className)}>
      <CardHeader>
        <CardTitle className="text-center text-2xl">Компания</CardTitle>
      </CardHeader>
      <CardContent>
        <Avatar
          src={company.logo}
          alt={`${company.name} logo`}
          className="mx-auto size-16 rounded-full object-cover"
          fallback={<Briefcase className="mx-auto size-16 text-gray-400" />}
        />

        <h3 className="mb-2 text-center text-lg font-semibold">{company?.name}</h3>

        {action || (
          <Button
            variant="outline"
            className="w-full"
            asChild
          >
            <Link to={`/search/companies/${company.id}`}>Вакансии</Link>
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export { CompanyCard };
