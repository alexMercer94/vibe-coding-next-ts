# Buenas Prácticas: App de Bienes Raíces (Next.js)

## 🏗️ 1. Arquitectura y Componentes
- **Server Components por defecto:** Úsalos para estructurar la UI y cargar datos, manteniendo el JavaScript del cliente ligero.
- **Client Components limitados:** Usa `"use client"` estrictamente para interactividad (mapas, carruseles, calculadoras).
- **Server Actions:** Úsalas para manejar formularios (contacto, captación de leads) de forma segura sin sobrecargar el cliente.

## 🗄️ 2. Manejo de Datos (Supabase)
- **Paginación en el Servidor:** Emplea `limit` y `offset` para evitar consultas pesadas cuando el inventario crezca.
- **Filtros en la URL (Search Params):** Guarda el estado de la búsqueda (ej. `?city=Miami&beds=3`) en la URL para favorecer enlaces compartibles y SEO.
- **Búsqueda Geoespacial:** Considera habilitar **PostGIS** en Supabase para búsquedas por proximidad en el mapa.

## 🚀 3. Rendimiento y Optimización
- **Uso estricto de `next/image`:** Sirve imágenes de propiedades en WebP/AVIF y ajustadas al dispositivo.
- **Prevenir saltos visuales (CLS):** Define siempre anchos, altos, `aspect-ratio` o usa el atributo `fill` para las galerías.
- **Imágenes Prioritarias:** Usa `priority={true}` en la foto principal ("Hero") para agilizar el LCP (Largest Contentful Paint).
- **Revalidación de Caché:** Usa `revalidateTag` o `revalidatePath` para actualizar datos al instante cuando se venda o edite una propiedad.

## 🔍 4. SEO y Compartición (Crucial para Ventas)
- **Metadatos Dinámicos (`generateMetadata`):** Crea `<title>` y `<meta description>` únicos para la página de cada propiedad.
- **OpenGraph Optimizado:** Asegura que al compartir el enlace por WhatsApp/Redes se muestre la foto, el título y el precio correctos.
- **Schema Markup (JSON-LD):** Implementa el tipo `RealEstateListing` para activar resultados enriquecidos en Google.
- **Sitemap Dinámico:** Configura `sitemap.ts` para que incluya automáticamente las propiedades recién publicadas.

## 💡 5. UX e Ideas de Producto
- **Galerías Inmersivas:** Implementa visualizadores a pantalla completa de alta resolución para las fotos.
- **Mapas "Lazy-Loaded":** Usa `next/dynamic` para cargar el mapa (Google/Mapbox) solo al hacer scroll hacia él.
- **Marcadores de Favoritos:** Permite a los usuarios guardar propiedades (usando Auth o localStorage).
- **Calculadora de Hipotecas:** Un componente en la vista de detalle para estimar pagos mensuales.
- **Etiquetas o Insignias:** Superpón indicadores claros en las fotos como "Nuevo", "Vendido", "Destacado" o "Rebajado".
