import { dumbbellProducts } from "../../app/products/dumbbells/productData";
import { weightPlateProducts } from "../../app/products/weight-plates/productData";
import { racksBenchesProducts } from "../../app/products/racks-benches/productData";
import { gymAccessoryProducts } from "../../app/products/gym-accessories/productData";
import type { ContentEntity, ContentType, LocalizedContentVersion, LocalizedImage } from "../../lib/content/types";
import { answerBlock, checklistBlock, definitionBlock, germanEditorialAuthor, germanImagePath, germanTechnicalReviewer, specTable, textBlock } from "./de-content-helpers";

type ProductSource = {
  slug: string;
  name: string;
  range: string;
  type: string;
  image: string;
  gallery?: string[];
};

type CategoryKey = "dumbbells" | "plates" | "racks" | "accessories";

export type GermanProductProfile = {
  source: ProductSource;
  category: CategoryKey;
  deSlug: string;
  name: string;
  keyword: string;
  positioning: string;
};

const dumbbellMap: Record<string, [string, string, string]> = {
  "twelve-sided-steel-dumbbell": ["zwoelfeck-stahl-kurzhantel", "Zwölfeck-Stahlkurzhantel", "Stahl Kurzhanteln Hersteller"],
  "cast-iron-dumbbell": ["gusseisen-kurzhantel", "Gusseisen-Kurzhantel", "Gusseisen Kurzhanteln Großhandel"],
  "chrome-dumbbell": ["chrom-kurzhantel", "Chrom-Kurzhantel", "Chrom Kurzhanteln Hersteller"],
  "classic-rubber-round-dumbbell": ["gummi-rundkurzhantel", "Gummi-Rundkurzhantel", "Rundhanteln Gummi Fitnessstudio"],
  "cpu-dumbbell-kg": ["cpu-kurzhantel", "CPU-Kurzhantel", "CPU Kurzhanteln Hersteller"],
  "cpu-square-dumbbell-kg": ["cpu-vierkant-kurzhantel", "CPU-Vierkant-Kurzhantel", "CPU Vierkant Kurzhanteln"],
  "adjustable-dumbbell-kg": ["verstellbare-kurzhantel", "Verstellbare Kurzhantel", "verstellbare Kurzhanteln Großhandel"],
  "cpu-heavy-dumbbell-kg": ["cpu-schwerlast-kurzhantel", "CPU-Schwerlast-Kurzhantel", "schwere Kurzhanteln Fitnessstudio"],
  "hex-dumbbell-kg": ["gummi-hex-kurzhantel", "Gummi-Hex-Kurzhantel", "Hex Kurzhanteln Hersteller"],
  "neoprene-dumbbell-kg": ["neopren-kurzhantel", "Neopren-Kurzhantel", "Neopren Hanteln Großhandel"],
  "pu-dumbbell-kg": ["pu-kurzhantel", "PU-Kurzhantel", "PU Kurzhanteln Fitnessstudio"],
  "sus304-dumbbell-kg": ["edelstahl-kurzhantel-sus304", "SUS304-Edelstahlkurzhantel", "Edelstahl Kurzhanteln Hersteller"],
  "tpu-dumbbell-kg": ["tpu-kurzhantel", "TPU-Kurzhantel", "TPU Kurzhanteln Hersteller"],
  "tpu-round-dumbbell-kg": ["tpu-rundkurzhantel", "TPU-Rundkurzhantel", "TPU Rundhanteln Großhandel"],
  "tpu-small-dumbbell-kg": ["tpu-kompakt-kurzhantel", "Kompakte TPU-Kurzhantel", "kompakte TPU Kurzhanteln"],
  "selectorized-adjustable-dumbbell-kg": ["selector-kurzhantel-verstellbar", "Verstellbare Selector-Kurzhantel", "Selector Kurzhanteln Großhandel"],
  "cpu-hexagonal-dumbbell-kg": ["cpu-hex-kurzhantel", "CPU-Hex-Kurzhantel", "CPU Hex Kurzhanteln"],
  "cpu-compact-dumbbell": ["cpu-kompakt-kurzhantel", "CPU-Kompaktkurzhantel", "CPU Kompakthanteln"],
  "cpu-twelve-sided-dumbbell": ["cpu-zwoelfeck-kurzhantel", "CPU-Zwölfeck-Kurzhantel", "CPU Zwölfeck Hanteln"],
  "cpu-hexagonal-dumbbell-wide": ["cpu-hex-kurzhantel-breit", "Breite CPU-Hex-Kurzhantel", "breite CPU Hex Hanteln"],
  "cpu-dumbbell-full-range": ["cpu-kurzhantel-komplettsortiment", "CPU-Kurzhantel-Komplettsortiment", "CPU Kurzhantel Sortiment Fitnessstudio"]
};

