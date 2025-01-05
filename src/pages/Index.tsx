import Header from "@/components/Header";
import IncidentForm from "@/components/IncidentForm";
import IncidentList from "@/components/IncidentList";
import IncidentMap from "@/components/IncidentMap";
import Stats from "@/components/Stats";
import Search from "@/components/Search";
import Filters from "@/components/Filters";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Index() {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto py-4 px-4 md:py-8">
        <div className="space-y-6 md:space-y-8">
          <Stats />
          <div className={`space-y-6 md:space-y-0 ${isMobile ? '' : 'grid grid-cols-2 gap-8'}`}>
            <div className="space-y-6">
              <div className="space-y-4">
                <Search />
                <Filters />
              </div>
              <IncidentMap />
              <IncidentList />
            </div>
            <div>
              <IncidentForm />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}