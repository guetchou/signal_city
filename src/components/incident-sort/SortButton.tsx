import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SortButtonProps {
  onSort: (value: "date" | "status" | "category") => void;
}

export function SortButton({ onSort }: SortButtonProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <ArrowUpDown className="mr-2 h-4 w-4" />
          Trier par
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onSort("date")}>
          Date
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onSort("status")}>
          Statut
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onSort("category")}>
          Catégorie
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}