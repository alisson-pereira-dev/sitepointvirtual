import { Botao } from "@/components/Botao";
import { MiniaturaInline } from "@/components/MiniaturaInline";
import { Secao } from "@/components/Secao";
import { getContent, partirMarcadores, resolverCta } from "@/lib/content";
import estilos from "./CtaFinal.module.css";

const ID_TITULO = "orcamento-titulo";

/** Último convite: frase com uma miniatura (as mesmas 5 fotos do hero, alternando no desktop), subtexto e o CTA principal. Sem informação nova e sem segundo botão. */
export function CtaFinal() {
  const cta = getContent().secoes.cta_final;
  const partes = partirMarcadores(cta.headline);

  return (
    <Secao id="orcamento" superficie="escura" formato="painel" rotuloId={ID_TITULO} className={estilos.secao}>
      <div className={estilos.conteudo} data-reveal="">
        <h2 id={ID_TITULO} className={estilos.headline}>
          {partes.map((parte, i) =>
            typeof parte === "string" ? (
              parte
            ) : (
              <MiniaturaInline key={i} fotos={cta.miniatura.fotos} inclinacao="esq" indice={0} />
            ),
          )}
        </h2>
        <p className={estilos.subtexto}>{cta.subtexto}</p>
        <Botao variante="primario" tamanho="lg" cta={resolverCta(cta.cta)} origem="final" larguraTotalNoMobile />
      </div>
    </Secao>
  );
}
