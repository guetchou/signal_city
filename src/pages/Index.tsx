import Header from "@/components/Header";
import IncidentForm from "@/components/IncidentForm";
import IncidentList from "@/components/IncidentList";
import IncidentMap from "@/components/IncidentMap";
import Stats from "@/components/Stats";
import Search from "@/components/Search";
import Filters from "@/components/Filters";

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto py-8 px-4">
        <div className="space-y-8">
          <Stats />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-8">
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