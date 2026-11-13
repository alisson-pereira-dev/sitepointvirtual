# Componentes — Point Virtual (fase 7)

Só entram os componentes que as 12 seções usam. **Primitivos acessíveis (Radix/shadcn) para Tabs, Accordion e Dialog**, a confirmar no boilerplate. **Motion: só CSS** (sem Motion, GSAP, Lenis ou R3F neste projeto).

## Regras gerais
- Só tokens (`design-tokens.css`); conteúdo por props vindas do `content.json`; nenhum texto fixo no componente.
- Alvo de toque ≥ 44 px (preferir 48). Nada depende de hover.
- Estados globais, valem para todos salvo indicação:

| Estado | Visual | Tokens |
|---|---|---|
| padrão | conforme variante | — |
| hover (só `pointer: fine`) | elevação ou realce sutil | `--shadow-2`, `--dur-fast`, `--ease-out` |
| focus-visible | anel de 3 px, offset 2 px | `--color-focus-ring` (amarelo em `data-surface="dark"`) |
| active | `scale(0.98)` | `--dur-instant` |
| disabled | opacidade .5, `cursor: not-allowed` | — |

- **Reveal de entrada (R1/R2):** classe `.reveal` ativada por IntersectionObserver, **uma vez**; estado oculto só aplicado quando `html.js-motion` existe e **nunca** em conteúdo da 1ª dobra. Detalhe em cada ficha (campo 7).

## Índice (nomes usados nas fichas)
Header · MenuMobile · Botao · Secao · Etiqueta · Icone · Midia · MiniaturaInline · Faixa · Abas · CarrosselSnap · CartaoServico · ListaCheck · Passo · CartaoTrabalho · CartaoUnidade · Accordion · Footer · Pagina404 · BannerCookies

---

# Componente — Header
**Função:** logo, navegação e CTA principal sempre visível. Usado em: todas as páginas.
**Anatomia:** link "Pular para o conteúdo" · logo (link para `/`) · `nav` com 5 links · Botao primário · botão de menu (só mobile).
| Prop | Tipo | Obrig. | Origem |
|---|---|---|---|
| logo | Midia | sim | `site.logo` |
| itens | {rotulo, destino}[] | sim | `site.menu` |
| cta | Cta | sim | `site.ctas.principal` |
| textos de acessibilidade | string | sim | `microcopy.acessibilidade` |
**Variantes:** fixo; fundo `--color-bg` e borda `--color-border` aparecem depois de rolar ~8 px.
**Mobile:** altura `--header-h` (64 px); logo à esquerda; CTA compacto + botão de menu à direita; sem esconder ao rolar.
**Acessibilidade:** `header` + `nav aria-label`; `aria-current` no item da seção visível; botão de menu com `aria-expanded` e `aria-controls`.
**Motion:** N1 CSS, troca de fundo/borda (`--dur-base`). Reduced: troca instantânea.
**Não fazer:** mais de 6 itens; esconder o CTA; altura > 64 px no mobile.

# Componente — MenuMobile
**Função:** navegação em telas < 1024 px. **Anatomia:** painel de tela cheia · links grandes (Sora) · Botao primário ao fim · botão fechar.
**Props:** `itens` (`site.menu`), `cta` (`site.ctas.principal`), rótulos de `microcopy.acessibilidade`.
**Comportamento:** foco preso; fecha com Esc, toque no fundo e ao navegar por âncora; trava o scroll do fundo; links com ≥ 48 px de altura.
**Base:** Radix `Dialog`. **Motion:** N1 CSS, entrada ≤ 300 ms (opacidade + translateY curto); reduced: sem transição.
**Não fazer:** esquecer de devolver o foco ao botão de menu ao fechar.

