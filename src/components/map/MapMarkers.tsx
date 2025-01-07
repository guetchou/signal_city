import { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { INCIDENT_CATEGORIES } from "@/lib/constants";

type Incident = {
  id: number;
  categoryId: string;
  location: [number, number];
  status: string;
};

interface MapMarkersProps {
  map: mapboxgl.Map | null;
  incidents: Incident[];
}

export const MapMarkers = ({ map, incidents }: MapMarkersProps) => {
  useEffect(() => {
    if (!map) return;

    const markers: mapboxgl.Marker[] = [];

    incidents.forEach((incident) => {
      const category = INCIDENT_CATEGORIES.find(
        (cat) => cat.id === incident.categoryId
      );

      if (category) {
        const el = document.createElement("div");
        el.className = "marker";
        const IconComponent = category.icon;
        const iconSvg = document.createElement('div');
        iconSvg.className = category.color;
        iconSvg.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${IconComponent({}).toString()}</svg>`;
        el.appendChild(iconSvg);

        const marker = new mapboxgl.Marker(el)
          .setLngLat(incident.location)
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }).setHTML(`
              <div class="p-2">
                <h3 class="font-medium">${category.label}</h3>
                <p class="text-sm text-gray-600">Status: ${incident.status}</p>
              </div>
            `)
          )
          .addTo(map);

        markers.push(marker);
      }
    });

    return () => {
      markers.forEach(marker => marker.remove());
    };
  }, [map, incidents]);

  return null;
};