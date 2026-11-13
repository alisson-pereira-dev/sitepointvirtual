import { Secao } from "./Secao";
import { getContent, partirPendencias } from "@/lib/content";
import estilos from "./PaginaLegal.module.css";

type SecaoLegal = { titulo: string; paragrafos?: string[]; itens?: string[] };

export type PaginaLegalDados = {
  titulo: string;
  rascunho: boolean;
  atualizacao: string;
  secoes: SecaoLegal[];
};

/** Texto com os campos "[A PREENCHER: ...]" destacados (marca amarela, impossível de passar batido). */
function Texto({ valor }: { valor: string }) {
  return (
    <>
      {partirPendencias(valor).map((parte, i) =>
        parte.pendente ? (
          <mark key={i} className={estilos.pendente}>
            {/* Espaço sem quebra: "[A PREENCHER" não se parte entre linhas */}
            {parte.texto.replace("[A PREENCHER", "[A PREENCHER")}
          </mark>
        ) : (
          parte.texto
        ),
      )}
    </>
  );
}

/**
 * Página legal (Política de Privacidade, Termos). Com `rascunho: true` mostra, no topo, o aviso de
 * rascunho pendente de revisão jurídica (a página também sai com `noindex`, ver `metadata` de cada rota).
 */
export function PaginaLegal({ pagina }: { pagina: PaginaLegalDados }) {
  const { rascunho_aviso, rascunho_detalhe } = getContent().paginas_legais;
  const idTitulo = "pagina-legal-titulo";

  return (
    <main id="conteudo" tabIndex={-1}>
      <Secao id="pagina-legal" superficie="padrao" rotuloId={idTitulo} abaixoDoHeader>
        <article className={estilos.pagina}>
          {pagina.rascunho ? (
            <aside className={estilos.aviso} role="note">
              <p className={estilos.avisoTitulo}>{rascunho_aviso}</p>
              <p className={estilos.avisoTexto}>
                <Texto valor={rascunho_detalhe} />
              </p>
            </aside>
          ) : null}

          <h1 id={idTitulo} className={estilos.titulo}>
            {pagina.titulo}
          </h1>
          <p className={estilos.atualizacao}>
            <Texto valor={pagina.atualizacao} />
          </p>

          {pagina.secoes.map((secao) => (
            <section key={secao.titulo} className={estilos.secao}>
              <h2 className={estilos.subtitulo}>{secao.titulo}</h2>
              {secao.paragrafos?.map((p) => (
                <p key={p} className={estilos.paragrafo}>
                  <Texto valor={p} />
                </p>
              ))}
              {secao.itens ? (
                <ul className={estilos.itens}>
                  {secao.itens.map((item) => (
                    <li key={item}>
                      <Texto valor={item} />
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </article>
      </Secao>
    </main>
  );
}
