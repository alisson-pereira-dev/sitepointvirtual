# Tarefas — Point Virtual

## Legenda
- [ ] pendente · [x] concluída · 🔎 requer validação humana

## T0 — Preparação
- [x] T0.1 Clonar o boilerplate e configurar o projeto
  - Aceite: build e dev rodam; lint ok
- [x] T0.2 Inserir `content.json`, `design-tokens` e docs nos caminhos definidos; criar helpers `getContent`, `buildWhatsappUrl` e `trackEvent` (sem efeito)
  - Aceite: tokens carregados; conteúdo acessível por helper; `buildWhatsappUrl` usa `wa.me` quando há número e o `wa.link` quando não há
- [x] T0.3 Metadados globais (`lang="pt-BR"`, Sora e Inter com 3 pesos, favicon provisório, logo PNG provisório)
  - Aceite: página em branco válida com fontes carregando e sem salto de layout
- [x] T0.4 Criar `Midia` com placeholder honesto ("foto em breve") e proporções fixas
  - Aceite: todas as imagens do JSON (`src: "pendente"`) renderizam o placeholder com `alt`, sem CLS

## T1 — Fatia vertical 🔎
- [x] T1.1 Aplicar tokens (cores, tipografia, espaço, sombras, motion) e `data-surface="dark"`
  - Aceite: página de teste mostra escala tipográfica e paleta; contrastes AA
- [x] T1.2 Header e MenuMobile (ficha `sections/header.md`)
  - Aceite: DoD da ficha; foco preso no menu; alvos ≥ 44 px; CTA visível no mobile
- [x] T1.3 Hero (ficha `sections/hero.md`) com MiniaturaInline
  - Aceite: DoD da ficha; LCP = headline < 2,5 s no mobile; motion nas 3 versões; headline em 2 linhas no desktop
- [x] T1.4 Revisão da fatia 🔎 — **parar e mostrar ao usuário**

## T2 — Seções (na ordem do site)
- [x] T2.1 Faixa (marquee) (ficha `sections/faixa.md`)
  - Aceite: DoD da ficha (conteúdo do JSON, tokens, responsivo, AA, `alt`, motion nas 3 versões, sem CLS) + itens específicos da seção
- [x] T2.2 Serviços (abas + cartões) (ficha `sections/servicos.md`)
  - Aceite: DoD da ficha (conteúdo do JSON, tokens, responsivo, AA, `alt`, motion nas 3 versões, sem CLS) + itens específicos da seção
- [x] T2.3 Painel de LED (ficha `sections/painel_led.md`) 🔎 — feito; **aguardando revisão do usuário**
  - Aceite: DoD da ficha (conteúdo do JSON, tokens, responsivo, AA, `alt`, motion nas 3 versões, sem CLS) + itens específicos da seção; textos `validar` exibidos conforme o JSON (nunca como fato confirmado)
- [x] T2.4 Como funciona (ficha `sections/como_funciona.md`) 🔎 — feito; **aguardando revisão do usuário**
  - Aceite: DoD da ficha (conteúdo do JSON, tokens, responsivo, AA, `alt`, motion nas 3 versões, sem CLS) + itens específicos da seção; textos `validar` exibidos conforme o JSON (nunca como fato confirmado)
- [x] T2.5 Trabalhos (ficha `sections/portfolio.md`) 🔎 — feito; **aguardando revisão do usuário**
  - Aceite: DoD da ficha (conteúdo do JSON, tokens, responsivo, AA, `alt`, motion nas 3 versões, sem CLS) + itens específicos da seção; textos `validar` exibidos conforme o JSON (nunca como fato confirmado)
- [x] T2.6 Sobre (ficha `sections/sobre.md`)
  - Aceite: DoD da ficha (conteúdo do JSON, tokens, responsivo, AA, `alt`, motion nas 3 versões, sem CLS) + itens específicos da seção
- [x] T2.7 Contato (ficha `sections/contato.md`) 🔎 — feito; **aguardando revisão do usuário**
  - Aceite: DoD da ficha (conteúdo do JSON, tokens, responsivo, AA, `alt`, motion nas 3 versões, sem CLS) + itens específicos da seção; textos `validar` exibidos conforme o JSON (nunca como fato confirmado)