# Componente — Botao
**Função:** todas as ações. Usos: header, hero, painel, contato, CTA final.
| Variante | Quando usar | Visual |
|---|---|---|
| `primario` | **só o CTA principal** (`site.ctas.principal`) | fundo `--color-primary`, texto `--color-primary-contrast`, pílula, ícone do WhatsApp à esquerda |
| `secundario` | CTA secundário (`site.ctas.secundario`) | contorno `--color-text`, fundo transparente |
| `link` | ações discretas ("Ver no mapa") | texto `--color-link` sublinhado |
| `icone` | botão de menu, setas do carrossel | 44×44, `aria-label` obrigatório |
**Tamanhos:** md (48 px), lg (56 px; hero e CTA final). *Build:* o padding lateral do `lg` é menor no mobile (`--space-3` até 389 px, `--space-4` até 479 px) para o texto longo do CTA caber em uma linha dentro dos painéis a 360 px.
**Estados:** globais; hover do primário: fundo `--color-primary-hover`, `translateY(-1px)`, `--shadow-2`.
**Props:** `variante`, `tamanho`, `cta` (objeto com `texto`, `destino`, `tipo`) ou `onClick`, `origem` (obrigatória: vai para o analytics e escolhe a variante do CTA principal).
**Um CTA = uma ação, rótulo varia por origem:** no `primario` de WhatsApp, o `origem` busca `site.ctas.variantes[origem]` e usa seu `texto`, `aria_label` (só quando o texto não diz que abre o WhatsApp; começa sempre com o texto visível) e `mensagem` (vai no `?text=` do `wa.me` via `hrefDoCta(cta, origem)` → `buildWhatsappUrl(contato, mensagem)`). Sem variante (ex.: `menu`), cai em `site.ctas.principal` e `mensagem_padrao`. Destino, estilo, ícone, `target` e evento (`cta_principal_click` + `origem`) são idênticos em todas as origens. Enquanto `whatsapp.numero` for "pendente", o destino é o `wa.link`, que não preenche mensagem: a variante só chega ao WhatsApp depois que o número entrar.
**Rótulos:** header e 404 "Pedir orçamento" · hero "Pedir orçamento no WhatsApp" · painel "Anunciar no painel de LED" · contato "Chamar no WhatsApp" · final "Quero o meu orçamento". Todos cabem em 1 linha a 360 px (testado 360–1440).
**Acessibilidade:** `<a>` para destino (WhatsApp, âncora), `<button>` para ação; foco visível.
**Regras:** no máximo um primário por dobra, **exceto o do header** (fixo, sempre visível, repete o CTA do hero por decisão das fichas); `tipo: whatsapp` abre em nova aba com `rel="noopener"`; o clique dispara `cta_principal_click`.
**Não fazer:** botão verde de WhatsApp; outro elemento com o estilo do primário.

# Componente — Secao
**Função:** padronizar container, espaço vertical, fundo e âncora. Usado em todas as seções.
| Prop | Tipo | Obrig. | Observação |
|---|---|---|---|
| id | string | sim | âncora (`#servicos`, …) |
| superficie | `padrao` \| `alt` \| `escura` | sim | `--color-bg` / `--color-bg-alt` / `data-surface="dark"` |
| formato | `contido` \| `painel` | não | `painel` = bloco inset com `--radius-xl` (mobile) e `--radius-2xl` (desktop) |
| titulo | string | não | gera o `h2` com `aria-labelledby` |
**Regras:** espaço `--section`; container `--container`; gutters `--gutter-mobile`/`--gutter-desktop`. `scroll-margin-top` = altura do header.

# Componente — Etiqueta
**Função:** rótulo pequeno em pílula (etiqueta do hero). Fundo `--color-bg-alt`, texto `--text-small` semibold, sem competir com o CTA. Prop: `texto` (`secoes.hero.etiqueta`). Contraste já verificado (texto sobre creme, 17:1).

# Componente — Icone
**Função:** conjunto único de ícones SVG (traço, 24 px padrão; tamanhos `--icon-sm/md/lg/xl`). Necessários: WhatsApp, menu, fechar, seta (←→↓), check, telefone, localização, Instagram. Decorativos com `aria-hidden`; os que são o único conteúdo de um botão ganham `aria-label` no botão.

