import { supabase } from './supabase';

export interface PropertyImage {
    id: string;
    property_id: string;
    url: string;
    alt_text: string | null;
    is_primary: boolean;
    created_at: string;
}

// Type that mirrors the Supabase `properties` table
export interface Property {
    id: string;
    title: string;
    slug: string;
    location: string;
    latitude: number;
    longitude: number;
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
    property_images?: PropertyImage[];
}

export interface PaginatedProperties {
    properties: Property[];
    totalCount: number;
}

/**
 * Fetch a single property by its slug, including its images.
 */
export async function getPropertyBySlug(slug: string): Promise<Property | null> {
    const { data, error } = await supabase
        .from('properties')
        .select(`
            *,
            property_images(*)
        `)
        .eq('slug', slug)
        .single();

    if (error) {
        console.error('Error fetching property by slug:', error);
        return null;
    }

    // Sort images: primary first, then by created_at
    if (data && data.property_images) {
        data.property_images.sort((a: PropertyImage, b: PropertyImage) => {
            if (a.is_primary) return -1;
            if (b.is_primary) return 1;
            return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        });
    }

    return data as Property;
}

/**
 * Fetch the featured properties (is_featured = true).
 */
export async function getFeaturedProperties(limit: number = 2): Promise<Property[]> {
    const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('is_featured', true)
        .order('created_at', { ascending: true })
        .limit(limit);

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
 * @param filters optional filters for search
 */
export async function getNewInMarketProperties(
    page: number,
    pageSize: number,
    filters?: {
        query?: string;
        type?: string;
        beds?: string;
        baths?: string;
    }
): Promise<PaginatedProperties> {
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    let queryBuilder = supabase
        .from('properties')
        .select('*', { count: 'exact' })
        .eq('is_featured', false);

    if (filters) {
        if (filters.query) {
            queryBuilder = queryBuilder.or(`title.ilike.%${filters.query}%,location.ilike.%${filters.query}%`);
        }
        if (filters.type && filters.type !== 'Any Type') {
            queryBuilder = queryBuilder.ilike('title', `%${filters.type}%`);
        }
        if (filters.beds && filters.beds !== '0') {
            queryBuilder = queryBuilder.gte('beds', parseInt(filters.beds));
        }
        if (filters.baths && filters.baths !== '0') {
            queryBuilder = queryBuilder.gte('baths', parseInt(filters.baths));
        }
    }

    const { data, error, count } = await queryBuilder
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