const plateMap: Record<string, [string, string, string]> = {
  "cpu-bumper-plate": ["cpu-bumper-plate", "CPU Bumper Plate", "CPU Bumper Plates Hersteller"],
  "cpu-color-bumper-plate": ["cpu-bumper-plates-farbig", "Farbige CPU Bumper Plates", "farbige Bumper Plates Großhandel"],
  "rubber-weight-plate": ["gummi-gewichtsscheibe", "Gummi-Gewichtsscheibe", "Gummi Gewichtsscheiben Hersteller"],
  "rubber-barbell-plate": ["gummi-hantelscheibe-griff", "Gummi-Hantelscheibe mit Griffen", "Hantelscheiben Gummi 50 mm"],
  "full-rubber-barbell-plate": ["vollgummi-hantelscheibe", "Vollgummi-Hantelscheibe", "Vollgummi Hantelscheiben Großhandel"],
  "black-competition-plate": ["competition-gewichtsscheibe-schwarz", "Schwarze Competition-Gewichtsscheibe", "Competition Gewichtsscheiben Hersteller"],
  "solid-steel-barbell-plate": ["stahl-hantelscheibe", "Vollstahl-Hantelscheibe", "Stahl Hantelscheiben Hersteller"],
  "custom-solid-steel-barbell-plate": ["stahl-hantelscheibe-individuell", "Individuelle Vollstahl-Hantelscheibe", "Hantelscheiben Stahl Private Label"],
  "heavy-solid-steel-plate": ["schwerlast-stahl-gewichtsscheibe", "Schwerlast-Stahlgewichtsscheibe", "schwere Stahl Gewichtsscheiben"],
  "gold-steel-barbell-plate": ["stahl-hantelscheibe-gold", "Goldfarbene Stahl-Hantelscheibe", "goldene Hantelscheiben Hersteller"],
  "rubber-competition-bumper-plate": ["gummi-competition-bumper-plate", "Gummi Competition Bumper Plate", "Competition Bumper Plates Großhandel"],
  "cast-iron-weight-plate": ["gusseisen-gewichtsscheibe", "Gusseisen-Gewichtsscheibe", "Gusseisen Gewichtsscheiben Hersteller"],
  "seven-hole-cast-iron-plate": ["gusseisen-gewichtsscheibe-sieben-griffe", "Gusseisen-Gewichtsscheibe mit sieben Griffen", "Griff Gewichtsscheiben Gusseisen"],
  "spray-weight-plate": ["lackierte-gewichtsscheibe", "Lackierte Gewichtsscheibe", "lackierte Hantelscheiben Großhandel"],
  "tpu-olympic-plate": ["tpu-olympia-gewichtsscheibe", "TPU-Olympia-Gewichtsscheibe", "TPU Gewichtsscheiben 50 mm"],
  "star-tpu-plate": ["tpu-stern-gewichtsscheibe", "TPU-Stern-Gewichtsscheibe", "TPU Griffscheiben Hersteller"],
  "cpu-grip-plate": ["cpu-griffscheibe", "CPU-Griffscheibe", "CPU Griffscheiben Hersteller"],
  "pu-grip-plate": ["pu-griffscheibe", "PU-Griffscheibe", "PU Griffscheiben Großhandel"],
  "pu-color-plate": ["pu-gewichtsscheibe-farbig", "Farbige PU-Gewichtsscheibe", "farbige PU Gewichtsscheiben"],
  "cpu-mini-bumper-plate": ["cpu-mini-bumper-plate", "CPU Mini Bumper Plate", "Mini Bumper Plates Hersteller"],
  "rubber-olympic-plate": ["gummi-olympia-gewichtsscheibe", "Gummi-Olympia-Gewichtsscheibe", "Olympia Gewichtsscheiben Gummi"],
  "pu-plate-set": ["pu-gewichtsscheiben-set", "PU-Gewichtsscheiben-Set", "PU Gewichtsscheiben Set Großhandel"],
  "rubber-bumper-plate": ["gummi-bumper-plate", "Gummi Bumper Plate", "Bumper Plates Hersteller"],
  "four-grip-cpu-plate": ["cpu-gewichtsscheibe-vier-griffe", "CPU-Gewichtsscheibe mit vier Griffen", "CPU Gewichtsscheiben vier Griffe"]
};

const rackMap: Record<string, [string, string, string]> = {
  "private-home-gym-rack-system": ["private-home-gym-rack-system", "Rack-System für private Fitnessräume", "Home Gym Rack Hersteller"],
  "power-rack-functional-trainer": ["power-rack-functional-trainer", "Power Rack mit Functional Trainer", "Power Rack Functional Trainer Hersteller"],
  "home-gym-functional-trainer": ["home-gym-functional-trainer", "Functional Trainer für Home Gyms", "Home Gym Functional Trainer Hersteller"],
  "compact-cable-power-rack": ["kompaktes-kabelzug-power-rack", "Kompaktes Kabelzug-Power-Rack", "kompaktes Power Rack Kabelzug"],
  "dual-pulley-smith-rack": ["smith-rack-doppelzug", "Smith Rack mit Doppelzug", "Smith Rack Kabelzug Hersteller"],
  "custom-home-gym-rack": ["home-gym-rack-individuell", "Individuelles Home-Gym-Rack", "Home Gym Rack nach Maß"],
  "storage-functional-trainer": ["functional-trainer-aufbewahrung", "Functional Trainer mit Aufbewahrung", "Functional Trainer mit Ablage"],
  "cable-crossover-functional-trainer": ["cable-crossover-functional-trainer", "Cable-Crossover Functional Trainer", "Cable Crossover Hersteller"],
  "adjustable-weight-bench": ["verstellbare-hantelbank", "Verstellbare Hantelbank", "verstellbare Hantelbank Hersteller"],
  "smith-squat-frame": ["smith-kniebeugen-rack", "Smith-Kniebeugen-Rack", "Smith Machine Kniebeugen Rack"],
  "half-frame-squat-rack": ["half-rack-kniebeugen", "Half Rack für Kniebeugen", "Half Rack Hersteller"],
  "cable-cross-functional-trainer": ["kabelzug-functional-trainer", "Kabelzug-Functional-Trainer", "Kabelzug Functional Trainer"],
  "six-column-functional-trainer": ["functional-trainer-sechs-saeulen", "Functional Trainer mit sechs Säulen", "Functional Trainer Mehrstation"],
  "cable-crossover-machine": ["cable-crossover-station", "Cable-Crossover-Station", "Cable Crossover Station Hersteller"],
  "full-frame-squat-rack": ["power-rack-vollrahmen", "Power Rack mit Vollrahmen", "Power Rack Vollrahmen Hersteller"],
  "eight-column-training-rack": ["trainingsrack-acht-saeulen", "Trainingsrack mit acht Säulen", "Trainingsrack Mehrstation"],
  "wall-mounted-functional-trainer": ["functional-trainer-wandmontage", "Functional Trainer zur Wandmontage", "Functional Trainer Wandmontage"],
  "smith-cable-crossover-machine": ["smith-machine-cable-crossover", "Smith Machine mit Cable Crossover", "Smith Cable Crossover Hersteller"],
  "floor-plate-cable-crossover": ["cable-crossover-bodenplatten", "Cable Crossover mit Bodenplatten", "Cable Crossover Bodenmontage"],
  "smith-machine": ["smith-machine", "Smith Machine", "Smith Machine Hersteller"],
  "wall-folding-functional-trainer": ["functional-trainer-klappbar-wand", "Klappbarer Functional Trainer", "klappbarer Functional Trainer Wand"],
  "incline-flat-decline-bench": ["hantelbank-flach-schraeg-negativ", "Flach-, Schräg- und Negativbank", "Hantelbank verstellbar Studio"],
  "commercial-adjustable-bench": ["hantelbank-gewerblich-verstellbar", "Gewerbliche verstellbare Hantelbank", "Hantelbank Fitnessstudio Hersteller"],
  "heavy-duty-adjustable-bench": ["schwerlast-hantelbank-verstellbar", "Verstellbare Schwerlast-Hantelbank", "Heavy Duty Hantelbank"],
  "compact-adjustable-bench": ["kompakte-hantelbank-verstellbar", "Kompakte verstellbare Hantelbank", "kompakte Hantelbank Fitnessstudio"],
  "three-in-one-smith-functional-trainer": ["smith-functional-trainer-drei-in-eins", "3-in-1 Smith Functional Trainer", "Smith Functional Trainer 3 in 1"],
  "smith-dual-pulley-trainer": ["smith-trainer-doppelzug", "Smith Trainer mit Doppelzug", "Smith Dual Pulley Trainer"],
  "olympic-bench-plate-storage": ["olympia-hantelbank-scheibenablage", "Olympia-Hantelbank mit Scheibenablage", "Olympia Hantelbank Hersteller"],
  "multi-jungle-functional-trainer": ["multi-jungle-functional-trainer", "Multi-Jungle Functional Trainer", "Multi Jungle Fitnessgerät Hersteller"],
  "single-station-functional-trainer": ["functional-trainer-einzelstation", "Functional Trainer als Einzelstation", "Functional Trainer Einzelstation"],
  "three-station-functional-trainer": ["functional-trainer-drei-stationen", "Functional Trainer mit drei Stationen", "3 Station Functional Trainer"],
  "five-station-functional-trainer": ["functional-trainer-fuenf-stationen", "Functional Trainer mit fünf Stationen", "5 Station Functional Trainer"],
  "multi-jungle-training-system": ["multi-jungle-trainingssystem", "Multi-Jungle-Trainingssystem", "Multi Jungle Trainingssystem Hersteller"]
};

