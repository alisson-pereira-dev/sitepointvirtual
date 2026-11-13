import type { MetadataRoute } from "next";
import { urlDoSite } from "@/lib/seo";

/**
 * Tudo liberado. As páginas legais em rascunho NÃO são bloqueadas aqui de propósito: elas saem com
 * `noindex` e o rastreador precisa conseguir ler a página para ver essa instrução.
 * A linha `Sitemap` só existe com domínio (a URL precisa ser absoluta).
 */
export default function robots(): MetadataRoute.Robots {
  const base = urlDoSite();
  return {
    rules: { userAgent: "*", allow: "/" },
    ...(base ? { sitemap: `${base}/sitemap.xml` } : {}),
  };
}
