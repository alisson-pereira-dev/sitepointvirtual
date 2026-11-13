import type { Metadata, Viewport } from "next";
import { preload } from "react-dom";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/header/Header";
import { RastreadorEventos } from "@/components/RastreadorEventos";
import { RevealObserver } from "@/components/RevealObserver";
import { getContent } from "@/lib/content";
import { urlDoSite } from "@/lib/seo";
import "@/styles/design-tokens.css";
import "@/styles/fonts.css";
import "@/styles/globals.css";

const { site, seo } = getContent();

const base = urlDoSite();
// Imagem Open Graph: só entra quando existir de verdade (`src` ≠ "pendente") e houver domínio para a URL absoluta.
const ogImagem = seo.home.og_imagem.src !== "pendente" && base ? [{ url: seo.home.og_imagem.src, alt: seo.home.og_imagem.alt }] : undefined;

export const metadata: Metadata = {
  // Com domínio, o Next monta `canonical`, `og:url` e `og:image` absolutos a partir daqui.
  ...(base ? { metadataBase: new URL(base) } : {}),
  title: seo.home.titulo,
  description: seo.home.descricao,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: site.nome,
    title: seo.home.titulo,
    description: seo.home.descricao,
    ...(base ? { url: "/" } : {}),
    ...(ogImagem ? { images: ogImagem } : {}),
  },
  twitter: {
    card: ogImagem ? "summary_large_image" : "summary",
    title: seo.home.titulo,
    description: seo.home.descricao,
    ...(ogImagem ? { images: ogImagem } : {}),
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

/**
 * Marca o html cedo (antes da 1ª pintura): `js` libera o menu e o header; `js-motion` libera os reveals.
 * Rede de segurança: se o RevealObserver não subir em 4 s, `js-motion` é removido e o conteúdo aparece.
 */
const SCRIPT_CLASSES =
  "(function(){var h=document.documentElement;h.classList.add('js');if(!('IntersectionObserver' in window))return;h.classList.add('js-motion');setTimeout(function(){if(!h.hasAttribute('data-reveal-ready'))h.classList.remove('js-motion')},4000)})()";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Fontes do 1º viewport: títulos (Sora 700) e corpo (Inter 400/600).
  for (const arquivo of ["sora-latin-700-normal", "inter-latin-400-normal", "inter-latin-600-normal"]) {
    preload(`/fonts/${arquivo}.woff2`, { as: "font", type: "font/woff2", crossOrigin: "anonymous" });
  }

  return (
    <html lang={site.lang} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: SCRIPT_CLASSES }} />
      </head>
      <body>
        {/* Header e Footer valem para todas as páginas (home, legais, 404); cada página traz seu próprio <main id="conteudo"> */}
        <Header />
        {children}
        <Footer />
        <RastreadorEventos />
        <RevealObserver />
      </body>
    </html>
  );
}
