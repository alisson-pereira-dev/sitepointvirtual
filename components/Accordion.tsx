"use client";

import { useId, type ReactNode } from "react";
import { Icone } from "./Icone";
import estilos from "./Accordion.module.css";
import { useSobDemanda } from "./useSobDemanda";

export type PropsAccordion = {
  perguntas: { pergunta: string; resposta: string; marca?: ReactNode }[];
};

const carregarRadix = () => import("./AccordionRadix").then((modulo) => modulo.AccordionRadix);

/**
 * FAQ. A casca estática (abaixo) vem no HTML do servidor: perguntas fechadas, respostas sempre no HTML
 * (sem JS todas aparecem abertas). O Radix Accordion (`AccordionRadix`: abre/fecha, setas, Home/End, aria)
 * só é baixado quando a seção chega perto da tela ou quando alguém toca numa pergunta; aí substitui a
 * casca, com o mesmo HTML. A casca imita o que o Radix desenha (papéis, ids, `data-state`): ao mudar um,
 * mude o outro.
 */
export function Accordion(props: PropsAccordion) {
  const { raiz, Interativo, pedir, lembrarClique } = useSobDemanda(carregarRadix);

  return (
    <div ref={raiz}>
      {Interativo ? <Interativo {...props} /> : <CascaEstatica {...props} pedir={pedir} lembrarClique={lembrarClique} />}
    </div>
  );
}

type PropsCasca = PropsAccordion & {
  pedir: () => void;
  lembrarClique: (chave: string) => void;
};

function CascaEstatica({ perguntas, pedir, lembrarClique }: PropsCasca) {
  const base = useId();
  const idResposta = (i: number) => `${base}-resposta-${i}`;
  const idGatilho = (i: number) => `${base}-gatilho-${i}`;

  return (
    <div className={estilos.lista} data-reveal-filhos="" data-orientation="vertical">
      {perguntas.map((item, i) => (
        <div key={item.pergunta} data-state="closed" data-orientation="vertical" className={estilos.item}>
          <h3 data-orientation="vertical" data-state="closed" className={estilos.cabecalho}>
            <button
              type="button"
              id={idGatilho(i)}
              aria-controls={idResposta(i)}
              aria-expanded="false"
              data-state="closed"
              data-orientation="vertical"
              data-chave={String(i)}
              className={estilos.gatilho}
              onClick={() => {
                lembrarClique(String(i));
                pedir();
              }}
              onFocus={(evento) => {
                // Só foco por teclado: com o mouse, trocar o botão no meio do clique o perderia.
                if (evento.currentTarget.matches(":focus-visible")) pedir();
              }}
            >
              <span>
                {item.pergunta}
                {item.marca}
              </span>
              <span className={estilos.seta}>
                <Icone nome="seta" direcao="baixo" />
              </span>
            </button>
          </h3>
          <div
            id={idResposta(i)}
            role="region"
            aria-labelledby={idGatilho(i)}
            data-state="closed"
            data-orientation="vertical"
            className={estilos.conteudo}
          >
            <div className={estilos.interno}>
              <p className={estilos.resposta}>{item.resposta}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
