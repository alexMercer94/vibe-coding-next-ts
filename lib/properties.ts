import { supabase } from './supabase';

// Type that mirrors the Supabase `properties` table
export interface Property {
    id: string;
    title: string;
    location: string;
    price: string;
    price_suffix: string | null;
    beds: number;
    baths: number;
    area: string;
    image_url: string;
    image_alt: string;
    badge: string | null;
    tag: 'FOR SALE' | 'FOR RENT' | null;
    is_featured: boolean;
    created_at: string;
}

export interface PaginatedProperties {
    properties: Property[];
    totalCount: number;
}

/**
 * Fetch the featured properties (is_featured = true).
 */
export async function getFeaturedProperties(): Promise<Property[]> {
    const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('is_featured', true)
        .order('created_at', { ascending: true });

    if (error) {
        console.error('Error fetching featured properties:', error);
        return [];
    }

    return data as Property[];
}

/**
 * Fetch paginated non-featured properties (is_featured = false).
 * @param page  1-based page number
 * @param pageSize  number of results per page
 */
export async function getNewInMarketProperties(
    page: number,
    pageSize: number
): Promise<PaginatedProperties> {
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const { data, error, count } = await supabase
        .from('properties')
        .select('*', { count: 'exact' })
        .eq('is_featured', false)
        .order('created_at', { ascending: true })
        .range(from, to);

    if (error) {
        console.error('Error fetching new-in-market properties:', error);
        return { properties: [], totalCount: 0 };
    }

    return {
        properties: data as Property[],
        totalCount: count ?? 0,
    };
}
