import { Input } from "@/components/ui/input";
import { Search as SearchIcon } from "lucide-react";

interface SearchProps {
  onSearch: (query: string) => void;
}

export default function Search({ onSearch }: SearchProps) {
  return (
    <div className="relative">
      <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
      <Input
        type="search"
        placeholder="Rechercher un incident..."
        className="pl-10"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}