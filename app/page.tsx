import Navbar from '../components/layout/Navbar';
import FeaturedCollections from '../components/sections/FeaturedCollections';
import HeroSearch from '../components/sections/HeroSearch';
import NewInMarket from '../components/sections/NewInMarket';

export default function Home() {
    return (
        <>
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                <HeroSearch />
                <FeaturedCollections />
                <NewInMarket />
            </main>
        </>
    );
}
