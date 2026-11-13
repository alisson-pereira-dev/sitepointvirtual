# CLAUDE.md — Point Virtual

## Contexto
- **Negócio:** Point Virtual, gráfica rápida e comunicação visual em Muritiba/Cachoeira/Recôncavo (BA).
- **Objetivo único / CTA principal:** "Pedir orçamento no WhatsApp" (`site.ctas.principal`).
- **Público:** comerciantes, organizadores de eventos e moradores da região.
- **Tom de voz:** próximo e claro, frases curtas, verbos de ação. Sem "líder de mercado", sem urgência falsa, sem jargão sem explicar.
- **Direção de Arte:** "Gráfica de bairro com cara de plataforma". Palavras-chave: vermelho · vivo · tátil · local · claro · acabamento · direto.
- **Nível de motion:** N1, só CSS.

## Fontes da verdade
- Conteúdo: `content/content.json` — **nenhum texto fixo em componente**
- Tokens: `styles/design-tokens.css` — **nenhum valor literal de cor, fonte, espaço, sombra**
- Fichas de seção: `docs/sections/*.md`
- Componentes: `docs/componentes.md`
- Jornada: `docs/jornada-ux.md`
- PRD: `docs/PRD.md`
- Pendências de dados: `docs/assets-needed.md` e `meta.pendencias_validar`

## Ordem de trabalho
1. Ler `docs/PRD.md` e `docs/tasks.md`.
2. Executar as tarefas na ordem. **Primeira entrega: fatia vertical** (tokens + header + hero). Parar e mostrar para validação.
3. Para cada seção, seguir a ficha e cumprir o DoD.
4. Antes de dar uma tarefa por concluída, rodar lint, build e (quando aplicável) Lighthouse.

## Regras inegociáveis
- **Mobile-first.** Testar 360–430 px primeiro.
- **Um único CTA principal**, sempre vermelho (`--color-primary`) e com o mesmo estilo; é uma só ação (abrir o WhatsApp) e só o rótulo e a mensagem variam por origem (`site.ctas.variantes`). Nada de botão verde de WhatsApp.
- **Fatos só com fonte.** Itens `validar: true` não são apresentados como verdade; manter a marcação.
- **Depoimentos, números e preços:** não existem no site sem fonte real. Não criar seção de depoimentos, selos ou estrelas.
- **Acessibilidade AA:** contraste, foco visível, teclado, `alt`, `lang="pt-BR"`.
- **Motion:** as 10 regras de `09-MOTION`; 3 versões por animação; só `transform` e `opacity`; conteúdo visível sem JS; nada depende de hover; sem scroll-jacking.
- **Performance:** LCP < 2,5 s, INP < 200 ms, CLS < 0,1 (alvos a verificar no build).
- **Sem segredos no frontend.**
- **Não inventar conteúdo.** Se faltar dado, usar o texto neutro do JSON ou sinalizar.
- **Imagens:** só fotos reais do trabalho, com a mesma máscara e raio. Enquanto não chegam, usar o placeholder honesto do componente `Midia` ("foto em breve"). Nunca banco de imagens.
- **Não usar o conteúdo de demonstração do design system original** (preços, estrelas, textos de exemplo): foi descartado.

## Decisões do projeto
| Decisão | Valor | Motivo |
|---|---|---|
| Nível de motion | N1, só CSS | Referência (Packhelp) também é só CSS; leveza no mobile; sem dependência extra |
| 3D no hero? | não | Sem função para o negócio; custo de performance |
| Tema | claro + 2 seções escuras (`data-surface="dark"`) | Ritmo visual; painel de LED e CTA final em destaque |
| Formulário | não | A conversão é o WhatsApp; formulário duplicaria a ação |
| Analytics | a definir (helper `trackEvent` sem efeito até lá) | Evita cookies e banner sem necessidade |
| CTA flutuante | não | Header fixo já mantém o CTA visível; repetido em 4 seções |
| Rótulo do CTA | um CTA = uma ação, rótulo varia por origem | Mesmo destino, estilo e comportamento; `site.ctas.variantes` (header, hero, painel, contato, final, 404) define texto, `aria_label` e mensagem do WhatsApp; sem variante cai em `site.ctas.principal` |
| Cor primária | `#DB050F` (hover `#C50107`) | Ajustada ao tom do logo e para contraste AA com branco (5,2:1) |
| Fontes | Sora 700 + Inter 400/600 | 3 pesos, sem mono; poucos bytes |
| Header | 64 px (mobile) / 72 px (desktop) | `--header-h`, `--header-h-desktop` |
| Link do WhatsApp | helper `buildWhatsappUrl` | Com `numero` monta `wa.me` com a `mensagem` da variante da origem (ou `mensagem_padrao`); sem número usa o `wa.link` (não preenche mensagem) |
| Depoimentos | seção ausente | Sem material real autorizado |

## Skills a usar
Depende do boilerplate (ainda a ser fixado): usar as de SEO, acessibilidade, mobile e auditoria pré-lançamento. Não usar skills de GSAP/R3F/Lenis neste projeto.

## Mudanças em relação ao boilerplate
| Item alterado | Por quê | Candidato a promover ao boilerplate? |
|---|---|---|
| Motion só CSS (sem GSAP/Lenis) | N1 suficiente | não |
| Helper `buildWhatsappUrl` | `wa.link` não aceita mensagem | sim |
| `trackEvent` sem efeito até haver analytics | Privacidade por padrão | sim |
| Reveal por IntersectionObserver com `html.js-motion` | Conteúdo visível sem JS | sim |

## Definition of Done (global)
- [ ] Conteúdo vem do `content.json`
- [ ] Tokens, sem valores literais
- [ ] Responsivo 360 px → 1440 px+, sem rolagem horizontal
- [ ] AA, foco, teclado, `alt`
- [ ] Motion nas 3 versões
- [ ] Sem regressão de performance
- [ ] Build e lint sem erros

## Quando estiver em dúvida
Perguntar antes de assumir. Preferir a opção mais simples que atenda à ficha.
