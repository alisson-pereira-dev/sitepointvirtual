import Link from "next/link";
import { hrefDoCta } from "@/lib/cta";
import { ancoraVisivel, getContent, hrefDaAncora, resolverCta } from "@/lib/content";
import { Icone } from "./Icone";
import { Midia } from "./Midia";
import estilos from "./Footer.module.css";

type Destino = { href: string; externo: boolean; evento?: string };

/** Define o link final: âncora → "/#x"; WhatsApp usa o mesmo destino do CTA principal; externos abrem em nova aba. */
function resolverDestino(destino: string): Destino {
  const { site } = getContent();
  const principal = resolverCta("@ctas.principal");
  if (destino === principal.destino) return { href: hrefDoCta(principal), externo: true };
  if (destino === site.redes.instagram) return { href: destino, externo: true, evento: "instagram_click" };
  if (/^https?:\/\//.test(destino)) return { href: destino, externo: true };
  return { href: hrefDaAncora(destino), externo: false };
}

function LinkRodape({ rotulo, destino, className }: { rotulo: string; destino: string; className: string }) {
  const { href, externo, evento } = resolverDestino(destino);
  if (!externo) {
    return (
      <Link href={href} className={className}>
        {rotulo}
      </Link>
    );
  }
  return (
    <a href={href} className={className} target="_blank" rel="noopener" data-evento={evento}>
      {rotulo}
    </a>
  );
}

export function Footer() {
  const { site, secoes } = getContent();
  const rodape = secoes.footer;
  const instagram = rodape.colunas.flatMap((c) => c.links).find((l) => l.destino === site.redes.instagram);

  // Links para seções que não são renderizadas (validar, sem fotos, poucas perguntas) não entram.
  const colunas = rodape.colunas
    .map((coluna) => ({ ...coluna, links: coluna.links.filter((link) => ancoraVisivel(link.destino)) }))
    .filter((coluna) => coluna.links.length > 0);

  return (
    <footer className={estilos.rodape}>
      <div className="container">
        <div className={estilos.topo}>
          <div className={estilos.marca}>
            <Link href="/" className={estilos.logo}>
              <Midia
                src={site.logo.src}
                alt={site.logo.alt}
                proporcao="livre"
                raio="nenhum"
                largura={site.logo.largura}
                altura={site.logo.altura}
                className={estilos.logoMidia}
              />
            </Link>
            <p className={estilos.descricao}>{rodape.descricao_curta}</p>
            <a
              href={site.redes.instagram}
              className={estilos.instagram}
              target="_blank"
              rel="noopener"
              aria-label={instagram?.rotulo}
              data-evento="instagram_click"
            >
              <Icone nome="instagram" tamanho="lg" />
            </a>
          </div>

          <div className={estilos.colunas}>
            {colunas.map((coluna) => (
              <nav key={coluna.titulo} aria-labelledby={`rodape-${coluna.titulo}`}>
                <h2 id={`rodape-${coluna.titulo}`} className={estilos.tituloColuna}>
                  {coluna.titulo}
                </h2>
                <ul className={estilos.links} role="list">
                  {coluna.links.map((link) => (
                    <li key={link.rotulo}>
                      <LinkRodape rotulo={link.rotulo} destino={link.destino} className={estilos.link} />
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className={estilos.base}>
          <ul className={estilos.legais} role="list">
            {rodape.links_legais.map((link) => (
              <li key={link.destino}>
                <LinkRodape rotulo={link.rotulo} destino={link.destino} className={estilos.link} />
              </li>
            ))}
          </ul>
          <p className={estilos.copyright}>{rodape.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
