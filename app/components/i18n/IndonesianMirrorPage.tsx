import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Factory,
  Globe2,
  MessageCircle,
  PackageCheck,
  ShieldCheck
} from "lucide-react";
import type { ContentBlock, PublishedContent } from "../../../lib/content/types";
import { contentRepository } from "../../../lib/content/repository";
import { getDumbbellProduct } from "../../products/dumbbells/productData";
import { getWeightPlateProduct } from "../../products/weight-plates/productData";
import { getRacksBenchesProduct } from "../../products/racks-benches/productData";
import { getGymAccessoryProduct } from "../../products/gym-accessories/productData";
import { getPostBySlug } from "../../resources/blogData";
import LocalizedInquiryForm from "./LocalizedInquiryForm";
import styles from "./IndonesianMirrorPage.module.css";

type Version = PublishedContent["version"];
type MirrorLocale = "id" | "pl" | "nl";
function mirrorLocale(version: Version): MirrorLocale { return version.locale === "nl" ? "nl" : version.locale === "pl" ? "pl" : "id"; }
function tr(locale: MirrorLocale, indonesian: string, polish: string, dutch: string) { return locale === "nl" ? dutch : locale === "pl" ? polish : indonesian; }
type ProductData = {
  slug: string;
  name: string;
  range: string;
  type: string;
  image: string;
  copy: string;
  applications: string[];
  buyerNotes: string;
  gallery?: string[];
  details?: string[];
  features?: string[];
  oemOptions?: string[];
  material?: string;
  process?: string;
};

const coreImages: Record<string, string[]> = {
  home: ["/assets/hero-poster.avif", "/assets/hex-dumbbells.avif", "/assets/weight-plate.avif", "/assets/racks-benches.avif", "/assets/gym-accessories.avif"],
  "products-hub": ["/assets/hero-poster.avif", "/assets/hex-dumbbells.avif", "/assets/weight-plate.avif", "/assets/racks-benches.avif", "/assets/gym-accessories.avif"],
  factory: ["/assets/factory.avif", "/assets/factory-process/dumbbell-cutting.webp", "/assets/factory-cases/container-shipping-pbf.avif"],
  projects: ["/assets/projects/round-dumbbell-gym-zone.avif", "/assets/projects/commercial-dumbbell-rack-zone.avif", "/assets/project-plate-zone.avif", "/assets/case-showroom.avif"],
  "oem-private-label": ["/assets/dumbbell-production.avif", "/assets/hex-dumbbells.avif", "/assets/weight-plate.avif"],
  "rubber-hex-dumbbell-manufacturer": ["/assets/hex-dumbbells.avif", "/assets/dumbbell-production.avif", "/assets/factory-cases/packaging-area-pbf.webp"]
};

const categoryImages: Record<string, string> = {
  "dumbbells-category": "/assets/hex-dumbbells.avif",
  "weight-plates-category": "/assets/weight-plate.avif",
  "racks-benches-category": "/assets/racks-benches.avif",
  "gym-accessories-category": "/assets/gym-accessories.avif"
};

function englishPath(content: PublishedContent) {
  return content.entity.versions.en?.publicPath ?? "";
}

function sourceSlug(content: PublishedContent) {
  return englishPath(content).split("/").filter(Boolean).pop() ?? "";
}

function productData(content: PublishedContent): ProductData | undefined {
  const path = englishPath(content);
  const slug = sourceSlug(content);
  if (path.includes("/products/dumbbells/")) return getDumbbellProduct(slug);
  if (path.includes("/products/weight-plates/")) return getWeightPlateProduct(slug);
  if (path.includes("/products/racks-benches/")) return getRacksBenchesProduct(slug);
  if (path.includes("/products/gym-accessories/")) return getGymAccessoryProduct(slug);
  return undefined;
}

function paragraphs(content?: string) {
  return (content ?? "").split("\n\n").filter(Boolean).map((item) => <p key={item}>{item}</p>);
}

function textBlock(block: ContentBlock | undefined, fallback: string) {
  return block?.content || fallback;
}

function dataRows(block: ContentBlock) {
  return Array.isArray(block.data?.rows) ? block.data.rows as string[][] : [];
}

function dataColumns(block: ContentBlock) {
  return Array.isArray(block.data?.columns) ? block.data.columns as string[] : [];
}

function dataItems(block: ContentBlock) {
  return Array.isArray(block.data?.items) ? block.data.items as string[] : [];
}

