import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { INCIDENT_CATEGORIES } from "@/lib/constants";

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedCategory
            ? INCIDENT_CATEGORIES.find((category) => category.id === selectedCategory)?.label
            : "Filtrer par catégorie"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Rechercher une catégorie..." />
          <CommandEmpty>Aucune catégorie trouvée.</CommandEmpty>
          <CommandGroup>
            {INCIDENT_CATEGORIES.map((category) => (
              <CommandItem
                key={category.id}
                value={category.id}
                onSelect={() => {
                  onCategoryChange(category.id);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selectedCategory === category.id ? "opacity-100" : "opacity-0"
                  )}
                />
                <category.icon className={`mr-2 h-4 w-4 ${category.color}`} />
                {category.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}