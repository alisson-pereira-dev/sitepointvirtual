import { CartaoTrabalho } from "@/components/CartaoTrabalho";
import { MarcaValidar } from "@/components/MarcaValidar";
import { Secao } from "@/components/Secao";
import { getContent, portfolioItens, portfolioPublicavel, statusValidar } from "@/lib/content";
import estilos from "./Portfolio.module.css";

const ID_TITULO = "trabalhos-titulo";
const COLUNAS_DESKTOP = 3;

export function Portfolio() {
  const portfolio = getContent().secoes.portfolio;

  // Sem fotos reais autorizadas a seção não é publicada (só aparece no modo revisão, com placeholder).
  if (!portfolioPublicavel()) return null;

  return (
    <Secao id="trabalhos" superficie="padrao" rotuloId={ID_TITULO}>
      <div className={estilos.cabecalho} data-reveal-filhos="">
        <h2 id={ID_TITULO} className={estilos.titulo}>
          {portfolio.titulo}
        </h2>
        <p className={estilos.subtitulo}>{portfolio.subtitulo}</p>
      </div>
      <ul className={estilos.grade} role="list">
        {portfolioItens().map((item, i) => (
          <CartaoTrabalho
            key={item.nome}
            imagem={item.imagem}
            nome={item.nome}
            categoria={item.categoria}
            coluna={i % COLUNAS_DESKTOP}
            marca={statusValidar(item).marcar ? <MarcaValidar /> : undefined}
          />
        ))}
      </ul>
    </Secao>
  );
}
