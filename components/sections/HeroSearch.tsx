'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import FilterModal, { FilterState } from '../ui/FilterModal';

export default function HeroSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  
  // Initialize query from URL if present
  const [searchQuery, setSearchQuery] = useState(searchParams.get('query') || '');

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    
    if (searchQuery.trim()) {
      params.set('query', searchQuery.trim());
    } else {
      params.delete('query');
    }
    
    // Reset to page 1 on new search
    params.delete('page');
    
    router.push(`/?${params.toString()}`);
  };

  const handleApplyFilters = (filters: FilterState) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (filters.query) params.set('query', filters.query);
    else params.delete('query');

    if (filters.propertyType && filters.propertyType !== 'Any Type') params.set('type', filters.propertyType);
    else params.delete('type');

    if (filters.beds !== '0') params.set('beds', filters.beds);
    else params.delete('beds');

    if (filters.baths !== '0') params.set('baths', filters.baths);
    else params.delete('baths');

    // Reset to page 1 on new search
    params.delete('page');

    router.push(`/?${params.toString()}`);
  };

  const getInitialFilters = (): FilterState => {
    return {
      query: searchParams.get('query') || '',
      minPrice: '0',
      maxPrice: '10000000',
      propertyType: searchParams.get('type') || 'Any Type',
      beds: searchParams.get('beds') || '0',
      baths: searchParams.get('baths') || '0',
    };
  };

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-nordic-dark leading-tight">
          Find your <span className="relative inline-block">
            <span className="relative z-10 font-medium">sanctuary</span>
            <span className="absolute bottom-2 left-0 w-full h-3 bg-mosque/20 -rotate-1 z-0"></span>
          </span>.
        </h1>
        
        <form onSubmit={handleSearchSubmit} className="relative group max-w-2xl mx-auto">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <span className="material-icons text-nordic-muted text-2xl group-focus-within:text-mosque transition-colors">search</span>
          </div>
          <input 
            className="block w-full pl-12 pr-4 py-4 rounded-xl border-none bg-white text-nordic-dark shadow-soft placeholder-nordic-muted/60 focus:ring-2 focus:ring-mosque focus:bg-white transition-all text-lg focus:outline-none" 
            placeholder="Search by city, neighborhood, or address..." 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button 
            type="submit"
            className="absolute inset-y-2 right-2 px-6 bg-mosque hover:bg-mosque/90 text-white font-medium rounded-lg transition-colors flex items-center justify-center shadow-lg shadow-mosque/20"
          >
            Search
          </button>
        </form>

        <div className="flex items-center justify-center gap-3 overflow-x-auto hide-scroll py-2 px-4 -mx-4">
          <button 
            onClick={() => {
              const params = new URLSearchParams(searchParams.toString());
              params.delete('type');
              params.delete('page');
              router.push(`/?${params.toString()}`);
            }}
            className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-all ${
              !searchParams.get('type') 
                ? 'bg-nordic-dark text-white shadow-lg shadow-nordic-dark/10 hover:-translate-y-0.5' 
                : 'bg-white border border-nordic-dark/5 text-nordic-muted hover:text-nordic-dark hover:border-mosque/50 hover:bg-mosque/5'
            }`}
          >
            All
          </button>
          
          {['House', 'Apartment', 'Villa', 'Penthouse'].map(type => (
            <button 
              key={type}
              onClick={() => {
                const params = new URLSearchParams(searchParams.toString());
                params.set('type', type);
                params.delete('page');
                router.push(`/?${params.toString()}`);
              }}
              className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-all ${
                searchParams.get('type') === type 
                  ? 'bg-nordic-dark text-white shadow-lg shadow-nordic-dark/10 hover:-translate-y-0.5' 
                  : 'bg-white border border-nordic-dark/5 text-nordic-muted hover:text-nordic-dark hover:border-mosque/50 hover:bg-mosque/5'
              }`}
            >
              {type}
            </button>
          ))}
          
          <div className="w-px h-6 bg-nordic-dark/10 mx-2"></div>
          
          <button 
            onClick={() => setIsFilterModalOpen(true)}
            className="whitespace-nowrap flex items-center gap-1 px-4 py-2 rounded-full text-nordic-dark font-medium text-sm hover:bg-black/5 transition-colors"
          >
            <span className="material-icons text-base">tune</span> Filters
          </button>
        </div>
      </div>

      <FilterModal 
        isOpen={isFilterModalOpen} 
        onClose={() => setIsFilterModalOpen(false)} 
        onApply={handleApplyFilters}
        initialFilters={getInitialFilters()}
      />
    </section>
  );
}
