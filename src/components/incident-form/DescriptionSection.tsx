import { Textarea } from "@/components/ui/textarea";

interface DescriptionSectionProps {
  description: string;
  setDescription: (value: string) => void;
  isSubmitting: boolean;
}

export default function DescriptionSection({
  description,
  setDescription,
  isSubmitting
}: DescriptionSectionProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">
        Description <span className="text-red-500">*</span>
      </label>
      <Textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="h-32"
        placeholder="Décrivez le problème..."
        required
        disabled={isSubmitting}
      />
    </div>
  );
}