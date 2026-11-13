import type { Metadata } from "next";
import { Botao } from "@/components/Botao";
import { Secao } from "@/components/Secao";
import { getContent, resolverCta } from "@/lib/content";
import estilos from "./not-found.module.css";

const ID_TITULO = "pagina-404-titulo";

const { site, microcopy } = getContent();

export const metadata: Metadata = {
  title: `${microcopy.pagina_404.titulo} | ${site.nome}`,
  robots: { index: false, follow: false },
};

/** Rota inexistente: texto do JSON, link de volta e o CTA principal (o mesmo do header). */
export default function PaginaNaoEncontrada() {
  const pagina = microcopy.pagina_404;
  const voltar = { texto: pagina.cta.texto, destino: pagina.cta.destino, tipo: "link" };

  return (
    <main id="conteudo" tabIndex={-1}>
      <Secao id="pagina-nao-encontrada" superficie="padrao" rotuloId={ID_TITULO} abaixoDoHeader>
        <div className={estilos.conteudo}>
          <h1 id={ID_TITULO} className={estilos.titulo}>
            {pagina.titulo}
          </h1>
          <p className={estilos.texto}>{pagina.texto}</p>
          <div className={estilos.acoes}>
            <Botao variante="primario" tamanho="lg" cta={resolverCta("@ctas.principal")} origem="404" larguraTotalNoMobile />
            <Botao variante="secundario" tamanho="lg" cta={voltar} origem="404" larguraTotalNoMobile rastrear={false} />
          </div>
        </div>
      </Secao>
    </main>
  );
}