# Componente — Midia
**Função:** imagem com dimensões e proporção fixas, ou placeholder honesto.
| Prop | Tipo | Obrig. | Origem |
|---|---|---|---|
| src | string | sim | `*.src` (`"pendente"` = placeholder) |
| alt | string | sim | `*.alt` |
| proporcao | `4-3` \| `1-1` \| `16-9` \| `16-10` \| `3-4` | sim | token `--aspect-*` |
| raio | `lg` \| `xl` | não | padrão `xl` |
| prioridade | boolean | não | `true` só na 1ª dobra |
**Placeholder (`src: "pendente"`):** bloco com a mesma proporção e raio, fundo `--color-bg-alt`, legenda "foto em breve" em `--color-text-muted`, **sem** imagem de banco.
**Regras:** `width`/`height` declarados, `srcset`/`sizes`, WebP/AVIF, `loading="lazy"` fora da 1ª dobra, `object-fit: cover`.
**Hover (desktop, quando dentro de cartão):** zoom 1,03 em `--dur-base`. Reduced: sem zoom.

# Componente — MiniaturaInline  (**novo**)
**Função:** foto pequena inserida **dentro de uma frase** (hero e CTA final), a assinatura visual herdada do Packhelp.
**Anatomia:** `span` inline-block com tamanho em `em` (para acompanhar a fonte) → 1–3 `Midia` empilhadas → inclinação por `--tilt`.
| Prop | Tipo | Obrig. | Origem |
|---|---|---|---|
| fotos | Midia[] (1–5) | sim | `secoes.hero.midias_miniatura` (`fotos` girada por `inicio[n]`), `secoes.cta_final.miniatura.fotos` |
| inclinacao | `esq` \| `dir` | sim | alterna entre as miniaturas |
| atraso | ms | não | defasagem do ciclo |
**Tamanho:** ~1,1 em de altura (≈ 40 px a 360 px; ≈ 64–80 px no desktop); `--radius-sm`; reserva o espaço para não gerar CLS.
**Estados:** hover (desktop): endireita (`rotate(0)`) e cresce com `scale(var(--zoom-hover))` (2,4 ≈ 180 px) por cima do texto, com `--shadow-3`, `--dur-base` (como o Packhelp, 0,3 s). Active: igual ao hover. Sem foco (decorativa, não interativa).
**Mobile:** estática, mostra a 1ª foto, sem ciclo.
**Acessibilidade:** a frase se lê completa sem a miniatura; a miniatura é `aria-hidden` se `alt` não acrescentar informação (decisão do `content.json`: `alt` descritivo, então fica exposta como imagem sem prejudicar a leitura).
**Motion:** N1 CSS. Entrada: `opacity` + `scale(.8→1)`, `--dur-slow`, escalonada `--stagger-step`. Ciclo (só desktop e `prefers-reduced-motion: no-preference`): crossfade de opacidade, 1,5 s por foto (`--slot`; `--ciclo` = `--slot` × nº de fotos), com defasagem por miniatura (`atraso`); a miniatura é `aria-hidden` (decorativa). Reduced: 1ª foto parada.
**Não fazer:** animar a headline; usar mais de 3 miniaturas; ciclar no mobile.

