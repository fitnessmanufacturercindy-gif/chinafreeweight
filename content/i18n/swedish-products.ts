import { dumbbellProducts } from "../../app/products/dumbbells/productData";
import { weightPlateProducts } from "../../app/products/weight-plates/productData";
import { racksBenchesProducts } from "../../app/products/racks-benches/productData";
import { gymAccessoryProducts } from "../../app/products/gym-accessories/productData";
import type { LocalizedContentVersion, LocalizedImage } from "../../lib/content/types";
import { svAnswer, svChecklist, svDefinition, swedishEditorialAuthor, swedishImagePath, swedishTechnicalReviewer, svTable, svText } from "./sv-content-helpers";

type ProductSource = { slug: string; name: string; range: string; type: string; image: string; gallery?: string[] };
type CategoryKey = "dumbbells" | "plates" | "racks" | "accessories";
export type SwedishProductProfile = { source: ProductSource; category: CategoryKey; svSlug: string; name: string; keyword: string; index: number };

const excludedDumbbells = new Set(["cpu-dumbbell-lb","cpu-square-dumbbell-lb","neoprene-dumbbell-lb","hex-dumbbell-lb","pu-dumbbell-lb","tpu-dumbbell-lb","sus304-dumbbell-lb","adjustable-dumbbell-lb","tpu-adjustable-dumbbell-lb"]);

function swedishName(input: string) {
  let value=input
    .replace(/Twelve-sided/gi,"tolvsidig").replace(/Seven-Hole/gi,"sjuhåls").replace(/Four-Grip/gi,"fyrgrepps")
    .replace(/Cast Iron/gi,"gjutjärn").replace(/Solid Steel/gi,"massiv stål").replace(/Stainless Steel/gi,"rostfri stål")
    .replace(/Weight Plate/gi,"viktskiva").replace(/Barbell Plate/gi,"skivstångsskiva").replace(/Bumper Plate/gi,"bumperviktskiva")
    .replace(/Competition Plate/gi,"tävlingsviktskiva").replace(/Grip Plate/gi,"greppviktskiva").replace(/Plate Set/gi,"viktskivset")
    .replace(/Dumbbell Full Range/gi,"komplett hantelserie").replace(/Dumbbell/gi,"hantel")
    .replace(/Adjustable Weight Bench/gi,"justerbar träningsbänk").replace(/Adjustable Bench/gi,"justerbar bänk")
    .replace(/Functional Trainer/gi,"funktionell kabelstation").replace(/Cable Crossover/gi,"kabelkryss")
    .replace(/Squat Rack/gi,"squatrack").replace(/Training Rack/gi,"träningsrack").replace(/Rack System/gi,"racksystem")
    .replace(/Smith Machine/gi,"smithmaskin").replace(/Kettlebell/gi,"kettlebell")
    .replace(/Cable Handle/gi,"kabelhandtag").replace(/Gym Handles/gi,"gymhandtag").replace(/Handle Attachments/gi,"handtagsfästen")
    .replace(/Cable Attachments/gi,"kabeltillbehör").replace(/Yoga Mat/gi,"yogamatta").replace(/Yoga Ball/gi,"gymboll")
    .replace(/Aerobic Step/gi,"stepbräda").replace(/Training Tube/gi,"träningsrör")
    .replace(/Rubber/gi,"gummi").replace(/Chrome/gi,"krom").replace(/Color/gi,"färg").replace(/Heavy Duty/gi,"kraftig")
    .replace(/Heavy/gi,"tung").replace(/Compact/gi,"kompakt").replace(/Custom/gi,"kundanpassad").replace(/Commercial/gi,"kommersiell")
    .replace(/Adjustable/gi,"justerbar").replace(/Selectorized/gi,"väljarlåst").replace(/Round/gi,"rund").replace(/Square/gi,"fyrkantig")
    .replace(/Hexagonal|Hex/gi,"hexagonal").replace(/Black/gi,"svart").replace(/Gold/gi,"guldfärgad").replace(/Full/gi,"hel")
    .replace(/Wall Mounted/gi,"väggmonterad").replace(/Wall Folding/gi,"väggmonterad hopfällbar").replace(/Single Station/gi,"enstations")
    .replace(/Three Station/gi,"trestations").replace(/Five Station/gi,"femstations").replace(/Multi Jungle/gi,"multistations")
    .replace(/Straight Bar/gi,"rak stång").replace(/Triceps Rope/gi,"tricepsrep").replace(/Coated/gi,"belagd");
  value=value.replace(/\s+/g," ").trim().toLowerCase();
  return value.charAt(0).toUpperCase()+value.slice(1);
}

function slugify(value: string) { return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/å/g,"a").replace(/ä/g,"a").replace(/ö/g,"o").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,""); }

const categoryPath: Record<CategoryKey,string>={dumbbells:"hantlar",plates:"viktskivor",racks:"rack-bank",accessories:"gymtillbehor"};
const categoryLabel: Record<CategoryKey,string>={dumbbells:"hantlar",plates:"viktskivor",racks:"rack och träningsbänkar",accessories:"gymtillbehör"};
const categoryId: Record<CategoryKey,string>={dumbbells:"dumbbells-category",plates:"weight-plates-category",racks:"racks-benches-category",accessories:"gym-accessories-category"};

