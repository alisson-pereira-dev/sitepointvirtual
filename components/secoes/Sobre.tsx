import type { CSSProperties } from "react";
import Image from "next/image";
import { MarcaValidar } from "@/components/MarcaValidar";
import { Midia } from "@/components/Midia";
import { Secao } from "@/components/Secao";
import { getContent, paragrafosComNegrito, statusValidar } from "@/lib/content";
import estilos from "./Sobre.module.css";

const ID_TITULO = "sobre-titulo";

export function Sobre() {
  const sobre = getContent().secoes.sobre;
  const paragrafos = paragrafosComNegrito(sobre.texto);

  // Pontos `validar: true` só entram no modo revisão, com a marca "A validar".
  const pontos = sobre.pontos_de_valor
    .map((ponto) => ({ ponto, status: statusValidar(ponto) }))
    .filter(({ status }) => status.exibir);

  return (
    <Secao id="sobre" superficie="padrao" rotuloId={ID_TITULO}>
      <div className={estilos.grade}>
        <div className={estilos.texto} data-reveal="">
          <h2 id={ID_TITULO} className={estilos.titulo}>
            {sobre.titulo}
          </h2>
          {paragrafos.map((trechos, i) => (
            <p key={i} className={estilos.paragrafo}>
              {trechos.map((trecho, j) => (trecho.negrito ? <strong key={j}>{trecho.texto}</strong> : trecho.texto))}
            </p>
          ))}
        </div>

        <div className={estilos.foto} data-reveal="" style={{ "--i": 1 } as CSSProperties}>
          <Midia
            src={sobre.imagem.src}
            alt={sobre.imagem.alt}
            proporcao="4-3"
            raio="xl"
            largura={960}
            altura={720}
            sizes="(min-width: 1024px) 45vw, 92vw"
          />
        </div>

        {pontos.length > 0 ? (
          <ul className={estilos.pontos} role="list" data-reveal-filhos="">
            {pontos.map(({ ponto, status }) => (
              <li key={ponto.titulo} className={estilos.ponto}>
                <Image
                  src={ponto.ilustracao.src}
                  alt={ponto.ilustracao.alt}
                  width={1416}
                  height={1792}
                  sizes="(min-width: 768px) 160px, 120px"
                  loading="lazy"
                  className={estilos.ilustracao}
                />
                <h3 className={estilos.pontoTitulo}>
                  {ponto.titulo}
                  {status.marcar ? <MarcaValidar /> : null}
                </h3>
                <p className={estilos.pontoDescricao}>{ponto.descricao}</p>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </Secao>
  );
}
