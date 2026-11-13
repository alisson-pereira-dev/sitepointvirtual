import type { MetadataRoute } from "next";
import { getContent } from "@/lib/content";
import { urlDoSite } from "@/lib/seo";

/**
 * Só páginas indexáveis, com URL absoluta: sem domínio o sitemap sai vazio (nenhuma URL inventada);
 * páginas legais em `rascunho: true` e o 404 ficam de fora; sem `lastModified` (não há data com fonte).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = urlDoSite();
  if (!base) return [];

  const { privacidade, termos } = getContent().paginas_legais;
  const paginas = [{ url: `${base}/` }];
  if (!privacidade.rascunho) paginas.push({ url: `${base}/privacidade` });
  if (!termos.rascunho) paginas.push({ url: `${base}/termos` });
  return paginas;
}
