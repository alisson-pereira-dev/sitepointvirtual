"use client";

import { useEffect } from "react";
import { trackEvent, type EventoAnalytics } from "@/lib/analytics";

/**
 * Um único ouvinte de clique para todos os elementos com `data-evento`
 * (evita JS por botão). `trackEvent` não faz nada até haver analytics.
 */
export function RastreadorEventos() {
  useEffect(() => {
    function aoClicar(evento: MouseEvent) {
      const alvo = (evento.target as Element | null)?.closest<HTMLElement>("[data-evento]");
      if (!alvo) return;
      trackEvent(alvo.dataset.evento as EventoAnalytics, {
        origem: alvo.dataset.origem,
        unidade: alvo.dataset.unidade,
      });
    }
    document.addEventListener("click", aoClicar);
    return () => document.removeEventListener("click", aoClicar);
  }, []);

  return null;
}
