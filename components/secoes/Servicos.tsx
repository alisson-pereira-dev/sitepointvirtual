import { Abas, type GrupoAba } from "@/components/Abas";
import { CartaoServico } from "@/components/CartaoServico";
import { CarrosselSnap } from "@/components/CarrosselSnap";
import { Secao } from "@/components/Secao";
import { getContent, statusValidar } from "@/lib/content";
import estilos from "./Servicos.module.css";

const ID_TITULO = "servicos-titulo";

export function Servicos() {
  const { servicos } = getContent().secoes;
  const { acessibilidade } = getContent().microcopy;

  // Itens `validar: true` só entram com a flag de revisão ligada (hoje nenhum item de serviço é `validar`).
  const itensVisiveis = servicos.itens.filter((item) => statusValidar(item).exibir);

  const grupos: GrupoAba[] = servicos.grupos
    .map((grupo) => ({
      id: grupo.id,
      rotulo: grupo.rotulo,
      itens: itensVisiveis.filter((item) => item.grupo === grupo.id),
    }))
    .filter((grupo) => grupo.itens.length > 0)
    .map((grupo) => ({
      id: grupo.id,
      rotulo: grupo.rotulo,
      painel: (
        <CarrosselSnap
          rotulo={grupo.rotulo}
          rotuloProximo={acessibilidade.servicos_proximo}
          rotuloVoltar={acessibilidade.servicos_voltar}
        >
          {grupo.itens.map((item) => (
            <CartaoServico
              key={item.nome}
              nome={item.nome}
              descricao={item.descricao}
              imagem={item.imagem}
              colunas={grupo.itens.length}
            />
          ))}
        </CarrosselSnap>
      ),
    }));

  return (
    <Secao id="servicos" superficie="padrao" rotuloId={ID_TITULO}>
      <div className={estilos.cabecalho} data-reveal-filhos="">
        <h2 id={ID_TITULO} className={estilos.titulo}>
          {servicos.titulo}
        </h2>
        <p className={estilos.subtitulo}>{servicos.subtitulo}</p>
      </div>
      <Abas grupos={grupos} rotuloId={ID_TITULO} />
    </Secao>
  );
}
