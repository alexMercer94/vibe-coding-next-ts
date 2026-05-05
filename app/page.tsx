import FeaturedCollections from '../components/FeaturedCollections';
import HeroSearch from '../components/HeroSearch';
import Navbar from '../components/Navbar';
import NewInMarket from '../components/NewInMarket';

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
