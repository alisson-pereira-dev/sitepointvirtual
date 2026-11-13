# Ficha — S04 Sobre
## 1. Identificação
slug `sobre` · Ordem 8 · completo · âncora `#sobre`
## 2. Função
Humanizar: quem está por trás e onde atua. Papel: confiança.
## 3. Conteúdo
`secoes.sobre` (titulo, texto, imagem, 3 pontos_de_valor). validar: nenhum (o ponto "Da arte à instalação" foi alinhado ao hero e à faixa e deixou de ser `validar`). Mídia: `feita_pra.jpg` (foto do grupo de camisa vermelha na loja, 1080×808), com alt descritivo; confirmar autorização de imagem das pessoas (ver `assets-needed.md`).
- **Build (T2.6):** no HTML o texto vem antes da foto (o título abre a seção); no mobile a foto sobe pela ordem do grid. O texto da Sobre usa `**negrito**` → `<strong>` e quebra de linha → parágrafo (`paragrafosComNegrito` em `lib/content.ts`), com largura de leitura de 65ch. Pontos `validar: true`, se voltarem a existir, só aparecem no modo revisão.
## 4. Layout
- **Referência:** Packhelp (título grande à esquerda, texto curto, uma mídia) + V1 do catálogo.
- **Estrutura mobile:** foto primeiro (`--aspect-4-3`, `--radius-xl`) → título (`--text-h2`) → 2 parágrafos curtos (`--text-body-lg`) → 3 pontos em lista simples (título em semibold + descrição).
- **Estrutura desktop:** 2 colunas: texto à esquerda (6/12), foto à direita (6/12, `--aspect-4-3`). Os 3 pontos em 3 colunas abaixo, com filete superior de 1 px.
- **Ilustrações dos pontos:** cada `pontos_de_valor[]` tem `ilustracao` (`src`, `alt`) em `/assets/ilus_*.png` (desenho de traço, PNG com fundo transparente, 1416×1792). Aparecem acima do título de cada ponto (posição em teste), sem máscara nem raio (não são fotos, então não passam pelo `Midia`). Tamanho compacto: largura máxima `calc(var(--space-9) * 1.25)` (120 px) no mobile e `calc(var(--space-10) * 1.25)` (160 px) a partir de 768 px, alinhadas à esquerda. `next/image` lazy com `sizes`. São ilustrações do projeto, não fotos de trabalho: a regra "só fotos reais" vale para as fotos.
- **Hierarquia:** título > foto > pontos de valor.
- **Fundo:** `--color-bg`.
- **Herdar:** texto grande e direto, sem ornamento. **Não copiar:** o parágrafo-manifesto com miniaturas no meio (já usado no hero e no CTA final).
## 5. Componentes
- Secao (padrao, id `sobre`)
- Midia (`4-3`)
- Novos componentes a especificar? não (specs em `docs/componentes.md`)

## 6. Jornada UX
- **Vê:** Foto e título, texto curto e 3 pontos.
- **Faz:** Lê.
- **Reage:** Texto e foto entram com reveal.
- **Sente/entende:** "É gente da região e cuida de tudo."
- **Atrito → mitigação:** Texto longo → no máximo 2 parágrafos; "+ de 15 anos" **não** está neste texto.
- **Saída:** Contato.
- **Evento de analytics:** —.
- **No mobile:** Foto primeiro.

## 7. Motion
- Nível declarado: N1 · Biblioteca: CSS
- Elementos animados e receita (`09-MOTION`): Texto e foto: R1.
- **Desktop:** Reveal de texto e foto com `--dur-slow`.
- **Mobile:** Mais curto.
- **Reduced-motion:** Visível.
- Fallback se o JS falhar: Visível.
- Só `transform` e `opacity`; conteúdo da 1ª dobra nunca fica oculto esperando a animação.

## 8. Mobile
- Layout em 360–430 px: descrito primeiro no item 4.
- Diferenças em relação ao desktop: Foto no topo; pontos em lista simples.
- Alvos de toque, gestos, teclado: Sem interação.
- Mídia: Foto 4:3, 960×720, WebP/AVIF, lazy.
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
- [ ] `**negrito**` do texto renderizado como `<strong>`, `
` como parágrafo · [ ] largura de leitura ≤ 65ch
## 11. Status
completa (pronta para o build; depende dos itens `validar` e dos ativos pendentes)