# Componente — Faixa  (**novo**)
**Função:** faixa inclinada em marquee (seção `faixa`).
**Props:** `itens: string[]` (`secoes.faixa.itens`).
**Anatomia:** contêiner com `transform: rotate(calc(var(--tilt) * -0.1875))` (≈ −1,5°) e `overflow-x: clip` · trilho com os itens duplicados · separador entre itens.
**Estilo:** fundo `--color-primary-subtle`, texto `--color-text` 14–16 px, altura ~48 px.
**Motion:** N1 CSS, `animation: marquee var(--marquee-duration) linear infinite`; pausa ao toque (`pointerdown` alterna), com foco dentro e quando fora da viewport. **Mouse em cima não pausa: desacelera** para `--marquee-velocidade-hover` (0,3 = 30%) via `playbackRate` da animação (sem salto de posição) e volta ao normal ao sair. Reduced: estática, sem inclinação (`--tilt: 0deg`) e sem duplicação visível.
**Acessibilidade:** a cópia duplicada é `aria-hidden`; a faixa não é focável.
**Não fazer:** gerar rolagem horizontal da página (cortar as pontas no contêiner).

# Componente — Abas
**Função:** trocar o grupo de serviços. Base: Radix `Tabs`.
| Prop | Tipo | Obrig. | Origem |
|---|---|---|---|
| grupos | {id, rotulo}[] | sim | `secoes.servicos.grupos` |
| painel | ReactNode | sim | itens filtrados por `grupo` |
**Visual:** trilho `--color-bg-alt` com `--radius-full`; aba ativa em `--color-surface` com `--shadow-1`; texto semibold.
**Estados:** padrão, hover, focus-visible, ativa (`aria-selected`).
**Mobile:** o trilho rola na horizontal (com a última aba cortada, indicando que há mais); alvo 44 px de altura.
**Acessibilidade:** `tablist`/`tab`/`tabpanel`, setas ←→, Home/End; foco visível.
**Motion:** troca de painel por crossfade de opacidade (`--dur-fast`); altura do painel fixa ao maior grupo (sem CLS). Reduced: troca instantânea.
**Evento:** `servico_aba_change`.

# Componente — CarrosselSnap
**Função:** fileira de cartões que rola na horizontal no mobile (cartões de serviço).
**Regras:** `scroll-snap-type: x mandatory`; ~85% do 1º cartão visível e a ponta do 2º; botão de seta visível (Botao `icone`) à direita; indicador de posição; **sem autoplay**; no desktop vira grade (não é carrossel).
**Acessibilidade:** região rolável com `tabindex="0"` e `aria-label`; setas movem por um cartão; nada essencial fica só fora da tela sem controle.
**Motion:** rolagem do botão com `scroll-behavior: smooth`; reduced: instantânea.

# Componente — CartaoServico
**Função:** um serviço (seção serviços). Variante única `servico`.
| Prop | Tipo | Obrig. | Origem |
|---|---|---|---|
| nome | string | sim | `itens[].nome` |
| descricao | string (≤ 25 palavras) | sim | `itens[].descricao` |
| imagem | Midia | sim | `itens[].imagem` |
**Anatomia:** `Midia` (`4-3`, `--radius-xl`) → nome (`--text-h3`) → descrição (`--text-body`, `--color-text-muted`). **Sem moldura de cartão**, como no Packhelp.
**Estados:** hover (desktop): foto com zoom 1,03 e título com sublinhado; active: `scale(.98)`; **não é clicável** (sem destino), então não tem foco.
**Mobile:** largura ~85% do contêiner dentro do carrossel; descrição sempre visível.
**Não fazer:** esconder a descrição até o hover.

# Componente — ListaCheck
**Função:** lista curta com ✓ (destaques do painel de LED).
**Props:** `itens: {rotulo}[]` (`secoes.painel_led.destaques`). Ícone check em `--color-accent` (sobre escuro), texto `--color-text`, espaçamento `--space-3`. Semântica `ul`; o ícone é decorativo.

# Componente — Passo
**Função:** passo numerado (como funciona). **Props:** `numero`, `titulo`, `descricao` (`secoes.como_funciona.passos[]`).
**Anatomia:** numeral grande (`--text-h1`, Sora 700) → título (`--text-h3`) → descrição. Cartão `--color-surface`, `--shadow-1`, `--radius-xl`. Linha de ligação (vertical no mobile, horizontal no desktop) é decorativa (`aria-hidden`).
**Semântica:** `ol` com `li`. **Motion:** reveal escalonado (R2), N1 CSS.