function EditorialBlock({ block }: { block: ContentBlock }) {
  const columns = dataColumns(block);
  const rows = dataRows(block);
  const items = dataItems(block);
  return (
    <article className={styles.editorialBlock}>
      {block.heading ? <h2>{block.heading}</h2> : null}
      {block.data?.component === "definition" && typeof block.data.term === "string" ? <strong className={styles.term}>{block.data.term}</strong> : null}
      {paragraphs(block.content)}
      {columns.length && rows.length ? (
        <div className={styles.tableWrap}>
          <table><thead><tr>{columns.map((column) => <th key={column}>{column}</th>)}</tr></thead>
            <tbody>{rows.map((row, index) => <tr key={index}>{row.map((cell, cellIndex) => <td key={`${index}-${cellIndex}`}>{cell}</td>)}</tr>)}</tbody>
          </table>
        </div>
      ) : null}
      {items.length ? <ul>{items.map((item) => <li key={item}><CheckCircle2 size={18} />{item}</li>)}</ul> : null}
    </article>
  );
}

function EditorialGrid({ version, start = 0, end }: { version: Version; start?: number; end?: number }) {
  return <div className={styles.editorialGrid}>{version.body.slice(start, end).map((block) => <EditorialBlock key={block.id} block={block} />)}</div>;
}

function FinalCta({ locale, href }: { locale: MirrorLocale; href?: string }) {
  const target = href ?? tr(locale, "/id/kontak", "/pl/kontakt", "/nl/contact");
  return (
    <section className={styles.finalCta}>
      <div><span>{tr(locale, "Butuh penawaran untuk Indonesia?", "Potrzebujesz wyceny dla Polski?", "Een offerte nodig voor Nederland of België?")}</span><h2>{tr(locale, "Kirim daftar produk, jumlah, kebutuhan merek, dan tujuan pengiriman.", "Prześlij listę produktów, ilości, wymagania marki i miejsce dostawy.", "Stuur uw productlijst, aantallen, merkeisen en afleverplaats.")}</h2></div>
      <a href={target}>{tr(locale, "Minta penawaran", "Poproś o wycenę", "Offerte aanvragen")} <ArrowRight size={20} /></a>
    </section>
  );
}

