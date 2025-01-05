import { Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface CallbackSectionProps {
  phone: string;
  setPhone: (value: string) => void;
  isSubmitting: boolean;
}

export default function CallbackSection({
  phone,
  setPhone,
  isSubmitting
}: CallbackSectionProps) {
  const [requestCallback, setRequestCallback] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant={requestCallback ? "default" : "outline"}
          onClick={() => setRequestCallback(!requestCallback)}
          disabled={isSubmitting}
        >
          <Phone className="h-4 w-4 mr-2" />
          Demander à être rappelé
        </Button>
      </div>

      {requestCallback && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Numéro de téléphone <span className="text-red-500">*</span>
          </label>
          <Input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+33 6 12 34 56 78"
            required={requestCallback}
            disabled={isSubmitting}
          />
          <p className="text-sm text-gray-500">
            Nous vous rappellerons dès que possible pour traiter votre signalement
          </p>
        </div>
      )}
    </div>
  );
}