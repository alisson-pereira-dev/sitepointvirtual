import { MarcaValidar } from "@/components/MarcaValidar";
import { Passo } from "@/components/Passo";
import { Secao } from "@/components/Secao";
import { getContent, statusValidar } from "@/lib/content";
import estilos from "./ComoFunciona.module.css";

const ID_TITULO = "como-funciona-titulo";

export function ComoFunciona() {
  const secao = getContent().secoes.como_funciona;

  // O processo em 3 passos foi deduzido (`validar` na seção inteira): em produção a seção não aparece.
  const status = statusValidar(secao);
  if (!status.exibir) return null;

  return (
    <Secao id="como-funciona" superficie="alt" rotuloId={ID_TITULO}>
      <h2 id={ID_TITULO} className={estilos.titulo}>
        {secao.titulo}
        {status.marcar ? <MarcaValidar /> : null}
      </h2>
      <ol className={estilos.lista} role="list" data-reveal-filhos="">
        {secao.passos.map((passo) => (
          <Passo key={passo.numero} numero={passo.numero} titulo={passo.titulo} descricao={passo.descricao} />
        ))}
      </ol>
    </Secao>
  );
}