function ContactMirror({ version }: { version: Version }) {
  const locale = mirrorLocale(version);
  const polish = version.locale === "pl";
  const sectionId = tr(locale, "permintaan", "zapytanie", "aanvraag");
  const whatsapp = "https://wa.me/8618963018533?text=" + encodeURIComponent(tr(locale, "Halo, saya ingin meminta penawaran peralatan gym untuk pasar Indonesia.", "Dzień dobry, proszę o ofertę na sprzęt fitness dla rynku polskiego.", "Goedendag, ik ontvang graag een offerte voor fitnessapparatuur voor de Nederlandse markt."));
  const factoryFacts = locale === "nl" ? [
    ["Bedrijfsprofiel", "PowerBaseFit ondersteunt internationale inkopers bij offertes, productselectie en de technische communicatie van OEM-projecten."],
    ["Productielocatie", "Zhengyang Road, Ningjin County, Dezhou, Shandong Province, China."],
    ["Hoofdproducten", "Vrije gewichten: halters, halterschijven, bumper plates, racks, banken en fitnessaccessoires."],
    ["OEM-mogelijkheden", "Logo, kleur, greepafwerking, productdetails, verpakking en private-labelprogramma's voor B2B-inkopers."],
    ["Exportmarkten", "Ondersteuning voor importeurs, distributeurs, sportschoolprojecten en fitnessmerken op internationale markten."]
  ] : polish ? [
    ["Profil firmy", "PowerBaseFit wspiera zagranicznych buyerów sprzętu fitness w przygotowaniu oferty, wyborze produktów i komunikacji projektów OEM."],
    ["Baza produkcyjna", "Zhengyang Road, Ningjin County, Dezhou, Shandong Province, China."],
    ["Główne produkty", "Wolne ciężary: hantle, obciążenia, talerze bumper, stojaki, ławki i akcesoria fitness."],
    ["Możliwości OEM", "Logo, kolor, wykończenie uchwytu, szczegóły produktu, opakowanie i program marki własnej dla buyerów B2B."],
    ["Rynki eksportowe", "Obsługa importerów, dystrybutorów, projektów siłowni i marek na rynkach międzynarodowych."]
  ] : [
    ["Profil perusahaan", "PowerBaseFit membantu pembeli peralatan gym luar negeri dalam penyusunan penawaran, pemilihan produk, dan komunikasi proyek OEM."],
    ["Basis manufaktur", "Zhengyang Road, Ningjin County, Dezhou, Shandong Province, China."],
    ["Produk utama", "Beban bebas: dumbbell, piring beban, bumper plate, rak, bangku, dan aksesori gym."],
    ["Kemampuan OEM", "Logo, warna, penyelesaian pegangan, detail produk, kemasan, dan program merek sendiri untuk pembeli B2B."],
    ["Pasar ekspor", "Melayani importir, distributor, proyek gym, dan merek di berbagai pasar internasional."]
  ];
  const contactFaq = locale === "nl" ? [
    ["Wat is de MOQ van PowerBaseFit?", "De MOQ hangt af van model, personalisatie en orderopbouw. Wij bevestigen een realistische hoeveelheid na beoordeling van de productlijst en varianten."],
    ["Is OEM-personalisatie beschikbaar?", "Ja. Voor geschikte producten en volumes ondersteunen wij logo, kleur, greepafwerking, productdetails, verpakking en private label."],
    ["Wat is de productietijd?", "De planning hangt af van aantallen en personalisatie. De termijn wordt bevestigd nadat materiaal, monster en productieplan zijn afgestemd."],
    ["Hoe worden producten voor export verpakt?", "Racks en functional trainers gebruiken doorgaans kisten; halters, schijven en accessoires dozen of een met de inkoper overeengekomen verpakking."],
    ["Hoe wordt de kwaliteit vóór verzending gecontroleerd?", "Inspectie kan materiaal, oppervlak, gewicht, montage, verpakking en gereedheid voor verzending omvatten."],
    ["Kan ik eerst een monster bestellen?", "Beschikbaarheid hangt af van product en voorraad. Stuur model, doelvolume en bestemmingsland voor de snelste passende optie."]
  ] : polish ? [
    ["Jakie jest MOQ PowerBaseFit?", "MOQ zależy od modelu, personalizacji i planu zamówienia. Realną ilość potwierdzamy po sprawdzeniu listy produktów i wariantów."],
    ["Czy dostępna jest personalizacja OEM?", "Tak. Obsługujemy logo, kolory, wykończenie uchwytów, szczegóły produktu, opakowanie i programy marki własnej dla odpowiednich produktów oraz wolumenów."],
    ["Jaki jest czas produkcji?", "Termin zależy od ilości i zakresu personalizacji. Harmonogram potwierdzamy po uzgodnieniu materiału, próbki i planu produkcyjnego."],
    ["Jak produkty są pakowane do eksportu?", "Stojaki i bramy treningowe zwykle wykorzystują skrzynie, a hantle, obciążenia i akcesoria kartony lub opakowanie uzgodnione z buyerem."],
    ["Jak wygląda kontrola jakości przed wysyłką?", "Kontrola może obejmować materiał, powierzchnię, masę, montaż, opakowanie i przygotowanie partii do wysyłki."],
    ["Czy mogę najpierw zamówić próbkę?", "Dostępność zależy od produktu i zapasu. Prześlij model, ilość docelową i kraj dostawy, aby ustalić najszybszą opcję."]
  ] : [
    ["Berapa MOQ PowerBaseFit?", "MOQ bergantung pada model, kebutuhan kustomisasi, dan rencana pesanan. Tim kami mengonfirmasi jumlah yang realistis setelah memeriksa daftar produk buyer."],
    ["Apakah tersedia kustomisasi OEM?", "Ya. Kami mendukung logo, warna, finishing handle, detail produk, kemasan, dan program private label sesuai produk serta volume."],
    ["Berapa lama waktu produksinya?", "Waktu produksi bergantung pada jumlah dan tingkat kustomisasi. Jadwal dikonfirmasi setelah material, sampel, dan rencana produksi disetujui."],
    ["Bagaimana produk dikemas untuk ekspor?", "Rack dan functional trainer umumnya memakai peti kayu; dumbbell, piring beban, dan aksesori umumnya memakai karton atau kemasan khusus buyer."],
    ["Bagaimana kontrol mutu sebelum pengiriman?", "Pemeriksaan dapat mencakup material, finishing permukaan, berat, perakitan, kemasan, dan persiapan pengiriman."],
    ["Apakah saya dapat memesan sampel dahulu?", "Ketersediaan sampel bergantung pada stok dan jenis produk. Kirim model, jumlah target, dan negara tujuan untuk pilihan tercepat."]
  ];
  return (
    <main className={`${styles.page} ${styles.contactPage}`} data-page-family="contact">
      <section className={styles.splitHero}>
        <div className={styles.heroCopy}>
          <span>{tr(locale, "Basis manufaktur dan ekspor PowerBaseFit", "Baza produkcyjna i eksportowa PowerBaseFit", "Productie- en exportbasis van PowerBaseFit")}</span>
          <h1>{version.h1}</h1>
          <p>{tr(locale, "Tim kami menanggapi kebutuhan dumbbell, piring beban, proyek gym, dan pesanan OEM dengan cepat dan terstruktur.", "Odpowiadamy na zapytania dotyczące hantli, obciążeń, projektów siłowni i zamówień OEM w jasny, uporządkowany sposób.", "Wij beantwoorden aanvragen voor halters, halterschijven, sportschoolprojecten en OEM-orders duidelijk en gestructureerd.")}</p>
          <div className={styles.heroActions}><a href={`#${sectionId}`}>{tr(locale, "Minta penawaran sekarang", "Poproś o wycenę", "Offerte aanvragen")} <ArrowRight size={20} /></a><a className={styles.secondary} href={whatsapp}><MessageCircle size={20} /> {tr(locale, "Chat WhatsApp", "Napisz na WhatsApp", "WhatsApp sturen")}</a></div>
        </div>
        <div className={styles.heroMedia}><img src="/assets/project-dumbbell-zone.avif" alt={tr(locale, "Area beban bebas gym komersial PowerBaseFit", "Komercyjna strefa wolnych ciężarów PowerBaseFit", "Commerciële vrije-gewichtzone met PowerBaseFit-apparatuur")} /><div><strong>{tr(locale, "Respons dalam 12 jam", "Odpowiedź w ciągu 12 godzin", "Reactie binnen 12 uur")}</strong><span>{tr(locale, "Untuk importir, distributor, proyek gym, dan merek OEM", "Dla importerów, dystrybutorów, projektów siłowni i marek OEM", "Voor importeurs, distributeurs, sportschoolprojecten en OEM-merken")}</span></div></div>
      </section>
      <section className={styles.trustBar}><div><Clock3 />{tr(locale, "Respons cepat dalam 12 jam", "Odpowiedź w ciągu 12 godzin", "Reactie binnen 12 uur")}</div><div><Factory />{tr(locale, "Pasokan langsung dari pabrik", "Dostawa bezpośrednio z fabryki", "Rechtstreekse levering vanuit de fabriek")}</div><div><PackageCheck />{tr(locale, "Dukungan OEM dan pengiriman global", "Wsparcie OEM i wysyłka międzynarodowa", "OEM-ondersteuning en internationale verzending")}</div></section>
      <section className={styles.formSection} id={sectionId}>
        <div className={styles.formIntro}><span>{tr(locale, "Formulir permintaan B2B", "Formularz zapytania B2B", "B2B-aanvraagformulier")}</span><h2>{tr(locale, "Ceritakan kebutuhan Anda. Kami siapkan penawaran yang jelas.", "Opisz swoje potrzeby. Przygotujemy przejrzystą ofertę.", "Beschrijf uw behoefte. Wij maken een heldere offerte.")}</h2><p>{tr(locale, "Informasi produk, jumlah, logo, kemasan, dan tujuan membantu kami memberi jawaban yang lebih tepat.", "Informacje o produkcie, ilości, logo, opakowaniu i miejscu dostawy pozwalają szybciej przygotować właściwą odpowiedź.", "Producten, aantallen, logo, verpakking en bestemming helpen ons sneller een passende reactie te geven.")}</p><div className={styles.directContact}><small>{tr(locale, "Dukungan pabrik nyata · penawaran siap OEM · struktur pembelian B2B", "Rzeczywiste wsparcie fabryki · oferta OEM · struktura zakupu B2B", "Directe fabrieksondersteuning · OEM-offerte · B2B-inkoopstructuur")}</small><strong>Kloe Du</strong><a href="mailto:Kloe@powerbasefit.com">Kloe@powerbasefit.com</a><a href="tel:+8618963018533">+86 18963018533</a><a href={whatsapp}>WhatsApp: +86 18963018533</a></div></div>
        <LocalizedInquiryForm locale={locale} />
      </section>
      <section className={styles.infoSection}><div className={styles.sectionHeading}><span>{tr(locale, "Informasi pabrik", "Informacje o fabryce", "Fabrieksinformatie")}</span><h2>{tr(locale, "Basis manufaktur dan ekspor", "Baza produkcyjna i eksportowa", "Productie- en exportbasis")}</h2><p>{tr(locale, "Produsen beban bebas untuk pembeli B2B yang memerlukan komunikasi jelas, produksi stabil, dan dukungan produk siap ekspor.", "Producent wolnych ciężarów dla buyerów B2B wymagających jasnej komunikacji, stabilnej produkcji i wsparcia eksportowego.", "Fabrikant van vrije gewichten voor B2B-inkopers die heldere communicatie, stabiele productie en exportondersteuning nodig hebben.")}</p></div><div className={styles.editorialGrid}>{factoryFacts.map(([heading, copy]) => <article className={styles.editorialBlock} key={heading}><h3>{heading}</h3><p>{copy}</p></article>)}</div></section>
      <section className={styles.mapSection}><div><span>{tr(locale, "Lokasi basis produksi", "Lokalizacja produkcji", "Productielocatie")}</span><h2>Dezhou, Shandong, China</h2><p>North Head of Sunguan Road, Ningjin County, Dezhou City, Shandong Province, China.</p></div><iframe title={tr(locale, "Lokasi PowerBaseFit di OpenStreetMap", "Lokalizacja PowerBaseFit w OpenStreetMap", "Locatie van PowerBaseFit op OpenStreetMap")} src="https://www.openstreetmap.org/export/embed.html?bbox=116.775%2C37.618%2C116.825%2C37.655&layer=mapnik&marker=37.631564%2C116.790819" loading="lazy" /></section>
      <section className={styles.faqSection}><div className={styles.sectionHeading}><span>FAQ</span><h2>{tr(locale, "Pertanyaan sebelum meminta penawaran", "Najczęstsze pytania przed wysłaniem zapytania", "Veelgestelde vragen vóór een offerteaanvraag")}</h2></div><div className={styles.faqGrid}>{contactFaq.map(([question, answer]) => <article key={question}><h3>{question}</h3><p>{answer}</p></article>)}</div></section>
      <FinalCta locale={locale} href={`#${sectionId}`} />
    </main>
  );
}