const accessoryMap: Record<string, [string, string, string]> = {
  "vinyl-kettlebell": ["vinyl-kettlebell", "Vinyl-Kettlebell", "Vinyl Kettlebells Großhandel"],
  "cast-iron-kettlebell": ["gusseisen-kettlebell", "Gusseisen-Kettlebell", "Gusseisen Kettlebells Hersteller"],
  "competition-kettlebell": ["competition-kettlebell", "Competition Kettlebell", "Competition Kettlebells Großhandel"],
  "six-side-cable-handle": ["kabelzuggriff-sechsseitig", "Sechsseitiger Kabelzuggriff", "Kabelzuggriffe Hersteller"],
  "tetragonal-cable-handle": ["kabelzuggriff-vierseitig", "Vierseitiger Kabelzuggriff", "Fitness Kabelzuggriffe Großhandel"],
  "rubber-coated-gym-handle-sets": ["kabelzuggriffe-gummiert-set", "Gummierte Kabelzuggriffe im Set", "Kabelzug Griffe Set Großhandel"],
  "aluminum-gym-handles": ["kabelzuggriffe-aluminium", "Aluminium-Kabelzuggriffe", "Aluminium Kabelzuggriffe Hersteller"],
  "solid-steel-gym-handles": ["kabelzuggriffe-vollstahl", "Vollstahl-Kabelzuggriffe", "Stahl Kabelzuggriffe Hersteller"],
  "lat-pulldown-handles": ["latzuggriffe", "Latzuggriffe", "Latzuggriffe Großhandel"],
  "v-handle-attachments": ["v-griffe-kabelzug", "V-Griffe für Kabelzug", "V Griff Kabelzug Hersteller"],
  "straight-bar-cable-attachments": ["gerade-kabelzugstangen", "Gerade Kabelzugstangen", "Kabelzugstangen Großhandel"],
  "triceps-rope-handles": ["trizepsseile-kabelzug", "Trizepsseile für Kabelzug", "Trizepsseil Großhandel"],
  "cable-machine-attachments": ["kabelzug-zubehoer-set", "Kabelzug-Zubehörset", "Kabelzug Zubehör Großhandel"],
  "tpe-yoga-mat": ["tpe-yogamatte", "TPE-Yogamatte", "TPE Yogamatten Großhandel"],
  "vipr-training-tube": ["vipr-trainingstube", "ViPR-Trainingstube", "ViPR Training Tube Großhandel"],
  "yoga-ball": ["gymnastikball", "Gymnastikball", "Gymnastikbälle Großhandel"],
  "bosu-ball": ["balance-halbkugel", "Balance-Halbkugel", "Balance Trainer Großhandel"],
  "aerobic-step": ["aerobic-step", "Aerobic-Step", "Aerobic Steps Großhandel"],
  "compact-aerobic-step": ["aerobic-step-kompakt", "Kompakter Aerobic-Step", "kompakter Aerobic Step Großhandel"]
};

const categoryMeta = {
  dumbbells: { root: "/de/produkte/kurzhanteln", label: "Kurzhanteln", type: "Kurzhantel", categoryId: "dumbbells-category" },
  plates: { root: "/de/produkte/gewichtsscheiben", label: "Gewichtsscheiben", type: "Gewichtsscheibe", categoryId: "weight-plates-category" },
  racks: { root: "/de/produkte/racks-hantelbaenke", label: "Racks und Hantelbänke", type: "Kraftgerät", categoryId: "racks-benches-category" },
  accessories: { root: "/de/produkte/fitnesszubehoer", label: "Fitnesszubehör", type: "Fitnesszubehör", categoryId: "gym-accessories-category" }
} as const;

function position(category: CategoryKey, name: string) {
  if (category === "dumbbells") return `${name} ist für Fachhändler, Importeure, Fitnessstudioketten und Eigenmarken vorgesehen, die eine nachvollziehbare Gewichtsabstufung, belastbare Oberflächen und planbare Nachbestellungen benötigen.`;
  if (category === "plates") return `${name} richtet sich an Betreiber und gewerbliche Einkäufer, die Scheiben nach Aufnahme, Material, Gewichtstoleranz, Handhabung und vorgesehenem Training auswählen statt allein nach dem Kilopreis.`;
  if (category === "racks") return `${name} ist für Studioausstatter, Projektentwickler und Fachhändler gedacht, die Stellfläche, Nutzerfluss, Belastung, Montage und Ersatzteilversorgung gemeinsam bewerten.`;
  return `${name} ergänzt professionelle Trainingsflächen und Handelsprogramme. Für die Beschaffung sind Material, Abmessung, Belastung, Verpackungseinheit und die Kompatibilität mit vorhandenen Geräten entscheidend.`;
}

