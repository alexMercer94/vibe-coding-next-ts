import Link from 'next/link';
import { Property } from '@/lib/properties';
import PropertyCard from '../property/PropertyCard';

interface NewInMarketProps {
    properties: Property[];
    currentPage: number;
    totalPages: number;
}

export default function NewInMarket({ properties, currentPage, totalPages }: NewInMarketProps) {
    const hasPrev = currentPage > 1;
    const hasNext = currentPage < totalPages;

    // Build page numbers to show (max 5, centred around current page)
    const getPageNumbers = () => {
        const delta = 2;
        const range: number[] = [];
        const rangeWithDots: (number | '...')[] = [];

        for (
            let i = Math.max(1, currentPage - delta);
            i <= Math.min(totalPages, currentPage + delta);
            i++
        ) {
            range.push(i);
        }

        if (range[0] > 1) {
            rangeWithDots.push(1);
            if (range[0] > 2) rangeWithDots.push('...');
        }

        rangeWithDots.push(...range);

        if (range[range.length - 1] < totalPages) {
            if (range[range.length - 1] < totalPages - 1) rangeWithDots.push('...');
            rangeWithDots.push(totalPages);
        }

        return rangeWithDots;
    };

    return (
        <section>
            {/* Section header */}
            <div className="flex items-end justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-light text-nordic-dark">New in Market</h2>
                    <p className="text-nordic-muted mt-1 text-sm">Fresh opportunities added this week.</p>
                </div>
                <div className="hidden md:flex bg-white p-1 rounded-lg">
                    <button className="px-4 py-1.5 rounded-md text-sm font-medium bg-nordic-dark text-white shadow-sm">
                        All
                    </button>
                    <button className="px-4 py-1.5 rounded-md text-sm font-medium text-nordic-muted hover:text-nordic-dark">
                        Buy
                    </button>
                    <button className="px-4 py-1.5 rounded-md text-sm font-medium text-nordic-muted hover:text-nordic-dark">
                        Rent
                    </button>
                </div>
            </div>

            {/* Property grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {properties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <nav
                    aria-label="Property listing pages"
                    className="mt-12 flex items-center justify-center gap-2"
                >
                    {/* Previous */}
                    <Link
                        href={hasPrev ? `/?page=${currentPage - 1}` : '#'}
                        aria-disabled={!hasPrev}
                        aria-label="Previous page"
                        className={[
                            'flex items-center justify-center w-10 h-10 rounded-lg border transition-all',
                            hasPrev
                                ? 'border-nordic-dark/10 bg-white text-nordic-dark hover:border-mosque hover:text-mosque hover:shadow-md'
                                : 'border-nordic-dark/5 bg-white/50 text-nordic-dark/30 pointer-events-none',
                        ].join(' ')}
                    >
                        <span className="material-icons text-lg">chevron_left</span>
                    </Link>

                    {/* Page numbers */}
                    {getPageNumbers().map((p, i) =>
                        p === '...' ? (
                            <span
                                key={`dots-${i}`}
                                className="w-10 h-10 flex items-center justify-center text-nordic-muted text-sm"
                            >
                                …
                            </span>
                        ) : (
                            <Link
                                key={p}
                                href={`/?page=${p}`}
                                aria-label={`Page ${p}`}
                                aria-current={p === currentPage ? 'page' : undefined}
                                className={[
                                    'flex items-center justify-center w-10 h-10 rounded-lg border text-sm font-medium transition-all',
                                    p === currentPage
                                        ? 'border-mosque bg-mosque text-white shadow-sm'
                                        : 'border-nordic-dark/10 bg-white text-nordic-dark hover:border-mosque hover:text-mosque hover:shadow-md',
                                ].join(' ')}
                            >
                                {p}
                            </Link>
                        )
                    )}

                    {/* Next */}
                    <Link
                        href={hasNext ? `/?page=${currentPage + 1}` : '#'}
                        aria-disabled={!hasNext}
                        aria-label="Next page"
                        className={[
                            'flex items-center justify-center w-10 h-10 rounded-lg border transition-all',
                            hasNext
                                ? 'border-nordic-dark/10 bg-white text-nordic-dark hover:border-mosque hover:text-mosque hover:shadow-md'
                            : 'border-nordic-dark/5 bg-white/50 text-nordic-dark/30 pointer-events-none',
                        ].join(' ')}
                    >
                        <span className="material-icons text-lg">chevron_right</span>
                    </Link>
                </nav>
            )}

            {/* Page summary */}
            {totalPages > 1 && (
                <p className="mt-4 text-center text-xs text-nordic-muted">
                    Page {currentPage} of {totalPages}
                </p>
            )}
        </section>
    );
}