const sources: Array<[CategoryKey,ProductSource]> = [
  ...dumbbellProducts.filter((item)=>!excludedDumbbells.has(item.slug)).map((item)=>["dumbbells",item] as [CategoryKey,ProductSource]),
  ...weightPlateProducts.map((item)=>["plates",item] as [CategoryKey,ProductSource]),
  ...racksBenchesProducts.map((item)=>["racks",item] as [CategoryKey,ProductSource]),
  ...gymAccessoryProducts.map((item)=>["accessories",item] as [CategoryKey,ProductSource])
];

export const swedishProductProfiles: SwedishProductProfile[] = sources.map(([category,source],index)=>{
  const name=source.slug === "cpu-hexagonal-dumbbell-wide" ? `${swedishName(source.name)} – bred modell` : swedishName(source.name);
  const svSlug=source.slug === "cpu-hexagonal-dumbbell-wide" ? "cpu-hexagonal-hantel-bred-modell" : slugify(name);
  return {source,category,name,svSlug,keyword:`${name.toLowerCase()} för kommersiellt gym`,index};
});

const audienceAngles=[
  "gymkedjor som behöver en konsekvent produktlinje mellan flera anläggningar",
  "fristående gym som prioriterar driftsäkerhet och enkel kompletteringsbeställning",
  "svenska distributörer som bygger ett sortiment med tydlig pris- och kvalitetsposition",
  "importörer som vill kunna kontrollera specifikation, dokumentation och förpackning före avsändning",
  "fitnessvarumärken som behöver en produkt som kan bära eget namn utan att tappa spårbarhet",
  "hotell-, företags- och bostadsgym där yta, ljudnivå och enkel skötsel påverkar valet",
  "projektinköpare som samordnar utrustning, lagring, leverans och installation i samma tidplan",
  "återförsäljare som behöver stabila artikeldata, tydliga varianter och en realistisk återbeställningsplan"
];

const purchasingAngles=[
  "Bedöm därför offertens antaganden, inte bara styckepriset. Viktsteg, antal per variant, ytfinish, märkning, emballage och leveransvillkor måste ligga i samma versionsstyrda underlag.",
  "En användbar jämförelse mellan leverantörer kräver samma produktkonfiguration. Separera standardprodukt, kundanpassning, prov, inspektion och frakt så att ett lågt grundpris inte döljer senare kostnader.",
  "Koppla varje krav till ett mätbart godkännandekriterium. Det minskar risken att ord som kommersiell, premium eller kraftig betyder olika saker för köpare och fabrik.",
  "Planera första ordern tillsammans med återbeställningen. Artikelnummer, färgreferenser, material, reservdelar och godkänt prov behöver kunna återanvändas när nästa parti beställs.",
  "Räkna på total kostnad till lager: vara, kundanpassning, prov, inspektion, emballage, frakt, försäkring, tullhantering och inrikes leverans. Faktiska tull- och momsuppgifter verifieras av svensk importör.",
  "Låt inköp, drift och logistik granska samma kravlista. En produkt kan vara attraktiv för användaren men opraktisk att lagerföra, märka, reparera eller komplettera.",
  "Bestäm vilka variationer som verkligen ska bli egna SKU:er. För många kombinationer ökar MOQ, lagerbindning och risken för förväxling utan att alltid skapa tydligt kundvärde.",
  "Begär en avvikelseprocess före order. Det ska vara klart vem som godkänner ändringar i material, färg, mått, vikt, logotyp, kartong eller leveranstid."
];

const qcAngles=[
  "Kontrollplanen bör ange mätmetod, tolerans, urval och dokumentation för vikt, mått, funktion, yta, märkning och emballage.",
  "Första artikel, stickprov under produktion och slutkontroll fyller olika syften. Ett godkänt slutprov ersätter inte kontroll av variationen inom hela partiet.",
  "Fotografier är användbara men räcker inte för numeriska krav. Mätvärden ska kopplas till artikel, variant, datum och accepterad gräns.",
  "Riskbaserat urval bör täcka lätta och tunga varianter, flera kartonger och kritiska produktionssteg i stället för enbart den mest lättillgängliga enheten.",
  "När flera färger eller logotyper ingår behöver varje version identifieras separat. Godkännandet ska kunna följas från artwork och prov till packlista.",
  "Funktionskontroll ska efterlikna relevant hantering utan att påstå mer än den överenskomna testmetoden visar. Belastning och cykler dokumenteras i förväg.",
  "Ytfel, funktionsfel och kosmetiska avvikelser bör klassificeras separat eftersom de påverkar användning, försäljning och åtgärd på olika sätt.",
  "Tredjepartsinspektion kan användas när köparen vill ha oberoende kontroll, men kriterier och stickprovsnivå måste vara fastställda innan inspektören anländer."
];