function profiles(source: ProductSource[], category: CategoryKey, map: Record<string, [string, string, string]>): GermanProductProfile[] {
  return source.flatMap((product) => {
    const localized = map[product.slug];
    return localized ? [{ source: product, category, deSlug: localized[0], name: localized[1], keyword: localized[2], positioning: position(category, localized[1]) }] : [];
  });
}

export const germanProductProfiles: GermanProductProfile[] = [
  ...profiles(dumbbellProducts, "dumbbells", dumbbellMap),
  ...profiles(weightPlateProducts, "plates", plateMap),
  ...profiles(racksBenchesProducts, "racks", rackMap),
  ...profiles(gymAccessoryProducts, "accessories", accessoryMap)
];

function rangeText(profile: GermanProductProfile) {
  const numeric = profile.source.range.match(/[0-9][0-9., x×-]*(?:kg|lb|mm|cm)?/gi)?.join(", ");
  if (numeric) return `${numeric}; endgültige Abstufungen und Toleranzen werden in der Auftragsfreigabe bestätigt.`;
  if (profile.category === "dumbbells") return "KG-Abstufung für den DACH-Markt; weitere Ausführungen nach Projektprüfung.";
  if (profile.category === "plates") return "KG-Sortiment und 50-mm-Konfiguration nach Modell- und Auftragsfreigabe.";
  if (profile.category === "racks") return "Modellbezogene Abmessungen, Belastungsdaten und Konfiguration nach technischer Freigabe.";
  return "Modellbezogene Größen, Belastungen und Verpackungseinheiten nach Angebotsfreigabe.";
}

function materialText(profile: GermanProductProfile) {
  const value = `${profile.name} ${profile.source.slug}`.toLowerCase();
  if (/gusseisen|cast-iron/.test(value)) return "Gusseisen mit modellbezogener Oberflächenbehandlung; Gewicht, Kanten, Porenbild und Beschichtung werden anhand der freigegebenen Referenz beurteilt.";
  if (/stahl|steel|sus304|edelstahl/.test(value)) return "Stahl beziehungsweise Edelstahl entsprechend dem konkreten Modell; Oberfläche, Kanten, Verbindung und Korrosionsschutz sind Teil der Prüfspezifikation.";
  if (/pu-|pu-gewicht|urethane/.test(value)) return "Polyurethan-Oberfläche auf der vorgesehenen Trägerkonstruktion; Rezeptur, Härte, Glanz, Farbstabilität und Haftung werden am Muster festgelegt.";
  if (/tpu/.test(value)) return "Thermoplastische Polyurethan-Oberfläche auf modellbezogener Kernkonstruktion; entscheidend sind Materialcharge, Formbild, Verbindung und Kontaktflächen.";
  if (/cpu/.test(value)) return "CPU-Elastomer auf der jeweiligen Kern- oder Rahmenkonstruktion; Materialeigenschaften, Formgebung, Markierung und Verbindung werden projektspezifisch bestätigt.";
  if (/gummi|rubber|bumper/.test(value)) return "Gummi beziehungsweise Elastomer auf der vorgesehenen Kern- oder Einsatzkonstruktion; Geruch, Oberfläche, Härte und Verbindung sind vor Serienstart zu bemustern.";
  if (/neopren/.test(value)) return "Neoprenbeschichtete Ausführung mit modellbezogenem Kern; Griffigkeit, Naht- oder Beschichtungsbild, Farbe und Gewicht werden kontrolliert.";
  if (profile.category === "racks") return "Stahlrohr- und Stahlblechkonstruktion mit Schweißteilen, Verbindungselementen und Pulverbeschichtung; bei Kabelsystemen kommen Rollen, Seile, Führungen und Lager hinzu.";
  return "Werkstoff und Konstruktion richten sich nach dem konkreten Artikel. Materialdeklaration, Abmessungen, Oberfläche und Belastungsanforderung werden vor der Bestellung schriftlich festgelegt.";
}

function processText(profile: GermanProductProfile) {
  if (profile.category === "dumbbells") return `Für ${profile.name} umfasst der Ablauf die Vorbereitung von Kopf beziehungsweise Kern und Griff, Formgebung oder Beschichtung, dauerhafte Verbindung, Oberflächenfinish, Gewichtskennzeichnung, Verwiegung und Verpackungsprüfung. Bei jeder Bauart wird der tatsächlich verwendete Prozess dokumentiert; eine Bezeichnung wie CPU, TPU oder Gummi ersetzt keine freigegebene Muster- und Materialspezifikation.`;
  if (profile.category === "plates") return `Bei ${profile.name} werden Grundkörper und 50-mm-Aufnahme beziehungsweise Einsatz vorbereitet, geformt oder beschichtet, ausgerichtet, markiert, verwogen und verpackt. Kontrolliert werden Rundlauf, Planlage, Mittelloch, Scheibendicke und die Verbindung zwischen Einsatz und Körper. Die genaue Reihenfolge hängt von Werkstoff und Werkzeug des bestellten Modells ab.`;
  if (profile.category === "racks") return `Die Fertigung von ${profile.name} beginnt mit Zuschnitt und Bohrbild der Stahlteile. Es folgen Schweißen, Schleifen, Oberflächenvorbereitung, Pulverbeschichtung, Montagekontrolle und bei Kabelsystemen die Prüfung von Rollen, Seilen und Führungen. Vor dem Verpacken werden Bauteilkennzeichnung, Schraubensatz, Aufbauunterlagen und Funktionspunkte mit der Stückliste abgeglichen.`;
  return `Für ${profile.name} werden Material und Komponenten vorbereitet, geformt oder bearbeitet, montiert, oberflächenbehandelt, gekennzeichnet und auf die definierte Funktion geprüft. Danach folgen Mengenabgleich, Sichtkontrolle und Verpackung. Prüfmittel und Stichprobe richten sich nach Abmessung, Belastungsrisiko und Verpackungseinheit des Artikels.`;
}

