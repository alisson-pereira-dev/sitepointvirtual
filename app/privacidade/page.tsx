import type { Metadata } from "next";
import { PaginaLegal } from "@/components/PaginaLegal";
import { getContent } from "@/lib/content";
import { canonical } from "@/lib/seo";

const { site, paginas_legais } = getContent();
const pagina = paginas_legais.privacidade;

export const metadata: Metadata = {
  title: `${pagina.titulo} | ${site.nome}`,
  // Rascunho pendente de revisão jurídica: fora dos buscadores até `rascunho: false` no content.json.
  robots: pagina.rascunho ? { index: false, follow: false } : undefined,
  // Canonical só quando indexável (sem rascunho) e com domínio definido.
  alternates: pagina.rascunho ? undefined : canonical("/privacidade"),
};

export default function Privacidade() {
  return <PaginaLegal pagina={pagina} />;
}
