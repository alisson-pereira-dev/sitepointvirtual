import { faqItens, faqPublicavel, getContent } from "@/lib/content";
import { urlDoSite } from "@/lib/seo";

type JsonLd = Record<string, unknown>;

/**
 * LocalBusiness a partir de `seo.home.schema` (só dados com fonte: nome, descrição, telefone e endereço do Google,
 * áreas atendidas e Instagram da bio). Sem horário, preço, imagem ou geolocalização, que não têm fonte.
 * `url` só entra com domínio.
 */
export function jsonLdLocalBusiness(): JsonLd {
  const { tipo, campos } = getContent().seo.home.schema;
  const base = urlDoSite();
  return {
    "@context": "https://schema.org",
    "@type": tipo,
    ...campos,
    ...(base ? { url: base } : {}),
  };
}

/** FAQPage com as respostas efetivamente publicadas (neutras em produção). `null` se o FAQ não é renderizado. */
export function jsonLdFaq(): JsonLd | null {
  if (!faqPublicavel()) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItens().map((item) => ({
      "@type": "Question",
      name: item.pergunta,
      acceptedAnswer: { "@type": "Answer", text: item.resposta },
    })),
  };
}
