"use client";

import { useEffect, useRef, type ReactNode } from "react";
import estilos from "./Header.module.css";

const LIMITE_ROLAGEM = 8;

/**
 * `header` fixo. Depois de rolar ~8 px ganha fundo e borda (`data-scrolled`).
 * Atualiza o atributo direto no DOM: sem re-render a cada rolagem.
 */
export function CabecalhoFixo({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const elemento = ref.current;
    if (!elemento) return;
    const atualizar = () => {
      elemento.dataset.scrolled = String(window.scrollY > LIMITE_ROLAGEM);
    };
    atualizar();
    window.addEventListener("scroll", atualizar, { passive: true });
    return () => window.removeEventListener("scroll", atualizar);
  }, []);

  return (
    <header ref={ref} className={estilos.cabecalho} data-scrolled="false">
      {children}
    </header>
  );
}
