# PRD — Point Virtual

## 1. Visão
- **Negócio:** Point Virtual, gráfica rápida, comunicação visual e informática em Muritiba, Cachoeira e Recôncavo Baiano (BA). Faz letreiros e fachadas, plotagem veicular e em vidro, personalizados em acrílico, brindes, painel de LED e criação de artes.
- **Público:** donos de comércio local, organizadores de eventos e pessoas físicas da região.
- **Proposta de valor:** a gráfica da região com trabalho real à vista e pedido de orçamento em um toque.
- **Objetivo único / CTA principal:** "Pedir orçamento no WhatsApp" (`site.ctas.principal`). Secundário: "Ver o que fazemos" (âncora `#servicos`).
- **Nível:** completo (home de uma página, 12 blocos).
- **Direção de Arte:** "Gráfica de bairro com cara de plataforma" — clareza do Packhelp com o calor, a cor e a prova local da Point. Ver `direcao-de-arte.md`.
- **Motion geral:** N1, só CSS. Um momento de destaque no hero (miniaturas na frase). Sem 3D.

## 2. Escopo
### Inclui
- Seções, na ordem: Header, Hero, Faixa, Serviços, Painel de LED, Como funciona, Trabalhos, Sobre, Contato, FAQ, CTA final, Footer.
- Páginas de sistema: 404, Política de Privacidade e Termos (**rascunho técnico, exige revisão jurídica/LGPD**). Banner de cookies só se entrar analytics ou mapa embutido.
- Integrações: WhatsApp (link de ação), telefone (`tel:`), Google Maps (link, sem embed), Instagram (link). Analytics: **a definir** (helper `trackEvent` sem efeito até lá).

### Não inclui (nesta versão)
Formulário, página de "Obrigado", depoimentos, preços, blog, e-commerce/carrinho, área logada, multi-idioma, botão flutuante de WhatsApp, editor 3D.

## 3. Arquitetura da informação
- Uma página (`/`) com âncoras: `#inicio`, `#servicos`, `#painel-led`, `#como-funciona`, `#trabalhos`, `#sobre`, `#contato`, `#perguntas`, `#orcamento`. Páginas legais e 404 à parte.
- Menu: Serviços, Painel de LED, Como funciona, Trabalhos, Contato + CTA principal.
- Rodapé: logo, descrição, links, contatos, Instagram, links legais.
- **Fluxo do CTA:** clique → abre o WhatsApp em nova aba (número + mensagem padrão quando o número for confirmado; até lá, o link `wa.link`). Aparece em header, hero, painel de LED, contato e CTA final.

## 4. Design system
`design-tokens.css` / `.json` (gerados de uma única fonte) e `design-system.md`. Resumo:
- Tema claro, com duas seções escuras (painel de LED, CTA final) via `data-surface="dark"`.
- Primária `#DB050F` (hover `#C50107`) só para ação; acento amarelo só em detalhe/sobre escuro; neutros quentes.
- Sora (títulos, 700) + Inter (400/600). Escala fluida; espaçamento em múltiplos de 4 px.
- Contraste AA verificado por script em 29 pares, 0 falhas.
- Nada de valor literal no código: tudo por token.

## 5. Componentes
19 componentes especificados em `componentes.md`: Header, MenuMobile, Botao, Secao, Etiqueta, Icone, Midia, MiniaturaInline, Faixa, Abas, CarrosselSnap, CartaoServico, ListaCheck, Passo, CartaoTrabalho, CartaoUnidade, Accordion, Footer, Pagina404, BannerCookies (condicional). Radix para Tabs, Accordion e Dialog (comportamento e acessibilidade).

## 6. Seções
1. **S00 Header** — [`sections/header.md`](sections/header.md). Orientar e manter o CTA principal sempre à mão. Papel: entrada. CTA: aparece aqui em todas as telas.
2. **S01 Hero** — [`sections/hero.md`](sections/hero.md). Em 5 s: é uma gráfica e comunicação visual da região e o próximo passo é pedir orçamento no WhatsApp. Papel: entrada. CTA: primeira aparição do principal.
3. **Faixa (marquee)** — [`sections/faixa.md`](sections/faixa.md). Reforçar três fatos verificáveis (do arquivo à instalação; Cachoeira · Muritiba · Recôncavo; gráfica rápida e comunicação visual) e dar ritmo entre o hero e os serviços. Papel: interesse.
4. **S06 Serviços** — [`sections/servicos.md`](sections/servicos.md). Mostrar o que a Point faz, por necessidade, de forma que o visitante se reconheça em 5 s. Papel: interesse. CTA: o subtítulo manda chamar no WhatsApp se não achar; o secundário do hero rola até aqui.
5. **S08 Painel de LED** — [`sections/painel_led.md`](sections/painel_led.md). Apresentar o painel de LED da Praça do Manteiga como oferta própria e local. Papel: interesse/decisão. CTA: principal repetido no meio da narrativa.
6. **S07 Como funciona** — [`sections/como_funciona.md`](sections/como_funciona.md). Mostrar que pedir é simples (3 passos). Papel: confiança. CTA: nenhum botão aqui (o CTA volta no contato).
7. **S09 Trabalhos** — [`sections/portfolio.md`](sections/portfolio.md). Provar com trabalho real e local. Papel: confiança. CTA: nenhum botão (o CTA principal está antes e depois).
8. **S04 Sobre** — [`sections/sobre.md`](sections/sobre.md). Humanizar: quem está por trás e onde atua. Papel: confiança.
9. **S17 Contato** — [`sections/contato.md`](sections/contato.md). Dar o jeito mais rápido (WhatsApp) e o endereço físico. Papel: conversão. CTA: principal.
10. **S16 FAQ** — [`sections/faq.md`](sections/faq.md). Remover as últimas objeções (cidades, arte, orçamento, prazo, instalação). Papel: decisão.
11. **S19 CTA final** — [`sections/cta_final.md`](sections/cta_final.md). Último convite, sem informação nova. Papel: conversão. CTA: principal.
12. **S23 Footer** — [`sections/footer.md`](sections/footer.md). Fechar, repetir contatos e dar segurança legal. Papel: confiança.