# Componente — CartaoTrabalho
**Função:** foto de trabalho com legenda **abaixo** (portfólio). Mesma lógica do Packhelp.
**Props:** `imagem` (Midia, `1-1`), `nome`, `categoria` (`secoes.portfolio.itens[]`).
**Anatomia:** foto (`--radius-lg` no mobile, `--radius-xl` no desktop) → nome (15 px, semibold) → categoria (`--text-small`, `--color-text-muted`). Não clicável.
**Hover (desktop):** zoom 1,03 na foto. Mobile: sem efeito.

# Componente — CartaoUnidade
**Função:** uma loja (contato).
| Prop | Tipo | Obrig. | Origem |
|---|---|---|---|
| nome | string | sim | `unidades[].nome` |
| telefone | string | sim | `unidades[].telefone` |
| endereco | string \| null | não | `unidades[].endereco` |
**Anatomia:** nome (`--text-h3`) · linha com ícone de localização + endereço (só se existir) · linha com ícone de telefone (link `tel:`) · Botao `link` "Ver no mapa" (só se houver endereço; abre `https://www.google.com/maps/search/?api=1&query=<endereço>` em nova aba).
**Estilo:** `--color-surface`, `--shadow-1`, `--radius-xl`, padding `--space-5`.
**Acessibilidade:** `address`/`article`, alvos ≥ 44 px, links com texto claro ("Ligar para (75) 98136-4285").
**Eventos:** `telefone_click`, `mapa_click`.
**Não fazer:** inventar texto para o endereço ausente (a linha some).

# Componente — Accordion
**Função:** FAQ. Base: Radix `Accordion` (tipo `single`, `collapsible`).
**Props:** `perguntas: {pergunta, resposta}[]` (`secoes.faq.perguntas`).
**Visual:** cada linha em bloco `--color-bg-alt`, `--radius-lg`, altura mínima 56 px, seta à direita que gira ao abrir.
**Acessibilidade:** botão com `aria-expanded`/`aria-controls`; Enter/Espaço; foco visível.
**Motion:** R17: abertura por `grid-template-rows` 0fr→1fr em `--dur-base`. Reduced: sem transição.
**Evento:** `faq_open` (parâmetro: pergunta).

# Componente — Footer
**Função:** fechar, contatos, links legais. **Props:** `secoes.footer` + `site.logo` + `site.redes`.
**Anatomia:** logo · `descricao_curta` · link do Instagram (ícone + rótulo) · `colunas` (título + `ul` de links) · `links_legais` · `copyright`.
**Estilo:** `--color-bg-alt`; títulos das colunas `--text-small` muted. Mobile: 2 colunas de links, legais empilhados. Contraste AA mantido.
**Evento:** `instagram_click`.

# Componente — Pagina404
**Função:** rota inexistente. **Props:** `microcopy.pagina_404` (titulo, texto, cta). Mesmo Header/Footer do site; Botao primário só se o destino for o CTA principal, senão `secundario` para "Voltar ao início" (o CTA principal continua sendo o WhatsApp do header).

# Componente — BannerCookies  (**condicional**)
**Só existe se houver analytics ou scripts de terceiros não essenciais.** Textos de `microcopy.cookies` (rascunho, `validar`). Botões **Aceitar** e **Recusar** com o mesmo peso visual; link para `/privacidade`; lembra a escolha; não bloqueia o conteúdo. **Revisão jurídica (LGPD) obrigatória.**

---
## Campos do `content.json` acrescentados no build
Texto de componente nunca é fixo; quando a spec precisou de um texto que não existia, a chave entrou no JSON. Tudo abaixo foi acrescentado (nada existente foi removido).

