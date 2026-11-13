import { Accordion } from "@/components/Accordion";
import { MarcaValidar } from "@/components/MarcaValidar";
import { Secao } from "@/components/Secao";
import { faqItens, faqPublicavel, getContent } from "@/lib/content";
import estilos from "./Faq.module.css";

const ID_TITULO = "perguntas-titulo";

export function Faq() {
  const faq = getContent().secoes.faq;

  // Em produção: respostas `validar` entram na versão neutra; com menos de 3 perguntas a seção não existe.
  if (!faqPublicavel()) return null;

  const perguntas = faqItens().map((item) => ({
    pergunta: item.pergunta,
    resposta: item.resposta,
    marca: item.marcar ? <MarcaValidar /> : undefined,
  }));

  return (
    <Secao id="perguntas" superficie="padrao" rotuloId={ID_TITULO}>
      <div className={estilos.grade}>
        <h2 id={ID_TITULO} className={estilos.titulo} data-reveal="">
          {faq.titulo}
        </h2>
        <Accordion perguntas={perguntas} />
      </div>
    </Secao>
  );
}
