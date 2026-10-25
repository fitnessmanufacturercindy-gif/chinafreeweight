import { verifyLocalizedGuideRendering } from "./verify-localized-guide-rendering.mjs";

await verifyLocalizedGuideRendering({
  label: "Hex dumbbell alignment guide",
  copyFiles: [
    "hex-dumbbell-alignment-guide-copy-primary.json",
    "hex-dumbbell-alignment-guide-copy-eu.json",
    "hex-dumbbell-alignment-guide-copy-apac.json"
  ],
  imageFragment: "/assets/resources/hex-dumbbell-alignment/",
  heroSuffix: "hex-dumbbell-alignment-guide",
  artifactDirectory: "hex-dumbbell-alignment-2026-10-08",
  requiredProductLinks: {
    en: ["/products/dumbbells/hex-dumbbell-kg", "/products/dumbbells"],
    "pt-BR": ["/pt/produtos/halteres/halter-sextavado-borracha", "/pt/produtos/halteres"],
    es: ["/es/productos/mancuernas/mancuerna-hexagonal-goma", "/es/productos/mancuernas"],
    de: ["/de/produkte/kurzhanteln/gummi-hex-kurzhantel", "/de/produkte/kurzhanteln"],
    fr: ["/fr/produits/halteres/haltere-hexagonal-caoutchouc", "/fr/produits/halteres"],
    vi: ["/vi/san-pham/ta-tay/ta-tay-luc-giac-boc-cao-su", "/vi/san-pham/ta-tay"],
    sv: ["/sv/produkter/hantlar/hexagonal-hantel", "/sv/produkter/hantlar"],
    it: ["/it/prodotti/manubri/manubrio-esagonale-in-gomma", "/it/prodotti/manubri"],
    nl: ["/nl/producten/halters/rubberen-hex-halter", "/nl/producten/halters"],
    ar: ["/products/dumbbells/hex-dumbbell-kg", "/products/dumbbells"],
    ko: ["/ko/products/dumbbells/rubber-hex-dumbbell", "/ko/products/dumbbells"],
    id: ["/id/produk/dumbbell/dumbbell-hex-karet", "/id/produk/dumbbell"],
    pl: ["/pl/produkty/hantle/hantla-szesciokatna-gumowana", "/pl/produkty/hantle"]
  }
});