function ProductMirror({ content }: { content: PublishedContent }) {
  const { version } = content;
  const locale = mirrorLocale(version);
  const source = productData(content);
  const images = source?.gallery?.length ? source.gallery : [source?.image ?? version.images[0]?.src, ...version.images.slice(1).map((image) => image.src)].filter(Boolean) as string[];
  const featureItems = version.body.flatMap(dataItems).slice(0, 6);
  const oemItems = locale === "nl"
    ? ["Logo en gewichtsaanduiding", "Kleur of afwerking", "Etiket en exportdoos", "Planning van exportpallets"]
    : locale === "pl"
      ? ["Logo i oznaczenia masy", "Kolor lub wykończenie", "Etykieta oraz karton", "Planowanie palety eksportowej"]
      : ["Logo dan penandaan berat", "Warna atau penyelesaian permukaan", "Label dan karton ekspor", "Perencanaan palet ekspor"];
  const productType = version.schemaData.category;
  const rangeLabel = locale === "nl" ? "Bereik" : locale === "pl" ? "Zakres" : "Berat dan ukuran";
  const productRange = version.schemaData.specifications?.find((item) => item.name === rangeLabel)?.value;
  return (
    <main className={`${styles.page} ${styles.productPage}`} data-page-family="product-detail">
      <section className={styles.productHero}>
        <div className={styles.productCopy}><a href={version.schemaData.breadcrumbs?.at(-2)?.path ?? tr(locale, "/id/produk", "/pl/produkty", "/nl/producten")}>← {tr(locale, "Kembali ke kategori", "Wróć do kategorii", "Terug naar de categorie")}</a><span>{productType}</span><h1>{version.h1}</h1><p>{version.description}</p><div className={styles.specRail}><div><small>{tr(locale, "Rentang", "Zakres", "Bereik")}</small><strong>{productRange ?? tr(locale, "Sesuai konfigurasi", "Według zatwierdzonej konfiguracji", "Volgens goedgekeurde configuratie")}</strong></div><div><small>{tr(locale, "Jenis produk", "Rodzaj produktu", "Producttype")}</small><strong>{productType}</strong></div><div><small>{tr(locale, "Sasaran pembeli", "Odbiorcy", "Doelgroep")}</small><strong>{tr(locale, "Gym, distributor, dan merek OEM", "Siłownie, dystrybutorzy i marki OEM", "Sportscholen, distributeurs en OEM-merken")}</strong></div></div><a className={styles.primaryButton} href={tr(locale, "/id/kontak", "/pl/kontakt", "/nl/contact")}>{tr(locale, "Minta penawaran", "Poproś o wycenę", "Offerte aanvragen")} <ArrowRight size={20} /></a></div>
        <div className={styles.productMainImage}><img src={images[0]} alt={version.images[0]?.alt ?? version.h1} /></div>
      </section>
      {images.length > 1 ? <section className={styles.gallery}>{images.slice(0, 5).map((image, index) => <img key={image} src={image} alt={`${version.h1} — ${tr(locale, "tampilan", "widok", "beeld")} ${index + 1}`} loading={index ? "lazy" : "eager"} />)}</section> : null}
      <section className={styles.productOverview}><div className={styles.sectionHeading}><span>{tr(locale, "Ikhtisar produk", "Przegląd produktu", "Productoverzicht")}</span><h2>{tr(locale, `Spesifikasi dan keputusan pembelian ${version.h1}`, `Specyfikacja i decyzje zakupowe — ${version.h1}`, `Specificatie en inkoopbeslissingen — ${version.h1}`)}</h2><p>{textBlock(version.body[0], version.description)}</p></div><EditorialGrid version={version} start={1} end={5} /></section>
      <section className={styles.darkBand}><div><span>{tr(locale, "Fitur utama", "Najważniejsze punkty", "Belangrijkste punten")}</span><h2>{tr(locale, "Hal yang perlu dikonfirmasi sebelum sampel dan produksi", "Co potwierdzić przed próbką i produkcją", "Wat u vóór monster en productie bevestigt")}</h2></div><ul>{featureItems.map((item) => <li key={item}><CheckCircle2 />{item}</li>)}</ul></section>
      <section className={styles.twoColumn}><div><span>{tr(locale, "Aplikasi", "Zastosowanie", "Toepassing")}</span><h2>{tr(locale, "Penggunaan dan posisi produk", "Sposób użycia i pozycjonowanie produktu", "Gebruik en positionering van het product")}</h2><p>{textBlock(version.body[5], version.description)}</p><ul>{(locale === "nl" ? ["Commerciële sportscholen", "Distributeurs en importeurs", "Private-labelprojecten"] : locale === "pl" ? ["Siłownie komercyjne", "Dystrybutorzy i importerzy", "Projekty marki własnej"] : ["Gym komersial", "Distributor dan importir", "Proyek merek sendiri"]).map((item) => <li key={item}>{item}</li>)}</ul></div><div><span>{tr(locale, "OEM dan merek sendiri", "OEM i marka własna", "OEM en private label")}</span><h2>{tr(locale, "Opsi merek untuk pasar Indonesia", "Opcje marki dla rynku polskiego", "Merkopties voor de Nederlandse markt")}</h2><ul>{oemItems.map((item) => <li key={item}><ShieldCheck />{item}</li>)}</ul></div></section>
      <section className={styles.infoSection}><EditorialGrid version={version} start={5} end={12} /></section>
      <FinalCta locale={locale} />
    </main>
  );
}