| Caminho | Valor / uso | Onde |
|---|---|---|
| `site.ctas.variantes.<origem>` (`header`, `hero`, `painel`, `contato`, `final`, `404`) | `texto`, `aria_label` (opcional) e `mensagem` do WhatsApp por origem; substituiu `principal.texto_curto` (o header agora usa o rótulo curto da variante em todos os tamanhos) | Botao |
| `site.logo.src` / `largura` / `altura` / `provisorio` | caminho do SVG provisório (em vez de `"pendente"`), dimensões para evitar CLS, marca de que não é o vetor oficial | Header, MenuMobile |
| `secoes.hero.headline` | os marcadores `{1}` `{2}` `{3}` indicam onde entra cada `midias_miniatura` na frase; o texto lido é o mesmo | Hero |
| `microcopy.acessibilidade.menu_principal` | `aria-label` da `nav` do header ("Principal") | Header |
| `microcopy.acessibilidade.menu_titulo` | título do diálogo do menu e `aria-label` da `nav` dentro dele ("Menu") | MenuMobile |
| `microcopy.acessibilidade.servicos_proximo` / `servicos_voltar` | `aria-label` da seta do carrossel de serviços ("Ver próximo serviço" / "Voltar ao primeiro serviço", quando está no último cartão) | CarrosselSnap |
| `microcopy.midia.foto_em_breve` | legenda do placeholder honesto ("foto em breve") | Midia |
| `microcopy.validar.rotulo` | marca visível "A validar" em itens `validar: true` | MarcaValidar |

| `secoes.painel_led.midia` (`src` do vídeo, `capa`, `alternativa_link`; `<video>` nativo, sem `Midia`) · `secoes.painel_led.descricao_neutra` / `midia.alt_neutro` (nome acessível do vídeo) / `destaques_neutros` | versão sem fatos não confirmados (sem 2×3 m, Praça do Manteiga, 300 exibições, VT de 20 s); é a que vai para produção | PainelLed |
| `secoes.painel_led.descricao_validar` / `midia.alt_validar` | marcam `descricao` e `midia.alt` originais como `validar`; só aparecem no modo revisão, com a marca | PainelLed |
| `secoes.faq.perguntas[].resposta_neutra` | versão sem fatos não confirmados das respostas `validar` (prazo e arte pronta); é a que vai para produção (a original só no modo revisão) | Faq / Accordion |
| `secoes.cta_final.headline` | marcador `{1}` depois de "marca" indica onde entra `cta_final.miniatura.fotos` (texto lido: o mesmo) | CtaFinal |
| `paginas_legais.rascunho_aviso` / `rascunho_detalhe` | aviso de rascunho no topo das páginas legais ("Rascunho — pendente de revisão jurídica" + explicação) | PaginaLegal |
| `paginas_legais.privacidade` / `termos` | `titulo`, `rascunho` (`true` = aviso + `noindex`), `atualizacao` e `secoes[]` (`titulo`, `paragrafos[]`, `itens[]`). Campos `[A PREENCHER: ...]` são destacados em amarelo | PaginaLegal, `/privacidade`, `/termos` |
| `microcopy.contato.ver_no_mapa` / `ligar_para` | texto do link "Ver no mapa" e prefixo do `aria-label` do telefone ("Ligar para (75) …") | CartaoUnidade |
| `secoes.faixa.itens[0]` | "Criação da arte e instalação na região" (substituiu "Do arquivo à instalação") | Faixa |

**Itens `validar: true`:** só aparecem quando `NEXT_PUBLIC_EXIBIR_ITENS_VALIDAR=1` (revisão/preview) e, nesse caso, sempre com a marca. Em produção a variável não existe (T6.3). Seção inteira `validar` (Como funciona) não é renderizada em produção e o link dela sai do menu (`menuVisivel()` em `lib/content.ts`); onde há texto neutro (painel de LED), a produção usa o neutro.

