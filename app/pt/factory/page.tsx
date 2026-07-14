import PtSeoPage from "../PtSeoPage";
import { ptFactory } from "../businessContent";
import { ptMetadata } from "../metadata";
export const metadata = ptMetadata(ptFactory, "Fabricante de Equipamentos Fitness na China | PowerBaseFit", "Fabricante de equipamentos fitness desde 2008: fábrica de halteres, anilhas e bumper plates com controle de qualidade, OEM e private label para exportação.");
export default function Page() { return <PtSeoPage content={ptFactory} />; }
