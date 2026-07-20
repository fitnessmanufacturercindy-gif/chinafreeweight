import { dumbbellProducts } from "../../app/products/dumbbells/productData";
import { weightPlateProducts } from "../../app/products/weight-plates/productData";
import { racksBenchesProducts } from "../../app/products/racks-benches/productData";
import { gymAccessoryProducts } from "../../app/products/gym-accessories/productData";
import type { ContentEntity, LocalizedContentVersion, LocalizedImage } from "../../lib/content/types";
import { frAnswer, frChecklist, frDefinition, frenchEditorialAuthor, frenchImagePath, frenchTechnicalReviewer, frTable, frText } from "./fr-content-helpers";

type ProductSource = { slug: string; name: string; range: string; type: string; image: string; gallery?: string[] };
type CategoryKey = "dumbbells" | "plates" | "racks" | "accessories";
type FrenchProductProfile = { source: ProductSource; category: CategoryKey; frSlug: string; name: string; keyword: string };

const dumbbellMap: Record<string, [string, string, string]> = {
  "twelve-sided-steel-dumbbell": ["haltere-acier-douze-faces", "Haltère en acier à douze faces", "fabricant haltères acier professionnels"],
  "cast-iron-dumbbell": ["haltere-fonte", "Haltère en fonte", "grossiste haltères fonte"],
  "chrome-dumbbell": ["haltere-chrome", "Haltère chromé", "fabricant haltères chromés"],
  "classic-rubber-round-dumbbell": ["haltere-rond-caoutchouc", "Haltère rond en caoutchouc", "fournisseur haltères ronds caoutchouc"],
  "cpu-dumbbell-kg": ["haltere-cpu", "Haltère en CPU", "fabricant haltères CPU"],
  "cpu-square-dumbbell-kg": ["haltere-carre-cpu", "Haltère carré en CPU", "haltères carrés CPU grossiste"],
  "adjustable-dumbbell-kg": ["haltere-reglable", "Haltère réglable", "fournisseur haltères réglables"],
  "cpu-heavy-dumbbell-kg": ["haltere-lourd-cpu", "Haltère lourd en CPU", "haltères lourds professionnels"],
  "hex-dumbbell-kg": ["haltere-hexagonal-caoutchouc", "Haltère hexagonal en caoutchouc", "fabricant haltères hexagonaux"],
  "neoprene-dumbbell-kg": ["haltere-neoprene", "Haltère en néoprène", "grossiste haltères néoprène"],
  "pu-dumbbell-kg": ["haltere-polyurethane", "Haltère en polyuréthane", "fabricant haltères polyuréthane"],
  "sus304-dumbbell-kg": ["haltere-inox-sus304", "Haltère en inox SUS304", "fabricant haltères inox"],
  "tpu-dumbbell-kg": ["haltere-tpu", "Haltère en TPU", "fabricant haltères TPU"],
  "tpu-round-dumbbell-kg": ["haltere-rond-tpu", "Haltère rond en TPU", "grossiste haltères ronds TPU"],
  "tpu-small-dumbbell-kg": ["petit-haltere-tpu", "Petit haltère en TPU", "haltères TPU légers grossiste"],
  "selectorized-adjustable-dumbbell-kg": ["haltere-reglable-selecteur", "Haltère réglable à sélecteur", "haltères réglables à sélecteur fournisseur"],
  "cpu-hexagonal-dumbbell-kg": ["haltere-hexagonal-cpu", "Haltère hexagonal en CPU", "haltères hexagonaux CPU fabricant"],
  "cpu-compact-dumbbell": ["haltere-compact-cpu", "Haltère compact en CPU", "haltères compacts CPU"],
  "cpu-twelve-sided-dumbbell": ["haltere-cpu-douze-faces", "Haltère CPU à douze faces", "haltères CPU douze faces"],
  "cpu-hexagonal-dumbbell-wide": ["haltere-hexagonal-cpu-large", "Haltère hexagonal large en CPU", "haltères CPU hexagonaux large"],
  "cpu-dumbbell-full-range": ["gamme-complete-halteres-cpu", "Gamme complète d’haltères CPU", "gamme haltères CPU salle de sport"]
};

const plateMap: Record<string, [string, string, string]> = {
  "cpu-bumper-plate": ["disque-bumper-cpu", "Disque bumper en CPU", "fabricant disques bumper CPU"],
  "cpu-color-bumper-plate": ["disque-bumper-cpu-couleur", "Disque bumper CPU coloré", "grossiste bumper plates couleur"],
  "rubber-weight-plate": ["disque-musculation-caoutchouc", "Disque de musculation en caoutchouc", "fabricant disques musculation caoutchouc"],
  "rubber-barbell-plate": ["disque-olympique-caoutchouc-poignees", "Disque olympique en caoutchouc avec poignées", "disques olympiques caoutchouc grossiste"],
  "full-rubber-barbell-plate": ["disque-olympique-tout-caoutchouc", "Disque olympique tout caoutchouc", "disques tout caoutchouc fournisseur"],
  "black-competition-plate": ["disque-competition-noir", "Disque de compétition noir", "disques compétition haltérophilie"],
  "solid-steel-barbell-plate": ["disque-olympique-acier-massif", "Disque olympique en acier massif", "fabricant disques acier massif"],
  "custom-solid-steel-barbell-plate": ["disque-acier-massif-personnalise", "Disque en acier massif personnalisé", "disques acier marque privée"],
  "heavy-solid-steel-plate": ["disque-lourd-acier-massif", "Disque lourd en acier massif", "disques lourds acier fournisseur"],
  "gold-steel-barbell-plate": ["disque-olympique-acier-dore", "Disque olympique en acier doré", "disques olympiques dorés fabricant"],
  "rubber-competition-bumper-plate": ["disque-bumper-competition-caoutchouc", "Disque bumper de compétition en caoutchouc", "bumper plates compétition grossiste"],
  "cast-iron-weight-plate": ["disque-musculation-fonte", "Disque de musculation en fonte", "grossiste disques fonte"],
  "seven-hole-cast-iron-plate": ["disque-fonte-sept-poignees", "Disque en fonte à sept poignées", "disques fonte à poignées"],
  "spray-weight-plate": ["disque-musculation-peint", "Disque de musculation peint", "disques musculation peints grossiste"],
  "tpu-olympic-plate": ["disque-olympique-tpu", "Disque olympique en TPU", "fabricant disques olympiques TPU"],
  "star-tpu-plate": ["disque-tpu-etoile", "Disque TPU en étoile", "disques TPU personnalisés"],
  "cpu-grip-plate": ["disque-cpu-poignees", "Disque CPU à poignées", "fabricant disques CPU poignées"],
  "pu-grip-plate": ["disque-polyurethane-poignees", "Disque polyuréthane à poignées", "grossiste disques PU poignées"],
  "pu-color-plate": ["disque-polyurethane-couleur", "Disque polyuréthane coloré", "disques PU couleur fournisseur"],
  "cpu-mini-bumper-plate": ["mini-disque-bumper-cpu", "Mini disque bumper en CPU", "mini bumper plates grossiste"],
  "rubber-olympic-plate": ["disque-olympique-caoutchouc", "Disque olympique en caoutchouc", "disques olympiques caoutchouc fabricant"],
  "pu-plate-set": ["set-disques-polyurethane", "Set de disques en polyuréthane", "set disques PU grossiste"],
  "rubber-bumper-plate": ["disque-bumper-caoutchouc", "Disque bumper en caoutchouc", "fabricant bumper plates caoutchouc"],
  "four-grip-cpu-plate": ["disque-cpu-quatre-poignees", "Disque CPU à quatre poignées", "disques CPU quatre poignées"]
};

