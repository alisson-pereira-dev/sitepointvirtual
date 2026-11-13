import Image from "next/image";
import { getContent } from "@/lib/content";
import estilos from "./Midia.module.css";

export type ProporcaoMidia = "4-3" | "1-1" | "16-9" | "16-10" | "3-4" | "livre";

type Props = {
  /** `"pendente"` renderiza o placeholder honesto. */
  src: string;
  alt: string;
  proporcao: ProporcaoMidia;
  raio?: "nenhum" | "sm" | "lg" | "xl";
  /** `true` só na 1ª dobra. */
  prioridade?: boolean;
  /** Obrigatórios com `proporcao="livre"` (ex.: logo) e para fotos reais. */
  largura?: number;
  altura?: number;
  sizes?: string;
  /** Mostra a legenda "foto em breve" no placeholder (desligue em miniaturas). */
  legenda?: boolean;
  className?: string;
};

export function Midia({
  src,
  alt,
  proporcao,
  raio = "xl",
  prioridade = false,
  largura,
  altura,
  sizes,
  legenda = true,
  className,
}: Props) {
  const classes = [estilos.midia, estilos[`raio-${raio}`], proporcao !== "livre" ? estilos[`p-${proporcao}`] : "", className]
    .filter(Boolean)
    .join(" ");

  const estiloRazao = proporcao === "livre" && largura && altura ? { aspectRatio: `${largura} / ${altura}` } : undefined;

  if (src === "pendente") {
    const textoLegenda = getContent().microcopy.midia.foto_em_breve;
    return (
      <span className={`${classes} ${estilos.placeholder}`} role="img" aria-label={alt} style={estiloRazao}>
        {legenda ? <span className={estilos.legenda} aria-hidden="true">{textoLegenda}</span> : null}
      </span>
    );
  }

  const ehSvg = src.endsWith(".svg");
  return (
    <span className={classes} style={estiloRazao}>
      <Image
        src={src}
        alt={alt}
        width={largura ?? 1600}
        height={altura ?? 1200}
        sizes={sizes}
        loading={prioridade ? "eager" : "lazy"}
        fetchPriority={prioridade ? "high" : "auto"}
        unoptimized={ehSvg}
        className={estilos.imagem}
      />
    </span>
  );
}
