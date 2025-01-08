import { Input } from "@/components/ui/input";
import { Search as SearchIcon } from "lucide-react";

interface SearchProps {
  onSearch?: (query: string) => void;
}

export default function Search({ onSearch }: SearchProps) {
  return (
    <div className="relative">
      <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Rechercher un signalement..."
        className="pl-8"
        onChange={(e) => onSearch?.(e.target.value)}
      />
    </div>
  );
}