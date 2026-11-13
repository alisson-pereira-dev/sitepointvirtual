import type { CSSProperties } from "react";
import { Midia } from "./Midia";
import estilos from "./MiniaturaInline.module.css";

type Foto = { src: string; alt: string };

/** Fotos quadradas de 1024 px; a miniatura mede até ~76 px e cresce até ~180 px no hover, então o `sizes` evita baixar a original. */
const LADO_ORIGINAL = 1024;
const TAMANHO_EXIBIDO = "180px";

type Props = {
  /** 1–5 fotos. Com 2 ou mais, alternam em crossfade (só desktop, sem reduced-motion). */
  fotos: Foto[];
  inclinacao: "esq" | "dir";
  /** Posição na frase (0, 1, 2): escalona a entrada. */
  indice: number;
  /** Defasagem do ciclo, em ms. */
  atraso?: number;
  /** `true` só para a 1ª foto visível na 1ª dobra (hero): carrega com prioridade. */
  prioridade?: boolean;
};

type VariaveisCss = CSSProperties & Record<`--${string}`, string | number>;

/**
 * Foto pequena dentro da frase (hero e CTA final). Decorativa e não interativa: fica fora da árvore de acessibilidade
 * (`aria-hidden`), senão o título leria o `alt` de todas as fotos do ciclo.
 */
export function MiniaturaInline({ fotos, inclinacao, indice, atraso = 0, prioridade = false }: Props) {
  const exibidas = fotos.slice(0, 5);
  const estilo: VariaveisCss = { "--i": indice, "--n": exibidas.length, "--atraso": `${atraso}ms` };

  return (
    <span className={`${estilos.mini} ${estilos[inclinacao]}`} style={estilo} data-n={exibidas.length} aria-hidden="true">
      <span className={estilos.giro}>
        {exibidas.map((foto, ordem) => (
          <span key={foto.alt + ordem} className={estilos.foto} style={{ "--ordem": ordem } as VariaveisCss}>
            <Midia
              src={foto.src}
              alt={foto.alt}
              proporcao="1-1"
              raio="sm"
              legenda={false}
              largura={LADO_ORIGINAL}
              altura={LADO_ORIGINAL}
              sizes={TAMANHO_EXIBIDO}
              prioridade={prioridade && ordem === 0}
            />
          </span>
        ))}
      </span>
    </span>
  );
}
