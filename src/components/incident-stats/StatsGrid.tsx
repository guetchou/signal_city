import { AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { StatsCard } from "./StatsCard";

export function StatsGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <StatsCard
        title="Incidents en cours"
        value="12"
        icon={<Clock className="h-4 w-4 text-muted-foreground" />}
        description="Cette semaine"
      />
      <StatsCard
        title="Incidents résolus"
        value="48"
        icon={<CheckCircle className="h-4 w-4 text-green-500" />}
        description="Ce mois"
      />
      <StatsCard
        title="Incidents critiques"
        value="3"
        icon={<AlertTriangle className="h-4 w-4 text-red-500" />}
        description="Nécessitent une intervention urgente"
      />
    </div>
  );
}