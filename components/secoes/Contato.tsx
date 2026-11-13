import { Botao } from "@/components/Botao";
import { CartaoUnidade } from "@/components/CartaoUnidade";
import { MarcaValidar } from "@/components/MarcaValidar";
import { Secao } from "@/components/Secao";
import { getContent, resolverCta, statusValidar } from "@/lib/content";
import estilos from "./Contato.module.css";

const ID_TITULO = "contato-titulo";

export function Contato() {
  const contato = getContent().secoes.contato;

  // Unidades `validar: true` (hoje a Loja Manteiga: nome/telefone lidos de uma arte, sem endereço)
  // só aparecem no modo revisão, com a marca. Sem horários: o subtexto manda confirmar pelo WhatsApp.
  const unidades = contato.unidades
    .map((unidade) => ({ unidade, status: statusValidar(unidade) }))
    .filter(({ status }) => status.exibir);

  return (
    <Secao id="contato" superficie="padrao" rotuloId={ID_TITULO}>
      <div className={estilos.grade}>
        <div className={estilos.texto} data-reveal-filhos="">
          <h2 id={ID_TITULO} className={estilos.titulo}>
            {contato.titulo}
          </h2>
          <p className={estilos.subtexto}>{contato.subtexto}</p>
          <div className={estilos.cta}>
            <Botao variante="primario" tamanho="lg" cta={resolverCta(contato.cta)} origem="contato" larguraTotalNoMobile />
          </div>
        </div>

        <ul className={estilos.unidades} role="list" data-reveal-filhos="">
          {unidades.map(({ unidade, status }) => (
            <CartaoUnidade
              key={unidade.nome}
              nome={unidade.nome}
              telefone={unidade.telefone}
              endereco={unidade.endereco}
              marca={status.marcar ? <MarcaValidar /> : undefined}
            />
          ))}
        </ul>
      </div>
    </Secao>
  );
}