const rackMap: Record<string, [string, string, string]> = {
  "private-home-gym-rack-system": ["systeme-rack-salle-privee", "Système de rack pour salle privée", "fabricant rack home gym sur mesure"],
  "power-rack-functional-trainer": ["power-rack-station-fonctionnelle", "Power rack avec station fonctionnelle", "fabricant power rack functional trainer"],
  "home-gym-functional-trainer": ["station-fonctionnelle-home-gym", "Station fonctionnelle pour home gym", "station musculation home gym fournisseur"],
  "compact-cable-power-rack": ["power-rack-compact-poulies", "Power rack compact avec poulies", "power rack compact poulies"],
  "dual-pulley-smith-rack": ["smith-rack-double-poulie", "Smith rack à double poulie", "fabricant smith rack double poulie"],
  "custom-home-gym-rack": ["rack-home-gym-personnalise", "Rack home gym personnalisé", "rack home gym sur mesure"],
  "storage-functional-trainer": ["station-fonctionnelle-rangement", "Station fonctionnelle avec rangement", "station fonctionnelle rangement"],
  "cable-crossover-functional-trainer": ["station-cable-crossover", "Station fonctionnelle cable crossover", "fabricant cable crossover professionnel"],
  "adjustable-weight-bench": ["banc-musculation-reglable", "Banc de musculation réglable", "fabricant banc musculation réglable"],
  "smith-squat-frame": ["rack-squat-smith", "Rack à squat Smith", "rack squat Smith fournisseur"],
  "half-frame-squat-rack": ["half-rack-squat", "Half rack pour squat", "fabricant half rack professionnel"],
  "cable-cross-functional-trainer": ["station-fonctionnelle-cable-cross", "Station fonctionnelle cable cross", "station cable cross grossiste"],
  "six-column-functional-trainer": ["station-fonctionnelle-six-colonnes", "Station fonctionnelle à six colonnes", "station musculation six colonnes"],
  "cable-crossover-machine": ["machine-cable-crossover", "Machine cable crossover", "fabricant machine cable crossover"],
  "full-frame-squat-rack": ["power-rack-cadre-complet", "Power rack à cadre complet", "power rack cadre complet fabricant"],
  "eight-column-training-rack": ["rack-entrainement-huit-colonnes", "Rack d’entraînement à huit colonnes", "rack huit colonnes professionnel"],
  "wall-mounted-functional-trainer": ["station-fonctionnelle-murale", "Station fonctionnelle murale", "station poulies murale fabricant"],
  "smith-cable-crossover-machine": ["smith-machine-cable-crossover", "Smith machine avec cable crossover", "smith machine cable crossover fabricant"],
  "floor-plate-cable-crossover": ["cable-crossover-plaques-sol", "Cable crossover sur plaques de sol", "cable crossover autoportant"],
  "smith-machine": ["smith-machine-professionnelle", "Smith machine professionnelle", "fabricant smith machine professionnelle"],
  "wall-folding-functional-trainer": ["station-fonctionnelle-murale-pliable", "Station fonctionnelle murale pliable", "station poulies murale pliable"],
  "incline-flat-decline-bench": ["banc-incline-plat-decline", "Banc incliné, plat et décliné", "banc musculation inclinable fabricant"],
  "commercial-adjustable-bench": ["banc-reglable-professionnel", "Banc réglable professionnel", "banc professionnel réglable grossiste"],
  "heavy-duty-adjustable-bench": ["banc-reglable-renforce", "Banc réglable renforcé", "banc musculation heavy duty"],
  "compact-adjustable-bench": ["banc-reglable-compact", "Banc réglable compact", "banc réglable compact professionnel"],
  "three-in-one-smith-functional-trainer": ["smith-station-fonctionnelle-trois-en-un", "Smith station fonctionnelle 3-en-1", "smith functional trainer 3 en 1"],
  "smith-dual-pulley-trainer": ["smith-machine-double-poulie", "Smith machine à double poulie", "smith machine double poulie fabricant"],
  "olympic-bench-plate-storage": ["banc-olympique-rangement-disques", "Banc olympique avec rangement de disques", "banc olympique professionnel"],
  "multi-jungle-functional-trainer": ["station-multi-jungle", "Station fonctionnelle multi-jungle", "fabricant station multi jungle"],
  "single-station-functional-trainer": ["station-fonctionnelle-individuelle", "Station fonctionnelle individuelle", "station musculation une personne"],
  "three-station-functional-trainer": ["station-fonctionnelle-trois-postes", "Station fonctionnelle à trois postes", "station musculation trois postes"],
  "five-station-functional-trainer": ["station-fonctionnelle-cinq-postes", "Station fonctionnelle à cinq postes", "station musculation cinq postes"],
  "multi-jungle-training-system": ["systeme-entrainement-multi-jungle", "Système d’entraînement multi-jungle", "système multi jungle fabricant"]
};

