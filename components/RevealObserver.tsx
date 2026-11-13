"use client";

import { useEffect } from "react";

/**
 * Reveal único de entrada (R1/R2). Marca com `data-revealed` os elementos
 * `[data-reveal]` e `[data-reveal-filhos]` quando entram na tela, uma vez.
 * O estado oculto só existe com `html.js-motion` (ver globals.css) e nunca na 1ª dobra:
 * quem está acima do viewport (âncora, recarga no meio da página) já nasce revelado.
 */
export function RevealObserver() {
  useEffect(() => {
    const raiz = document.documentElement;
    const alvos = document.querySelectorAll<HTMLElement>("[data-reveal], [data-reveal-filhos]");

    const revelar = (elemento: Element) => elemento.setAttribute("data-revealed", "");

    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (entrada.isIntersecting || entrada.boundingClientRect.top < 0) {
            revelar(entrada.target);
            observador.unobserve(entrada.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    alvos.forEach((alvo) => observador.observe(alvo));

    // Trechos carregados sob demanda (Abas, Accordion) trocam a casca estática por nós novos: observa os que chegarem.
    const seletor = "[data-reveal], [data-reveal-filhos]";
    const novos = new MutationObserver((mutacoes) => {
      for (const mutacao of mutacoes) {
        mutacao.addedNodes.forEach((no) => {
          if (!(no instanceof HTMLElement)) return;
          const achados = no.matches(seletor) ? [no, ...no.querySelectorAll<HTMLElement>(seletor)] : no.querySelectorAll<HTMLElement>(seletor);
          achados.forEach((alvo) => {
            if (!alvo.hasAttribute("data-revealed")) observador.observe(alvo);
          });
        });
      }
    });
    novos.observe(document.body, { childList: true, subtree: true });
    // Sinaliza ao script do <head> que o JS do reveal está vivo (senão ele solta o estado oculto).
    raiz.setAttribute("data-reveal-ready", "");
    return () => {
      novos.disconnect();
      observador.disconnect();
    };
  }, []);

  return null;
}
