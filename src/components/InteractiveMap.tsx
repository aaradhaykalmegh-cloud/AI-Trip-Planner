import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { MapPin, Navigation, ExternalLink, Filter } from 'lucide-react';
import { TripPlan, ActivityItem } from '../types';

interface InteractiveMapProps {
  trip: TripPlan;
}

const DAY_COLORS = [
  '#4f46e5', // Day 1 Indigo
  '#059669', // Day 2 Emerald
  '#d97706', // Day 3 Amber
  '#dc2626', // Day 4 Rose
  '#7c3aed', // Day 5 Violet
  '#0891b2', // Day 6 Cyan
  '#db2777', // Day 7 Pink
];

export const InteractiveMap: React.FC<InteractiveMapProps> = ({ trip }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const [selectedDay, setSelectedDay] = useState<number | 'all'>('all');
  const [activeActivity, setActiveActivity] = useState<{ activity: ActivityItem; dayNumber: number } | null>(null);

  // Collect all activities that have coordinates or generate fallback coordinates around trip center
  const centerLat = trip.overview.coordinates?.lat || 45.0;
  const centerLng = trip.overview.coordinates?.lng || 9.0;

  const allStops: Array<{ activity: ActivityItem; dayNumber: number; lat: number; lng: number }> = [];

  trip.days.forEach((day, dIdx) => {
    day.activities.forEach((act, aIdx) => {
      let lat = act.coordinates?.lat;
      let lng = act.coordinates?.lng;

      // If coordinates are missing or zero, generate slight offset around center
      if (!lat || !lng || (lat === 0 && lng === 0)) {
        const offsetLat = (dIdx * 0.015) + (aIdx * 0.008) - 0.02;
        const offsetLng = (dIdx * 0.018) + (aIdx * 0.009) - 0.02;
        lat = centerLat + offsetLat;
        lng = centerLng + offsetLng;
      }

      allStops.push({
        activity: act,
        dayNumber: day.dayNumber,
        lat,
        lng,
      });
    });
  });

  const filteredStops = selectedDay === 'all'
    ? allStops
    : allStops.filter(s => s.dayNumber === selectedDay);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Remove existing map if any
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    try {
      const map = L.map(mapContainerRef.current, {
        center: [centerLat, centerLng],
        zoom: 13,
        zoomControl: true,
        attributionControl: false,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
      }).addTo(map);

      const markersGroup = L.layerGroup().addTo(map);
      markersLayerRef.current = markersGroup;
      mapInstanceRef.current = map;

      // Invalidate size after layout settles
      setTimeout(() => {
        map.invalidateSize();
      }, 200);
    } catch (err) {
      console.error('Failed to initialize Leaflet map:', err);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [centerLat, centerLng]);

  // Update Markers when filter changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersGroup = markersLayerRef.current;
    if (!map || !markersGroup) return;

    markersGroup.clearLayers();

    if (filteredStops.length === 0) return;

    const bounds = L.latLngBounds([]);

    filteredStops.forEach((stop, idx) => {
      const color = DAY_COLORS[(stop.dayNumber - 1) % DAY_COLORS.length];

      // Custom HTML Marker icon
      const customIcon = L.divIcon({
        className: 'custom-map-pin',
        html: `
          <div style="
            background: ${color};
            width: 32px;
            height: 32px;
            border-radius: 9999px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 12px;
            font-weight: 800;
            border: 2.5px solid white;
            box-shadow: 0 4px 10px rgba(0,0,0,0.3);
          ">
            D${stop.dayNumber}
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, -18],
      });

      const marker = L.marker([stop.lat, stop.lng], { icon: customIcon });

      const popupContent = `
        <div style="min-width: 200px; font-family: sans-serif; padding: 4px;">
          <div style="font-size: 11px; font-weight: 700; color: ${color}; text-transform: uppercase; margin-bottom: 2px;">
            Day ${stop.dayNumber} • ${stop.activity.timeBlock}
          </div>
          <div style="font-size: 14px; font-weight: 800; color: #0f172a; line-height: 1.2; margin-bottom: 4px;">
            ${stop.activity.name}
          </div>
          <div style="font-size: 12px; color: #475569; margin-bottom: 6px;">
            ${stop.activity.location}
          </div>
          <div style="font-size: 11px; font-weight: 600; color: #334155; margin-bottom: 8px;">
            ⏱️ ${stop.activity.estimatedDuration} &nbsp;•&nbsp; 💰 ${stop.activity.estimatedCost === 0 ? 'Free' : `${trip.budget.currency} ${stop.activity.estimatedCost}`}
          </div>
          <a
            href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(stop.activity.name + ' ' + trip.overview.destination)}"
            target="_blank"
            rel="noreferrer"
            style="
              display: inline-block;
              background: #4f46e5;
              color: white;
              font-size: 11px;
              font-weight: 700;
              padding: 4px 10px;
              border-radius: 6px;
              text-decoration: none;
            "
          >
            Open in Google Maps →
          </a>
        </div>
      `;

      marker.bindPopup(popupContent);
      marker.on('click', () => {
        setActiveActivity({ activity: stop.activity, dayNumber: stop.dayNumber });
      });

      markersGroup.addLayer(marker);
      bounds.extend([stop.lat, stop.lng]);
    });

    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 15 });
    }
  }, [filteredStops, trip.budget.currency]);

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-indigo-600" />
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Filter Map Stops by Day:
          </span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <button
            type="button"
            id="map-filter-all"
            onClick={() => setSelectedDay('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedDay === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Stops ({allStops.length})
          </button>
          {trip.days.map(day => {
            const color = DAY_COLORS[(day.dayNumber - 1) % DAY_COLORS.length];
            const isSelected = selectedDay === day.dayNumber;

            return (
              <button
                key={day.dayNumber}
                type="button"
                id={`map-filter-day-${day.dayNumber}`}
                onClick={() => setSelectedDay(day.dayNumber)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-all ${
                  isSelected
                    ? 'text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
                style={{ backgroundColor: isSelected ? color : undefined }}
              >
                <span
                  className="w-2 h-2 rounded-full inline-block"
                  style={{ backgroundColor: isSelected ? '#ffffff' : color }}
                />
                <span>Day {day.dayNumber}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Map Display Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Leaflet Canvas */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-2">
          <div className="relative w-full h-[460px] sm:h-[540px] rounded-xl overflow-hidden">
            <div ref={mapContainerRef} className="w-full h-full" />

            {/* Map Legend Overlay */}
            <div className="absolute bottom-3 left-3 z-[400] bg-white/90 backdrop-blur-md px-3 py-2 rounded-xl shadow-md border border-slate-200/80 text-[11px] flex items-center gap-3">
              <span className="font-bold text-slate-700">Days Legend:</span>
              <div className="flex items-center gap-2">
                {trip.days.slice(0, 5).map(day => (
                  <span key={day.dayNumber} className="flex items-center gap-1">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: DAY_COLORS[(day.dayNumber - 1) % DAY_COLORS.length] }}
                    />
                    <span className="font-semibold text-slate-600">D{day.dayNumber}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Selected / Stop List Side Panel */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4 max-h-[560px] overflow-y-auto">
          <div>
            <h4 className="font-bold text-slate-900 text-sm tracking-tight">
              {selectedDay === 'all' ? 'All Itinerary Waypoints' : `Day ${selectedDay} Stops`}
            </h4>
            <p className="text-xs text-slate-500">
              Click any stop to center the pin and see directions
            </p>
          </div>

          <div className="space-y-3">
            {filteredStops.map((stop, idx) => {
              const color = DAY_COLORS[(stop.dayNumber - 1) % DAY_COLORS.length];
              const isSelected = activeActivity?.activity.id === stop.activity.id;

              return (
                <div
                  key={stop.activity.id}
                  onClick={() => {
                    setActiveActivity({ activity: stop.activity, dayNumber: stop.dayNumber });
                    mapInstanceRef.current?.setView([stop.lat, stop.lng], 15, { animate: true });
                  }}
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-indigo-500 bg-indigo-50/60 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black text-white shrink-0"
                      style={{ backgroundColor: color }}
                    >
                      {stop.dayNumber}
                    </span>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      {stop.activity.timeBlock}
                    </span>
                    <span className="text-xs text-slate-400 ml-auto">
                      {stop.activity.estimatedDuration}
                    </span>
                  </div>

                  <h5 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-1">
                    {stop.activity.name}
                  </h5>
                  <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                    {stop.activity.location}
                  </p>

                  <div className="mt-2 flex items-center justify-between text-xs pt-1.5 border-t border-slate-100">
                    <span className="font-semibold text-slate-700">
                      {stop.activity.estimatedCost === 0 ? 'Free entry' : `${trip.budget.currency} ${stop.activity.estimatedCost}`}
                    </span>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(stop.activity.name + ' ' + trip.overview.destination)}`}
                      target="_blank"
                      rel="noreferrer"
                      onClick={e => e.stopPropagation()}
                      className="inline-flex items-center gap-1 text-indigo-600 hover:underline font-bold text-[11px]"
                    >
                      <span>Directions</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