const accessoryMap: Record<string, [string, string, string]> = {
  "vinyl-kettlebell": ["kettlebell-vinyle", "Kettlebell en vinyle", "grossiste kettlebells vinyle"],
  "cast-iron-kettlebell": ["kettlebell-fonte", "Kettlebell en fonte", "fabricant kettlebells fonte"],
  "competition-kettlebell": ["kettlebell-competition", "Kettlebell de compétition", "grossiste kettlebells compétition"],
  "six-side-cable-handle": ["poignee-poulie-six-faces", "Poignée de poulie à six faces", "fabricant poignées poulie"],
  "tetragonal-cable-handle": ["poignee-poulie-quatre-faces", "Poignée de poulie à quatre faces", "grossiste poignées câble"],
  "rubber-coated-gym-handle-sets": ["set-poignees-musculation-caoutchouc", "Set de poignées de musculation caoutchoutées", "sets poignées musculation grossiste"],
  "aluminum-gym-handles": ["poignees-musculation-aluminium", "Poignées de musculation en aluminium", "poignées poulie aluminium fabricant"],
  "solid-steel-gym-handles": ["poignees-musculation-acier-massif", "Poignées de musculation en acier massif", "poignées acier musculation grossiste"],
  "lat-pulldown-handles": ["poignees-tirage-vertical", "Poignées de tirage vertical", "poignées tirage vertical grossiste"],
  "v-handle-attachments": ["poignees-v-poulie", "Poignées en V pour poulie", "poignée V musculation fournisseur"],
  "straight-bar-cable-attachments": ["barres-droites-poulie", "Barres droites pour poulie", "barres poulie grossiste"],
  "triceps-rope-handles": ["cordes-triceps-poulie", "Cordes triceps pour poulie", "grossiste cordes triceps"],
  "cable-machine-attachments": ["accessoires-machine-poulie", "Accessoires pour machine à poulie", "accessoires poulie musculation grossiste"],
  "tpe-yoga-mat": ["tapis-yoga-tpe", "Tapis de yoga en TPE", "grossiste tapis yoga TPE"],
  "vipr-training-tube": ["tube-entrainement-vipr", "Tube d’entraînement ViPR", "grossiste tubes ViPR"],
  "yoga-ball": ["ballon-yoga", "Ballon de yoga", "grossiste ballons yoga"],
  "bosu-ball": ["demi-ballon-equilibre", "Demi-ballon d’équilibre", "grossiste balance trainer"],
  "aerobic-step": ["step-aerobic-professionnel", "Step aérobic professionnel", "grossiste steps aérobic"],
  "compact-aerobic-step": ["step-aerobic-compact", "Step aérobic compact", "step aérobic compact grossiste"]
};

const categoryMeta = {
  dumbbells: { root: "/fr/produits/halteres", label: "Haltères", type: "haltère", categoryId: "dumbbells-category" },
  plates: { root: "/fr/produits/disques-musculation", label: "Disques de musculation", type: "disque", categoryId: "weight-plates-category" },
  racks: { root: "/fr/produits/racks-bancs", label: "Racks et bancs", type: "équipement de musculation", categoryId: "racks-benches-category" },
  accessories: { root: "/fr/produits/accessoires-fitness", label: "Accessoires fitness", type: "accessoire", categoryId: "gym-accessories-category" }
} as const;

function profiles(source: ProductSource[], category: CategoryKey, map: Record<string, [string, string, string]>): FrenchProductProfile[] {
  return source.flatMap((product) => map[product.slug] ? [{ source: product, category, frSlug: map[product.slug][0], name: map[product.slug][1], keyword: map[product.slug][2] }] : []);
}

export const frenchProductProfiles = [
  ...profiles(dumbbellProducts, "dumbbells", dumbbellMap), ...profiles(weightPlateProducts, "plates", plateMap),
  ...profiles(racksBenchesProducts, "racks", rackMap), ...profiles(gymAccessoryProducts, "accessories", accessoryMap)
];

function rangeText(profile: FrenchProductProfile) {
  const values = profile.source.range.match(/[0-9][0-9., x×/-]*(?:kg|lb|mm|cm)?/gi)?.join(", ");
  return values ? `${values}. Les paliers, unités et tolérances définitifs sont confirmés dans la fiche approuvée.` : "Dimensions, charges et configurations à confirmer selon le modèle retenu.";
}

function materialText(profile: FrenchProductProfile) {
  const key = `${profile.source.slug} ${profile.name}`.toLowerCase();
  if (/fonte|cast-iron/.test(key)) return "Fonte avec finition adaptée au modèle ; masse, arêtes, porosité et revêtement sont contrôlés sur la référence approuvée.";
  if (/acier|steel|inox|sus304/.test(key)) return "Acier ou inox selon le modèle ; état de surface, arêtes, assemblages et protection contre la corrosion font partie de la spécification.";
  if (/polyuréthane|pu-/.test(key)) return "Polyuréthane appliqué sur le noyau prévu ; formulation, dureté, couleur, brillance et adhérence sont définies par l’échantillon.";
  if (/tpu/.test(key)) return "TPU sur une structure adaptée au produit ; lot matière, moulage, liaison et zones de contact sont vérifiés avant la série.";
  if (/cpu/.test(key)) return "Élastomère CPU sur le noyau ou la structure du modèle ; matière, moulage, marquage et liaison sont confirmés pour le projet.";
  if (/caoutchouc|rubber|bumper/.test(key)) return "Caoutchouc ou élastomère sur le noyau prévu ; odeur, dureté, finition et liaison doivent être évaluées sur un échantillon réel.";
  if (/néoprène|neoprene/.test(key)) return "Revêtement néoprène sur noyau adapté ; préhension, couleur, finition et masse sont contrôlées.";
  if (profile.category === "racks") return "Structure en tubes et tôles d’acier, soudures, visserie et thermolaquage ; les systèmes à câble ajoutent poulies, câbles, guidages et roulements.";
  return "Matière et construction propres à la référence ; déclaration matière, dimensions, finition et usage prévu sont consignés avant commande.";
}