function productImages(profile: GermanProductProfile): LocalizedImage[] {
  const sources = profile.source.gallery?.length ? profile.source.gallery : [profile.source.image];
  return sources.map((src, index) => ({
    id: `produktbild-${index + 1}`,
    src: germanImagePath(src, profile.deSlug, index),
    alt: `${profile.name} für professionelle Fitnessstudio-Ausstattung${index ? ` – Detailansicht ${index + 1}` : ""}`,
    caption: `Reales Produktbild von ${profile.name}; Ausführung und Details werden im Angebot bestätigt.`
  }));
}

const applicationAngles = [
  (name: string) => `Planen Sie ${name} von der Trainingsfläche aus: Nutzerzahl, Stoß- und Kontaktbelastung, Laufwege, Reinigung und Lagerung bestimmen, welche Ausführung sinnvoll ist. Halten Sie fest, wer das Produkt verwendet, wie oft es bewegt wird und welche Umgebungseinflüsse im Betrieb tatsächlich auftreten.`,
  (name: string) => `Für ${name} beginnt die Auswahl beim Vertriebskanal. Ein Studio, ein Projektgeschäft und der Einzelhandel benötigen unterschiedliche Sortimentsbreiten, Verpackungseinheiten und Informationsstände. Ordnen Sie jede Variante einem Käuferprofil zu und vermeiden Sie Ausführungen, die nur Katalogbreite schaffen, aber keinen klaren Bedarf bedienen.`,
  (name: string) => `Prüfen Sie bei ${name} zuerst die Schnittstellen zur vorhandenen Ausstattung. Platz, Ablage, Boden, Geräteanschluss oder Montagebereich können die nutzbare Ausführung stärker begrenzen als der Produktpreis. Dokumentierte Maße und ein Layoutausschnitt verhindern, dass erst beim Aufbau eine Kollision sichtbar wird.`,
  (name: string) => `${name} sollte über einen Nutzungstag hinweg betrachtet werden: Bereitstellung, Training, Rückgabe, Reinigung und Kontrolle gehören zusammen. Ein Detail, das im Muster bequem wirkt, kann bei hoher Frequenz Zeit kosten. Beobachtbare Arbeitsabläufe liefern deshalb bessere Kriterien als eine rein optische Bewertung.`,
  (name: string) => `Bei ${name} ist die Sortimentsrolle zu klären. Entscheiden Sie, ob der Artikel ein Kernprodukt, eine Ergänzung, eine Premiumoption oder eine projektspezifische Lösung ist. Daraus folgen Stückzahl, Bestandstiefe, Präsentation, Ersatzstrategie und die Frage, ob mehrere ähnliche Varianten wirtschaftlich begründet sind.`,
  (name: string) => `Bewerten Sie ${name} getrennt für Betreiber, Trainierende und Wareneingang. Der Betreiber braucht planbare Pflege und Ersatz, Nutzer erwarten verständliche Funktion, und die Logistik benötigt eindeutige Kartons und Gewichte. Eine Freigabe ist belastbarer, wenn alle drei Perspektiven berücksichtigt sind.`
];

const sampleAngles = [
  (name: string) => `Das Muster von ${name} erhält eine eindeutige ID. Messwerte, Fotos, Oberfläche, Kennzeichnung und Verpackung werden dieser ID zugeordnet. Ein freigegebenes Detail darf nicht stillschweigend durch eine andere Materialcharge, Grafikversion oder Konstruktion ersetzt werden.`,
  (name: string) => `Bemustern Sie ${name} nicht nur in der bequemsten Variante. Wählen Sie die Konfigurationen, an denen Material, Abmessung, Gewicht oder Funktion besondere Anforderungen stellen. So zeigt die Freigabe eher, ob das geplante Sortiment reproduzierbar ist.`,
  (name: string) => `Für ${name} wird vor dem Mustertermin eine Prüfliste verschickt. Der Hersteller weiß damit, welche Maße, Funktionen und sichtbaren Merkmale der Käufer bewertet. Nach der Prüfung werden Abweichungen einzeln beantwortet; eine neue Version ersetzt keine ungeklärte Feststellung.`,
  (name: string) => `Vergleichen Sie das Muster von ${name} mit Datenblatt und Angebot in derselben Sitzung. Produkt, Dokument und Preis müssen dieselbe Ausführung beschreiben. Wenn ein Merkmal nur im Foto, aber nicht schriftlich bestätigt ist, bleibt es vorerst offen.`,
  (name: string) => `Lagern Sie eine freigegebene Referenz von ${name} so, dass sie bei Serienprüfung und Nachbestellung wieder identifiziert werden kann. Ergänzen Sie Datum, Modellcode und Versionsstand. Erinnerung oder allgemeine Katalogbilder sind kein gleichwertiger Referenzstandard.`,
  (name: string) => `Teilen Sie die Musterbewertung für ${name} in funktionale, wesentliche optische und rein kosmetische Punkte. Dadurch bleibt klar, welche Abweichung die Nutzung verhindert, welche den Verkaufsstandard betrifft und welche innerhalb einer vereinbarten Bandbreite akzeptiert werden kann.`
];

const supplyAngles = [
  (name: string) => `Für die Nachbestellung von ${name} werden Modellcode, Material, Farbe, Kennzeichnung, Verpackung und Referenzversion gespeichert. Ein neuer Auftrag verweist auf diesen Stand und listet gewünschte Änderungen ausdrücklich auf. So wird eine ähnliche Bezeichnung nicht versehentlich als identische Ware behandelt.`,
  (name: string) => `Planen Sie bei ${name} den Wareneingang vor dem Versand. Entladehilfe, Palettenplatz, Kartonkennzeichnung und Stichprobenzugang müssen zur Ware passen. Besonders schwere oder sperrige Einheiten dürfen nicht erst am Zielort als organisatorisches Problem erkannt werden.`,
  (name: string) => `Die Lieferfähigkeit von ${name} wird nicht nur über eine Fabrikangabe bewertet. Materialvorlauf, Werkzeugbelegung, Individualisierung, Prüfzeit, Verpackung und Abfahrtstermin bilden gemeinsam den Zeitplan. Kritische Zwischentermine werden mit einem Nachweis statt nur mit einem Enddatum verfolgt.`,
  (name: string) => `Berechnen Sie für ${name} einen sinnvollen Ersatz- oder Servicebestand. Verschleißteile, häufig genutzte Varianten und projektspezifische Farben haben unterschiedliche Wiederbeschaffungsrisiken. Die Strategie wird vor Bestellung geklärt, nicht erst nach einer Beschädigung oder Sortimentslücke.`,
  (name: string) => `Bei ${name} verbindet die Packliste Bestellung und physische Lieferung. Variante, Menge, Netto- und Bruttogewicht, Packstück und Palette müssen nachvollziehbar sein. Eine klare Struktur beschleunigt Kontrolle, Schadensmeldung und die Verteilung an mehrere Standorte.`,
  (name: string) => `Für ${name} sollte ein Änderungsprozess vereinbart sein. Wenn Material, Unterlieferant, Werkzeug oder Verpackung angepasst werden müssen, beschreibt der Hersteller Grund und Auswirkung. Der Käufer entscheidet anschließend, ob Dokumentenprüfung, neues Muster oder zusätzliche Serienkontrolle erforderlich ist.`
];

