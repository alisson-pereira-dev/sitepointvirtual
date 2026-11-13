"use client";

import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Icone } from "@/components/Icone";
import botao from "@/components/Botao.module.css";
import estilos from "./MenuMobile.module.css";

type Props = {
  rotuloAbrir: string;
  rotuloFechar: string;
  titulo: string;
  /** Logo do topo do painel (renderizado no servidor). */
  topo: ReactNode;
  /** Links e CTA (renderizados no servidor). */
  children: ReactNode;
};

const MEDIA_DESKTOP = "(min-width: 1024px)";

/** Menu de tela cheia (< 1024 px). Base: Radix Dialog (foco preso, Esc, trava o scroll, devolve o foco). */
export function MenuMobile({ rotuloAbrir, rotuloFechar, titulo, topo, children }: Props) {
  const [aberto, setAberto] = useState(false);
  // `true` quando o menu fecha porque o usuário escolheu um link: o foco não volta ao botão do menu, fica onde a navegação o deixou (a seção de destino).
  const fechouPorLink = useRef(false);

  // Ao chegar no layout desktop, o painel não faz mais sentido.
  useEffect(() => {
    const consulta = window.matchMedia(MEDIA_DESKTOP);
    const aoMudar = (evento: MediaQueryListEvent) => {
      if (evento.matches) setAberto(false);
    };
    consulta.addEventListener("change", aoMudar);
    return () => consulta.removeEventListener("change", aoMudar);
  }, []);

  // Fecha ao navegar por um link e ao tocar no fundo do painel.
  function aoClicar(evento: MouseEvent<HTMLDivElement>) {
    const alvo = evento.target as HTMLElement;
    if (alvo.closest("a")) fechouPorLink.current = true;
    if (alvo.closest("a") || alvo.dataset.fundo !== undefined) setAberto(false);
  }

  return (
    <Dialog.Root open={aberto} onOpenChange={setAberto}>
      <Dialog.Trigger
        className={`${botao.botao} ${botao.icone} ${estilos.gatilho}`}
        aria-label={rotuloAbrir}
        data-evento="menu_open"
      >
        <Icone nome="menu" />
      </Dialog.Trigger>
      <Dialog.Portal>
        {/* No Radix atual a trava de scroll do fundo vive no Overlay; o painel de tela cheia o cobre. */}
        <Dialog.Overlay className={estilos.fundo} />
        <Dialog.Content
          className={estilos.painel}
          aria-describedby={undefined}
          onClick={aoClicar}
          onCloseAutoFocus={(evento) => {
            if (!fechouPorLink.current) return;
            fechouPorLink.current = false;
            evento.preventDefault();
          }}
          data-fundo
        >
          <Dialog.Title className="sr-only">{titulo}</Dialog.Title>
          <div className={`container ${estilos.topo}`} data-fundo>
            {topo}
            <Dialog.Close className={`${botao.botao} ${botao.icone}`} aria-label={rotuloFechar}>
              <Icone nome="fechar" />
            </Dialog.Close>
          </div>
          <div className={`container ${estilos.corpo}`} data-fundo>
            {children}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
