import { Button } from "@/components/ui/button";
import { ArrowUpDown, Calendar, AlertTriangle } from "lucide-react";

type SortOption = "date" | "priority" | "status";

interface SortIncidentsProps {
  onSort: (option: SortOption) => void;
  currentSort: SortOption;
}

export function SortIncidents({ onSort, currentSort }: SortIncidentsProps) {
  return (
    <div className="flex gap-2 items-center">
      <span className="text-sm text-gray-500">Trier par:</span>
      <div className="flex gap-2">
        <Button
          variant={currentSort === "date" ? "default" : "outline"}
          size="sm"
          onClick={() => onSort("date")}
          className="flex items-center gap-1"
        >
          <Calendar className="h-4 w-4" />
          Date
        </Button>
        <Button
          variant={currentSort === "priority" ? "default" : "outline"}
          size="sm"
          onClick={() => onSort("priority")}
          className="flex items-center gap-1"
        >
          <AlertTriangle className="h-4 w-4" />
          Priorité
        </Button>
        <Button
          variant={currentSort === "status" ? "default" : "outline"}
          size="sm"
          onClick={() => onSort("status")}
          className="flex items-center gap-1"
        >
          <ArrowUpDown className="h-4 w-4" />
          Statut
        </Button>
      </div>
    </div>
  );
}