function ArticleMirror({ content }: { content: PublishedContent }) {
  const { version } = content;
  const locale = mirrorLocale(version);
  const source = content.entity.versions.en?.publicPath?.startsWith("/resources/") ? getPostBySlug(sourceSlug(content)) : undefined;
  const hero = source?.coverImage ?? version.images[0]?.src;
  return (
    <main className={`${styles.page} ${styles.articlePage}`} data-page-family="article">
      <section className={styles.articleHero}><div><a href={tr(locale, "/id/blog", "/pl/blog", "/nl/blog")}>← {tr(locale, "Semua panduan", "Wszystkie poradniki", "Alle inkoopgidsen")}</a><span>{tr(locale, "Panduan teknis untuk pembeli Indonesia", "Poradnik techniczny dla polskich buyerów", "Technische gids voor Nederlandse B2B-inkopers")}</span><h1>{version.h1}</h1><p>{version.description}</p><div className={styles.articleMeta}>{tr(locale, "Ditulis oleh", "Autor", "Auteur")} {version.author?.name} · {tr(locale, "Ditinjau oleh", "Weryfikacja", "Technische controle")} {version.reviewedBy?.name}</div></div>{hero ? <img src={hero} alt={version.images[0]?.alt ?? version.h1} /> : null}</section>
      <div className={styles.articleLayout}><aside><strong>{tr(locale, "Dalam panduan ini", "W tym poradniku", "In deze gids")}</strong>{version.body.slice(0, 12).map((block) => block.heading ? <a key={block.id} href={`#${block.id}`}>{block.heading}</a> : null)}</aside><article className={styles.articleBody}>{version.body.map((block, index) => <div id={block.id} key={block.id}><EditorialBlock block={block} />{index === 5 && version.images[1] ? <img src={version.images[1].src} alt={version.images[1].alt} /> : null}{index === 12 && version.images[2] ? <img src={version.images[2].src} alt={version.images[2].alt} /> : null}</div>)}</article></div>
      <section className={styles.faqSection}><div className={styles.sectionHeading}><span>FAQ</span><h2>{tr(locale, `Pertanyaan terkait ${version.h1}`, `Pytania dotyczące: ${version.h1}`, `Vragen over ${version.h1}`)}</h2></div><div className={styles.faqGrid}>{version.faq.map((item) => <article key={item.id}><h3>{item.question}</h3><p>{item.answer}</p></article>)}</div></section>
      <FinalCta locale={locale} />
    </main>
  );
}

