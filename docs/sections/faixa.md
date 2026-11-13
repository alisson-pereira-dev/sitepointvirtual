# Ficha — Faixa (marquee)
## 1. Identificação
slug `faixa` · Ordem 3 · completo · âncora: —
## 2. Função
Reforçar três fatos verificáveis (do arquivo à instalação; Cachoeira · Muritiba · Recôncavo; gráfica rápida e comunicação visual) e dar ritmo entre o hero e os serviços. Papel: interesse.
## 3. Conteúdo
`secoes.faixa.itens` (3 textos). Faltando: nenhum. validar: —.
## 4. Layout
- **Referência:** Packhelp (faixa azul clara inclinada com "Minutes away from perfect packaging").
- **Estrutura:** faixa de largura total, **inclinada ~−1,5°**, fundo `--color-primary-subtle`, texto `--color-text` em 14–16 px com um separador pequeno entre os itens, repetidos em linha contínua. Altura ~48 px. As pontas não podem gerar rolagem horizontal (`overflow-x: clip` no contêiner).
- **Mobile:** mesma faixa, 13–14 px, velocidade igual ou menor.
- **Herdar:** inclinação e marquee lento. **Não copiar:** ícone de caixa.
## 5. Componentes
- Faixa (marquee inclinado)
- Novos componentes a especificar? não (specs em `docs/componentes.md`)

## 6. Jornada UX
- **Vê:** Faixa inclinada com os 3 textos passando devagar.
- **Faz:** Nada (opcionalmente toca para pausar).
- **Reage:** Com o mouse em cima, desacelera (30%, nunca para); pausa ao toque e fora da viewport.
- **Sente/entende:** "Atendem a minha região e fazem o que eu preciso."
- **Atrito → mitigação:** Movimento contínuo cansar ou atrapalhar leitura → velocidade baixa, pausa e versão estática.
- **Saída:** Serviços.
- **Evento de analytics:** —.
- **No mobile:** Mesma faixa, texto de 13–14 px.

## 7. Motion
- Nível declarado: N1 · Biblioteca: CSS
- Elementos animados e receita (`09-MOTION`): Marquee: R8.
- **Desktop:** `animation: marquee var(--marquee-duration) linear infinite`; em hover (mouse) a velocidade cai para `--marquee-velocidade-hover` (`playbackRate`, sem salto) e não pausa; pausa quando fora da viewport (IntersectionObserver alterna `animation-play-state`), ao toque e com foco dentro.
- **Mobile:** Igual, com toque para pausar/retomar (`pointerdown`).
- **Reduced-motion:** Estática, sem inclinação e sem duplicação visível.
- Fallback se o JS falhar: Os 3 textos aparecem em linha estática.
- Só `transform` e `opacity`; conteúdo da 1ª dobra nunca fica oculto esperando a animação.

## 8. Mobile
- Layout em 360–430 px: descrito primeiro no item 4.
- Diferenças em relação ao desktop: Texto menor; sem hover.
- Alvos de toque, gestos, teclado: Não é interativa por teclado; o toque só pausa.
- Mídia: Sem imagens.
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
- [ ] Texto duplicado para o loop é `aria-hidden` · [ ] desacelera (não para) em hover do mouse; pausa com foco e ao toque; em reduced-motion (estática, sem inclinação)
## 11. Status
completa (pronta para o build; depende dos itens `validar` e dos ativos pendentes)
