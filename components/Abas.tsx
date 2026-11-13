"use client";

import { useId, type ReactNode } from "react";
import estilos from "./Abas.module.css";
import { useSobDemanda } from "./useSobDemanda";

export type GrupoAba = {
  id: string;
  rotulo: string;
  painel: ReactNode;
};

export type PropsAbas = {
  grupos: GrupoAba[];
  /** `id` do título que nomeia o conjunto de abas. */
  rotuloId: string;
};

const carregarRadix = () => import("./AbasRadix").then((modulo) => modulo.AbasRadix);

/**
 * Abas em pílula. A casca estática (abaixo) vem no HTML do servidor: todos os painéis montados e empilhados
 * na mesma célula da grade (a altura é a do maior grupo, sem CLS ao trocar) e, sem JS, os grupos viram uma
 * lista contínua com o rótulo de cada um. O Radix Tabs (`AbasRadix`: setas, Home/End, aria) só é baixado
 * quando a seção chega perto da tela ou quando alguém usa as abas; aí substitui a casca, com o mesmo HTML.
 * A casca imita o que o Radix desenha (papéis, ids, `data-state`): ao mudar um, mude o outro.
 */
export function Abas(props: PropsAbas) {
  const { raiz, Interativo, pedir, lembrarClique } = useSobDemanda(carregarRadix);

  return <div ref={raiz}>{Interativo ? <Interativo {...props} /> : <CascaEstatica {...props} pedir={pedir} lembrarClique={lembrarClique} />}</div>;
}

type PropsCasca = PropsAbas & {
  pedir: () => void;
  lembrarClique: (chave: string) => void;
};

function CascaEstatica({ grupos, rotuloId, pedir, lembrarClique }: PropsCasca) {
  const base = useId();
  const idAba = (id: string) => `${base}-aba-${id}`;
  const idPainel = (id: string) => `${base}-painel-${id}`;

  return (
    <div dir="ltr" data-orientation="horizontal">
      <div role="tablist" aria-orientation="horizontal" aria-labelledby={rotuloId} className={estilos.lista} data-orientation="horizontal">
        {grupos.map((grupo, i) => (
          <button
            key={grupo.id}
            type="button"
            role="tab"
            id={idAba(grupo.id)}
            aria-selected={i === 0}
            aria-controls={idPainel(grupo.id)}
            data-state={i === 0 ? "active" : "inactive"}
            data-orientation="horizontal"
            data-chave={grupo.id}
            tabIndex={i === 0 ? 0 : -1}
            className={estilos.aba}
            onClick={() => {
              lembrarClique(grupo.id);
              pedir();
            }}
            onFocus={(evento) => {
              // Só foco por teclado: com o mouse, trocar o botão no meio do clique o perderia.
              if (evento.currentTarget.matches(":focus-visible")) pedir();
            }}
          >
            {grupo.rotulo}
          </button>
        ))}
      </div>

      <div className={estilos.paineis}>
        {grupos.map((grupo, i) => (
          <div
            key={grupo.id}
            role="tabpanel"
            id={idPainel(grupo.id)}
            aria-labelledby={idAba(grupo.id)}
            data-state={i === 0 ? "active" : "inactive"}
            data-orientation="horizontal"
            tabIndex={0}
            className={estilos.painel}
          >
            <h3 className={estilos.rotuloGrupo}>{grupo.rotulo}</h3>
            {grupo.painel}
          </div>
        ))}
      </div>
    </div>
  );
}