function processText(profile: FrenchProductProfile) {
  if (profile.category === "dumbbells") return `La fabrication du ${profile.name.toLowerCase()} associe préparation de la tête ou du noyau et de la poignée, moulage ou revêtement, assemblage, finition, marquage du poids, pesée et contrôle de l’emballage.`;
  if (profile.category === "plates") return `Pour le ${profile.name.toLowerCase()}, le corps et l’alésage ou insert olympique sont préparés, formés ou revêtus, alignés, marqués, pesés et emballés. Planéité, alésage, épaisseur et liaison de l’insert sont suivis.`;
  if (profile.category === "racks") return `La fabrication du ${profile.name.toLowerCase()} comprend débit et perçage de l’acier, soudage, préparation de surface, thermolaquage, contrôle de montage et vérification des poulies, câbles ou guidages lorsque le modèle en comporte.`;
  return `Le ${profile.name.toLowerCase()} suit une préparation matière, un formage ou usinage, un assemblage, une finition, un marquage, un contrôle fonctionnel puis une vérification de quantité et d’emballage.`;
}

function productImages(profile: FrenchProductProfile): LocalizedImage[] {
  const product = profile.source.gallery?.[0] || profile.source.image;
  const sources = [product, "/assets/dumbbell-production.webp", "/assets/resource-plate-finishing.webp"];
  return sources.map((src, index) => ({
    id: `image-${index + 1}`, src: frenchImagePath(src, profile.frSlug, index),
    alt: index === 0 ? `${profile.name} pour équipement de salle de sport professionnelle` : index === 1 ? `Processus réel de fabrication lié au ${profile.name.toLowerCase()}` : `Contrôle réel de finition pour ${profile.name.toLowerCase()}`,
    caption: index === 0 ? `Photo réelle du ${profile.name.toLowerCase()} ; la configuration finale est précisée dans le devis.` : index === 1 ? "Étape réelle de fabrication chez PowerBaseFit." : "Contrôle réel de surface et de finition."
  }));
}

const useAngles = [
  (n: string) => `Pour ${n}, partez du nombre d’utilisateurs, de la fréquence, du sol, du rangement et du nettoyage. Ces contraintes déterminent la construction utile bien davantage qu’une photo de catalogue.`,
  (n: string) => `${n} doit être positionné dans une gamme : référence principale, complément, option premium ou solution de projet. Ce rôle conditionne volumes, profondeur de stock et réassort.`,
  (n: string) => `Évaluez ${n} avec les équipements déjà présents. Encombrement, rangement, interfaces et circulation peuvent rendre une variante inadaptée même si son prix paraît favorable.`,
  (n: string) => `Observez le cycle complet de ${n} : mise à disposition, utilisation, retour, nettoyage et inspection. Un détail acceptable sur un échantillon peut devenir coûteux en usage intensif.`,
  (n: string) => `Distinguez les besoins de l’exploitant, de l’utilisateur et du service logistique pour ${n}. Maintenance, compréhension d’usage et identification des colis doivent converger.`,
  (n: string) => `Le canal de vente change la configuration de ${n}. Une salle, un distributeur et une marque privée n’attendent ni la même largeur de gamme, ni le même conditionnement.`
];

const positionAngles = [
  (p: FrenchProductProfile) => [`${p.name} est étudié comme référence de gamme, avec un rôle précis dans l’offre et un code stable. L’acheteur définit les variantes réellement nécessaires, puis relie chaque quantité à un usage ou à un segment de vente.`, `La plage annoncée — ${p.source.range} — sert de point de départ et non d’engagement automatique. Les unités, paliers, dimensions et tolérances de chaque SKU sont repris dans la version approuvée.`] as [string, string],
  (p: FrenchProductProfile) => [`Pour ${p.name}, la valeur d’achat vient de la répétabilité entre échantillon, série et réassort. Les caractéristiques visibles et fonctionnelles sont séparées afin qu’une correction esthétique ne masque pas une question de matière, de mesure ou d’assemblage.`, "Le distributeur prépare les informations nécessaires à sa fiche et à son contrôle de réception ; l’exploitant traduit ces mêmes données en rangement, fréquence, entretien et remplacement." ] as [string, string],
  (p: FrenchProductProfile) => [`${p.name} doit justifier sa place dans le stock. La première commande privilégie les variantes qui répondent à une demande identifiée ; les extensions sont décidées après observation de rotation, retours et facilité de réassort.`, "Le devis sépare produit, option de personnalisation, échantillon et emballage. Cette lecture évite d’attribuer au prix unitaire des coûts qui ne s’appliquent qu’au lancement ou à une variante particulière." ] as [string, string],
  (p: FrenchProductProfile) => [`La sélection de ${p.name} commence par la contrainte la moins négociable : interface, espace, poids, charge, fonction ou conditionnement. Les options de couleur et de logo sont examinées ensuite, sans déplacer les critères qui déterminent l’usage.`, "Une fiche courte mais mesurable facilite davantage la comparaison qu’une longue liste d’adjectifs. L’acheteur exige une réponse distincte pour chaque valeur, tolérance et document manquant." ] as [string, string],
  (p: FrenchProductProfile) => [`${p.name} est évalué sur tout son cycle : commande, fabrication, transport, réception, utilisation et réassort. Un choix intéressant à l’unité peut devenir coûteux s’il complique la manutention, le contrôle ou la continuité de gamme.`, "Le projet associe dès le départ le responsable de l’achat, le service logistique et la personne qui utilisera ou revendra le produit. Leurs critères sont consolidés avant l’échantillon." ] as [string, string],
  (p: FrenchProductProfile) => [`Pour une marque privée, ${p.name} doit rester reconnaissable sans dépendre uniquement du logo. Proportions, finition, marquage du poids, couleur et emballage forment une identité que l’usine doit pouvoir reproduire entre variantes.`, "L’acheteur conserve l’épreuve et les références matière. Lors d’un réassort, il demande confirmation de la version et de tout changement susceptible d’affecter l’apparence ou l’utilisation." ] as [string, string],
  (p: FrenchProductProfile) => [`${p.name} est comparé à des produits de fonction équivalente, pas simplement à des photographies similaires. La construction, les interfaces, les dimensions et les limites d’usage servent de base au tableau fournisseur.`, "Si une offre propose une alternative, elle est chiffrée dans une colonne distincte avec son effet sur MOQ, délai, contrôle et emballage. L’option n’est intégrée qu’après décision écrite." ] as [string, string],
  (p: FrenchProductProfile) => [`Dans un projet multi-sites, ${p.name} doit être réceptionnable et identifiable de la même manière partout. L’étiquette, le carton, la nomenclature et les instructions de contrôle sont donc préparés pour une équipe qui n’a pas participé aux échanges avec l’usine.`, "Le conditionnement et la répartition par destination sont validés avant chargement. Cette organisation réduit les ouvertures, tris et réétiquetages à l’arrivée." ] as [string, string],
  (p: FrenchProductProfile) => [`${p.name} peut répondre à une salle, un installateur ou un grossiste, mais ces acheteurs n’acceptent pas les mêmes compromis. Le premier privilégie l’usage quotidien, le second la coordination de projet, le troisième la largeur et la rotation de gamme.`, "Le brief nomme le profil prioritaire afin que matière, variantes, emballage et documentation soient cohérents avec le canal principal au lieu de tenter de satisfaire tous les scénarios." ] as [string, string],
  (p: FrenchProductProfile) => [`Pour ${p.name}, le coût de possession inclut entretien, contrôle, remplacement, espace de stockage et temps de réception. Ces éléments sont estimés avant de choisir entre une construction standard, une finition différente ou un emballage personnalisé.`, "Les informations manquantes reçoivent une hypothèse explicite dans le devis. Avant commande, l’hypothèse est confirmée, corrigée ou conservée comme limite connue." ] as [string, string],
  (p: FrenchProductProfile) => [`${p.name} est intégré à une nomenclature qui précise quantité par variante et quantité totale. Cette distinction permet de comprendre le MOQ réel de la matière, du procédé et du carton sans gonfler artificiellement chaque SKU.`, "La fréquence de réassort envisagée est communiquée dès le brief. Elle peut influencer choix de finition, emballage, stock de composants et conservation des outils ou fichiers." ] as [string, string],
  (p: FrenchProductProfile) => [`L’évaluation de ${p.name} sépare les critères qui bloquent la fonction, ceux qui affectent la vente et les écarts cosmétiques acceptables. Chaque classe reçoit une action : arrêt, correction, tri, concession ou suivi.`, "Cette hiérarchie rend l’inspection plus utile et évite une décision fondée sur le nombre brut d’observations. Le fournisseur connaît avant production les points qui ne peuvent pas être dérogés." ] as [string, string]
];