- [x] T2.8 FAQ (ficha `sections/faq.md`) 🔎 — feito; **aguardando revisão do usuário**
  - Aceite: DoD da ficha (conteúdo do JSON, tokens, responsivo, AA, `alt`, motion nas 3 versões, sem CLS) + itens específicos da seção; textos `validar` exibidos conforme o JSON (nunca como fato confirmado)
- [x] T2.9 CTA final (ficha `sections/cta_final.md`)
  - Aceite: DoD da ficha (conteúdo do JSON, tokens, responsivo, AA, `alt`, motion nas 3 versões, sem CLS) + itens específicos da seção

## T3 — Componentes transversais
- [x] T3.1 Footer (ficha `sections/footer.md`)
  - Aceite: DoD da ficha; links legais apontam para as páginas
- [x] T3.2 Página 404 (`microcopy.pagina_404`)
  - Aceite: texto do JSON, link de volta e CTA principal
- [x] T3.3 Política de Privacidade e Termos 🔎 — feito como **rascunho técnico**; **aguardando revisão do usuário**
  - Aceite: rascunho técnico a partir do que o site realmente coleta; **marcado como pendente de revisão jurídica (LGPD)**; não publicar sem aprovação
  - ⚠️ **Não podem ser publicadas sem revisão humana/jurídica (LGPD).** Enquanto `paginas_legais.<página>.rascunho` for `true`, a página mostra o aviso "Rascunho — pendente de revisão jurídica" no topo e sai com `noindex, nofollow`. Todos os campos `[A PREENCHER]` (razão social, CNPJ, endereço da sede, encarregado e canal LGPD, provedor de hospedagem e país, bases legais, prazos de guarda, transferência internacional, titular da marca, foro) precisam ser preenchidos e revisados. Ao aprovar: trocar `rascunho` para `false` (remove o aviso e o `noindex`).
- [ ] T3.4 Banner de cookies — **só se** analytics ou embed forem adicionados 🔎
  - Aceite: consentimento antes de qualquer script; recusar tão fácil quanto aceitar; texto do JSON é rascunho jurídico

## T4 — SEO e dados
- [x] T4.1 Metas, Open Graph (imagem pendente), favicon final, sitemap, robots
  - Feito sem domínio: título (60) e descrição (153) dentro do limite; Open Graph (sem `og:image`: pendente, nada inventado), `twitter:card=summary`, `robots.txt`, `sitemap.xml` (vazio sem domínio) e ícones provisórios (`icon.svg`, `favicon.ico`, `apple-icon.png`, derivados do SVG provisório). **Pendente (T6):** favicon final (logo vetorial), `og:image` 1200×630, `canonical`/`og:url`/URLs do sitemap (só aparecem quando `site.dominio` for definido; testado com um domínio de teste).
  - Aceite: título ≤ 60 e descrição 140–160 caracteres conforme `seo.home`; `canonical` quando o domínio existir; o sitemap **não inclui** `/privacidade` e `/termos` enquanto estiverem em rascunho (`noindex`) nem a página 404
- [x] T4.2 JSON-LD `LocalBusiness` (nome, telefone, endereço, `areaServed`, `sameAs`); `FAQPage` só com as respostas efetivamente publicadas (neutras em produção)
  - Aceite: valida no teste de rich results; só dados com fonte
- [x] T4.3 Eventos de analytics 🔎 — feito; **aguardando revisão do usuário**
  - Aceite: `trackEvent` chamado nos eventos de `jornada-ux.md`; ferramenta só após decisão do cliente (e consentimento, se exigido)

