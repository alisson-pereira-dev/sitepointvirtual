# Ficha — S06 Serviços
## 1. Identificação
slug `servicos` · Ordem 4 · completo · âncora `#servicos`
## 2. Função
Mostrar o que a Point faz, por necessidade, de forma que o visitante se reconheça em 5 s. Papel: interesse. CTA: o subtítulo manda chamar no WhatsApp se não achar; o secundário do hero rola até aqui.
## 3. Conteúdo
`secoes.servicos` (titulo, subtitulo, 3 `grupos`, 8 `itens`). Faltando: fotos. validar: nenhum item.
## 4. Layout
- **Referência:** Packhelp ("Whatever you make, we pack it": abas em pílula + fileira de cartões grandes só de foto) + V4 do catálogo.
- **Estrutura mobile:** título e subtítulo à esquerda → **abas em pílula** numa barra com rolagem horizontal (visível o suficiente para mostrar que há mais) → cartões em **carrossel com snap**, mostrando ~85% do 1º cartão e a pontinha do 2º, com botão de seta visível à direita e indicador. Cartão = foto (`--aspect-4-3`, `--radius-xl`), nome (`--text-h3`), descrição de 2–3 linhas sempre visível (nada escondido em hover).
- **Estrutura desktop:** título à esquerda; abas à esquerda abaixo do título (ou na mesma linha, à direita, como no Packhelp). Grupo com 4 itens: grade de 4 colunas. Grupos com 2 itens: grade de 2 colunas com foto `16:10`. Altura do painel fixa ao maior grupo para a página não pular ao trocar de aba.
- **Tab ativa:** a primeira ("Para o seu negócio"). Pílula ativa em `--color-surface` sobre trilho `--color-bg-alt`, como no Packhelp.
- **Hierarquia:** foto > nome > descrição.
- **Herdar:** cartões de foto com legenda abaixo, sem moldura; abas em pílula dentro de um trilho; seta no canto. **Não copiar:** "See all packaging", carrossel que esconde itens sem aviso.
## 5. Componentes
- Secao (padrao, id `servicos`)
- Abas (Radix Tabs)
- CarrosselSnap (mobile)
- CartaoServico (×8)
- Midia (`4-3`)
- Icone (seta)
- Novos componentes a especificar? não (specs em `docs/componentes.md`)

## 6. Jornada UX
- **Vê:** Título, subtítulo, abas em pílula e os cartões do 1º grupo.
- **Faz:** Toca numa aba; arrasta o carrossel (mobile); lê os cartões.
- **Reage:** O painel troca com fade curto; a aba ativa ganha o fundo claro e a sombra.
- **Sente/entende:** "Eles fazem exatamente o que eu procuro."
- **Atrito → mitigação:** Abas ou cartões fora da tela no mobile → a barra mostra a próxima aba cortada; o carrossel tem a ponta do próximo cartão, a seta e o indicador.
- **Saída:** Painel de LED, ou o CTA do header/subtítulo para pedir pelo WhatsApp.
- **Evento de analytics:** `servico_aba_change` (grupo).
- **No mobile:** Carrossel com snap; nada fica escondido sem aviso.

## 7. Motion
- Nível declarado: N1 · Biblioteca: CSS (+ Radix Tabs para o comportamento)
- Elementos animados e receita (`09-MOTION`): Título e cartões: reveal escalonado (R1/R2, ≤ 8 itens). Troca de aba: crossfade. Cartão: hover R10.
- **Desktop:** Reveal: `opacity` + `translateY(var(--reveal-distance))`, `--dur-slow`, `--ease-out`, `--stagger-step`. Crossfade de aba em `--dur-fast`. Hover do cartão: zoom 1,03 na foto.
- **Mobile:** Reveal por grupo, distância e duração menores. Sem hover; `:active` com `scale(.98)`. Rolagem do carrossel nativa.
- **Reduced-motion:** Tudo visível sem deslocamento; troca de aba instantânea; sem zoom.
- Fallback se o JS falhar: Todas as abas viram uma lista contínua dos 8 itens (cada grupo com seu rótulo).
- Só `transform` e `opacity`; conteúdo da 1ª dobra nunca fica oculto esperando a animação.

## 8. Mobile
- Layout em 360–430 px: descrito primeiro no item 4.
- Diferenças em relação ao desktop: Abas em barra rolável; cartões em carrossel; descrição sempre visível.
- Alvos de toque, gestos, teclado: Abas com 44 px de altura; seta de 44×44; deslizar horizontal não conflita com a rolagem vertical (eixo travado).
- Mídia: Fotos 4:3 de 640×480 (mobile) a 960×720 (desktop), WebP/AVIF, `srcset`, `loading="lazy"`.
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
- [ ] Abas com `role="tablist"`, setas do teclado, painel ligado por `aria-controls` · [ ] trocar de aba não causa CLS · [ ] foto com placeholder de mesma proporção até chegar a real
## 11. Status
completa (pronta para o build; depende dos itens `validar` e dos ativos pendentes)
