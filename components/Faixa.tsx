"use client";

import { useEffect, useRef, type PointerEvent } from "react";
import estilos from "./Faixa.module.css";

type Props = {
  /** `secoes.faixa.itens` */
  itens: string[];
};

/** Quantas vezes os itens se repetem em cada grupo, para o grupo ser mais largo que telas grandes. */
const REPETICOES = 3;

/**
 * Faixa inclinada em marquee (N1, só CSS). O JS só controla o ritmo: pausa fora da viewport e ao toque; com o mouse
 * em cima, desacelera (nunca para).
 * Sem JS ou em reduced-motion: os itens aparecem parados, em linha. Só a 1ª série é lida por leitor de tela.
 */
export function Faixa({ itens }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elemento = ref.current;
    if (!elemento) return;
    const observador = new IntersectionObserver(([entrada]) => {
      elemento.dataset.fora = String(!entrada.isIntersecting);
    });
    observador.observe(elemento);
    return () => observador.disconnect();
  }, []);

  // Toque alterna pausa/retomada. Mouse não entra: no desktop quem pausa é o hover.
  function aoTocar(evento: PointerEvent<HTMLDivElement>) {
    if (evento.pointerType === "mouse") return;
    const alvo = evento.currentTarget;
    alvo.dataset.pausada = String(alvo.dataset.pausada !== "true");
  }

  // Mouse em cima: a faixa desacelera (não para). `playbackRate` muda o ritmo sem pular a posição da animação.
  function mudarVelocidade(evento: PointerEvent<HTMLDivElement>, emHover: boolean) {
    if (evento.pointerType !== "mouse") return;
    const alvo = evento.currentTarget;
    const fator = parseFloat(getComputedStyle(alvo).getPropertyValue("--marquee-velocidade-hover")) || 1;
    alvo.getAnimations({ subtree: true }).forEach((animacao) => animacao.updatePlaybackRate(emHover ? fator : 1));
  }

  const itensDoGrupo = Array.from({ length: REPETICOES }, (_, repeticao) =>
    itens.map((texto, i) => (
      <li
        key={`${repeticao}-${i}`}
        className={repeticao > 0 ? `${estilos.item} ${estilos.repeticao}` : estilos.item}
        aria-hidden={repeticao > 0 ? true : undefined}
        data-ultimo={repeticao === 0 && i === itens.length - 1 ? "" : undefined}
      >
        {texto}
      </li>
    )),
  );

  return (
    <div
      ref={ref}
      className={estilos.faixa}
      onPointerDown={aoTocar}
      onPointerEnter={(e) => mudarVelocidade(e, true)}
      onPointerLeave={(e) => mudarVelocidade(e, false)}
      data-pausada="false"
      data-fora="false"
    >
      <div className={estilos.banda}>
        <div className={estilos.trilho}>
          <ul className={estilos.grupo}>{itensDoGrupo}</ul>
          <ul className={`${estilos.grupo} ${estilos.copia}`} aria-hidden="true">
            {itensDoGrupo}
          </ul>
        </div>
      </div>
    </div>
  );
}