const modelDecisionAngles=[
  "Bygg en beslutsmatris med funktion, användarfrekvens, yta och planerad livslängd. Rangordna kraven innan offert så att ett attraktivt tillval inte tränger undan den egenskap som verksamheten faktiskt behöver.",
  "Välj en referensanvändare och en krävande användare och kontrollera modellen för båda. Skillnaden visar var grepp, justering, lagring eller åtkomst behöver provas mer noggrant.",
  "Jämför modellen med närmaste alternativ i samma kategori och skriv varför båda finns i sortimentet. Om skillnaden inte kan förklaras för kund eller säljteam skapar den sannolikt onödig SKU-komplexitet.",
  "Placera produkten i en ritad gymzon med passage, angränsande utrustning och rengöringsyta. Ett måttblad utan driftzon underskattar ofta det verkliga platsbehovet.",
  "Bestäm vilken egenskap som ska vara synlig för varumärket och vilken som ska märkas först efter lång användning. Fördela budgeten mellan finish, konstruktion, kontroll och reservstrategi därefter.",
  "Beskriv ett normalt användningsfel och bedöm om instruktion, utformning eller service kan minska konsekvensen. Professionell drift kräver att inköpet tar hänsyn till mer än korrekt idealanvändning.",
  "Definiera vilken information säljare, installatör och slutanvändare behöver. Produktdata, kartongetikett, monteringsunderlag och skötselråd ska använda samma artikelidentitet men olika detaljnivå.",
  "Gör en framtidskontroll: kan samma modell kompletteras, ersättas och matchas visuellt efter nästa budgetsäsong? Svaret påverkar val av standardfärg, verktyg, reservdelar och dokumentarkiv."
];

const receivingAngles=[
  "Vid mottagning öppnas kollin från olika pallnivåer och artikelidentitet, antal, yta och kritisk funktion stäms av. Dokumentera fraktskada separat från produktionsavvikelse så att ansvar och åtgärd inte blandas ihop.",
  "Planera lossning efter kollivikt, pallmått och tillgänglig utrustning. Tunga eller långa produkter behöver en mottagningsordning som skyddar både personal, finish och mindre komponenter.",
  "Låt lagret skanna eller läsa artikel, variant och antal utan att packa upp hela produkten. Tydlig märkning minskar felplock och gör avvikelsen snabbare att avgränsa.",
  "Kontrollera att installations- eller monteringsordningen följer packningen. Beslag och delar märks per station så att flera enheter inte öppnas och blandas på samma golv.",
  "Sätt en tidsgräns för mottagningskontroll och reklamation i den interna planen. Fotografera etikett, kolli och fel tillsammans så att leverantören kan spåra batch och packningssteg.",
  "Avsätt karantänplats för oklar eller skadad vara. Produkten ska inte gå vidare till gym eller kund innan identitet, omfattning och disposition har beslutats.",
  "Stäm faktisk netto- och bruttovikt mot dokumenten när frakt eller tullunderlag kräver det. Systematiska skillnader kan tyda på fel antal, variant eller packuppgift.",
  "Gör en provmottagning av första ordern och notera tid per kolli, emballageavfall och hjälpmedel. Resultatet kan förenkla kartong, pallmönster och nästa lagerbokning.",
  "Koppla varje mottagen pall till packlista och orderrad innan emballaget försvinner. Spårbarheten behövs om samma artikel ligger på flera pallar eller levereras i delpartier."
];

const lifecycleAngles=[
  "Efter driftsättning följs de första 30 och 90 dagarna upp med städning, visuellt slitage, lösa delar och användarfeedback. Tidiga observationer blir konkreta krav vid nästa order.",
  "Skapa reservdelslistan innan leverans med artikelnummer, bild och rekommenderad mängd. Små slitdelar kan vara billiga i fabrik men dyra att skicka separat efter installation.",
  "Bestäm vem som äger rengöringsinstruktion, veckokontroll och felrapportering. En hållbar produkt kan få kort livslängd om driftsrutinen saknar ansvar och rätt material.",
  "Sätt ett enkelt register för batch, plats och servicehändelse. Det gör det möjligt att se om ett problem följer en produktionsserie, en miljö eller ett användningsmönster.",
  "Planera hur en enskild skadad enhet ersätts utan att hela serien tappar färg, märkning eller funktion. Referensfiler och standardiserade varianter minskar den risken.",
  "Mät inte livscykelvärde enbart i år. Ta med stillestånd, arbetstid, reservdel, kundupplevelse och möjligheten att flytta eller sälja utrustningen vidare.",
  "Samla reklamationsorsak i kategorier som material, mått, montering, transport, användning och underhåll. Korrigerande åtgärd ska riktas mot rätt orsak, inte bara ersätta den synliga delen.",
  "När produkten utgår ska ersättaren bedömas för kompatibilitet, mått och visuellt uttryck. En dokumenterad kärnspecifikation gör modellbytet mindre riskfyllt.",
  "Använd återbeställningsmötet för att skilja önskad förbättring från fel. En förbättring kan kräva nytt artikelnummer och nytt prov även om tidigare leveranser låg inom avtal.",
  "Följ upp hur produkten påverkar träningsflöde och ordning i zonen. Lagring, tillgänglighet och tydlig vikt- eller funktionsmärkning kan ge större driftvärde än en marginell materialspecifikation.",
  "Dokumentera vilka delar som kan inspekteras av gympersonal och vilka som kräver utbildad service. Gränsen hjälper köparen planera avtal, reservdelar och säkra stoppbeslut."
];

