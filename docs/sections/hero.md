# Ficha — S01 Hero
## 1. Identificação
slug `hero` · Ordem 2 · completo · âncora `#inicio`
## 2. Função
Em 5 s: é uma gráfica e comunicação visual da região e o próximo passo é pedir orçamento no WhatsApp. Papel: entrada. CTA: primeira aparição do principal.
## 3. Conteúdo
`secoes.hero` (etiqueta, headline, subheadline, cta, cta_secundario, 3 `midias_miniatura`, prova_rapida). validar: `prova_rapida` ("+ de 15 anos"). Mídia: `midias_miniatura = { fotos: [5], inicio: [0, 2, 4] }`. As 3 miniaturas quadradas percorrem as mesmas 5 fotos (`public/assets/hero_image_gif00–04.jpg`, informadas como trabalhos reais pelo responsável), cada uma começando num ponto (`inicio`); no mobile e em reduced-motion cada uma mostra só a 1ª (00, 02 e 04).
## 4. Layout
- **Referência:** Packhelp (hero) + V3 tipográfico do catálogo.
- **Estrutura mobile:** tudo **centralizado**, uma coluna. Etiqueta (pílula pequena) → headline em `--text-display` (≈ 40 px a 360 px) em 4–5 linhas → subheadline → CTA principal **largura total** → CTA secundário como botão contornado → prova rápida em uma linha pequena. As 3 miniaturas ficam **dentro da frase**, com ~40 px, inclinadas por `--tilt` (±8°), cantos `--radius-sm`.
- **Estrutura desktop:** mesma ordem, centralizada, container largo (~1184 px = `--container` menos os gutters desktop) para a headline fechar em **2 linhas**; miniaturas de ~64–76 px; CTAs lado a lado. *Motivo da mudança (build T1):* com Sora 700 em `--text-display`, o container de ~960 px quebrava a headline em 3 linhas no desktop; em ~1184 px ela fecha em 2.
- **Posição das miniaturas:** headline "Sua marca [m1] bem vista, do [m2] letreiro ao [m3] brinde." Cada miniatura alterna 2–3 fotos (CSS), uma por vez, defasadas.
- **Hierarquia:** headline > miniaturas > CTA > subheadline > prova rápida.
- **Espaço:** `--section` acima e abaixo; fundo `--color-bg`.
- **Herdar:** headline grande de peso médio com letras fechadas; imagens no meio do texto; CTAs logo abaixo; prova em linha cinza. **Não copiar:** terceiro CTA ("Build your packaging"), faixa de logos de marcas, abas de categoria colocadas já abaixo dos botões (aqui a faixa e os serviços vêm depois).
- **Sem foto grande no hero** (o LCP é o texto): `hero.midia` foi removida do JSON.
## 5. Componentes
- Secao (padrao, id `inicio`)
- Etiqueta
- MiniaturaInline (×3)
- Botao/primario (lg)
- Botao/secundario (lg)
- Midia (miniaturas)
- Novos componentes a especificar? não (specs em `docs/componentes.md`)

## 6. Jornada UX
- **Vê:** Etiqueta, headline grande com 3 miniaturas dentro da frase, subheadline e o botão principal na primeira dobra.
- **Faz:** Toca no CTA principal, no secundário, ou rola.
- **Reage:** O principal abre o WhatsApp em nova aba. O secundário rola até `#servicos`. No desktop, a miniatura sob o ponteiro se endireita.
- **Sente/entende:** "É uma gráfica daqui e é fácil pedir."
- **Atrito → mitigação:** "+ de 15 anos" sem confirmação → marcado `validar`; texto neutro se o cliente não confirmar. O subheadline foi reescrito por decisão do responsável do projeto ("Letreiros, fachadas, plotagem, acrílico, painel de LED e brindes, com criação da arte e instalação na região."); ele afirma criação da arte e instalação, que ainda constam como `validar` em Sobre e FAQ.
- **Saída:** CTA principal ou a faixa/serviços logo abaixo.
- **Evento de analytics:** `cta_principal_click` (origem `hero`), `cta_secundario_click`.
- **No mobile:** CTA na primeira dobra, largura total.

