import type { EventoAnalytics } from "@/lib/analytics";
import { hrefDoCta } from "@/lib/cta";
import { varianteDoCta, type Cta } from "@/lib/content";
import { Icone } from "./Icone";
import estilos from "./Botao.module.css";

type Props = {
  /** `primario` é só o CTA principal; `secundario` é o CTA secundário. */
  variante: "primario" | "secundario" | "link";
  tamanho?: "md" | "lg";
  cta: Cta;
  /**
   * Origem do clique (`header`, `hero`, ...): vai para o `trackEvent` e escolhe a variante do CTA principal
   * (`site.ctas.variantes`: rótulo, `aria-label` e mensagem do WhatsApp). Sem variante, usa `site.ctas.principal`.
   */
  origem: string;
  /** Header no mobile: padding e ícone menores para caber ao lado do logo e do menu (o rótulo é o mesmo). */
  compactoNoMobile?: boolean;
  /** Largura total no mobile (hero). */
  larguraTotalNoMobile?: boolean;
  /** `false` quando o clique não corresponde a um evento do mapa de analytics (ex.: "Voltar ao início" do 404). */
  rastrear?: boolean;
  className?: string;
};

export function Botao({
  variante,
  tamanho = "md",
  cta,
  origem,
  compactoNoMobile = false,
  larguraTotalNoMobile = false,
  rastrear = true,
  className,
}: Props) {
  const ehWhatsapp = cta.tipo === "whatsapp";
  const evento: EventoAnalytics = variante === "primario" ? "cta_principal_click" : "cta_secundario_click";
  const classes = [
    estilos.botao,
    estilos[variante],
    estilos[tamanho],
    larguraTotalNoMobile ? estilos.larguraTotal : "",
    compactoNoMobile ? estilos.compacto : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  // Só o CTA principal de WhatsApp varia por origem; o destino, o estilo e o comportamento são sempre os mesmos.
  const ctaPrincipalWhatsapp = variante === "primario" && ehWhatsapp;
  const variacao = ctaPrincipalWhatsapp ? varianteDoCta(origem) : undefined;
  const texto = variacao?.texto ?? cta.texto;

  return (
    <a
      className={classes}
      href={hrefDoCta(cta, ctaPrincipalWhatsapp ? origem : undefined)}
      {...(ehWhatsapp ? { target: "_blank", rel: "noopener" } : {})}
      aria-label={variacao?.aria_label}
      data-evento={rastrear ? evento : undefined}
      data-origem={rastrear ? origem : undefined}
    >
      {ctaPrincipalWhatsapp ? <Icone nome="whatsapp" tamanho="lg" /> : null}
      <span>{texto}</span>
    </a>
  );
}