function productSpecificBlocks(profile: GermanProductProfile) {
  const index = germanProductProfiles.indexOf(profile);
  return [
    textBlock("einsatzpruefung", `Einsatzprüfung für ${profile.name}`, applicationAngles[index % applicationAngles.length](profile.name)),
    textBlock("musterstrategie", `Musterstrategie für ${profile.name}`, sampleAngles[Math.floor(index / 6) % sampleAngles.length](profile.name)),
    textBlock("lieferfaehigkeit", `Liefer- und Nachbestellplanung für ${profile.name}`, supplyAngles[Math.floor(index / 36) % supplyAngles.length](profile.name))
  ];
}

function productSeoTitle(name: string) {
  const withIntent = `${name} Hersteller | PowerBaseFit`;
  const withBrand = `${name} | PowerBaseFit`;
  return withIntent.length <= 65 ? withIntent : withBrand.length <= 65 ? withBrand : name;
}

function productSeoDescription(name: string) {
  const detailed = `${name} für Studios und Großhandel: technische Daten, Material, QC, OEM, Private Label, Verpackung und Export direkt mit PowerBaseFit abstimmen.`;
  if (detailed.length <= 160) return detailed;
  return `${name} für B2B: Spezifikation, Material, QC, OEM, Verpackung und Export direkt mit PowerBaseFit abstimmen.`;
}

