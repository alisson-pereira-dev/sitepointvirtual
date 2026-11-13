import { getContent } from "@/lib/content";

/**
 * Origem do site ("https://dominio.com.br") a partir de `site.dominio`, ou `null` enquanto o domínio for "pendente".
 * Sem domínio não há `canonical`, `og:url`, `sitemap` com URLs nem `url` no JSON-LD (nada de URL inventada).
 */
export function urlDoSite(): string | null {
  const dominio = getContent().site.dominio?.trim();
  if (!dominio || dominio.toLowerCase() === "pendente") return null;
  try {
    return new URL(/^https?:\/\//i.test(dominio) ? dominio : `https://${dominio}`).origin;
  } catch {
    return null;
  }
}

/** `alternates.canonical` só quando há domínio (o Next resolve o caminho com o `metadataBase` do layout). */
export function canonical(caminho: string): { canonical: string } | undefined {
  return urlDoSite() ? { canonical: caminho } : undefined;
}
