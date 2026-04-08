"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  City,
  ConvertedTime,
  POPULAR_CITIES,
  getUserTimezone,
  convertTimeToTimezone,
  getTimeDifference,
  formatTimeDifference,
  searchCities,
  saveFavoriteCities,
  loadFavoriteCities,
  saveSelectedCities,
  loadSelectedCities
} from "./logic";
import TimeZoneConverterSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function TimeZoneConverterUI() {
  const [baseTime, setBaseTime] = useState<string>("");
  const [baseTimezone, setBaseTimezone] = useState<string>("");
  const [selectedCities, setSelectedCities] = useState<City[]>([]);
  const [favorites, setFavorites] = useState<City[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<City[]>([]);
  const [showSearch, setShowSearch] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Initialize on mount
  useEffect(() => {
    setIsMounted(true);
    const userTz = getUserTimezone();
    setBaseTimezone(userTz);

    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    setBaseTime(`${hours}:${minutes}`);

    const saved = loadSelectedCities();
    if (saved.length > 0) {
      setSelectedCities(saved);
    } else {
      const defaultCities = POPULAR_CITIES.slice(0, 4);
      setSelectedCities(defaultCities);
    }

    const savedFavorites = loadFavoriteCities();
    setFavorites(savedFavorites);
  }, []);

  // Save selected cities
  useEffect(() => {
    if (isMounted && selectedCities.length > 0) {
      saveSelectedCities(selectedCities);
    }
  }, [selectedCities, isMounted]);

  // Handle search
  useEffect(() => {
    if (searchQuery.trim()) {
      setSearchResults(searchCities(searchQuery));
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const parseBaseTime = (): Date => {
    const [hours, minutes] = baseTime.split(":").map(Number);
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours || 0, minutes || 0);
  };

  const convertedTimes: ConvertedTime[] = selectedCities.map(city => {
    const baseDate = parseBaseTime();
    return convertTimeToTimezone(baseDate, city.timezone);
  });

  const addCity = (city: City) => {
    if (!selectedCities.find(c => c.timezone === city.timezone)) {
      setSelectedCities([...selectedCities, city]);
    }
    setSearchQuery("");
    setShowSearch(false);
  };

  const removeCity = (timezone: string) => {
    setSelectedCities(selectedCities.filter(c => c.timezone !== timezone));
  };

  const toggleFavorite = (city: City) => {
    const isFav = favorites.find(f => f.timezone === city.timezone);
    if (isFav) {
      const updated = favorites.filter(f => f.timezone !== city.timezone);
      setFavorites(updated);
      saveFavoriteCities(updated);
    } else {
      const updated = [...favorites, city];
      setFavorites(updated);
      saveFavoriteCities(updated);
    }
  };

  const isFavorite = (timezone: string) => favorites.some(f => f.timezone === timezone);

  const copyToClipboard = () => {
    const summary = [
      `Base Time: ${baseTime} (${baseTimezone})`,
      ...convertedTimes.map(ct => `${ct.city.name}: ${ct.formatted}`)
    ].join("\n");

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const useCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    setBaseTime(`${hours}:${minutes}`);
  };

  const resetConverter = () => {
    setSelectedCities(POPULAR_CITIES.slice(0, 4));
    useCurrentTime();
  };

  if (!isMounted) return null;

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Input Panel */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Base Time</h2>
        
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
            <input
              type="time"
              value={baseTime}
              onChange={(e) => setBaseTime(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
            <select
              value={baseTimezone}
              onChange={(e) => setBaseTimezone(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
            >
              {POPULAR_CITIES.map(city => (
                <option key={city.timezone} value={city.timezone}>
                  {city.name} ({city.timezone})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={useCurrentTime}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
          >
            Use Current Time
          </button>
          <button
            onClick={resetConverter}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
          >
            Reset
          </button>
          <button
            onClick={copyToClipboard}
            className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg text-sm font-medium transition-colors"
          >
            {copied ? "✓ Copied" : "📋 Copy"}
          </button>
        </div>
      </div>

      {/* Add City Panel */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Add Cities</h2>
        
        <div className="relative mb-4">
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSearch(true)}
            placeholder="Search cities..."
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
          />
          
          {showSearch && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
              {searchResults.map(city => (
                <button
                  key={city.timezone}
                  onClick={() => addCity(city)}
                  className="w-full text-left px-4 py-2.5 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 text-sm"
                >
                  <div className="font-medium text-gray-900">{city.name}</div>
                  <div className="text-xs text-gray-500">{city.country}</div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Quick Add Buttons */}
        <div className="flex flex-wrap gap-2">
          {POPULAR_CITIES.slice(0, 8).map(city => (
            <button
              key={city.timezone}
              onClick={() => addCity(city)}
              disabled={selectedCities.some(c => c.timezone === city.timezone)}
              className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 rounded-lg text-xs font-medium transition-colors"
            >
              {city.name}
            </button>
          ))}
        </div>
      </div>

      {/* Converted Times Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {convertedTimes.map((ct) => {
          const isFav = isFavorite(ct.city.timezone);
          return (
            <div
              key={ct.city.timezone}
              className="bg-white rounded-xl border border-gray-200 p-4 relative"
            >
              <button
                onClick={() => toggleFavorite(ct.city)}
                className="absolute top-3 right-3 text-lg hover:scale-110 transition-transform"
              >
                {isFav ? "⭐" : "☆"}
              </button>

              <div className="mb-3">
                <h3 className="font-semibold text-gray-900 text-sm">{ct.city.name}</h3>
                <p className="text-xs text-gray-500">{ct.city.country}</p>
              </div>

              <div className="mb-3">
                <div className="text-2xl font-bold text-primary">{ct.formatted}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {ct.dayDifference > 0 && <span className="text-amber-600">+1 day</span>}
                  {ct.dayDifference < 0 && <span className="text-amber-600">-1 day</span>}
                  {ct.dayDifference === 0 && <span>Today</span>}
                </div>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <div className={`w-3 h-3 rounded-full ${ct.isDaytime ? "bg-yellow-400" : "bg-gray-800"}`} />
                <span className="text-xs text-gray-600">
                  {ct.isDaytime ? "Daytime" : "Nighttime"}
                </span>
              </div>

              {ct.isWorkingHours && (
                <div className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded mb-3">
                  Working hours
                </div>
              )}

              <div className="flex gap-2">
                <button
                  onClick={() => removeCity(ct.city.timezone)}
                  className="flex-1 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-xs font-medium transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Time Differences */}
      {selectedCities.length > 1 && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Time Differences</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {selectedCities.map((city, idx) => {
              if (idx === 0) return null;
              const diff = getTimeDifference(parseBaseTime(), city.timezone, baseTimezone);
              return (
                <div key={city.timezone} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-700">{city.name}</span>
                  <span className="text-sm font-semibold text-primary">{formatTimeDifference(diff)}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Favorites */}
      {favorites.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Favorite Cities</h2>
          <div className="flex flex-wrap gap-2">
            {favorites.map(city => (
              <button
                key={city.timezone}
                onClick={() => addCity(city)}
                disabled={selectedCities.some(c => c.timezone === city.timezone)}
                className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 disabled:opacity-50 disabled:cursor-not-allowed text-amber-700 rounded-lg text-xs font-medium transition-colors"
              >
                ⭐ {city.name}
              </button>
            ))}
          </div>
        </div>
      )}

      <TimeZoneConverterSEO />
      <RelatedTools
        currentTool="time-zone-converter"
        tools={["pomodoro-timer", "timer-stopwatch", "date-difference-calculator"]}
      />
    </div>
  );
}
