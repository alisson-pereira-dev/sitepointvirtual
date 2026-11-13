"use client";

import { useId } from "react";
import * as Radix from "@radix-ui/react-accordion";
import { trackEvent } from "@/lib/analytics";
import { Icone } from "./Icone";
import estilos from "./Accordion.module.css";
import type { PropsAccordion } from "./Accordion";

/**
 * Versão interativa do FAQ (Radix Accordion: `single`, `collapsible`; todas fechadas no início, uma aberta por vez).
 * Carregada sob demanda por `Accordion.tsx`, que mostra antes uma casca estática com o mesmo HTML e as mesmas
 * classes. As respostas ficam sempre no HTML (`forceMount`) e a abertura anima `grid-template-rows` 0fr → 1fr.
 * Se mudar a estrutura aqui, mude lá também.
 */
export function AccordionRadix({ perguntas }: PropsAccordion) {
  const base = useId();
  // O Radix só liga `aria-controls` ao botão quando a resposta está aberta (ele desmonta o conteúdo fechado).
  // Como mantemos todas montadas, ligamos nós mesmos, sempre: o `id` e o `aria-controls` que passamos vencem os do Radix.
  const idResposta = (i: number) => `${base}-resposta-${i}`;

  return (
    <Radix.Root
      type="single"
      collapsible
      className={estilos.lista}
      data-reveal-filhos=""
      onValueChange={(valor) => {
        if (valor) trackEvent("faq_open", { pergunta: perguntas[Number(valor)]?.pergunta });
      }}
    >
      {perguntas.map((item, i) => (
        <Radix.Item key={item.pergunta} value={String(i)} className={estilos.item}>
          <Radix.Header className={estilos.cabecalho}>
            <Radix.Trigger className={estilos.gatilho} aria-controls={idResposta(i)} data-chave={String(i)}>
              <span>
                {item.pergunta}
                {item.marca}
              </span>
              <span className={estilos.seta}>
                <Icone nome="seta" direcao="baixo" />
              </span>
            </Radix.Trigger>
          </Radix.Header>
          <Radix.Content forceMount id={idResposta(i)} className={estilos.conteudo}>
            <div className={estilos.interno}>
              <p className={estilos.resposta}>{item.resposta}</p>
            </div>
          </Radix.Content>
        </Radix.Item>
      ))}
    </Radix.Root>
  );
}