function CategoryMirror({ content }: { content: PublishedContent }) {
  const { entity, version } = content;
  const locale = mirrorLocale(version);
  const allProducts = contentRepository.listPublished({ locale }).filter(({ entity: item, version: itemVersion }) => item.type === "product" && (entity.id === "products-hub" || itemVersion.schemaData.breadcrumbs?.some((crumb) => crumb.path === version.publicPath)));
  const hero = categoryImages[entity.id] ?? "/assets/hero-poster.avif";
  return (
    <main className={`${styles.page} ${styles.categoryPage}`} data-page-family="category">
      <section className={styles.categoryHero}><div><span>{tr(locale, "Katalog peralatan gym PowerBaseFit", "Katalog sprzętu fitness PowerBaseFit", "Catalogus fitnessapparatuur van PowerBaseFit")}</span><h1>{version.h1}</h1><p>{version.description}</p><a className={styles.primaryButton} href="#producten">{tr(locale, "Lihat produk", "Zobacz produkty", "Bekijk producten")} <ArrowRight size={20} /></a></div><img src={hero} alt={version.h1} /></section>
      <section className={styles.capabilityStrip}><div><ShieldCheck />{tr(locale, "Kontrol mutu batch", "Kontrola jakości partii", "Kwaliteitscontrole per partij")}</div><div><Factory />{tr(locale, "Pasokan langsung pabrik", "Dostawa bezpośrednio z fabryki", "Rechtstreeks vanuit de fabriek")}</div><div><PackageCheck />{tr(locale, "Kemasan ekspor dan OEM", "Opakowanie eksportowe i OEM", "Exportverpakking en OEM")}</div></section>
      <section className={styles.catalogSection} id="producten"><div className={styles.sectionHeading}><span>{tr(locale, "Pilih produk", "Wybierz produkt", "Kies een product")}</span><h2>{tr(locale, "Model untuk proyek, distribusi, dan merek sendiri", "Modele dla projektów, dystrybucji i marek własnych", "Modellen voor projecten, distributie en private labels")}</h2></div><div className={styles.productGrid}>{allProducts.map((item) => { const data = productData(item); const display = locale === "nl" ? item.version.h1.replace(" voor professionele sportscholen en B2B-inkoop", "") : locale === "pl" ? item.version.h1.replace(" do profesjonalnych siłowni i zakupów B2B", "") : item.version.h1.replace(" untuk gym profesional dan pengadaan B2B", ""); return <article key={item.entity.id}><a href={item.version.publicPath}><img src={data?.image ?? item.version.images[0]?.src} alt={item.version.images[0]?.alt ?? item.version.h1} /><div><span>{item.version.schemaData.category}</span><h3>{display}</h3><p>{item.version.description}</p><strong>{tr(locale, "Lihat detail", "Zobacz szczegóły", "Bekijk details")} <ArrowRight size={17} /></strong></div></a></article>; })}</div></section>
      <section className={styles.infoSection}><EditorialGrid version={version} start={0} end={10} /></section>
      <FinalCta locale={locale} />
    </main>
  );
}

