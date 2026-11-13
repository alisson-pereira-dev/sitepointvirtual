import type { Metadata } from "next";
import { Faixa } from "@/components/Faixa";
import { JsonLd } from "@/components/JsonLd";
import { ProfundidadeScroll } from "@/components/ProfundidadeScroll";
import { Hero } from "@/components/secoes/Hero";
import { ComoFunciona } from "@/components/secoes/ComoFunciona";
import { PainelLed } from "@/components/secoes/PainelLed";
import { Contato } from "@/components/secoes/Contato";
import { CtaFinal } from "@/components/secoes/CtaFinal";
import { Faq } from "@/components/secoes/Faq";
import { Portfolio } from "@/components/secoes/Portfolio";
import { Sobre } from "@/components/secoes/Sobre";
import { Servicos } from "@/components/secoes/Servicos";
import { getContent } from "@/lib/content";
import { jsonLdFaq, jsonLdLocalBusiness } from "@/lib/jsonld";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = { alternates: canonical("/") };

export default function Home() {
  const { faixa } = getContent().secoes;

  return (
    <>
      <JsonLd dados={jsonLdLocalBusiness()} />
      <JsonLd dados={jsonLdFaq()} />
      <ProfundidadeScroll />
      <main id="conteudo" tabIndex={-1}>
        <Hero />
        <Faixa itens={faixa.itens} />
        <Servicos />
        <PainelLed />
        <ComoFunciona />
        <Portfolio />
        <Sobre />
        <Contato />
        <Faq />
        <CtaFinal />
      </main>
    </>
  );
}
