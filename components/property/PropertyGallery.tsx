'use client';

import { useState } from 'react';
import Image from 'next/image';
import { PropertyImage } from '@/lib/properties';

interface PropertyGalleryProps {
    images?: PropertyImage[];
    fallbackImageUrl: string;
    fallbackAltText: string;
}

export default function PropertyGallery({ images, fallbackImageUrl, fallbackAltText }: PropertyGalleryProps) {
    const hasImages = images && images.length > 0;
    const allImages = hasImages 
        ? images 
        : [{ url: fallbackImageUrl, alt_text: fallbackAltText, is_primary: true, id: 'fallback', property_id: '', created_at: '' }];
        
    const [mainImageIndex, setMainImageIndex] = useState(0);
    const mainImage = allImages[mainImageIndex];

    return (
        <div className="space-y-4">
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl shadow-sm group">
                <Image
                    src={mainImage.url}
                    alt={mainImage.alt_text || 'Property Image'}
                    fill
                    priority={true}
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-mosque text-white text-xs font-medium px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                        Premium
                    </span>
                    <span className="bg-white/90 backdrop-blur text-nordic text-xs font-medium px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                        New
                    </span>
                </div>
                {allImages.length > 1 && (
                    <button className="absolute bottom-4 right-4 bg-white/90 hover:bg-white text-nordic px-4 py-2 rounded-lg text-sm font-medium shadow-lg backdrop-blur transition-all flex items-center gap-2">
                        <span className="material-icons text-sm">grid_view</span>
                        View All Photos
                    </button>
                )}
            </div>

            {/* Thumbnails */}
            {allImages.length > 1 && (
                <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 snap-x">
                    {allImages.map((img, index) => (
                        <div
                            key={img.id}
                            onClick={() => setMainImageIndex(index)}
                            className={`flex-none w-48 aspect-[4/3] rounded-lg overflow-hidden cursor-pointer snap-start transition-all ${
                                index === mainImageIndex
                                    ? 'ring-2 ring-mosque ring-offset-2 ring-offset-clear-day'
                                    : 'opacity-70 hover:opacity-100'
                            }`}
                        >
                            <Image
                                src={img.url}
                                alt={img.alt_text || `Thumbnail ${index + 1}`}
                                width={192}
                                height={144}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
