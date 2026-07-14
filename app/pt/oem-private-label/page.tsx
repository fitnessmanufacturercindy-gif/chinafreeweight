import PtSeoPage from "../PtSeoPage";
import { ptOem } from "../businessContent";
import { ptMetadata } from "../metadata";
export const metadata = ptMetadata(ptOem, "Equipamentos Fitness OEM e Private Label | PowerBaseFit", "Fabricante de equipamentos fitness com OEM e private label para halteres, anilhas e bumper plates: logo, cores, especificações e embalagem personalizada.");
export default function Page() { return <PtSeoPage content={ptOem} />; }