## 7. Motion
- Nível declarado: N1 (momento de destaque da página) · Biblioteca: CSS
- Elementos animados e receita (`09-MOTION`): Miniaturas: entrada escalonada (R2 adaptada) + ciclo de fotos (crossfade) + endireitar no hover (R10). A headline, o subtítulo e os botões **não animam** (são o LCP).
- **Desktop:** Entrada das miniaturas: `opacity` e `scale(.8→1)`, `--dur-slow`, `--ease-out`, defasagem `--stagger-step`. Ciclo: cada foto fica 1,5 s (`--slot`; volta inteira de 5 fotos = 7,5 s), crossfade de ~0,3 s, só opacidade. As miniaturas são defasadas em 0 / 0,5 / 1 s (`ATRASOS_CICLO_MS` em `Hero.tsx`): as trocas nunca caem no mesmo instante (uma a cada ~0,5 s) e as 3 estão sempre em fotos diferentes. Verificado por varredura (pausar as animações e percorrer `currentTime` de 10 em 10 ms por 3 voltas): 0 amostras com a mesma foto em duas miniaturas, nem durante o fade; menor distância entre trocas ≈ 490 ms. **Refazer a varredura ao mudar `--slot`, o nº de fotos, `inicio` ou os atrasos.** Hover (`pointer: fine`): a troca de fotos vira corte seco (sem fade, mesmo ritmo); `rotate(0)` + `scale(2.4)` (`--zoom-hover`), por cima do texto, com `--shadow-3`, `--dur-base`.
- **Mobile:** Entrada curta (`--dur-base`). **Sem ciclo:** mostra a 1ª foto de cada miniatura. Sem hover; `:active` com `scale(.98)` nos botões.
- **Reduced-motion:** Miniaturas já no lugar, sem inclinação (`--tilt: 0deg`), sem ciclo.
- Fallback se o JS falhar: Texto e botões visíveis; miniaturas aparecem estáticas (a 1ª foto).
- Só `transform` e `opacity`; conteúdo da 1ª dobra nunca fica oculto esperando a animação.

## 8. Mobile
- Layout em 360–430 px: descrito primeiro no item 4.
- Diferenças em relação ao desktop: Headline em 4–5 linhas centralizadas; miniaturas de ~40 px; botões em largura total e empilhados; prova rápida em uma linha pequena.
- Alvos de toque, gestos, teclado: Botões de 56 px de altura; espaço de `--space-3` entre eles.
- Mídia: Miniaturas quadradas 160×160 (exibidas a ~40–80 px), WebP, `loading="eager"` apenas se visíveis na 1ª dobra, com `width`/`height`.
## 9. Critérios de aceite
Definition of Done desta seção:
- [ ] Conteúdo vem do `content.json`, sem texto solto no componente
- [ ] Usa apenas tokens do design system
- [ ] Responsiva de 360 px a 1440 px+ sem rolagem horizontal
- [ ] Contraste AA em todos os textos e controles
- [ ] Imagens com `alt`, dimensões definidas, formatos otimizados e lazy fora da 1ª dobra
- [ ] Foco visível e navegação por teclado funcionando
- [ ] Motion nas 3 versões (desktop, mobile, reduced-motion)
- [ ] Nada depende de hover
- [ ] Sem regressão de CLS/LCP (fora do orçamento)
- [ ] CTA coerente com o CTA principal
Específicos:
- [ ] LCP = headline (texto), < 2,5 s · [ ] headline legível sem quebra ruim de 360 a 1440 px · [ ] as 3 miniaturas têm `alt`; sem elas o texto lê normalmente · [ ] `h1` único
## 11. Status
completa (pronta para o build; depende dos itens `validar` e dos ativos pendentes)