const sampleAngles = [
  (n: string) => `Attribuez un identifiant à l’échantillon de ${n} et associez-lui mesures, photos, couleur, marquage et emballage. La série doit renvoyer à cette référence.`,
  (n: string) => `Ne testez pas seulement la variante la plus simple de ${n}. Sélectionnez aussi les poids, dimensions ou configurations qui sollicitent davantage la matière et le procédé.`,
  (n: string) => `Envoyez la grille de contrôle de ${n} avant la fabrication de l’échantillon. Le fournisseur sait ainsi quels points seront mesurés et documentés.`,
  (n: string) => `Comparez l’échantillon de ${n}, la fiche technique et le devis lors de la même revue. Les trois documents doivent décrire exactement la même version.`,
  (n: string) => `Conservez la référence approuvée de ${n} avec date, code article et version. Une photographie générique ne suffit pas pour contrôler un réassort.`,
  (n: string) => `Classez les écarts de ${n} en fonctionnels, visuels majeurs et cosmétiques. Cette distinction évite de traiter toutes les observations avec la même gravité.`
];

function differentiationText(profile: FrenchProductProfile): [string, string] {
  const key = profile.source.slug;
  if (key.includes("competition") && key.includes("bumper")) return [
    `${profile.name} vise une gamme où diamètre, épaisseur, masse, insert et présentation doivent être décrits avec plus de précision. L’acheteur compare le protocole de mesure et l’usage autorisé ; le mot compétition ne constitue ni homologation ni certification sans preuve spécifique au modèle.`,
    "Contrôlez plusieurs poids, car les disques légers et lourds n’ont ni la même épaisseur ni les mêmes contraintes. L’insert, la liaison au corps, la régularité de couleur et la lisibilité du marquage sont examinés séparément."
  ];
  if (key.includes("bumper")) return [
    `${profile.name} est sélectionné pour une zone où la barre peut être déposée ou lâchée dans des conditions définies. Plateforme, hauteur, fréquence, diamètre, épaisseur et comportement du disque doivent être compatibles ; une appellation bumper n’autorise pas tous les scénarios de chute.`,
    "La décision porte sur l’espace occupé sur la barre, le maintien de l’insert, la masse et la réponse de la matière après répétitions contrôlées. Les versions légères demandent une attention particulière à la stabilité et à l’usage prévu."
  ];
  if (profile.category === "plates" && key.includes("grip")) return [
    `${profile.name} privilégie la manutention grâce aux ouvertures de prise. Vérifiez leur forme, leur distance au bord, l’absence d’arêtes gênantes et la facilité de saisir le disque lorsqu’il est rangé près d’autres plaques.`,
    "Une poignée utile ne doit pas réduire la résistance de la zone critique ni gêner la lisibilité du poids. Comparez aussi l’épaisseur, l’alésage et le contact avec les supports de rangement et les machines."
  ];
  if (profile.category === "plates" && /steel|cast-iron/.test(key)) return [
    `${profile.name} met l’accent sur un corps métallique compact. L’acheteur examine coulée ou usinage, arêtes, planéité, protection de surface et précision de l’alésage, ainsi que le risque de corrosion lorsque la finition est endommagée.`,
    "La compacité peut permettre davantage de charge sur une barre, mais elle augmente les contacts métal-métal et les exigences de manipulation. Le sol, les supports et l’usage sans chute doivent être clairement définis."
  ];
  if (profile.category === "plates") return [
    `${profile.name} doit être évalué comme interface entre barre, rangement et utilisateur. Alésage, planéité, épaisseur, prise en main et marquage déterminent la facilité d’usage quotidienne autant que la matière visible.`,
    "Pour une gamme colorée ou revêtue, comparez plusieurs lots et plusieurs poids. La continuité de couleur, la liaison du revêtement, les arêtes et le comportement sur les supports influencent la présentation et le réassort."
  ];
  if (profile.category === "dumbbells" && key.includes("adjustable")) return [
    `${profile.name} concentre plusieurs charges dans un mécanisme ou un ensemble compact. Vérifiez les positions, la lisibilité de sélection, le verrouillage, la base de rangement, les manipulations incorrectes prévisibles et les pièces disponibles pour le service.`,
    "Le test doit couvrir chaque position, pas seulement le poids maximum. Observez jeu, bruit, alignement, retrait et remise en place après répétitions, puis définissez les contrôles et l’entretien adaptés au canal de vente."
  ];
  if (profile.category === "dumbbells" && /hex|square|twelve/.test(key)) return [
    `${profile.name} utilise une géométrie stabilisante qui influence roulement, rangement et exercices au sol. Mesurez les têtes de plusieurs poids et vérifiez leur appui sur le rack ; les proportions peuvent évoluer sur la gamme.`,
    "La liaison entre tête et poignée, les angles, la prise et le marquage restent prioritaires. Une forme stable ne compense pas une masse irrégulière, une poignée inconfortable ou un assemblage insuffisamment contrôlé."
  ];
  if (profile.category === "dumbbells" && key.includes("round")) return [
    `${profile.name} privilégie une silhouette ronde et une présentation homogène sur un rack adapté. Le projet doit empêcher le roulement hors rangement et prévoir assez de profondeur pour les têtes les plus larges.`,
    "Comparez diamètre, largeur, alignement et finition sur poids léger, moyen et lourd. L’aspect continu d’une série ronde rend les différences de couleur ou de proportion particulièrement visibles dans une salle."
  ];
  if (profile.category === "dumbbells") return [
    `${profile.name} se juge sur l’équilibre entre tête, poignée, masse et finition. La poignée doit rester cohérente avec les poids de la gamme, et la liaison doit être examinée sur des variantes représentatives plutôt que sur une seule paire.`,
    "Pour un distributeur, la progression des poids, le nombre de SKU, le carton par paire et le réassort structurent la rentabilité. Pour une salle, rack, nettoyage, rotation des poids et confort de prise dominent."
  ];
  if (profile.category === "racks" && key.includes("bench")) return [
    `${profile.name} est évalué par ses angles utiles, sa stabilité, ses réglages, la poignée de déplacement, les roulettes, le rembourrage et la compatibilité avec les racks. L’encombrement pendant un exercice dépasse les dimensions du châssis.`,
    "Testez chaque position avec verrouillage complet et vérifiez soudures, axes, jeu, capuchons et finition. Le plan de maintenance doit couvrir réglages et sellerie, tandis que le colisage protège structure et coussins séparément."
  ];
  if (profile.category === "racks" && key.includes("smith")) return [
    `${profile.name} combine une barre guidée avec une structure qui doit rester alignée sur toute la course. Vérifiez guidages, butées, crochets, sécurités, chargement, accès et, lorsqu’elles existent, poulies et rapports de câble.`,
    "Le montage influence directement la fonction. La notice, la visserie identifiée, le contrôle de verticalité et la validation du site sont aussi importants que le thermolaquage ou l’aspect du châssis."
  ];
  if (profile.category === "racks" && key.includes("wall-mounted")) return [
    `${profile.name} utilise le mur comme contrainte de projet majeure. Structure du support, type de fixation, planéité, accès de pose, plinthes et zone de câble doivent être examinés sur le site par les responsables compétents avant installation.`,
    "Le colisage doit identifier clairement supports, entretoises, quincaillerie et ordre de montage. Après pose, vérifiez alignement, course, dégagement, butées et accès de maintenance sans supposer que tous les murs acceptent la même solution."
  ];
  if (profile.category === "racks" && key.includes("multi-jungle")) return [
    `${profile.name} organise plusieurs postes autour d’une structure commune. Le cahier des charges précise utilisateurs simultanés, exercices, stacks ou résistances, trajectoires, accessoires, circulation interne et accès aux zones de maintenance.`,
    "Un essai poste par poste ne suffit pas : vérifiez aussi l’utilisation simultanée, le croisement des câbles, la stabilité, le rangement et l’identification des colis. La nomenclature doit rendre chaque station et chaque accessoire traçables."
  ];
  if (profile.category === "racks" && /functional|cable|jungle/.test(key)) return [
    `${profile.name} se planifie selon le nombre d’utilisateurs, les trajectoires de câbles, les réglages, les accessoires et les zones de travail autour de la structure. Les dimensions hors tout ne représentent pas l’espace opérationnel.`,
    "Inspectez poulies, câbles, terminaisons, guidages, sélecteurs et points de fixation. Pour une station multi-poste, réalisez aussi des essais simultanés et vérifiez que circulation, rangement et maintenance restent accessibles."
  ];
  if (profile.category === "racks") return [
    `${profile.name} doit relier géométrie, stabilité, positions d’exercice et contraintes du bâtiment. Plans, zones de sécurité, fixation éventuelle, sol, accès de montage et responsabilités locales sont validés avant expédition.`,
    "Le contrôle couvre coupe, perçage, soudure, préparation de surface, thermolaquage, visserie, montage et fonction. Une structure visuellement correcte peut rester inutilisable si les trous, réglages ou pièces ne correspondent pas."
  ];
  if (/kettlebell/.test(key)) return [
    `${profile.name} est comparé selon masse, tolérance, base, diamètre et finition de poignée, espace de prise et cohérence entre poids. Les modèles de compétition et les modèles fitness peuvent adopter des géométries différentes.`,
    "Testez la stabilité au sol, le confort des arêtes et la lisibilité du marquage. Pour un assortiment, choisissez des paliers compatibles avec les cours ou le canal de vente et prévoyez le rangement."
  ];
  if (/handle|attachments|rope/.test(key)) return [
    `${profile.name} doit être compatible avec le point de connexion, la machine, la trajectoire et la charge prévues. Mesurez ouverture, diamètre, longueur, zone de prise et assemblages ; une apparence similaire ne garantit pas la même interface.`,
    "Vérifiez rotation, soudure ou sertissage, revêtement, embouts et confort sous charge. Les lots d’accessoires sont contrôlés pièce par pièce sur identité et quantité afin d’éviter un ensemble incomplet."
  ];
  return [
    `${profile.name} est évalué à partir de sa fonction précise, de ses dimensions, de la matière et de l’environnement d’usage. Nettoyage, rangement, contact avec le sol et unité d’emballage déterminent la version réellement utile.`,
    "Pour le commerce, vérifiez présentation, étiquette, code et quantité par carton. Pour l’exploitation, vérifiez stabilité, prise en main, maintenance et remplacement. Ces deux lectures doivent se retrouver dans la même référence."
  ];
}