function individualModelReview(profile:SwedishProductProfile){
  const {index,name,source}=profile;
  return `${name} med planeringsintervallet ${source.range} behöver granskas som en egen artikelversion, även när konstruktionen delar komponenter med andra modeller. ${modelDecisionAngles[index%modelDecisionAngles.length]}\n\n${receivingAngles[index%receivingAngles.length]}\n\n${lifecycleAngles[index%lifecycleAngles.length]}`;
}

function productAngle(profile: SwedishProductProfile) {
  const key=profile.source.slug;
  if(profile.category==="dumbbells"&&/hex|square|twelve/.test(key))return "Huvudformen minskar rullning och påverkar hur hanteln ligger på ställ och golv. Inköparen behöver ändå kontrollera huvudets proportioner, handtagsdiameter, greppmönster, sammanfogning och hur storleken förändras genom viktserien.";
  if(profile.category==="dumbbells"&&key.includes("adjustable"))return "Justerbara modeller har fler rörliga delar än fasta hantlar. Väljarläge, låsning, bas, toleranser, reservdelar och felanvändning ska därför provas i upprepade växlingar, inte bedömas enbart när produkten är ny.";
  if(profile.category==="dumbbells"&&key.includes("round"))return "Runda huvuden ger ett klassiskt uttryck men kräver ett kompatibelt ställ och genomtänkt hantering. Kontrollera huvudbredd, total längd, balans och att logotypen orienteras konsekvent i hela serien.";
  if(profile.category==="dumbbells")return "För en hantelserie är konsekvens mellan viktstegen lika viktig som en enskild provhantel. Grepp, balans, märkning, huvudstorlek och finish ska bedömas över lätta, medeltunga och tunga varianter.";
  if(key.includes("competition")&&key.includes("plate"))return "En tävlingsinriktad skiva kräver tydligt definierade mått, viktavvikelse, nav, färg och märkning. Använd inte ordet tävling som ersättning för en faktisk specifikation eller ett redovisat test.";
  if(key.includes("bumper"))return "Bumperviktskivor måste bedömas tillsammans med golv, skivstång och avsedd släpphantering. Diameter, tjocklek, navets infästning, hårdhet och återstuds påverkar både användning och hur många skivor som får plats på stången.";
  if(profile.category==="plates"&&/steel|cast-iron/.test(key))return "Metallskivor ger hög densitet men ställer krav på planhet, centrumhål, kanter, korrosionsskydd och ytfinish. Kontrollera att flera skivor löper på samma hylsa och att märkningen förblir läsbar efter hantering.";
  if(profile.category==="plates")return "Viktskivan är gränssnittet mellan användare, skivstång och förvaring. Centrumhål, planhet, greppöppningar, tjocklek, viktmärkning och yta behöver fungera som en sammanhängande specifikation.";
  if(profile.category==="racks"&&key.includes("bench"))return "En träningsbänk bedöms genom ram, stödytor, justeringslägen, låsning, hjul, handtag, stoppning och stabilitet. Måtten ska granskas både fristående och tillsammans med det rack där bänken ska användas.";
  if(profile.category==="racks"&&key.includes("smith"))return "Smithsystem kräver kontroll av styrning, krokar, säkerhetsstopp, stångens rörelse och eventuella kabelstationer. En korrekt monterad provmaskin är nödvändig för att upptäcka linjeringsfel som inte syns i komponentbilder.";
  if(profile.category==="racks"&&key.includes("wall"))return "Väggmontering flyttar en del av säkerhetsfrågan till byggnaden. Väggtyp, infästning, golv, montagekompetens och fria zoner måste verifieras lokalt i Sverige innan installation.";
  if(profile.category==="racks"&&/functional|cable|jungle/.test(key))return "Kabelutrustning ska bedömas för flera användare, rörelsebanor och servicepunkter. Vajer, trissor, utväxling, justering, viktmagasin, skydd och tillgång för underhåll ska framgå av underlaget.";
  if(profile.category==="racks")return "För rack och ramar räcker inte yttermåttet. Träningszon, lastning, förankring, takhöjd, golv, passage, montering och serviceutrymme måste finnas med i projektets layout.";
  if(key.includes("kettlebell"))return "Kettlebells bedöms genom faktisk vikt, bottenplan, handtagsdiameter, greppyta, fönsterstorlek och konsistens mellan vikter. Tävlingsform och fitnessform kan ha olika måttstrategi och ska inte blandas utan beslut.";
  if(/handle|attachment|rope/.test(key))return "Kabeltillbehör måste passa maskinens anslutning, rörelseriktning och last. Mät fästöppning, greppdiameter, längd, rotation och sammanfogningar; ett liknande fotografi bevisar inte kompatibilitet.";
  return "Tillbehöret ska specificeras efter funktion, mått, material, rengöring och förvaring. Kontakt med golv, hud eller andra maskindelar påverkar vilka ytor och förpackningar som är lämpliga.";
}

