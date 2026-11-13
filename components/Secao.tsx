import type { ReactNode } from "react";
import estilos from "./Secao.module.css";

type Props = {
  /** Âncora (`inicio`, `servicos`, ...). */
  id: string;
  superficie: "padrao" | "alt" | "escura";
  formato?: "contido" | "painel";
  /** Gera o `h2` com `aria-labelledby`. Seções com `h1` próprio passam `rotuloId`. */
  titulo?: string;
  rotuloId?: string;
  /** 1ª seção da página: reserva o espaço do header fixo no topo. */
  abaixoDoHeader?: boolean;
  className?: string;
  children: ReactNode;
};

export function Secao({
  id,
  superficie,
  formato = "contido",
  titulo,
  rotuloId,
  abaixoDoHeader = false,
  className,
  children,
}: Props) {
  const tituloId = titulo ? `${id}-titulo` : rotuloId;
  const classes = [
    estilos.secao,
    estilos[superficie],
    formato === "painel" ? estilos.painel : "",
    abaixoDoHeader ? estilos.abaixoDoHeader : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section
      id={id}
      className={classes}
      data-surface={superficie === "escura" ? "dark" : undefined}
      aria-labelledby={tituloId}
    >
      <div className={`container ${estilos.interno}`}>
        {titulo ? (
          <h2 id={tituloId} className={estilos.titulo}>
            {titulo}
          </h2>
        ) : null}
        {children}
      </div>
    </section>
  );
}