function titleFor(name: string) { const full = `${name} fabricant & grossiste | PowerBaseFit`; return full.length <= 65 ? full : `${name} B2B | PowerBaseFit`; }
function descriptionFor(name: string) { return `${name} pour salles et distributeurs : spécifications, matière, contrôle qualité, OEM, logo, emballage et devis fabricant PowerBaseFit.`; }

function buildFrenchVersion(profile: FrenchProductProfile): LocalizedContentVersion {
  const meta = categoryMeta[profile.category]; const publicPath = `${meta.root}/${profile.frSlug}`;
  const range = rangeText(profile); const material = materialText(profile); const process = processText(profile);
  const index = frenchProductProfiles.indexOf(profile);
  return {
    locale: "fr", translationStatus: "localized", reviewStatus: "approved", publishStatus: "published",
    slug: profile.frSlug, publicPath, title: titleFor(profile.name), description: descriptionFor(profile.name),
    h1: `${profile.name} pour salles de sport et achats professionnels`,
    body: [
      frAnswer("reponse-rapide", "Réponse rapide pour l’acheteur", `${profile.name} est une référence destinée aux salles de sport, distributeurs, importateurs et projets de marque privée. ${range} PowerBaseFit vérifie le modèle, les quantités, la personnalisation, l’emballage et la destination avant de confirmer prix, MOQ et délai. Une offre fiable repose sur une nomenclature et une spécification validées, pas uniquement sur une image.`),
      frDefinition("definition", profile.name, `Dans cette gamme, ${profile.name} désigne un ${meta.type} destiné à l’achat professionnel. Le nom identifie une famille ; seuls la matière, les dimensions, le poids ou la charge, la finition, le marquage, les accessoires et le conditionnement de la référence choisie sont contractuels.`),
      frText("positionnement", "Positionnement et valeur d’achat", ...positionAngles[index % positionAngles.length](profile)),
      frText("applications", "Applications et utilisateurs visés", `${profile.name} peut convenir, selon la version confirmée, aux salles commerciales, studios de coaching, hôtels, centres d’entraînement, distributeurs et collections de marque privée. L’exploitant étudie fréquence, nombre d’utilisateurs, chocs, nettoyage et rangement ; le distributeur ajoute assortiment, unités de vente, documentation et stock de remplacement.`, useAngles[index % useAngles.length](profile.name)),
      frText("avantages-limites", "Avantages attendus et limites à documenter", ...differentiationText(profile)),
      frText("materiaux", "Matériaux et construction", material, `Le nom commercial de la matière ne suffit pas. Pour ${profile.name}, le noyau, le revêtement, les zones de préhension ou d’assemblage, l’épaisseur, la finition et le marquage sont décrits dans la fiche de validation. Toute modification de matière, de moule, de sous-traitant ou de procédé après l’échantillon doit être signalée et réévaluée.`),
      frTable("tableau-technique", "Tableau technique pour la demande", ["Caractéristique", "Base de projet", "À confirmer"], [["Produit", profile.name, "Code modèle et version"], ["Plage", range, "Paliers, unités et quantité"], ["Matière", material.split(";")[0], "Déclaration et échantillon"], ["Dimensions", "Selon modèle et variante", "Plan ou fiche technique"], ["Personnalisation", "Logo, couleur, étiquette selon faisabilité", "Procédé, position et référence couleur"], ["Contrôle", "Mesures, fonction, aspect et emballage", "Tolérance et échantillonnage"]], `Données à valider pour ${profile.name}`),
      frTable("comparaison", "Comparer les offres sur une même base", ["Critère", "Formulation insuffisante", "Information exploitable"], [["Matière", "Haute qualité", "Composition, structure et échantillon"], ["Usage", "Convient aux salles", "Fréquence, charge et contrôle"], ["Poids / dimension", "Standard", "Valeur cible, tolérance et méthode"], ["OEM", "Logo possible", "Technique, emplacement, couleur, MOQ et épreuve"], ["Emballage", "Carton export", "Unités, poids net/brut, dimensions et palette"]]),
      frText("fabrication", "Processus de fabrication", process, `Le projet commence par une fiche produit et emballage non ambiguë. Après validation de la matière et de l’échantillon, la série suit des contrôles en cours de fabrication. L’état de l’outillage, l’alignement, la préparation de surface et le marquage peuvent être vérifiés avant le contrôle final. La dernière revue confirme modèle, quantité, finition visible et préparation au transport.`),
      frText("controle-qualite", "Contrôle qualité et acceptation", `Le plan de contrôle du ${profile.name.toLowerCase()} couvre l’identité, le poids ou les dimensions, l’alignement, la fonction, la surface, les assemblages, le marquage, la quantité et l’emballage. L’échantillonnage doit représenter plusieurs variantes, y compris celles qui sollicitent le plus le procédé.`, `Avant expédition, relevés internes, photos, mesures et inspection tierce peuvent être combinés. Les critères sont définis avant la série. Une appréciation telle que « très bon » ne remplace jamais une limite mesurable ou une référence approuvée.`),
      frText("emballage", "Emballage, expédition et réception", `${profile.name} est protégé pour limiter le contact entre surfaces, arêtes, poignées, inserts et pièces mobiles pendant les manutentions et le transport. Pour les produits lourds, la résistance du carton, les renforts, la palette et l’arrimage sont étudiés. Le dossier d’emballage indique unités par colis, poids net et brut, dimensions, étiquette et plan palette.`, `L’importateur calcule fret, assurance, formalités, droits, TVA, frais portuaires, livraison intérieure et déchargement selon l’Incoterm. À réception, il consigne état des palettes, nombre de colis, marquage, dommages visibles et mesures sur plusieurs variantes. Les obligations réglementaires et documentaires doivent être vérifiées pour le produit et le marché concernés ; le marquage CE ne doit pas être supposé automatiquement.`),
      frText("oem", "OEM, ODM et marque privée", `Selon la construction et le volume, ${profile.name} peut être étudié avec logo, couleur, marquage des poids, étiquette et carton personnalisés. Une adaptation graphique n’est pas équivalente à un développement technique : forme, matière, dimensions ou nouvel outillage modifient MOQ, coût d’échantillon et délai.`, `Le parcours OEM comprend brief, sélection d’une base, faisabilité, épreuve graphique, échantillon, validation écrite, production, contrôle et expédition. Le terme ODM n’est utilisé que si PowerBaseFit prend en charge une part définie du développement. Le propriétaire de la marque valide ses textes, identifiants et obligations sur le marché cible.`),
      frText("strategie-echantillon", `Validation d’échantillon : ${profile.name}`, sampleAngles[index % sampleAngles.length](profile.name), `La revue couvre matière, dimensions, poids ou charge, fonction, couleur, logo, étiquette et emballage. Les observations sont numérotées et la version corrigée doit répondre à chacune. Une validation par photographie peut compléter, mais ne remplace pas un échantillon physique lorsque masse, toucher, couleur ou fonction sont déterminants.`),
      frChecklist("checklist-achat", "Checklist d’achat", ["Entreprise, pays et canal de vente", `Référence souhaitée : ${profile.name}`, "Quantités par poids, taille ou configuration", "Matière, couleur, finition et échantillon", "Dimensions, tolérances et tests fonctionnels", "Logo, marquage, étiquette et emballage", "Plan d’échantillonnage ou inspection tierce", "Destination, Incoterm et contraintes de déchargement", "Dates d’échantillon, production et départ", "Pièces d’usure, service et stratégie de réassort"]),
      frText("demande-devis", "Préparer une demande de devis exploitable", `Transmettez la liste de ${profile.name}, variantes, quantités, marché, personnalisation, emballage et destination. PowerBaseFit vérifie la correspondance produit et les points ouverts, puis confirme offre, MOQ, échantillon et calendrier sur la même base technique.`, `Avant la production, les deux parties valident code modèle, nomenclature, caractéristiques, épreuve, emballage et méthode d’acceptation. Les changements tardifs sont versionnés afin que achats, production et qualité utilisent le même document.`)
    ],
    faq: [
      { id: "faq-1", question: `${profile.name} convient-il à une salle de sport professionnelle ?`, answer: "Oui si la version, la fréquence d’usage, les charges, l’entretien et les critères d’acceptation correspondent au projet. Le nom du produit ne suffit pas à établir cette adéquation." },
      { id: "faq-2", question: `Peut-on personnaliser ${profile.name} avec notre logo ?`, answer: "Logo, couleur, marquage, étiquette et emballage peuvent être étudiés selon le modèle et les volumes. Le procédé est validé sur épreuve ou échantillon." },
      { id: "faq-3", question: "Quelle est la quantité minimale de commande ?", answer: "Le MOQ dépend de la référence, du mix de variantes, de la matière, de l’outillage et de la personnalisation. Il est confirmé après examen de la liste d’achat." },
      { id: "faq-4", question: "Comment la qualité est-elle contrôlée avant expédition ?", answer: "Identité, poids ou dimensions, fonction, aspect, marquage, quantité et emballage sont vérifiés par rapport à la spécification approuvée. Une inspection indépendante peut être organisée." },
      { id: "faq-5", question: "Quelles informations faut-il envoyer pour obtenir un devis ?", answer: "Indiquez entreprise, destination, produit, variantes, quantités, matière, logo, emballage, Incoterm et calendrier. Un plan ou un échantillon de référence facilite l’étude." }
    ],
    author: frenchEditorialAuthor, reviewedBy: frenchTechnicalReviewer,
    schemaData: { sku: `FR-${profile.source.slug.toUpperCase()}`, brand: "PowerBaseFit", manufacturer: "PowerBaseFit", material, category: meta.label,
      specifications: [{ name: "Produit", value: profile.name }, { name: "Plage", value: range }, { name: "Marchés", value: "France, Belgique, Suisse et Canada francophone" }],
      breadcrumbs: [{ name: "Accueil", path: "/fr" }, { name: "Produits", path: "/fr/produits" }, { name: meta.label, path: meta.root }, { name: profile.name, path: publicPath }],
      extra: { primaryKeyword: profile.keyword, searchIntent: "Évaluation produit B2B et demande de devis" } },
    images: productImages(profile), internalLinks: [{ targetContentId: meta.categoryId, label: `Voir les ${meta.label.toLowerCase()}` }, { targetContentId: "oem-private-label", label: "OEM et marque privée" }, { targetContentId: "factory", label: "Fabrication et contrôle qualité" }, { targetContentId: "contact", label: "Demander un devis" }],
    canonicalData: { mode: "self" }, hreflangData: { include: true }, updatedAt: "2026-07-20T08:00:00.000Z", publishedAt: "2026-07-20T08:00:00.000Z", version: 1
  };
}

