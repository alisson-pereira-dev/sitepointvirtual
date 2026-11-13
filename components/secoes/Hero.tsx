import { Botao } from "@/components/Botao";
import { Etiqueta } from "@/components/Etiqueta";
import { MarcaValidar } from "@/components/MarcaValidar";
import { MiniaturaInline } from "@/components/MiniaturaInline";
import { Secao } from "@/components/Secao";
import { getContent, partirMarcadores, resolverCta, statusValidar } from "@/lib/content";
import estilos from "./Hero.module.css";

/**
 * As 3 miniaturas percorrem as mesmas 5 fotos, cada uma começando num ponto (`midias_miniatura.inicio`) e com o
 * ciclo defasado em frações da duração de uma foto (ms, com `--slot` = 1500 ms). Resultado: as trocas nunca caem
 * no mesmo instante (uma a cada ~500 ms) e, como as 3 estão sempre em fotos diferentes da lista de 5, nunca
 * aparece a mesma foto em duas miniaturas. Se mudar `--slot`, o número de fotos, os inícios ou estes atrasos,
 * rode a checagem de varredura de `docs/sections/hero.md` (§ Motion).
 */
const ATRASOS_CICLO_MS = [500, 1000, 0];

/** Gira a lista para a miniatura começar em `inicio`. */
function girar<T>(lista: T[], inicio: number): T[] {
  const n = lista.length;
  return lista.map((_, i) => lista[(i + inicio) % n]);
}

export function Hero() {
  const { hero } = getContent().secoes;
  const partes = partirMarcadores(hero.headline);
  const prova = statusValidar(hero.prova_rapida);

  return (
    <Secao id="inicio" superficie="padrao" rotuloId="hero-titulo" abaixoDoHeader>
      <div className={estilos.conteudo}>
        <Etiqueta texto={hero.etiqueta} />

        <h1 id="hero-titulo" className={estilos.headline}>
          {partes.map((parte, i) => {
            if (typeof parte === "string") return parte;
            const indice = parte.marcador - 1;
            const { fotos, inicio } = hero.midias_miniatura;
            if (inicio[indice] === undefined) return null;
            return (
              <MiniaturaInline
                key={i}
                fotos={girar(fotos, inicio[indice])}
                inclinacao={indice % 2 === 0 ? "esq" : "dir"}
                indice={indice}
                atraso={ATRASOS_CICLO_MS[indice] ?? 0}
                prioridade={indice === 0}
              />
            );
          })}
        </h1>

        <p className={estilos.subheadline}>{hero.subheadline}</p>

        <div className={estilos.acoes}>
          <Botao variante="primario" tamanho="lg" cta={resolverCta(hero.cta)} origem="hero" larguraTotalNoMobile />
          <Botao
            variante="secundario"
            tamanho="lg"
            cta={resolverCta(hero.cta_secundario)}
            origem="hero"
            larguraTotalNoMobile
          />
        </div>

        {prova.exibir ? (
          <p className={estilos.prova} data-validar={hero.prova_rapida.validar ? "true" : undefined}>
            {hero.prova_rapida.texto}
            {prova.marcar ? <MarcaValidar /> : null}
          </p>
        ) : null}
      </div>
    </Secao>
  );
}