## Notas de implementação (T4)
- **SEO:** `lib/seo.ts` calcula a origem do site a partir de `site.dominio` (`"pendente"` → `null`). Sem domínio não existem `canonical`, `og:url`, `og:image`, linha `Sitemap` no `robots.txt` nem URLs no `sitemap.xml` (sai vazio). Com domínio, o layout define `metadataBase` e o Next monta URLs absolutas. Páginas legais em `rascunho` não entram no sitemap, saem com `noindex` e sem `canonical`; o `robots.txt` não as bloqueia (o rastreador precisa ler o `noindex`).
- **JSON-LD** (`lib/jsonld.ts`, `components/JsonLd.tsx`): `LocalBusiness` de `seo.home.schema` (só dados com fonte) e `FAQPage` das respostas efetivamente publicadas (`faqItens()`; neutras em produção; some se o FAQ não é renderizado). `url` só com domínio. Sem `image`, `openingHours`, `priceRange` nem `geo` (sem fonte).
- **`npm run check:publicacao`** (`scripts/check-publicacao.mjs`): ver T6.6.

## Notas de implementação (T3)
- **Pagina404** (`app/not-found.tsx`): texto de `microcopy.pagina_404`, o CTA principal (primário, o mesmo do header) e "Voltar ao início" (secundário). Status 404 e `noindex`.
- **PaginaLegal** (`components/PaginaLegal.tsx`): usada por `/privacidade` e `/termos`; aviso de rascunho no topo (`aside role="note"`), `h1` único, `max-width: 65ch`. `robots: noindex, nofollow` enquanto `rascunho: true`.
- **Navegação fora da home:** `NavPrincipal` recebe `href` pronto (`/#servicos`); o `destino` (`#servicos`) continua servindo ao scroll-spy.

## Notas de implementação (T1–T2)
- **Token novo:** `--aspect-16-10` (`design-tokens.css` e `.json`), usado pelo `Midia` `16-10` e nos cartões de serviço de grupos com 2 itens no desktop.
- **`Midia` 4:3** lê `--aspecto-midia` (se definido pelo contêiner) antes de `--aspect-4-3`: é como o carrossel troca 4:3 → 16:10 por breakpoint sem prop de breakpoint.
- **Header:** o texto longo do CTA ("Pedir orçamento no WhatsApp") só aparece a partir de 1280 px; em 1024–1279 a barra (logo + 5 links + CTA) não comporta a frase inteira, então usa `texto_curto`.
- **Reveal (R1/R2):** `RevealObserver` marca `data-revealed` em `[data-reveal]` e `[data-reveal-filhos]` (filhos diretos, escalonados). O estado oculto só existe com `html.js-motion` e sem `prefers-reduced-motion`. Rede de segurança: se o observador não subir em 4 s, `js-motion` é removido e tudo aparece.
- **Abas:** todos os painéis ficam montados (`forceMount`) e empilhados na mesma célula da grade; os inativos ficam `visibility: hidden`. A altura é a do maior grupo (sem CLS) e, sem JS, os 3 grupos viram uma lista contínua com o rótulo de cada um.

---
## Verificação da fase
- [x] Todos os componentes citados nas fichas têm spec
- [x] Nenhum componente duplicado com outro nome
- [x] Estados e acessibilidade definidos
- [x] Nenhum depende de hover (hover só reforça; no toque há `:active` e informação visível)
- [x] Fichas atualizadas com nomes finais (`sections/*.md`)

- **Carga sob demanda (T5.2):** `Abas.tsx` e `Accordion.tsx` renderizam no servidor uma **casca estática** (mesmo HTML, mesmas classes, papéis e `data-state` que o Radix desenha) e só baixam o Radix (`AbasRadix.tsx`, `AccordionRadix.tsx`) quando a seção chega a 100 px da tela ou quando alguém usa o componente (foco por teclado ou clique). Na troca, o foco volta ao botão equivalente, o clique já dado é repetido e o estado de `data-reveal` é preservado (`useSobDemanda.ts`; o `RevealObserver` observa nós novos). **Quem mexer na estrutura de um lado precisa mexer no outro.**
