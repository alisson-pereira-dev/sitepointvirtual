import Link from "next/link";
import { Botao } from "@/components/Botao";
import { Midia } from "@/components/Midia";
import { getContent, hrefDaAncora, menuVisivel, resolverCta } from "@/lib/content";
import { CabecalhoFixo } from "./CabecalhoFixo";
import { MenuMobile } from "./MenuMobile";
import { NavPrincipal } from "./NavPrincipal";
import estilos from "./Header.module.css";

export function Header() {
  const { site, microcopy } = getContent();
  const acessibilidade = microcopy.acessibilidade;
  const cta = resolverCta("@ctas.principal");
  const menu = menuVisivel().map((item) => ({ ...item, href: hrefDaAncora(item.destino) }));

  const logo = (
    <Link href="/" className={estilos.logo}>
      <Midia
        src={site.logo.src}
        alt={site.logo.alt}
        proporcao="livre"
        raio="nenhum"
        largura={site.logo.largura}
        altura={site.logo.altura}
        prioridade
        className={estilos.logoMidia}
      />
    </Link>
  );

  return (
    <>
      <a href="#conteudo" className={estilos.pular}>
        {acessibilidade.pular_para_conteudo}
      </a>
      <CabecalhoFixo>
        <div className={`container ${estilos.barra}`}>
          {logo}
          <NavPrincipal itens={menu} rotulo={acessibilidade.menu_principal} variante="barra" />
          <div className={estilos.acoes}>
            <Botao variante="primario" cta={cta} origem="header" compactoNoMobile />
            <MenuMobile
              rotuloAbrir={acessibilidade.abrir_menu}
              rotuloFechar={acessibilidade.fechar_menu}
              titulo={acessibilidade.menu_titulo}
              topo={logo}
            >
              <NavPrincipal itens={menu} rotulo={acessibilidade.menu_titulo} variante="painel" />
              <Botao variante="primario" tamanho="lg" cta={cta} origem="menu" larguraTotalNoMobile />
            </MenuMobile>
          </div>
        </div>
      </CabecalhoFixo>
    </>
  );
}