function categoryProcess(profile: SwedishProductProfile) {
  if(profile.category==="dumbbells")return "Processen kan omfatta gjutning eller bearbetning av kärna och huvuden, förberedelse av grepp, beläggning eller ytfinish, sammanfogning, viktkontroll, märkning och packning. Metoden skiljer sig mellan gummi, PU, TPU, CPU, stål och gjutjärn; fabriken ska beskriva den faktiska vägen för den valda modellen.";
  if(profile.category==="plates")return "Tillverkningen kan omfatta gjutning eller bearbetning av kärna, ytbehandling, formning av polymer, montering av nav, efterbearbetning, viktjustering, märkning och packning. Kontrollpunkter placeras där fel fortfarande kan korrigeras, inte enbart när godset står färdigt för lastning.";
  if(profile.category==="racks")return "Tillverkningen börjar med kapning, håltagning och fixturering av ståldelar, fortsätter med svetsning, slipning och förbehandling, och avslutas med pulverlackering, montering och funktionsprov. Komponentmärkning och provmontering minskar risken för problem på svensk installationsplats.";
  return "Tillverkningsvägen beror på material och konstruktion och kan omfatta gjutning, formsprutning, kapning, sömnad, pressning, ytbehandling eller montering. Kritiska gränssnitt och förslitningspunkter ska identifieras innan provet godkänns.";
}

function materials(profile: SwedishProductProfile) {
  const material=profile.source.type;
  return `Den angivna konstruktionen är ${material}. Det är en startpunkt, inte en fullständig materialdeklaration. Inköparen bör fastställa vilka delar som består av metall, elastomer, polymer, skum, textil eller fästelement och vilka ytor som är exponerade. För produkter som sätts på EU-marknaden ansvarar den svenska importören för att bedöma tillämpliga produkt- och kemikaliekrav. Begär därför materialspecifikation och relevant leverantörsdokumentation för den verkliga varianten i stället för att anta att ett familjenamn täcker alla recept och färger.`;
}

function materialDecision(profile: SwedishProductProfile) {
  const key=`${profile.source.slug} ${profile.source.type}`.toLowerCase();
  if(key.includes("cpu"))return "CPU-konstruktion ska specificeras med verkligt recept, hårdhet, färg, kärna och bindning för den valda modellen. Köparen bör prova yta, lukt, märkning och dimensionsstabilitet på flera vikter eftersom materialnamnet inte visar hur en viss geometri fylls eller härdas. Be fabriken registrera sats, processfönster och efterbearbetning så att samma visuella och funktionella referens kan följas vid återbeställning. Jämför CPU-alternativet mot PU, TPU eller gummi med samma användning, viktserie och kontrollnivå; annars speglar prisskillnaden flera variabler samtidigt.";
  if(key.includes("tpu"))return "TPU-alternativet behöver bedömas som en komplett konstruktion, inte bara ett ytskikt. Specificera polymer, kärna, fog, färg, textur och hur märkningen integreras. Prova nötning, rengöring, grepp och synliga märken på den verkliga produkten. För en viktserie ska lätta och tunga enheter jämföras eftersom godstjocklek och formfyllnad kan skilja. Dokumentera färgreferens och accepterad ytvariation innan serieproduktion och spara provet för nästa batch.";
  if(key.includes("pu")||key.includes("urethane"))return "PU väljs ofta för en definierad yt- och varumärkesupplevelse, men värdet måste knytas till specifikation. Granska kärnans konstruktion, gjutprocess, hårdhet, färg, logo, kantdetaljer och hur ytan reagerar på gymmets rengöring. Begär prov från mer än en storlek och kontrollera att finish och märkning håller samma nivå genom serien. Ett premiumord eller högre pris ersätter inte en accepterad fysisk referens och en repeterbar kontrollmetod.";
  if(key.includes("rubber")||key.includes("gummi"))return "Gummikonstruktion varierar med blandning, återvunnet innehåll, pigment, härdning och bindning mot kärnan. Definiera därför luktbedömning, ytreferens, hårdhet där den påverkar funktionen, märkning och accepterade gjutspår. Prova kontakt mot det golv och den rengöring som används i gymmet. För produkter som hanteras tätt i kartong ska fabriken även kontrollera att ytor inte klibbar, färgar av eller skadas under transport.";
  if(key.includes("cast iron")||key.includes("gjutjärn"))return "Gjutjärnsdelen behöver kontrolleras för vikt, planhet, porer, grader och skarpa kanter innan ytfinish läggs på. Gjutvariation kan påverka både balans och passning, så urvalet ska täcka flera formar eller produktionslägen. Specificera korrosionsskydd, färg eller beläggning och hur ytan ska provas efter transport. Om produkten har pressad eller monterad komponent ska även sammanfogningen dokumenteras som en separat kontrollpunkt.";
  if(key.includes("steel")||key.includes("stål")||key.includes("sus304"))return "Stålkonstruktionen ska beskriva material, dimension, bearbetning, fogar och ytbehandling för varje bärande eller greppad del. Kontrollera kanter, koncentriskhet, passning och korrosionsskydd efter den faktiska processen. Rostfritt, kromat, målat och obehandlat stål har olika krav på rengöring och visuella avvikelser. Vid svetsade produkter ska fixturering, svetskvalitet och deformation ingå; vid maskinbearbetade delar prioriteras toleranser och yta.";
  if(key.includes("neoprene")||key.includes("vinyl"))return "Mjuk beläggning ska utvärderas för grepp, sömmar eller skarvar, lukt, rengöring och deformation under lagring. Kontrollera hur färg och viktmärkning hålls konsekventa när artikelserien har många små steg. Förpackningen måste hindra tryckmärken och sammanpressning under lång transport. Begär materialuppgift för den exakta färgen och varianten, eftersom pigment och tillsatser kan påverka den svenska importörens dokumentationsbedömning.";
  if(profile.category==="racks")return "För ramprodukter ligger materialbeslutet i stålkvalitet, profilmått, godstjocklek, plåt, axlar, lager, vajer, trissor, fästelement, stoppning och ytfinish. Alla delar behöver inte högsta specifikation, men lastvägar och slitdelar ska vara spårbara. Be om komponentlista och ritning som visar gränssnitt för montage och service. Färgprov och pulverlackens förbehandling godkänns separat från konstruktionens funktion.";
  if(key.includes("kettlebell"))return "Kettlebellens materialval påverkar bottenplan, handtagsyta, huvudvolym och hur vikterna skiljer sig i storlek. Kontrollera kärna eller gjutkropp, eventuell beläggning, fyllning, fog och märkning. Tävlingsform kräver särskild konsekvens i yttermått, medan traditionella serier kan växa med vikten. Prova greppet utan att en blank showroomfinish döljer ojämnheter som blir märkbara under upprepad användning.";
  return "Materialbeslutet ska kopplas till produktens kontaktpunkter och slitage: grepp, golv, kabel, infästning, hud, rengöring och lagring. Dela upp produkten i komponenter och ange material, mått, yta och acceptans för de delar som påverkar funktion. Prova fästen och övergångar eftersom ett fel ofta uppstår mellan två material snarare än mitt i en komponent. Dokumentera reserv- och slitdelar för kommersiell drift.";
}