Regra: `content.json` (o que diz) · tokens (como parece) · ficha (como se comporta).

## 7. Jornada UX
Macro: descoberta → interesse → confiança → decisão → ação. Detalhes e mapa de eventos em `jornada-ux.md`. Eventos: `cta_principal_click` (origem), `cta_secundario_click`, `menu_open`, `servico_aba_change`, `telefone_click`, `mapa_click`, `faq_open`, `instagram_click`, `scroll_depth`.

## 8. Motion
- N1, só CSS: reveal único por IntersectionObserver (classe `js-motion` no `html`), marquee, ciclo de miniaturas por keyframes, transição de abas e accordion, hover de cartões.
- Sem GSAP, Lenis, Motion lib ou R3F: o ganho não compensa o peso e o Packhelp, referência central, também é só CSS.
- 3 versões por animação (desktop, mobile, reduced-motion); só `transform` e `opacity`; conteúdo visível sem JS; a headline do hero não anima (LCP = texto).

## 9. Requisitos não funcionais
- **Performance (alvo, a verificar no build):** LCP < 2,5 s · INP < 200 ms · CLS < 0,1 (mobile). Fotos em WebP/AVIF com `width`/`height` e lazy fora da 1ª dobra.
- **Acessibilidade:** WCAG AA, foco visível, teclado, `alt`, `lang="pt-BR"`, `prefers-reduced-motion`.
- **SEO:** título e descrição em `seo.home`, Open Graph, sitemap, robots, JSON-LD `LocalBusiness` (telefone, endereço, `areaServed`, `sameAs`).
- **Segurança:** HTTPS, headers básicos, sem segredos no frontend.
- **Privacidade:** sem cookies de terceiros por padrão; qualquer analytics exige decisão de consentimento; políticas com revisão jurídica.
- **Compatibilidade:** últimas 2 versões de Chrome, Safari (iOS incluso), Edge e Firefox; Android de entrada (360 px).

## 10. Conteúdo
- Fonte única: `content/content.json`.
- Itens `validar`: 13 entradas em `meta.pendencias_validar` (WhatsApp, "+ de 15 anos", números do painel de LED, processo em 3 passos, portfólio, "criação, produção e instalação", 2ª loja, FAQ, cookies, domínio, horários, endereço da 2ª loja, depoimentos).
- Ativos pendentes: `assets-needed.md`.

## 11. Critérios de sucesso
- Site fiel às fichas em 60–70% no primeiro build.
- Métricas de performance dentro do orçamento.
- CTA principal funcionando ponta a ponta (abre o WhatsApp da Point).

## 12. Riscos e suposições
| Risco/suposição | Impacto | Mitigação |
|---|---|---|
| Sem fotos reais no lançamento | Alto: portfólio e painel perdem sentido | Placeholder honesto "foto em breve"; **portfólio não publica sem fotos** |
| Logo só em PNG (sem alfa, 46% de altura útil) | Médio: header com marca pequena | Pedir SVG/AI/CDR, versão negativa e símbolo; usar PNG provisório |
| Número do WhatsApp desconhecido | Alto | Usar `wa.link` da bio; trocar por `wa.me` com mensagem quando houver número |
| Rótulo das lojas (Centro × Manteiga) conflitante | Médio | Nomeadas pelo Google; confirmar com o cliente |
| "+ de 15 anos" e números do painel não confirmados | Médio | Marcados `validar`; texto neutro se não confirmados |
| Sem horários nem 2º endereço | Médio | Site manda confirmar pelo WhatsApp; campo `null` some da tela |
| Páginas legais sem revisão | Alto (LGPD) | Rascunho técnico; revisão humana/jurídica antes de publicar |
| Suposição: o cliente aceita só WhatsApp (sem formulário) | Baixo | Decisão registrada; formulário pode ser T-futuro |
