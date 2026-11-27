import { retiredRacksBenchesCategoryPaths } from "../content/retired-racks-benches";

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

export const legacyRedirects = [
  ...retiredCategoryPaths.map((path) => ({
    source: `${path}/:path*`,
    destination: path.slice(0, path.lastIndexOf("/")).replace(/^\/en\//, "/"),
    permanent: true as const
  })),
  ...Object.entries(exactRedirects).map(([source, destination]) => ({
    source,
    destination,
    permanent: true as const
  }))
];
