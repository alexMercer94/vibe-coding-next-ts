
import FeaturedCollections from '../components/sections/FeaturedCollections';
import HeroSearch from '../components/sections/HeroSearch';
import NewInMarket from '../components/sections/NewInMarket';
import { getFeaturedProperties, getNewInMarketProperties } from '../lib/properties';

const PAGE_SIZE = 8;

export default async function Home({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const resolvedSearchParams = await searchParams;
    const pageParam = resolvedSearchParams.page;
    const page = Math.max(1, parseInt((pageParam as string) ?? '1', 10) || 1);

    const query = resolvedSearchParams.query as string | undefined;
    const type = resolvedSearchParams.type as string | undefined;
    const beds = resolvedSearchParams.beds as string | undefined;
    const baths = resolvedSearchParams.baths as string | undefined;

    const filters = {
        query,
        type,
        beds,
        baths,
    };

    const [featuredProperties, { properties: newInMarketProperties, totalCount }] =
        await Promise.all([
            getFeaturedProperties(),
            getNewInMarketProperties(page, PAGE_SIZE, filters),
        ]);

    const totalPages = Math.ceil(totalCount / PAGE_SIZE);

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
            <HeroSearch />
            <FeaturedCollections properties={featuredProperties} />
            <NewInMarket
                properties={newInMarketProperties}
                currentPage={page}
                totalPages={totalPages}
            />
        </main>
    );
}
