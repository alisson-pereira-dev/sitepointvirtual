import { Botao } from "@/components/Botao";
import { ListaCheck } from "@/components/ListaCheck";
import { MarcaValidar } from "@/components/MarcaValidar";
import { Secao } from "@/components/Secao";
import { VideoLedTopo } from "@/components/VideoLedTopo";
import { getContent, modoRevisao, resolverCta } from "@/lib/content";
import estilos from "./PainelLed.module.css";

const ID_TITULO = "painel-led-titulo";

export function PainelLed() {
  const painel = getContent().secoes.painel_led;

  // Os textos originais (2×3 m, Praça do Manteiga, 300 exibições, VT de 20 s) aparecem em produção quando o item
  // não é mais `validar` (confirmados pelo cliente). Item ainda `validar`: em produção entra o neutro; só no modo
  // revisão aparece o original, com a marca "A validar".
  const revisao = modoRevisao();
  const descricao = revisao || !painel.descricao_validar ? painel.descricao : painel.descricao_neutra;
  const alt = revisao || !painel.midia.alt_validar ? painel.midia.alt : painel.midia.alt_neutro;
  const destaquesOriginais = revisao || painel.destaques.every((d) => !d.validar);
  const destaques = destaquesOriginais
    ? painel.destaques.map((d) => ({ rotulo: d.rotulo, marca: revisao && d.validar ? <MarcaValidar /> : undefined }))
    : painel.destaques_neutros.map((d) => ({ rotulo: d.rotulo }));

  return (
    <>
      {/* Palco: a animação "sai" do topo do painel (encosta na borda, 0 px), acima da seção, centralizada. */}
      <div className={estilos.palco}>
        <VideoLedTopo
          alt={painel.ilustracao.alt}
          src={painel.ilustracao.src}
          capa={painel.ilustracao.capa}
        />
      </div>
      <Secao id="painel-led" superficie="escura" formato="painel" rotuloId={ID_TITULO}>
        <div className={estilos.grade} data-reveal-filhos="">
          <div className={estilos.cabecalho}>
            <p className={estilos.etiqueta}>{painel.etiqueta}</p>
            <h2 id={ID_TITULO} className={estilos.titulo}>
              {painel.titulo}
            </h2>
          </div>
          <p className={estilos.descricao}>
            {descricao}
            {revisao && painel.descricao_validar ? <MarcaValidar /> : null}
          </p>
          <div className={estilos.foto}>
            {/* Vídeo vertical (9:16) ampliado para preencher o espaço 4:3; com som, só toca quando a pessoa aperta o play (sem autoplay, sem baixar antes). */}
            <video
              className={estilos.video}
              controls
              playsInline
              preload="none"
              poster={painel.midia.capa}
              aria-label={alt}
            >
              <source src={painel.midia.src} type="video/mp4" />
              <a href={painel.midia.src}>{painel.midia.alternativa_link}</a>
            </video>
          </div>
          <ListaCheck itens={destaques} className={estilos.lista} />
          <div className={estilos.cta}>
            <Botao variante="primario" tamanho="lg" cta={resolverCta(painel.cta)} origem="painel" larguraTotalNoMobile />
          </div>
        </div>
      </Secao>
    </>
  );
}
