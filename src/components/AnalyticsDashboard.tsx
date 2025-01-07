import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";

const mockData = {
  byCategory: [
    { name: "Nids de poule", value: 34 },
    { name: "Éclairage", value: 56 },
    { name: "Déchets", value: 45 },
    { name: "Autres", value: 21 },
  ],
  byStatus: [
    { name: "En attente", value: 45 },
    { name: "En cours", value: 22 },
    { name: "Résolu", value: 89 },
  ],
};

const COLORS = ["#1E3A8A", "#F97316", "#22C55E", "#64748B"];

export default function AnalyticsDashboard() {
  const isMobile = useIsMobile();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Analyse des incidents</h2>
      
      <div className={`grid gap-6 ${isMobile ? '' : 'grid-cols-2'}`}>
        <Card>
          <CardHeader>
            <CardTitle>Incidents par catégorie</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockData.byCategory}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#1E3A8A" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>État des incidents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mockData.byStatus}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {mockData.byStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}