function ResourceIndexMirror({ version }: { version: Version }) {
  const locale = mirrorLocale(version);
  const posts = contentRepository.listPublished({ locale }).filter(({ entity }) => entity.type === "blog");
  return (
    <main className={`${styles.page} ${styles.resourcesPage}`} data-page-family="resources">
      <section className={styles.resourceHero}>
        <div><span>{tr(locale, "Pusat pengetahuan beban bebas", "Centrum wiedzy o wolnych ciężarach", "Kenniscentrum voor vrije gewichten")}</span><h1>{version.h1}</h1><p>{version.description}</p></div>
        <div className={styles.proofGrid}>
          <article><Factory /><strong>{tr(locale, "Sudut pandang pabrik", "Perspektywa fabryki", "Perspectief van de fabriek")}</strong><p>{tr(locale, "Produksi, kemasan, inspeksi, dan OEM.", "Produkcja, opakowanie, inspekcja i OEM.", "Productie, verpakking, inspectie en OEM.")}</p></article>
          <article><ShieldCheck /><strong>{tr(locale, "Jawaban berbasis bukti", "Odpowiedzi oparte na danych", "Antwoorden op basis van bewijs")}</strong><p>{tr(locale, "Data teknis untuk keputusan pembelian.", "Dane techniczne wspierające decyzje zakupowe.", "Technische gegevens voor onderbouwde inkoopbeslissingen.")}</p></article>
          <article><PackageCheck /><strong>{tr(locale, "Siap untuk RFQ", "Gotowe do RFQ", "Klaar voor uw RFQ")}</strong><p>{tr(locale, "Tabel dan checklist yang dapat diterapkan.", "Tabele i checklisty do praktycznego zastosowania.", "Praktische tabellen en checklists voor uw aanvraag.")}</p></article>
        </div>
      </section>
      <section className={styles.postGrid}>
        {posts.map((post, index) => (
          <article key={post.entity.id}>
            <a href={post.version.publicPath}>
              <img
                src={post.version.images[0]?.src}
                alt={post.version.images[0]?.alt ?? post.version.h1}
                loading={index ? "lazy" : "eager"}
              />
              <div><span>0{index + 1}</span><h2>{post.version.h1}</h2><p>{post.version.description}</p><strong>{tr(locale, "Baca panduan", "Czytaj poradnik", "Lees de gids")} <ArrowRight size={18} /></strong></div>
            </a>
          </article>
        ))}
      </section>
      <FinalCta locale={locale} />
    </main>
  );
}

