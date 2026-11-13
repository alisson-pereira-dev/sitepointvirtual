"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import estilos from "./Header.module.css";

/** `destino` é a âncora ("#servicos", para o scroll-spy); `href` é o link final ("/#servicos", funciona fora da home). */
type Item = { rotulo: string; destino: string; href: string };

type Props = {
  itens: Item[];
  rotulo: string;
  variante: "barra" | "painel";
};

/** `nav` com `aria-current` no item da seção visível. */
export function NavPrincipal({ itens, rotulo, variante }: Props) {
  const [ativo, setAtivo] = useState<string | null>(null);

  useEffect(() => {
    const alvos = itens
      .map((item) => ({ destino: item.destino, elemento: document.querySelector(item.destino) }))
      .filter((alvo): alvo is { destino: string; elemento: Element } => alvo.elemento !== null);
    if (alvos.length === 0) return;

    const visiveis = new Set<string>();
    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          const destino = alvos.find((alvo) => alvo.elemento === entrada.target)?.destino;
          if (!destino) continue;
          if (entrada.isIntersecting) visiveis.add(destino);
          else visiveis.delete(destino);
        }
        setAtivo(alvos.find((alvo) => visiveis.has(alvo.destino))?.destino ?? null);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    alvos.forEach((alvo) => observador.observe(alvo.elemento));
    return () => observador.disconnect();
  }, [itens]);

  return (
    <nav aria-label={rotulo} className={variante === "barra" ? estilos.navBarra : estilos.navPainel}>
      <ul className={estilos.lista}>
        {itens.map((item) => (
          <li key={item.destino}>
            <Link
              href={item.href}
              className={estilos.link}
              aria-current={ativo === item.destino ? "location" : undefined}
            >
              {item.rotulo}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
