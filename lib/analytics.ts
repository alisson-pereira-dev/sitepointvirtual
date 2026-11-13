export type EventoAnalytics =
  | "cta_principal_click"
  | "cta_secundario_click"
  | "menu_open"
  | "servico_aba_change"
  | "telefone_click"
  | "mapa_click"
  | "faq_open"
  | "instagram_click"
  | "scroll_depth";

export type ParametrosEvento = Record<string, string | number | undefined>;

/**
 * Sem efeito até haver decisão de analytics (e de consentimento, se exigido): nenhum cookie, nenhuma
 * requisição, nenhum armazenamento. Mapa de eventos: docs/jornada-ux.md.
 *
 * Único comportamento: com NEXT_PUBLIC_DEBUG_EVENTOS=1 (build de depuração, nunca em produção) cada chamada é
 * escrita em `console.debug`, só para conferir no navegador que o evento certo dispara com os parâmetros certos.
 */
export function trackEvent(nome: EventoAnalytics, parametros?: ParametrosEvento): void {
  if (process.env.NEXT_PUBLIC_DEBUG_EVENTOS !== "1") return;
  const limpos = Object.fromEntries(Object.entries(parametros ?? {}).filter(([, valor]) => valor !== undefined));
  console.debug("[trackEvent]", nome, JSON.stringify(limpos));
}
