import PtSeoPage from "./PtSeoPage";
import { ptHome } from "./content";
import { ptMetadata } from "./metadata";
export const metadata = ptMetadata(ptHome, "Fabricante de Equipamentos Fitness OEM | PowerBaseFit", "Equipamentos profissionais para academias direto do fabricante: halteres, anilhas e bumper plates com OEM, private label e exportação para Brasil e Portugal.");
export default function Page() { return <PtSeoPage content={ptHome} />; }
