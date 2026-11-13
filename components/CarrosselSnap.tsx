"use client";

import { Children, useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Icone } from "./Icone";
import botao from "./Botao.module.css";
import estilos from "./CarrosselSnap.module.css";

type Props = {
  /** Nome da região rolável (ex.: o rótulo do grupo). */
  rotulo: string;
  rotuloProximo: string;
  rotuloVoltar: string;
  /** Cartões (`li`), renderizados no servidor. */
  children: ReactNode;
};

type VariaveisCss = CSSProperties & Record<`--${string}`, string | number>;

/**
 * Fileira de cartões. Até 1023 px: carrossel nativo com snap, seta e indicador, sem autoplay.
 * A partir de 1024 px: grade (não é carrossel). Sem JS continua rolável à mão.
 */
export function CarrosselSnap({ rotulo, rotuloProximo, rotuloVoltar, children }: Props) {
  const total = Children.count(children);
  const regiao = useRef<HTMLDivElement>(null);
  const lista = useRef<HTMLUListElement>(null);
  const [ativo, setAtivo] = useState(0);
  const [rolavel, setRolavel] = useState(false);

  const medir = useCallback(() => {
    const el = regiao.current;
    const itens = lista.current?.children;
    if (!el || !itens || itens.length === 0) return;
    setRolavel(el.scrollWidth > el.clientWidth + 1);

    const maximo = el.scrollWidth - el.clientWidth;
    if (el.scrollLeft >= maximo - 2) {
      setAtivo(itens.length - 1);
      return;
    }
    const origem = (itens[0] as HTMLElement).offsetLeft;
    let maisPerto = 0;
    let menorDistancia = Infinity;
    for (let i = 0; i < itens.length; i++) {
      const distancia = Math.abs((itens[i] as HTMLElement).offsetLeft - origem - el.scrollLeft);
      if (distancia < menorDistancia) {
        menorDistancia = distancia;
        maisPerto = i;
      }
    }
    setAtivo(maisPerto);
  }, []);

  useEffect(() => {
    const el = regiao.current;
    if (!el) return;
    let quadro = 0;
    const aoRolar = () => {
      cancelAnimationFrame(quadro);
      quadro = requestAnimationFrame(medir);
    };
    medir();
    el.addEventListener("scroll", aoRolar, { passive: true });
    const redimensionou = new ResizeObserver(aoRolar);
    redimensionou.observe(el);
    return () => {
      cancelAnimationFrame(quadro);
      el.removeEventListener("scroll", aoRolar);
      redimensionou.disconnect();
    };
  }, [medir]);

  function irParaProximo() {
    const el = regiao.current;
    const itens = lista.current?.children;
    if (!el || !itens) return;
    const ultimo = ativo >= itens.length - 1;
    const alvo = ultimo ? 0 : ativo + 1;
    const origem = (itens[0] as HTMLElement).offsetLeft;
    // Respeita `scroll-behavior` do CSS (suave, e instantâneo em reduced-motion)
    el.scrollTo({ left: (itens[alvo] as HTMLElement).offsetLeft - origem });
  }

  const noFim = ativo >= total - 1;
  const estiloLista: VariaveisCss = { "--colunas": total };

  return (
    <div className={estilos.carrossel}>
      <div
        ref={regiao}
        className={estilos.regiao}
        role="region"
        aria-label={rotulo}
        tabIndex={rolavel ? 0 : undefined}
      >
        <ul ref={lista} className={estilos.lista} style={estiloLista} data-colunas={total} data-reveal-filhos="">
          {children}
        </ul>
      </div>

      <div className={estilos.controles}>
        <span className={estilos.pontos} aria-hidden="true">
          {Array.from({ length: total }, (_, i) => (
            <span key={i} className={estilos.ponto} data-ativo={i === ativo ? "" : undefined} />
          ))}
        </span>
        <button
          type="button"
          className={`${botao.botao} ${botao.icone}`}
          onClick={irParaProximo}
          aria-label={noFim ? rotuloVoltar : rotuloProximo}
        >
          <Icone nome="seta" direcao={noFim ? "esquerda" : "direita"} />
        </button>
      </div>
    </div>
  );
}
