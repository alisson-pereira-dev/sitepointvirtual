import { getContent, varianteDoCta, type Cta } from "@/lib/content";
import { buildWhatsappUrl } from "@/lib/whatsapp";

/**
 * Destino final de um CTA: WhatsApp via `buildWhatsappUrl` (com a mensagem da variante da `origem`, se houver);
 * âncoras e links como estão.
 */
export function hrefDoCta(cta: Cta, origem?: string): string {
  if (cta.tipo === "whatsapp") {
    const variante = origem ? varianteDoCta(origem) : undefined;
    return buildWhatsappUrl(getContent().site.contato.whatsapp, variante?.mensagem);
  }
  return cta.destino;
}