export function englishPathForFrenchProduct(profile: FrenchProductProfile) {
  return profile.category === "dumbbells" ? `/products/dumbbells/${profile.source.slug}` : profile.category === "plates" ? `/products/weight-plates/${profile.source.slug}` : profile.category === "racks" ? `/products/racks-benches/${profile.source.slug}` : `/products/gym-accessories/${profile.source.slug}`;
}

export function frenchVersionForProfile(profile: FrenchProductProfile) { return buildFrenchVersion(profile); }

export function shadowEnglishVersionForFrench(profile: FrenchProductProfile): LocalizedContentVersion {
  const publicPath = englishPathForFrenchProduct(profile);
  return { locale: "en", translationStatus: "published", reviewStatus: "approved", publishStatus: "published", slug: profile.source.slug, publicPath, title: profile.source.name, description: `${profile.source.name} for commercial gym equipment buyers.`, h1: profile.source.name, body: [], faq: [], schemaData: { category: categoryMeta[profile.category].label }, images: [{ id: "source", src: profile.source.image, alt: profile.source.name }], internalLinks: [], canonicalData: { mode: "self" }, hreflangData: { include: true }, updatedAt: "2026-07-20T08:00:00.000Z", publishedAt: "2026-07-20T08:00:00.000Z", version: 1 };
}

export function getFrenchProductEntities(): ContentEntity[] { return []; }
