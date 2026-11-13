"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ComponentType, type RefObject } from "react";

/** Margem de antecedência: o código carrega um pouco antes de a seção aparecer. */
const MARGEM = "0px 0px 100px 0px";
const SELETOR_REVEAL = "[data-reveal], [data-reveal-filhos]";

type Retorno<P> = {
  /** Ligar ao elemento que envolve a casca (alvo do observador e escopo da busca de foco). */
  raiz: RefObject<HTMLDivElement | null>;
  /** Componente interativo; `null` enquanto o código não chegou (a casca estática segue na tela). */
  Interativo: ComponentType<P> | null;
  /** Pede o código já (chamado no clique e no foco por teclado na casca). Seguro chamar várias vezes. */
  pedir: () => void;
  /** Anota um clique dado na casca (pelo `data-chave` do botão), para repeti-lo no componente interativo quando ele chegar. */
  lembrarClique: (chave: string) => void;
};

/**
 * Carrega o componente interativo (Radix) só quando a seção chega perto da tela ou quando o usuário
 * mexe na casca. Antes disso a casca estática (mesmo HTML, mesmas classes) já está no servidor, então o
 * conteúdo, o layout e a leitura não dependem do código. Ao chegar, devolve o foco e repete o clique que
 * o usuário já tinha dado (assim o evento de analytics e a animação acontecem normalmente).
 * Se o download falhar, a casca fica e o próximo toque tenta de novo.
 */
export function useSobDemanda<P>(carregar: () => Promise<ComponentType<P>>): Retorno<P> {
  const raiz = useRef<HTMLDivElement>(null);
  const [Interativo, setInterativo] = useState<ComponentType<P> | null>(null);
  const emCurso = useRef(false);
  const segurando = useRef(false);
  const chegou = useRef<ComponentType<P> | null>(null);
  const clique = useRef<string | null>(null);
  const foco = useRef<string | null>(null);
  const reveladas = useRef<boolean[]>([]);

  // Se o código chega com o dedo/mouse apertado na casca, espera soltar: trocar o botão no meio do toque perderia o clique.
  const aplicar = useCallback(() => {
    if (!chegou.current || segurando.current) return;
    // O botão com foco some na troca: guarda qual era para devolver o foco ao botão equivalente.
    const ativo = document.activeElement as HTMLElement | null;
    foco.current = ativo && raiz.current?.contains(ativo) ? (ativo.dataset.chave ?? null) : null;
    // Guarda quais nós de reveal já tinham aparecido, para os novos nascerem no mesmo estado (sem piscar).
    reveladas.current = Array.from(raiz.current?.querySelectorAll(SELETOR_REVEAL) ?? []).map((n) => n.hasAttribute("data-revealed"));
    setInterativo(() => chegou.current);
  }, []);

  const pedir = useCallback(() => {
    if (emCurso.current) return;
    emCurso.current = true;
    carregar()
      .then((componente) => {
        chegou.current = componente;
        aplicar();
      })
      .catch(() => {
        emCurso.current = false;
      });
  }, [carregar, aplicar]);

  const lembrarClique = useCallback((chave: string) => {
    clique.current = chave;
  }, []);

  // Observa a seção (sem IntersectionObserver, carrega na hora).
  useEffect(() => {
    const el = raiz.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      pedir();
      return;
    }
    const observador = new IntersectionObserver(
      (entradas) => {
        if (entradas.some((e) => e.isIntersecting)) {
          pedir();
          observador.disconnect();
        }
      },
      { rootMargin: MARGEM },
    );
    observador.observe(el);
    return () => observador.disconnect();
  }, [pedir]);

  useEffect(() => {
    const el = raiz.current;
    if (!el) return;
    const apertou = () => {
      segurando.current = true;
    };
    // O `click` sai logo depois do `pointerup`; o adiamento deixa o clique chegar ao botão antes da troca.
    const soltou = () => {
      segurando.current = false;
      setTimeout(aplicar, 0);
    };
    el.addEventListener("pointerdown", apertou);
    document.addEventListener("pointerup", soltou);
    document.addEventListener("pointercancel", soltou);
    return () => {
      el.removeEventListener("pointerdown", apertou);
      document.removeEventListener("pointerup", soltou);
      document.removeEventListener("pointercancel", soltou);
    };
  }, [aplicar]);

  // Quando o componente interativo entra: devolve o foco e repete o clique.
  // Layout effect: roda antes da pintura, então não há quadro intermediário com o estado antigo.
  useLayoutEffect(() => {
    if (!Interativo) return;
    const el = raiz.current;
    const chaveFoco = foco.current;
    const chaveClique = clique.current;
    foco.current = null;
    clique.current = null;
    if (!el) return;
    el.querySelectorAll(SELETOR_REVEAL).forEach((no, i) => {
      if (reveladas.current[i]) no.setAttribute("data-revealed", "");
    });
    const achar = (chave: string | null) =>
      chave ? Array.from(el.querySelectorAll<HTMLElement>("[data-chave]")).find((n) => n.dataset.chave === chave) : undefined;
    achar(chaveFoco ?? chaveClique)?.focus({ preventScroll: true });
    achar(chaveClique)?.click();
  }, [Interativo]);

  return { raiz, Interativo, pedir, lembrarClique };
}
