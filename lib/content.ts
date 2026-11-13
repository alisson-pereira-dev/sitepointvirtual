import conteudo from "@/content/content.json";

export type Conteudo = typeof conteudo;

export type Cta = {
  texto: string;
  destino: string;
  tipo: string;
};

/** Rótulo e mensagem do CTA principal numa origem (`site.ctas.variantes`). Mesmo destino, estilo e comportamento. */
export type VarianteCta = {
  texto: string;
  /** Só quando o texto visível não diz que abre o WhatsApp. Sempre começa com o texto visível (WCAG 2.5.3). */
  aria_label?: string;
  mensagem: string;
};

/** Variante do CTA principal para a origem (`header`, `hero`, `painel`...); `undefined` cai em `site.ctas.principal`. */
export function varianteDoCta(origem: string): VarianteCta | undefined {
  const variantes: Record<string, VarianteCta> = conteudo.site.ctas.variantes;
  return variantes[origem];
}

export type ItemValidavel = { validar?: boolean };

/** Fonte única de texto do site (`content/content.json`). */
export function getContent(): Conteudo {
  return conteudo;
}

/** Resolve referências do tipo "@ctas.principal" para o objeto em `site.ctas`. */
export function resolverCta(ref: string): Cta {
  const chave = ref.replace(/^@ctas\./, "") as keyof Conteudo["site"]["ctas"];
  const cta = conteudo.site.ctas[chave];
  if (!cta) throw new Error(`CTA inexistente no content.json: ${ref}`);
  return cta as Cta;
}

/**
 * Itens com `validar: true` não são fato confirmado. Só aparecem quando
 * NEXT_PUBLIC_EXIBIR_ITENS_VALIDAR=1 (revisão/preview) e, nesse caso, com marca visível.
 */
export function statusValidar(item: ItemValidavel): { exibir: boolean; marcar: boolean } {
  const liberado = process.env.NEXT_PUBLIC_EXIBIR_ITENS_VALIDAR === "1";
  if (!item.validar) return { exibir: true, marcar: false };
  return { exibir: liberado, marcar: liberado };
}

/** `true` quando NEXT_PUBLIC_EXIBIR_ITENS_VALIDAR=1 (revisão/preview). Em produção é sempre `false`. */
export function modoRevisao(): boolean {
  return process.env.NEXT_PUBLIC_EXIBIR_ITENS_VALIDAR === "1";
}

/**
 * Trabalhos publicáveis. Em produção só entra item com foto real (`src` ≠ "pendente") e `validar: false`
 * (foto em alta e autorização confirmadas). No modo revisão entram todos, com placeholder e marca.
 */
export function portfolioItens() {
  const itens = conteudo.secoes.portfolio.itens;
  if (modoRevisao()) return itens;
  return itens.filter((item) => !item.validar && item.imagem.src !== "pendente");
}

/**
 * O portfólio só é publicado inteiro: sem fotos reais autorizadas nos 6 itens a seção não existe em
 * produção (nem o link do menu). No modo revisão aparece sempre, com placeholders.
 */
export function portfolioPublicavel(): boolean {
  return modoRevisao() || portfolioItens().length === conteudo.secoes.portfolio.itens.length;
}

/** Mínimo de perguntas para o FAQ existir em produção. */
const FAQ_MINIMO = 3;

/**
 * Perguntas do FAQ prontas para exibir:
 * - sem `validar`: resposta como está;
 * - `validar: true` no modo revisão: resposta original, com marca "A validar";
 * - `validar: true` em produção: `resposta_neutra`, se existir (sem ela a pergunta não entra).
 */
export type ItemFaq = { pergunta: string; resposta: string; marcar: boolean };

export function faqItens(): ItemFaq[] {
  const revisao = modoRevisao();
  return conteudo.secoes.faq.perguntas.flatMap((item): ItemFaq[] => {
    if (!item.validar) return [{ pergunta: item.pergunta, resposta: item.resposta, marcar: false }];
    if (revisao) return [{ pergunta: item.pergunta, resposta: item.resposta, marcar: true }];
    // `resposta_neutra` é opcional por item (o tipo inferido do JSON só a conhece se algum item a tiver)
    const neutra = (item as { resposta_neutra?: string }).resposta_neutra;
    return neutra ? [{ pergunta: item.pergunta, resposta: neutra, marcar: false }] : [];
  });
}

/** Com menos de 3 perguntas em produção o FAQ não é renderizado (e o link do menu, se houver, sai). */
export function faqPublicavel(): boolean {
  return modoRevisao() || faqItens().length >= FAQ_MINIMO;
}

/** Seções que podem não existir: âncora do menu → regra de exibição. */
const SECOES_OCULTAVEIS: Record<string, () => boolean> = {
  "#como-funciona": () => statusValidar(conteudo.secoes.como_funciona).exibir,
  "#trabalhos": portfolioPublicavel,
  "#perguntas": faqPublicavel,
};

/** `false` quando o link aponta para uma seção que não é renderizada (validar, sem fotos, poucas perguntas). */
export function ancoraVisivel(destino: string): boolean {
  return SECOES_OCULTAVEIS[destino]?.() ?? true;
}

/** `site.menu` sem os links de seções que não aparecem (evita âncora morta em produção). */
export function menuVisivel(): Conteudo["site"]["menu"] {
  return conteudo.site.menu.filter((item) => ancoraVisivel(item.destino));
}

/** "#servicos" → "/#servicos": a âncora funciona na home e também a partir de outras páginas (legais, 404). */
export function hrefDaAncora(destino: string): string {
  return destino.startsWith("#") ? `/${destino}` : destino;
}

/** Separa os campos "[A PREENCHER: ...]" do resto do texto (páginas legais em rascunho). */
export function partirPendencias(texto: string): { texto: string; pendente: boolean }[] {
  return texto
    .split(/(\[A PREENCHER[^\]]*\])/)
    .filter((parte) => parte !== "")
    .map((parte) => ({ texto: parte, pendente: parte.startsWith("[A PREENCHER") }));
}

export type TrechoTexto = { texto: string; negrito: boolean };

/** Quebras de linha viram parágrafos e `**trecho**` vira negrito (usado no texto da Sobre). */
export function paragrafosComNegrito(texto: string): TrechoTexto[][] {
  return texto
    .split("\n")
    .map((paragrafo) => paragrafo.trim())
    .filter(Boolean)
    .map((paragrafo) =>
      paragrafo
        .split(/\*\*(.+?)\*\*/)
        .map((parte, i) => ({ texto: parte, negrito: i % 2 === 1 }))
        .filter((trecho) => trecho.texto !== ""),
    );
}

/** "(75) 98136-4285" → "tel:+5575981364285". */
export function telHref(telefone: string): string {
  const digitos = telefone.replace(/\D/g, "");
  return `tel:+${digitos.startsWith("55") && digitos.length > 11 ? "" : "55"}${digitos}`;
}

/** Link do Google Maps montado a partir do endereço (sem embed, sem cookie de terceiros). */
export function mapaHref(endereco: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(endereco)}`;
}

/** Divide "Sua marca {1} bem vista" em trechos de texto e marcadores de miniatura. */
export function partirMarcadores(texto: string): Array<string | { marcador: number }> {
  return texto
    .split(/\{(\d+)\}/)
    .map((parte, i) => (i % 2 === 1 ? { marcador: Number(parte) } : parte))
    .filter((parte) => parte !== "");
}