const faqAnswers=[
  "MOQ beror på material, viktserie, färg, logotyp, emballage och om befintlig eller ny form används. Skicka artikelmix och antal per variant så kan fabriken bedöma MOQ på rätt nivå.",
  "Ett prov bör motsvara avsedd konstruktion och märkas med versionsnummer. Godkänn mått, vikt, funktion, yta, färg, logotyp och förpackning skriftligt innan serieproduktion.",
  "Ja, beroende på produkt och metod. Logotyp kan exempelvis gjutas, präglas, tryckas, lasergraveras eller appliceras på etikett. Hållbarhet och minsta kvantitet skiljer sig mellan metoder.",
  "Förbered företag, marknad, artikelval, antal, målgrupp, specifikation, kundanpassning, emballage, destination och önskat Incoterm. Då blir pris och ledtid jämförbara.",
  "PowerBaseFit kan lägga in intern kontroll och stödja tredjepartsinspektion enligt överenskommen plan. Köparen måste i förväg definiera kriterier, urval och vilken dokumentation som ska levereras."
];

export function swedishVersionForProduct(profile: SwedishProductProfile): LocalizedContentVersion {
  const {source,category,name,index}=profile;
  const path=`/sv/produkter/${categoryPath[category]}/${profile.svSlug}`;
  const audience=audienceAngles[index%audienceAngles.length];
  const purchasing=purchasingAngles[(index*3)%purchasingAngles.length];
  const qc=qcAngles[(index*5)%qcAngles.length];
  const images:LocalizedImage[]=[source.image,"/assets/dumbbell-production.webp","/assets/resource-plate-finishing.webp"].map((src,imageIndex)=>({id:`bild-${imageIndex+1}`,src:swedishImagePath(src,profile.svSlug,imageIndex),alt:imageIndex===0?`${name} för kommersiell gymutrustning`:imageIndex===1?`Verklig produktion för ${name} hos PowerBaseFit`:`Yt- och kvalitetskontroll för ${name}`,caption:imageIndex===0?`Produktbild av ${name} från det befintliga PowerBaseFit-sortimentet.`:imageIndex===1?"Verkligt produktionsmoment som används för att diskutera process och kontrollpunkter.":"Verklig kontroll av yta och utförande före packning."}));
  const body=[
    svAnswer("snabbt-svar","Snabbt svar",`${name} är en B2B-produkt för ${audience}. PowerBaseFit tillverkar och levererar produkten för kommersiella projekt, distribution och eget varumärke. Ett korrekt inköp börjar med den avsedda användningen och den exakta varianten, fortsätter med materialspecifikation, prov och kontrollplan och avslutas med verifierad packlista och leveransvillkor. Det publicerade intervallet ${source.range} används som planeringsunderlag; slutliga viktsteg, mått, toleranser, MOQ och ledtid bekräftas i en projektspecifik offert.`),
    svDefinition("definition",name,`${name} är ${source.type.toLowerCase()} inom kategorin ${categoryLabel[category]}. Produkten specificeras som en kombination av funktion, material, dimensioner, vikt eller kapacitet, ytfinish, märkning och förpackning. För en professionell köpare är produktnamnet inte tillräckligt: den version som beställs måste kunna identifieras i prov, order, kontrollrapport och packlista.`),
    svText("produktoversikt","Produktöversikt och kommersiell roll",productAngle(profile),`${name} ska passa en tydlig roll i sortimentet: huvudprodukt, kompletterande variant, projektspecifik lösning eller del av en sammanhållen serie. ${purchasing} För svenska köpare är leveranssäkerhet mer än en utlovad dag. Den bygger på frysta krav, realistisk materialplan, statuspunkter och en packlista som kan kontrolleras före avgång.`),
    svText("modellspecifik-granskning","Modellspecifik granskning",individualModelReview(profile)),
    svText("anvandning","Användningsområden och målgrupper",`Den här modellen kan utvärderas för kommersiella gym, företagsgym, hotell, återförsäljning, distributörslager eller fitnessvarumärken, men lämpligheten avgörs av belastning, användarfrekvens, miljö och skötsel. ${audience.charAt(0).toUpperCase()+audience.slice(1)} behöver vanligen annan artikelmix och dokumentation än en enskild konsument.`,"Bestäm vem som använder, flyttar, rengör, lagrar och servar produkten. Ange om den ska ingå i en befintlig serie, passa ett visst ställ eller system och kunna kompletteras efter ett år. Då kan konstruktion och reservdelsbehov bedömas innan priset låses."),
    svText("material","Material och konstruktion",materials(profile),"Jämför material efter verklig funktion: slag, nötning, grepp, rengöring, UV-exponering, lukt, korrosion, ljud och visuell hållbarhet. Ett dyrare material skapar bara värde om egenskaperna motsvarar användningen. Spara den godkända material- och färgreferensen tillsammans med provet för framtida återbeställningar."),
    svText("materialbeslut","Materialval för den här modellen",materialDecision(profile)),
    svTable("tekniska-specifikationer","Teknisk specifikationstabell",["Parameter","Planeringsdata","Bekräftas före order"],[["Produkt",name,"Artikelnummer och version"],["Typ",source.type,"Materialuppbyggnad och finish"],["Vikt/intervall",source.range,"Varianter, steg och tolerans"],["Mått","Modellberoende","Ritning eller måttblad"],["Märkning","PowerBaseFit eller eget varumärke","Metod, placering och artwork"],["Förpackning","Exportanpassad","Enheter per kartong, bruttovikt och pallplan"]],`Tabellen är ett offertunderlag. Slutlig produktspecifikation ersätter planeringsdata före order.`),
    svText("tillverkning","Tillverkningsprocess",categoryProcess(profile),`Ett godkänt prov ska kopplas till materiallista, ritning, färg, märkning och förpackning. Vid ändring skapas en ny version i stället för att muntliga instruktioner läggs ovanpå den gamla. Det gör processen spårbar för fabriken och begriplig för inköp, lager och eventuell extern inspektör.`),
    svText("kvalitetskontroll","Kvalitetskontroll och partiets jämnhet",qc,`För ${name} bör kontrollen omfatta identitet, antal, vikt eller kapacitet, kritiska mått, funktion, sammanfogningar, yta, logotyp och emballage. Resultatet registreras mot den godkända versionen. Om en avvikelse upptäcks ska dispositionen vara tydlig: sortering, omarbete, ersättning eller dokumenterat godkännande av köparen.`,"Ett bra prov visar möjlig kvalitet; stickprov från produktionen visar om den upprepas. Låt urvalet täcka relevanta varianter och flera kartonger. För återkommande order jämförs nya mätvärden och referensprov med föregående leverans."),
    svTable("jamforelse","Jämförelsetabell för leverantörsval",["Kontrollpunkt","Svagt underlag","Beslutsbart underlag"],[["Produktidentitet","Namn och bild","Artikel, version och ritning"],["Material","Allmänt materialord","Delar, yta och godkänd referens"],["Kvalitet","Premium eller kommersiell","Mätmetod, tolerans och stickprov"],["Pris","Enhetspris utan antaganden","Konfiguration, antal, emballage och Incoterm"],["Leverans","Ungefärlig ledtid","Prov, produktion, inspektion och avgång separerade"]]),
    svText("forpackning-export","Förpackning, export och mottagning","Förpackningen dimensioneras efter produktens massa, geometri, känsliga ytor och lyftpunkter. Kartong, inlägg, påse, bandning och pall ska hålla artiklar separerade och identifierbara. Bruttovikt, mått, antal och pallfördelning behövs för fraktoffert, lagerplanering och säker mottagning.",`Innan lastning kontrolleras kartongmärkning, streckkod om den ingår, antal per kolli, pallhöjd och att tunga enheter inte skadar lättare delar. ${purchasingAngles[(index+2)%purchasingAngles.length]} Svensk importör verifierar varukod, tull, moms, produktansvar och eventuella dokumentationskrav med behörig rådgivare och myndighet.`),
    svText("oem","OEM, ODM och eget varumärke",`OEM för ${name} kan omfatta logotyp, färg, viktmärkning, artikelnummer, etikett, manual och kartong. ODM innebär större konstruktionsarbete och kräver separat bedömning av ritning, prov, verktyg, rättigheter, kostnad och tid. Ingen kundanpassning ska lovas innan metod, MOQ och verifiering är kända.`,"Börja med varumärkesmanual och målmarknad. Fabriken bedömer vilka ytor och processer som ger läsbar och hållbar märkning. Artwork godkänns i rätt skala, och ett fysiskt prov används när färg, relief, placering eller yta är affärskritisk. Spara originalfiler och versionsnummer för nästa order."),
    svChecklist("inkopschecklista","Inköpschecklista",["Företag, kanal och målgrupp","Produktens användning och belastningsmiljö","Artikelvarianter och antal per variant","Material, vikt, mått och toleranser","Godkänt prov och versionsnummer","Logotyp, färg, etikett och kartong","Kontrollplan, stickprov och rapportformat","Reservdelar eller kompletteringsstrategi","Bruttovikt, volym och pallplan","Destination, Incoterm och önskat leveransfönster"]),
    svText("offert","Offertprocess för B2B",`Skicka produktnamn eller länk, önskade varianter, antal, användning, kundanpassning, destination och Incoterm. PowerBaseFit återkommer med frågor där kraven påverkar konstruktion, MOQ, pris eller ledtid. Därefter bekräftas specifikation och provbehov innan den kommersiella offerten låses.`,"En offert är jämförbar först när den visar vad som ingår: produktversion, antal, valuta, emballage, leveransvillkor, prov, eventuell verktygskostnad och giltighetstid. Produktionsstart sker efter att orderunderlag och godkännanden är kompletta, inte enbart efter en muntlig prisdiskussion."),
  ];
  return {locale:"sv",translationStatus:"localized",reviewStatus:"approved",publishStatus:"published",slug:profile.svSlug,publicPath:path,title:`${name} för gym | OEM-tillverkare`,description:`${name} för distributörer och kommersiella gym. Teknisk produktdata, QC, exportförpackning samt OEM och eget varumärke från tillverkare.`,h1:`${name} för kommersiella gym och B2B-inköp`,body,faq:[{id:"faq-1",question:`Vilken MOQ gäller för ${name}?`,answer:faqAnswers[0]},{id:"faq-2",question:`Hur godkänns ett prov av ${name}?`,answer:faqAnswers[1]},{id:"faq-3",question:"Kan produkten märkas med eget varumärke?",answer:faqAnswers[2]},{id:"faq-4",question:"Vilka uppgifter behövs för en offert?",answer:faqAnswers[3]},{id:"faq-5",question:"Kan en oberoende inspektion göras före leverans?",answer:faqAnswers[4]}],author:swedishEditorialAuthor,reviewedBy:swedishTechnicalReviewer,schemaData:{sku:`PBF-${source.slug.toUpperCase()}`,brand:"PowerBaseFit",manufacturer:"PowerBaseFit",material:source.type,category:categoryLabel[category],specifications:[{name:"Produkt",value:name},{name:"Planerat intervall",value:source.range},{name:"Målgrupp",value:audience}],breadcrumbs:[{name:"Start",path:"/sv"},{name:"Produkter",path:"/sv/produkter"},{name:categoryLabel[category],path:`/sv/produkter/${categoryPath[category]}`},{name,path}],extra:{primaryKeyword:profile.keyword,searchIntent:"Kommersiell produktutvärdering och offert"}},images,internalLinks:[{targetContentId:categoryId[category],label:`Se alla ${categoryLabel[category]}`},{targetContentId:category==="dumbbells"?"dumbbells-guide":category==="plates"?"plates-guide":"factory-guide",label:"Läs inköpsguiden"},{targetContentId:"oem-private-label",label:"OEM och eget varumärke"},{targetContentId:"factory",label:"Tillverkning och kvalitetskontroll"},{targetContentId:"contact",label:"Begär en B2B-offert"}],canonicalData:{mode:"self"},hreflangData:{include:true},updatedAt:"2026-07-20T12:00:00.000Z",publishedAt:"2026-07-20T12:00:00.000Z",version:1};
}

export function englishPathForSwedishProduct(profile: SwedishProductProfile) { const base=profile.category==="dumbbells"?"dumbbells":profile.category==="plates"?"weight-plates":profile.category==="racks"?"racks-benches":"gym-accessories";return `/products/${base}/${profile.source.slug}`; }
