import { useState } from "react";
import { INCIDENT_CATEGORIES } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { CategoryFilter } from "./incident-filters/CategoryFilter";
import { SortButton } from "./incident-sort/SortButton";
import { StatsGrid } from "./incident-stats/StatsGrid";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSearch } from "@/hooks/use-search";
import { useFavorites } from "@/hooks/use-favorites";
import { PaginationControls } from "./ui/pagination/PaginationControls";
import Search from "./Search";

const mockIncidents = [
  {
    id: 1,
    categoryId: "pothole",
    location: "Rue des Lilas",
    date: "2024-02-20",
    status: "PENDING",
  },
  {
    id: 2,
    categoryId: "lighting",
    location: "Avenue des Roses",
    date: "2024-02-19",
    status: "IN_PROGRESS",
  },
  {
    id: 3,
    categoryId: "garbage",
    location: "Boulevard des Champs",
    date: "2024-02-18",
    status: "RESOLVED",
  },
];

const ITEMS_PER_PAGE = 5;

const getStatusColor = (status: string) => {
  switch (status) {
    case "PENDING":
      return "bg-yellow-100 text-yellow-800";
    case "IN_PROGRESS":
      return "bg-blue-100 text-blue-800";
    case "RESOLVED":
      return "bg-green-100 text-green-800";
    case "REJECTED":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function IncidentList() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "status" | "category">("date");
  const [currentPage, setCurrentPage] = useState(1);
  
  const { favorites, toggleFavorite, isFavorite } = useFavorites<typeof mockIncidents[0]>("incident-favorites");
  
  const { searchQuery, filteredItems, handleSearch } = useSearch(mockIncidents, [
    "location",
    "status",
    "categoryId",
  ]);

  const filteredIncidents = filteredItems
    .filter((incident) => 
      selectedCategory ? incident.categoryId === selectedCategory : true
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "date":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "status":
          return a.status.localeCompare(b.status);
        case "category":
          return a.categoryId.localeCompare(b.categoryId);
        default:
          return 0;
      }
    });

  const totalPages = Math.ceil(filteredIncidents.length / ITEMS_PER_PAGE);
  const paginatedIncidents = filteredIncidents.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="space-y-6">
      <StatsGrid />
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Signalements récents</h2>
          <div className="flex gap-2">
            <CategoryFilter
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
            <SortButton onSort={setSortBy} />
          </div>
        </div>

        <div className="mb-4">
          <Search onSearch={handleSearch} />
        </div>

        <div className="space-y-4">
          {paginatedIncidents.map((incident) => {
            const category = INCIDENT_CATEGORIES.find(
              (cat) => cat.id === incident.categoryId
            );
            
            return (
              <div
                key={incident.id}
                className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {category && (
                      <category.icon className={`h-5 w-5 ${category.color}`} />
                    )}
                    <div>
                      <h3 className="font-medium">{category?.label}</h3>
                      <p className="text-sm text-gray-600">{incident.location}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleFavorite(incident)}
                      className="p-1 h-auto"
                    >
                      <Star
                        className={`h-4 w-4 ${
                          isFavorite(incident.id)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-400"
                        }`}
                      />
                    </Button>
                    <span className="text-sm text-gray-600 block">
                      {incident.date}
                    </span>
                    <Badge
                      variant="secondary"
                      className={`${getStatusColor(incident.status)}`}
                    >
                      {incident.status}
                    </Badge>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {totalPages > 1 && (
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
}