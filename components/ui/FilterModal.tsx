'use client';

import { useState, useEffect } from 'react';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: FilterState) => void;
  initialFilters?: FilterState;
}

export interface FilterState {
  query: string;
  minPrice: string;
  maxPrice: string;
  propertyType: string;
  beds: string;
  baths: string;
}

const defaultFilters: FilterState = {
  query: '',
  minPrice: '0',
  maxPrice: '10000000',
  propertyType: 'Any Type',
  beds: '0',
  baths: '0',
};

export default function FilterModal({ isOpen, onClose, onApply, initialFilters }: FilterModalProps) {
  const [filters, setFilters] = useState<FilterState>(initialFilters || defaultFilters);

  // Sync state if initialFilters changes
  useEffect(() => {
    if (initialFilters) {
      setFilters(initialFilters);
    }
  }, [initialFilters]);

  if (!isOpen) return null;

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  const handleClear = () => {
    setFilters(defaultFilters);
    onApply(defaultFilters);
    onClose();
  };

  return (
    <>
      {/* Modal Overlay */}
      <div 
        className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-40 transition-opacity"
        onClick={onClose}
      ></div>

      {/* Main Modal Container */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div className="pointer-events-auto relative w-full max-w-2xl bg-white text-nordic-dark rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
          
          {/* Header */}
          <header className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-30">
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900">Filters</h1>
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500"
            >
              <span className="material-icons">close</span>
            </button>
          </header>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto no-scrollbar p-8 space-y-10">
            
            {/* Section 1: Location / Search */}
            <section>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Location or Keyword</label>
              <div className="relative group">
                <span className="material-icons absolute left-4 top-3.5 text-gray-400 group-focus-within:text-mosque transition-colors">search</span>
                <input 
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border-0 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-mosque focus:bg-white transition-all shadow-sm" 
                  placeholder="City, neighborhood, or address" 
                  type="text" 
                  value={filters.query}
                  onChange={(e) => setFilters({ ...filters, query: e.target.value })}
                />
              </div>
            </section>

            {/* Section 2: Price Range (UI only representation) */}
            <section>
              <div className="flex justify-between items-end mb-4">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">Price Range</label>
                <span className="text-sm font-medium text-mosque">Any</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg border border-transparent focus-within:border-mosque/30 transition-colors">
                  <label className="block text-[10px] text-gray-500 uppercase font-medium mb-1">Min Price</label>
                  <div className="flex items-center">
                    <span className="text-gray-400 mr-1">$</span>
                    <input 
                      className="w-full bg-transparent border-0 p-0 text-gray-900 font-medium focus:ring-0 text-sm" 
                      type="text" 
                      placeholder="0"
                      value={filters.minPrice === '0' ? '' : filters.minPrice}
                      onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                    />
                  </div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg border border-transparent focus-within:border-mosque/30 transition-colors">
                  <label className="block text-[10px] text-gray-500 uppercase font-medium mb-1">Max Price</label>
                  <div className="flex items-center">
                    <span className="text-gray-400 mr-1">$</span>
                    <input 
                      className="w-full bg-transparent border-0 p-0 text-gray-900 font-medium focus:ring-0 text-sm" 
                      type="text" 
                      placeholder="Any"
                      value={filters.maxPrice === '10000000' ? '' : filters.maxPrice}
                      onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3: Property Details */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Property Type */}
              <div className="space-y-3">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">Property Type</label>
                <div className="relative">
                  <select 
                    className="w-full bg-gray-50 border-0 rounded-lg py-3 pl-4 pr-10 text-gray-900 appearance-none focus:ring-2 focus:ring-mosque cursor-pointer"
                    value={filters.propertyType}
                    onChange={(e) => setFilters({ ...filters, propertyType: e.target.value })}
                  >
                    <option value="Any Type">Any Type</option>
                    <option value="House">House</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Condo">Condo</option>
                    <option value="Townhouse">Townhouse</option>
                    <option value="Villa">Villa</option>
                    <option value="Penthouse">Penthouse</option>
                  </select>
                  <span className="material-icons absolute right-3 top-3 text-gray-400 pointer-events-none">expand_more</span>
                </div>
              </div>

              {/* Rooms */}
              <div className="space-y-4">
                {/* Beds */}
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-900">Bedrooms</span>
                  <div className="flex items-center space-x-3 bg-gray-50 rounded-full p-1">
                    <button 
                      onClick={() => setFilters({ ...filters, beds: String(Math.max(0, parseInt(filters.beds) - 1)) })}
                      className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-500 hover:text-mosque disabled:opacity-50 transition-colors"
                    >
                      <span className="material-icons text-base">remove</span>
                    </button>
                    <span className="text-sm font-semibold w-4 text-center">{filters.beds === '0' ? 'Any' : `${filters.beds}+`}</span>
                    <button 
                      onClick={() => setFilters({ ...filters, beds: String(parseInt(filters.beds) + 1) })}
                      className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-mosque hover:bg-mosque hover:text-white transition-colors"
                    >
                      <span className="material-icons text-base">add</span>
                    </button>
                  </div>
                </div>

                {/* Baths */}
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-900">Bathrooms</span>
                  <div className="flex items-center space-x-3 bg-gray-50 rounded-full p-1">
                    <button 
                      onClick={() => setFilters({ ...filters, baths: String(Math.max(0, parseInt(filters.baths) - 1)) })}
                      className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-500 hover:text-mosque transition-colors"
                    >
                      <span className="material-icons text-base">remove</span>
                    </button>
                    <span className="text-sm font-semibold w-4 text-center">{filters.baths === '0' ? 'Any' : `${filters.baths}+`}</span>
                    <button 
                      onClick={() => setFilters({ ...filters, baths: String(parseInt(filters.baths) + 1) })}
                      className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-mosque hover:bg-mosque hover:text-white transition-colors"
                    >
                      <span className="material-icons text-base">add</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 4: Amenities (UI Only) */}
            <section>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Amenities &amp; Features</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {/* Active Chip */}
                <label className="cursor-pointer group relative">
                  <input defaultChecked className="peer sr-only" type="checkbox" />
                  <div className="h-full px-4 py-3 rounded-lg border border-mosque bg-mosque/5 text-mosque font-medium text-sm flex items-center justify-center gap-2 transition-all peer-checked:bg-mosque/10 peer-checked:border-mosque peer-checked:text-mosque hover:bg-mosque/10">
                    <span className="material-icons text-lg">pool</span> Swimming Pool
                  </div>
                  <div className="absolute top-2 right-2 w-2 h-2 bg-mosque rounded-full opacity-100 transition-opacity"></div>
                </label>
                {/* Inactive Chip */}
                <label className="cursor-pointer group">
                  <input className="peer sr-only" type="checkbox" />
                  <div className="h-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-600 text-sm flex items-center justify-center gap-2 transition-all hover:border-gray-300 peer-checked:border-mosque peer-checked:bg-mosque/5 peer-checked:text-mosque">
                    <span className="material-icons text-lg text-gray-400 group-hover:text-gray-500 peer-checked:text-mosque">fitness_center</span> Gym
                  </div>
                </label>
                <label className="cursor-pointer group">
                  <input className="peer sr-only" type="checkbox" />
                  <div className="h-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-600 text-sm flex items-center justify-center gap-2 transition-all hover:border-gray-300 peer-checked:border-mosque peer-checked:bg-mosque/5 peer-checked:text-mosque">
                    <span className="material-icons text-lg text-gray-400 group-hover:text-gray-500 peer-checked:text-mosque">local_parking</span> Parking
                  </div>
                </label>
                <label className="cursor-pointer group">
                  <input className="peer sr-only" type="checkbox" />
                  <div className="h-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-600 text-sm flex items-center justify-center gap-2 transition-all hover:border-gray-300 peer-checked:border-mosque peer-checked:bg-mosque/5 peer-checked:text-mosque">
                    <span className="material-icons text-lg text-gray-400 group-hover:text-gray-500 peer-checked:text-mosque">ac_unit</span> Air Conditioning
                  </div>
                </label>
                <label className="cursor-pointer group relative">
                  <input defaultChecked className="peer sr-only" type="checkbox" />
                  <div className="h-full px-4 py-3 rounded-lg border border-mosque bg-mosque/5 text-mosque font-medium text-sm flex items-center justify-center gap-2 transition-all peer-checked:bg-mosque/10 peer-checked:border-mosque peer-checked:text-mosque hover:bg-mosque/10">
                    <span className="material-icons text-lg">wifi</span> High-speed Wifi
                  </div>
                  <div className="absolute top-2 right-2 w-2 h-2 bg-mosque rounded-full opacity-100 transition-opacity"></div>
                </label>
                <label className="cursor-pointer group">
                  <input className="peer sr-only" type="checkbox" />
                  <div className="h-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-600 text-sm flex items-center justify-center gap-2 transition-all hover:border-gray-300 peer-checked:border-mosque peer-checked:bg-mosque/5 peer-checked:text-mosque">
                    <span className="material-icons text-lg text-gray-400 group-hover:text-gray-500 peer-checked:text-mosque">deck</span> Patio / Terrace
                  </div>
                </label>
              </div>
            </section>
          </div>

          {/* Footer */}
          <footer className="bg-white border-t border-gray-100 px-8 py-6 sticky bottom-0 z-30 flex items-center justify-between">
            <button 
              onClick={handleClear}
              className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors underline decoration-gray-300 underline-offset-4"
            >
              Clear all filters
            </button>
            <button 
              onClick={handleApply}
              className="bg-mosque hover:bg-mosque/90 text-white px-8 py-3 rounded-lg font-medium shadow-lg shadow-mosque/30 transition-all hover:shadow-mosque/40 flex items-center gap-2 transform active:scale-95"
            >
              Apply Filters
              <span className="material-icons text-sm">arrow_forward</span>
            </button>
          </footer>
        </div>
      </div>
    </>
  );
}
