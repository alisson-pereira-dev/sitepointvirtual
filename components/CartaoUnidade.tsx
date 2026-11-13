import type { ReactNode } from "react";
import { getContent, mapaHref, telHref } from "@/lib/content";
import { Icone } from "./Icone";
import botao from "./Botao.module.css";
import estilos from "./CartaoUnidade.module.css";

type Props = {
  nome: string;
  telefone: string;
  /** `null` esconde a linha de endereço e o "Ver no mapa" (sem texto de aviso). */
  endereco: string | null;
  /** Adereço opcional ao lado do nome (marca "A validar" no modo revisão). */
  marca?: ReactNode;
};

/** Uma loja: nome, endereço (se houver), telefone em `tel:` e "Ver no mapa" (se houver endereço). Vive dentro de uma `ul` (`li`). */
export function CartaoUnidade({ nome, telefone, endereco, marca }: Props) {
  const { ver_no_mapa, ligar_para } = getContent().microcopy.contato;

  return (
    <li>
      <article className={estilos.cartao}>
        <h3 className={estilos.nome}>
          {nome}
          {marca}
        </h3>
        <address className={estilos.linhas}>
          {endereco ? (
            <p className={estilos.linha}>
              <Icone nome="localizacao" tamanho="lg" />
              <span>{endereco}</span>
            </p>
          ) : null}
          <p className={estilos.linha}>
            <Icone nome="telefone" tamanho="lg" />
            <a
              className={estilos.link}
              href={telHref(telefone)}
              aria-label={`${ligar_para} ${telefone}`}
              data-evento="telefone_click"
              data-unidade={nome}
            >
              {telefone}
            </a>
          </p>
          {endereco ? (
            <a
              className={`${botao.botao} ${botao.link} ${estilos.mapa}`}
              href={mapaHref(endereco)}
              target="_blank"
              rel="noopener"
              data-evento="mapa_click"
              data-unidade={nome}
            >
              {ver_no_mapa}
            </a>
          ) : null}
        </address>
      </article>
    </li>
  );
}