function HomeMirror({ version }: { version: Version }) {
  const locale = mirrorLocale(version);
  const categories = contentRepository.listPublished({ locale }).filter(({ entity }) => ["dumbbells-category", "weight-plates-category", "racks-benches-category", "gym-accessories-category"].includes(entity.id));
  return (
    <main className={`${styles.page} ${styles.homePage}`} data-page-family="home"><section className={styles.homeHero}><img src="/assets/hero-poster.avif" alt={tr(locale, "Peralatan gym PowerBaseFit", "Profesjonalny sprzęt fitness PowerBaseFit", "Professionele fitnessapparatuur van PowerBaseFit")} /><div><h1>{version.h1}</h1><p>{version.description}</p><div className={styles.heroActions}><a href={tr(locale, "/id/produk", "/pl/produkty", "/nl/producten")}>{tr(locale, "Jelajahi produk", "Zobacz produkty", "Bekijk producten")} <ArrowRight size={20} /></a><a className={styles.secondary} href={tr(locale, "/id/kontak", "/pl/kontakt", "/nl/contact")}>{tr(locale, "Minta penawaran", "Poproś o wycenę", "Offerte aanvragen")}</a></div></div></section><section className={styles.catalogSection}><div className={styles.sectionHeading}><span>{tr(locale, "Kategori produk", "Kategorie produktów", "Productcategorieën")}</span><h2>{tr(locale, "Beban bebas dan peralatan gym untuk pembeli profesional", "Wolne ciężary i wyposażenie siłowni dla profesjonalnych buyerów", "Vrije gewichten en fitnessapparatuur voor professionele inkopers")}</h2></div><div className={styles.categoryGrid}>{categories.map((item) => <a key={item.entity.id} href={item.version.publicPath}><img src={categoryImages[item.entity.id]} alt={item.version.h1} /><div><h3>{item.version.h1}</h3><p>{item.version.description}</p></div></a>)}</div></section><section className={styles.factoryFeature}><img src="/assets/factory.avif" alt={tr(locale, "Pabrik PowerBaseFit", "Fabryka PowerBaseFit", "PowerBaseFit-fabriek")} /><div><span>{tr(locale, "Manufaktur dan ekspor", "Produkcja i eksport", "Productie en export")}</span><h2>{tr(locale, "Spesifikasi, sampel, produksi, QC, dan pengiriman dalam satu alur.", "Specyfikacja, próbka, produkcja, QC i dostawa w jednym procesie.", "Specificatie, monster, productie, QC en levering in één proces.")}</h2><p>{textBlock(version.body[4], version.description)}</p><a href={tr(locale, "/id/pabrik", "/pl/fabryka", "/nl/fabriek")}>{tr(locale, "Lihat proses pabrik", "Zobacz proces produkcyjny", "Bekijk het productieproces")} <ArrowRight size={18} /></a></div></section><section className={styles.infoSection}><EditorialGrid version={version} start={0} end={10} /></section><FinalCta locale={locale} /></main>
  );
}

function CoreMirror({ content }: { content: PublishedContent }) {
  const { entity, version } = content;
  const locale = mirrorLocale(version);
  const images = coreImages[entity.id] ?? version.images.map((image) => image.src);
  return (
    <main className={`${styles.page} ${styles.corePage}`} data-page-family="core"><section className={styles.coreHero}><div><span>PowerBaseFit · {tr(locale, "Pasokan B2B", "Dostawy B2B", "B2B-levering")}</span><h1>{version.h1}</h1><p>{version.description}</p><a className={styles.primaryButton} href={tr(locale, "/id/kontak", "/pl/kontakt", "/nl/contact")}>{tr(locale, "Diskusikan proyek", "Omów projekt", "Bespreek uw project")} <ArrowRight size={20} /></a></div>{images[0] ? <img src={images[0]} alt={version.h1} /> : null}</section><section className={styles.capabilityStrip}><div><Factory />{tr(locale, "Produksi terkontrol", "Kontrolowana produkcja", "Gecontroleerde productie")}</div><div><ShieldCheck />{tr(locale, "Spesifikasi dan QC", "Specyfikacja i QC", "Specificatie en QC")}</div><div><Globe2 />{tr(locale, "Ekspor ke pasar global", "Eksport na rynki międzynarodowe", "Export naar internationale markten")}</div></section><section className={styles.infoSection}><EditorialGrid version={version} start={0} end={5} /></section>{images.length > 1 ? <section className={styles.mediaBand}>{images.slice(1).map((image, index) => <img key={image} src={image} alt={`${version.h1} ${index + 2}`} />)}</section> : null}<section className={styles.infoSection}><EditorialGrid version={version} start={5} /></section><FinalCta locale={locale} /></main>
  );
}

export default function IndonesianMirrorPage({ content }: { content: PublishedContent }) {
  const { entity, version } = content;
  if (entity.type === "contact") return <ContactMirror version={version} />;
  if (entity.type === "product") return <ProductMirror content={content} />;
  if (entity.type === "blog") return <ArticleMirror content={content} />;
  if (entity.type === "blog_index") return <ResourceIndexMirror version={version} />;
  if (entity.type === "home") return <HomeMirror version={version} />;
  if (entity.type === "product_category") return <CategoryMirror content={content} />;
  return <CoreMirror content={content} />;
}