function buildGermanVersion(profile: GermanProductProfile): LocalizedContentVersion {
  const meta = categoryMeta[profile.category];
  const publicPath = `${meta.root}/${profile.deSlug}`;
  const range = rangeText(profile);
  const material = materialText(profile);
  const process = processText(profile);
  const buyerDifference = profile.category === "racks"
    ? "Vergleichen Sie nicht nur Außenmaße und Preis. Entscheidend sind nutzbare Bewegungsräume, Lochraster, Einstellwege, Sicherheitsablagen, Seilübersetzung, Montagezugang und die Ersatzteilstrategie."
    : profile.category === "accessories"
      ? "Vergleichen Sie Funktion, Anschlussmaß, Grifffläche, Belastung, Reinigbarkeit und Verpackungseinheit. Ein optisch ähnlicher Artikel kann eine andere Materialstärke oder Verbindung besitzen."
      : "Vergleichen Sie Muster nicht nur optisch. Gewicht, Abmessungen, Oberfläche, Verbindung, Kennzeichnung, Geruch, Verpackung und Wiederholbarkeit zwischen Chargen gehören in dieselbe Bewertungsmatrix.";

  return {
    locale: "de",
    translationStatus: "localized",
    reviewStatus: "approved",
    publishStatus: "published",
    slug: profile.deSlug,
    publicPath,
    title: productSeoTitle(profile.name),
    description: productSeoDescription(profile.name),
    h1: `${profile.name} für gewerbliche Fitnessstudio-Ausstattung`,
    body: [
      answerBlock("direkte-antwort", "Direkte Antwort für Einkäufer", `${profile.positioning} ${range} PowerBaseFit prüft Produkt, Menge, Kennzeichnung, Verpackung und Zielmarkt vor der Kalkulation. Ein belastbares Angebot entsteht deshalb aus einer Stückliste und einer freigegebenen Spezifikation, nicht allein aus einem Foto oder einem allgemeinen Produktnamen.`),
      definitionBlock("definition", profile.name, `${profile.name} bezeichnet in diesem Angebot eine ${meta.type.toLowerCase()}-Ausführung für gewerbliche Beschaffung. Der Name beschreibt die Produktfamilie; verbindlich werden erst Material, Abmessungen, Gewichts- oder Belastungsbereich, Oberfläche, Kennzeichnung, Lieferumfang und Verpackung der ausgewählten Referenz.`),
      textBlock("produktuebersicht", "Produktübersicht und Beschaffungswert", profile.positioning, `Für deutsche, österreichische und schweizerische Einkäufer ist eine klare technische Dokumentation wichtiger als werbliche Sammelbegriffe. ${profile.name} wird deshalb über Modellcode, Ausführung, Menge und Abnahmekriterien beschrieben. Das erleichtert den Angebotsvergleich, die interne Freigabe und eine spätere Nachbestellung. ${buyerDifference}`),
      textBlock("einsatzbereiche", "Einsatzbereiche und Zielkunden", `${profile.name} eignet sich je nach bestätigter Ausführung für Fitnessstudios, Trainingszentren, Hotel- und Firmenfitness, Fachhändler, Importeure und Eigenmarken. Betreiber beurteilen Nutzerzahl, Trainingsart, Stoß- und Kontaktbelastung, Reinigung und verfügbaren Stauraum. Händler betrachten zusätzlich Sortimentslogik, Verpackungsgröße, Ersatzbedarf und Nachbestellbarkeit.`, `Vor einer Projektfreigabe wird die Anwendung konkret benannt: freie Gewichtszone, Kursraum, Functional Area, Rack-Station, Home-Gym-Projekt oder Handelsprogramm. Diese Zuordnung beeinflusst Material, Gewichtsabstufung, Stückzahl, Sicherheitsabstand, Zubehör und Verpackung. Eine Ausführung für gelegentliche Nutzung ist nicht automatisch für einen stark frequentierten Studiobetrieb geeignet.`),
      textBlock("vorteile", "Produktvorteile und Grenzen", `Der kommerzielle Vorteil von ${profile.name} liegt in einer klar planbaren Produktfunktion, einer reproduzierbaren Ausführung und der Möglichkeit, Kennzeichnung und Verpackung auf das Projekt abzustimmen. Nutzen entsteht vor allem dann, wenn die bestellten Varianten zur tatsächlichen Trainingsfläche und zum Vertriebskanal passen.`, `Gleichzeitig muss der Einkäufer Grenzen dokumentieren. Oberflächen verhindern nicht jede Beschädigung, bewegliche Komponenten benötigen Wartung, und schwere Ware stellt besondere Anforderungen an Karton, Palette und Entladung. PowerBaseFit formuliert daher keine pauschale Lebensdauer oder universelle Belastbarkeit; solche Aussagen müssen sich auf das konkrete Modell, die Nutzung und den vereinbarten Prüfplan beziehen.`),
      textBlock("material", "Material und Konstruktion", material, `Der Materialname allein reicht für einen Angebotsvergleich nicht aus. Bei ${profile.name} werden relevante Merkmale wie Kern, Beschichtung, Griff- oder Aufnahmebereich, Wand- beziehungsweise Materialstärke, Verbindung, Oberfläche und Kennzeichnung in der Freigabe festgehalten. Wenn sich Rohstoff, Werkzeug oder Fertigungsweg nach der Bemusterung ändern soll, ist eine erneute technische Bewertung erforderlich.`),
      specTable("technische-daten", "Technische Daten für die Anfrage", ["Merkmal", "Projektbezogene Angabe", "Vor Bestellung bestätigen"], [["Produkt", profile.name, "Modellcode und Ausführung"], ["Bereich", range, "Abstufung, Einheiten und Stückzahl"], ["Material", material.split(";")[0], "Materialdeklaration und Muster"], ["Abmessungen", "Modell- und gewichtsabhängig", "Zeichnung oder Datenblatt"], ["Kennzeichnung", "KG, Logo und Etikett nach Machbarkeit", "Position, Farbe und Lesbarkeit"], ["Prüfung", "Maße, Funktion, Oberfläche und Verpackung", "Toleranz und Stichprobe"]], `Spezifikationsrahmen für ${profile.name}`),
      specTable("vergleich", "Vergleich vor der Lieferantenauswahl", ["Kriterium", "Unzureichende Angabe", "Belastbare Angabe"], [["Material", "Premium-Qualität", "Werkstoff, Aufbau und Referenzmuster"], ["Leistung", "Für Studio geeignet", "Nutzung, Belastung und Prüfkriterium"], ["Gewicht / Maß", "Standard", "Sollwert, Toleranz und Messmethode"], ["OEM", "Logo möglich", "Verfahren, Position, Farbe, MOQ und Muster"], ["Verpackung", "Exportkarton", "Einheiten, Nettogewicht, Bruttogewicht und Palette"]]),
      textBlock("herstellung", "Herstellungsprozess", process, `Das Projekt beginnt mit einer eindeutigen Produkt- und Verpackungsspezifikation. Nach Material- und Musterfreigabe folgt die Serienfertigung mit prozessbezogenen Kontrollen. Kritische Merkmale werden nicht erst am Ende betrachtet: Werkzeugzustand, Bauteilausrichtung, Oberflächenvorbereitung und Kennzeichnung können bereits während der Fertigung geprüft werden. Der Endabgleich umfasst Modell, Menge, sichtbare Ausführung und Versandvorbereitung.`),
      textBlock("qualitaetskontrolle", "Qualitätskontrolle und Abnahme", `Der Prüfplan für ${profile.name} wird aus dem Produktrisiko abgeleitet. Typische Punkte sind Identität, Gewicht oder Abmessung, Ausrichtung, Funktion, Oberfläche, Verbindung, Kennzeichnung, Vollständigkeit und Verpackung. Leichte, mittlere und schwere Varianten beziehungsweise unterschiedliche Konfigurationen werden so bemustert, dass nicht nur ein bequem erreichbares Einzelstück bewertet wird.`, `Vor Versand können interne Aufzeichnungen, Foto- oder Videonachweise, Stichprobenmessungen und auf Wunsch eine unabhängige Inspektion kombiniert werden. Akzeptanzgrenzen müssen vor Produktionsbeginn vorliegen. Aussagen wie „sehr gut“ oder „studiotauglich“ sind ohne messbare Kriterien keine Abnahmevorgabe.`),
      textBlock("verpackung", "Verpackung, Versand und Wareneingang", `${profile.name} wird so verpackt, dass Oberflächen, Kanten, Griffe, Aufnahmen und bewegliche Bauteile während Umschlag und Seetransport voneinander getrennt bleiben. Bei schwerer Ware werden Kartonlimit, Innenverstärkung, Palettenaufbau und Ladungssicherung berücksichtigt. Die Verpackungsfreigabe nennt Einheiten pro Karton, Netto- und Bruttogewicht, Abmessungen, Etikett und Palettenplan.`, `Der Käufer sollte Fracht, Versicherung, Zollabwicklung, Einfuhrabgaben, Terminalkosten, Inlandstransport und Entladung passend zum Incoterm kalkulieren. Beim Wareneingang werden Palettenzustand, Kartonanzahl, Kennzeichnung, sichtbare Schäden und Stichproben verschiedener Varianten dokumentiert. So lassen sich Transport- und Produktionsabweichungen sauber trennen.`),
      textBlock("oem", "OEM, ODM und Private Label", `Für ${profile.name} können je nach Konstruktion Logo, Farbe, KG-Kennzeichnung, Etikett und Verpackung bewertet werden. Eine visuelle Eigenmarkenanpassung unterscheidet sich von einer technischen Neuentwicklung: Änderungen an Form, Material, Abmessung oder Werkzeug können Musterkosten, Mindestmenge und Lieferzeit deutlich verändern.`, `Der OEM-Ablauf umfasst Briefing, Auswahl des Basismodells, technische Prüfung, Grafikfreigabe, Muster, dokumentierte Zustimmung, Serie, Qualitätskontrolle und Versand. ODM ist nur dann die richtige Bezeichnung, wenn PowerBaseFit einen definierten Entwicklungsanteil übernimmt. Rechte an Marke, Verpackungstext und erforderliche Zielmarktangaben bleiben vom Käufer zu prüfen.`),
      ...productSpecificBlocks(profile),
      checklistBlock("einkaufs-checkliste", "Einkaufs-Checkliste", ["Unternehmen, Zielland und Vertriebskanal", `Gewünschtes Modell: ${profile.name}`, "Mengen je Variante, Gewicht oder Konfiguration", "Material, Farbe, Oberfläche und Referenzmuster", "Abmessungen, Toleranzen und Funktionskriterien", "Logo, KG-Kennzeichnung, Etikett und Verpackung", "Stichprobenplan oder externe Inspektion", "Zielhafen beziehungsweise Lieferort und gewünschter Incoterm", "Termin für Muster, Produktion und Versand", "Vorgehen für Ersatzteile oder Nachbestellung"]),
      textBlock("anfrageprozess", "Anfrageprozess für ein belastbares Angebot", `Senden Sie eine Liste mit ${profile.name}, gewünschten Varianten, Mengen, Zielmarkt, Branding, Verpackung und Lieferort. PowerBaseFit prüft Produktbezug, technische Machbarkeit und offene Punkte. Anschließend werden Angebot, MOQ, Musterbedarf und Zeitplan auf derselben Spezifikationsbasis erstellt.`, `Vor Produktionsfreigabe sollten beide Seiten Modellcode, Stückliste, technische Merkmale, Grafik, Verpackung und Abnahmeweg bestätigen. Nachträgliche Änderungen werden versioniert, damit Einkauf, Fertigung und Qualitätssicherung mit demselben Stand arbeiten. Diese Disziplin ist besonders bei Sortimentsbestellungen und späteren Nachkäufen wichtig.`)
    ],
    faq: [
      { id: "faq-1", question: `Ist ${profile.name} für ein professionelles Fitnessstudio geeignet?`, answer: "Ja, wenn konkrete Ausführung, Nutzungsintensität, Belastung, Wartung und Abnahmekriterien zum Projekt passen. Die Eignung wird nicht allein aus der Produktbezeichnung abgeleitet." },
      { id: "faq-2", question: `Kann ${profile.name} mit unserer Marke geliefert werden?`, answer: "Logo, Farbe, Kennzeichnung, Etikett und Verpackung können je nach Modell und Menge geprüft werden. Verfahren und Position werden am Muster freigegeben." },
      { id: "faq-3", question: "Wie hoch ist die Mindestbestellmenge?", answer: "Die MOQ hängt von Modell, Variantenmix, Material, Werkzeug und Individualisierung ab. Eine belastbare Zahl folgt erst nach Prüfung der Stückliste." },
      { id: "faq-4", question: "Wie wird die Qualität vor dem Versand geprüft?", answer: "Identität, Maße oder Gewicht, Funktion, Oberfläche, Kennzeichnung, Menge und Verpackung werden gegen die freigegebene Spezifikation geprüft. Eine unabhängige Inspektion ist projektbezogen möglich." },
      { id: "faq-5", question: "Welche Angaben werden für ein Angebot benötigt?", answer: "Erforderlich sind Unternehmen, Zielland, Produkt und Varianten, Mengen, Material- und Brandingwünsche, Verpackung, Lieferort und Termin. Technische Zeichnungen oder Referenzmuster beschleunigen die Prüfung." }
    ],
    author: germanEditorialAuthor,
    reviewedBy: germanTechnicalReviewer,
    schemaData: {
      sku: `DE-${profile.source.slug.toUpperCase()}`,
      brand: "PowerBaseFit",
      manufacturer: "PowerBaseFit",
      material,
      category: meta.label,
      specifications: [{ name: "Produkt", value: profile.name }, { name: "Bereich", value: range }, { name: "Zielmarkt", value: "Deutschland, Österreich, Schweiz" }],
      breadcrumbs: [{ name: "Startseite", path: "/de" }, { name: "Produkte", path: "/de/produkte" }, { name: meta.label, path: meta.root }, { name: profile.name, path: publicPath }],
      extra: { primaryKeyword: profile.keyword, searchIntent: "B2B-Produktprüfung und Angebotsanfrage" }
    },
    images: productImages(profile),
    internalLinks: [{ targetContentId: meta.categoryId, label: `${meta.label} im Überblick` }, { targetContentId: "oem-private-label", label: "OEM und Private Label" }, { targetContentId: "factory", label: "Fertigung und Qualitätskontrolle" }, { targetContentId: "contact", label: "Angebot anfordern" }],
    canonicalData: { mode: "self" },
    hreflangData: { include: true },
    updatedAt: "2026-07-19T08:00:00.000Z",
    publishedAt: "2026-07-19T08:00:00.000Z",
    version: 1
  };
}

