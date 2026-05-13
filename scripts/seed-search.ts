import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

const generateProperties = () => {
  const properties = [];
  const locations = [
    'Miami, FL', 'Los Angeles, CA', 'New York, NY', 'Austin, TX', 'Aspen, CO', 
    'San Francisco, CA', 'Seattle, WA', 'Chicago, IL', 'Boston, MA', 'Denver, CO'
  ];
  const types = ['House', 'Apartment', 'Villa', 'Penthouse', 'Condo', 'Townhouse'];
  
  for (let i = 0; i < 20; i++) {
    const loc = locations[i % locations.length];
    const type = types[i % types.length];
    const beds = Math.floor(Math.random() * 5) + 1; // 1 to 5
    const baths = Math.floor(Math.random() * 4) + 1; // 1 to 4
    const priceBase = Math.floor(Math.random() * 4000) + 500; // 500 to 4500
    const priceFormatted = `${(priceBase / 1000).toFixed(1)}M`.replace('.0M', 'M');
    
    properties.push({
      title: `Modern ${type} in ${loc.split(',')[0]}`,
      slug: `modern-${type.toLowerCase()}-in-${loc.split(',')[0].toLowerCase().replace(' ', '-')}-${i}`,
      location: loc,
      price: priceFormatted,
      price_suffix: null,
      beds: beds,
      baths: baths,
      area: `${Math.floor(Math.random() * 4000) + 1000} sqft`,
      image_url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=2000',
      image_alt: `Beautiful ${type} exterior`,
      badge: null,
      tag: 'FOR SALE',
      is_featured: false,
      latitude: 0,
      longitude: 0,
    });
  }
  return properties;
};

async function seed() {
  console.log('Seeding properties...');
  const properties = generateProperties();
  
  const { data, error } = await supabase.from('properties').insert(properties).select();
  
  if (error) {
    console.error('Error inserting properties:', error);
    return;
  }
  
  console.log(`Inserted ${data.length} properties.`);
  
  // Create dummy images for these properties
  const propertyImages = [];
  for (const prop of data) {
    for (let i = 0; i < 3; i++) {
      propertyImages.push({
        property_id: prop.id,
        url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=2000',
        alt_text: 'Property Image',
        is_primary: i === 0,
      });
    }
  }
  
  const { error: imgError } = await supabase.from('property_images').insert(propertyImages);
  if (imgError) {
    console.error('Error inserting images:', imgError);
  } else {
    console.log('Inserted images.');
  }
}

seed();
