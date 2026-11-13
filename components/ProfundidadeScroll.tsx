"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

const MARCOS = [25, 50, 75, 100] as const;
/** Tolerância para o fim da página contar como 100% (arredondamento de subpixel). */
const TOLERANCIA = 0.5;

/**
 * `scroll_depth`: só na home (montado em `app/page.tsx`). Dispara uma vez por marco (25/50/75/100%), com `percentual`. A profundidade é a
 * posição da borda de baixo da tela sobre a altura do documento. Páginas sem o que rolar não disparam nada.
 * Só mede e chama `trackEvent` (que não faz nada sem ferramenta); não grava nada no navegador.
 */
export function ProfundidadeScroll() {
  useEffect(() => {
    const disparados = new Set<number>();
    let quadro = 0;

    const medir = () => {
      const altura = document.documentElement.scrollHeight;
      if (altura <= window.innerHeight * 1.05) return; // nada para rolar
      const percentual = ((window.scrollY + window.innerHeight) / altura) * 100;
      for (const marco of MARCOS) {
        if (!disparados.has(marco) && percentual >= marco - TOLERANCIA) {
          disparados.add(marco);
          trackEvent("scroll_depth", { percentual: marco });
        }
      }
    };
    const aoRolar = () => {
      cancelAnimationFrame(quadro);
      quadro = requestAnimationFrame(medir);
    };

    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => {
      cancelAnimationFrame(quadro);
      window.removeEventListener("scroll", aoRolar);
    };
  }, []); // ao voltar para a home (navegação do lado do cliente) o componente remonta e a contagem recomeça

  return null;
}