export function englishPathForGermanProduct(profile: GermanProductProfile) {
  return profile.category === "dumbbells"
    ? `/products/dumbbells/${profile.source.slug}`
    : profile.category === "plates"
      ? `/products/weight-plates/${profile.source.slug}`
      : profile.category === "racks"
        ? `/products/racks-benches/${profile.source.slug}`
        : `/products/gym-accessories/${profile.source.slug}`;
}

export function shadowEnglishVersion(profile: GermanProductProfile): LocalizedContentVersion {
  const meta = categoryMeta[profile.category];
  const publicPath = englishPathForGermanProduct(profile);
  return {
    locale: "en", translationStatus: "published", reviewStatus: "approved", publishStatus: "published",
    slug: profile.source.slug, publicPath, title: profile.source.name, description: `${profile.source.name} for commercial gym equipment buyers.`, h1: profile.source.name,
    body: [], faq: [], schemaData: { category: meta.label }, images: [{ id: "source-image", src: profile.source.image, alt: profile.source.name }], internalLinks: [],
    canonicalData: { mode: "self" }, hreflangData: { include: true }, updatedAt: "2026-07-19T08:00:00.000Z", publishedAt: "2026-07-19T08:00:00.000Z", version: 1
  };
}

export function getGermanProductEntities(existingEnglishPaths: Set<string>): ContentEntity[] {
  return germanProductProfiles.map((profile) => {
    const version = buildGermanVersion(profile);
    const english = shadowEnglishVersion(profile);
    const existing = existingEnglishPaths.has(english.publicPath);
    return {
      id: existing ? `existing:${english.publicPath}` : `product:${profile.category}:${profile.source.slug}`,
      type: "product" as ContentType,
      defaultLocale: "en",
      versions: existing ? { de: version } : { en: english, de: version }
    };
  });
}

export function germanVersionForProfile(profile: GermanProductProfile) {
  return buildGermanVersion(profile);
}
