'use client';

import dynamic from 'next/dynamic';

// Import PropertyMap with ssr: false inside a Client Component
const PropertyMap = dynamic(() => import('./PropertyMap'), {
    ssr: false,
    loading: () => <div className="w-full h-full bg-slate-100 animate-pulse rounded-lg"></div>,
});

export default function PropertyMapWrapper({ lat, lng, title }: { lat: number, lng: number, title: string }) {
    return <PropertyMap lat={lat} lng={lng} title={title} />;
}
