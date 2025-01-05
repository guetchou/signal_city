import { INCIDENT_CATEGORIES } from "@/lib/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CategorySectionProps {
  category: string;
  setCategory: (value: string) => void;
  isSubmitting: boolean;
}

export default function CategorySection({
  category,
  setCategory,
  isSubmitting
}: CategorySectionProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">
        Catégorie <span className="text-red-500">*</span>
      </label>
      <Select 
        value={category} 
        onValueChange={setCategory} 
        disabled={isSubmitting}
        required
      >
        <SelectTrigger>
          <SelectValue placeholder="Sélectionnez une catégorie" />
        </SelectTrigger>
        <SelectContent>
          {INCIDENT_CATEGORIES.map((cat) => (
            <SelectItem key={cat.id} value={cat.id}>
              <div className="flex items-center gap-2">
                <cat.icon className={`h-4 w-4 ${cat.color}`} />
                <span>{cat.label}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}