import { retiredRacksBenchesCategoryPaths } from "../content/retired-racks-benches-paths.mjs";

const retiredCategoryPaths = [
  ...retiredRacksBenchesCategoryPaths,
  "/en/products/racks-benches"
];

const exactRedirects = {
  "/blog": "/resources",
  "/blogg": "/sv/blogg",
  "/contato": "/pt/contato",
  "/contatti": "/it/contatti",
  "/du-an": "/vi/du-an",
  "/fabbrica": "/it/fabbrica",
  "/fabrik": "/de/fabrik",
  "/fabryka": "/pl/fabryka",
  "/kontak": "/id/kontak",
  "/kontakt": "/de/kontakt",
  "/lien-he": "/vi/lien-he",
  "/oem-marka-wlasna": "/pl/oem-marka-wlasna",
  "/oem-merek-sendiri": "/id/oem-merek-sendiri",
  "/pabrik": "/id/pabrik",
  "/prodotti": "/it/prodotti",
  "/prodotti/manubri": "/it/prodotti/manubri",
  "/producten": "/nl/producten",
  "/producten/halterschijven": "/nl/producten/halterschijven",
  "/productos": "/es/productos",
  "/produk": "/id/produk",
  "/produk/dumbbell": "/id/produk/dumbbell",
  "/produkter": "/sv/produkter",
  "/produkter/hantlar": "/sv/produkter/hantlar",
  "/produkter/viktskivor": "/sv/produkter/viktskivor",
  "/produtos/anilhas": "/pt/produtos/anilhas",
  "/produtos/halteres": "/pt/produtos/halteres",
  "/proyectos": "/es/proyectos",
  "/san-pham": "/vi/san-pham",
  "/san-pham/banh-ta": "/vi/san-pham/banh-ta",
  "/resources/cable-attachment-sku-compatibility-register": "/resources/are-cable-machine-attachments-universal"
};

/** @type {{ source: string, destination: string, permanent: true }[]} */
export const legacyRedirects = [
  ...retiredCategoryPaths.map((path) => ({
    source: `${path}/:path*`,
    destination: path.slice(0, path.lastIndexOf("/")).replace(/^\/en\//, "/"),
    permanent: true
  })),
  ...Object.entries(exactRedirects).map(([source, destination]) => ({
    source,
    destination,
    permanent: true
  }))
];

// Historical carousel keys discovered as URLs in Search Console.
export const legacyAssetRedirects = [
  {
    source: "/assets/exhibitions/pbf-exhibition-05.avif-4",
    destination: "/assets/exhibitions/pbf-exhibition-05.avif",
    permanent: true
  },
  {
    source: "/assets/exhibitions/pbf-exhibition-07.avif-15",
    destination: "/assets/exhibitions/pbf-exhibition-07.avif",
    permanent: true
  },
  {
    source: "/assets/exhibitions/pbf-exhibition-01.avif-0",
    destination: "/assets/exhibitions/pbf-exhibition-01.avif",
    permanent: true
  }
];
