export type ContatoWhatsapp = {
  numero: string;
  link: string;
  mensagem_padrao: string;
};

const CODIGO_PAIS = "55";

/** Só dígitos; aceita número nacional (10–11) ou já com DDI (12–13). */
function normalizarNumero(numero: string): string | null {
  const digitos = numero.replace(/\D/g, "");
  if (digitos.length === 10 || digitos.length === 11) return CODIGO_PAIS + digitos;
  if ((digitos.length === 12 || digitos.length === 13) && digitos.startsWith(CODIGO_PAIS)) return digitos;
  return null;
}

/**
 * Com número válido: `wa.me/<número>?text=<mensagem>` (mensagem preenchida). `mensagem` é a da variante da origem
 * (`site.ctas.variantes`); sem ela, usa `mensagem_padrao`.
 * Sem número (ex.: "pendente"): usa o `wa.link`, que não preenche mensagem (a variante só vale depois que houver número).
 */
export function buildWhatsappUrl(contato: ContatoWhatsapp, mensagem?: string): string {
  const numero = normalizarNumero(contato.numero);
  if (!numero) return contato.link;
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensagem ?? contato.mensagem_padrao)}`;
}