## T5 — Qualidade 🔎 — feito; **aguardando revisão do usuário** (relatório na conversa)
- [x] T5.1 Auditoria de acessibilidade: axe (0 violações em home, `/privacidade`, `/termos` e 404, 390 e 1440 px, builds de produção e de revisão, incluindo aba trocada, FAQ aberto e menu aberto), teclado (skip link, menu, abas, carrossel, accordion, ordem e anel de foco), árvore de acessibilidade e contraste de foco/hover. Corrigido: foco escondido atrás do header ao voltar com Shift+Tab (`scroll-padding-top` no `html`); foco após escolher um link do menu; alvos de toque < 44 px (botão do menu a 320 px, link "Lojas"). **Não testado aqui:** leitor de tela real.
- [x] T5.2 Performance: Abas e Accordion carregam sob demanda (casca estática no servidor + Radix baixado ao chegar perto da tela ou ao usar o componente; `components/useSobDemanda.ts`). JS da carga inicial 167,9 → 162,2 KB (transferido). Lighthouse mobile local: 100 nas 4 categorias, LCP simulado ≈ 0,91 s em 17 rodadas; com throttling real (devtools) LCP ≈ 2,06–2,09 s. Medir no domínio real continua pendente (T6).
- [x] T5.3 Responsivo: 320 · 360 · 390 · 430 · 768 · 1024 · 1440 px, builds de produção e de revisão, sem rolagem horizontal e sem corte (a faixa em marquee é o único conteúdo que vaza, por desenho).
- [x] T5.4 Motion: reduced-motion, sem JS e mobile (sem ciclo) conforme as fichas. Removidas as transições de `background-color`/`box-shadow` das abas e de `text-decoration-color` do nome do cartão (regra "só transform e opacity"). Pendência de decisão: pausa da faixa por teclado (ver relatório).
- [x] T5.5 Links: WhatsApp, `tel:`, mapa, Instagram, âncoras e rotas, com a flag ligada e desligada.

## T6 — Pré-lançamento 🔎
- [ ] T6.1 Executar `11-CHECKLIST-PRE-LANCAMENTO` (43 itens) e registrar o resultado
- [ ] T6.2 Listar pendências de humano: logo vetorial, número do WhatsApp, domínio, fotos, autorizações, revisão jurídica, itens `validar`
- [ ] T6.3 Ambiente de produção **sem** `NEXT_PUBLIC_EXIBIR_ITENS_VALIDAR`
  - Aceite: a variável não existe (ou não é `1`) no ambiente de produção; o HTML publicado não contém itens `validar: true` nem a marca "A validar" (conferir "+ de 15 anos" no hero e os destaques do painel de LED)
- [ ] T6.4 Portfólio **só é publicado com fotos reais autorizadas** 🔎
  - Aceite: os 6 itens de `secoes.portfolio.itens` têm `src` real (não `"pendente"`) e `validar: false` (foto em alta + autorização do cliente); só então a seção "Trabalhos" e o link do menu aparecem no build de produção. Enquanto houver item pendente a seção fica oculta em produção (o placeholder "foto em breve" só aparece no modo revisão). Legendas genéricas, sem nome de cliente sem autorização

- [ ] T6.5 **Páginas legais: não publicar sem revisão humana/jurídica (LGPD)** 🔎
  - Aceite: `/privacidade` e `/termos` revisadas por humano/jurídico; todos os `[A PREENCHER]` preenchidos (nenhum restante no HTML publicado); `rascunho: false` no `content.json` (sem aviso de rascunho e sem `noindex`); o conteúdo confere com o que o site faz no dia da publicação (hoje: sem formulário, sem cookies, sem analytics, só links para WhatsApp, Google Maps e Instagram; se isso mudar, atualizar o texto e avaliar o banner de cookies, T3.4); provedor de hospedagem e domínio já definidos; páginas incluídas no sitemap só depois disso

- [ ] T6.6 Script `npm run check:publicacao` (`scripts/check-publicacao.mjs`) **sem bloqueios** 🔎
  - Aceite: o script sai com código 0. Ele falha e lista cada bloqueio quando houver: flag `NEXT_PUBLIC_EXIBIR_ITENS_VALIDAR` ligada (variável de ambiente ou `.env*`); `rascunho: true` ou `[A PREENCHER` em `content/content.json` (ignora `meta.*` e `paginas_legais.rascunho_*`); imagem renderizada com `src` "pendente" (confere o HTML de uma build de produção simulada, com a flag desligada, em `.next-check`); `site.dominio` ou o número do WhatsApp "pendente"; logo provisório (`site.logo.provisorio = true`). Rodar antes de cada publicação e registrar a saída no T6.1

## Bloqueios de publicação
Não publicar sem: logo vetorial (ou decisão de usar o PNG), número/link do WhatsApp confirmado, domínio e hospedagem, páginas legais revisadas por humano/jurídico (LGPD) e sem nenhum `[A PREENCHER]`, e fotos reais em Trabalhos e Painel de LED. Ver `assets-needed.md`.
