# Ficha — S17 Contato
## 1. Identificação
slug `contato` · Ordem 9 · completo · âncora `#contato`
## 2. Função
Dar o jeito mais rápido (WhatsApp) e o endereço físico. Papel: conversão. CTA: principal.
## 3. Conteúdo
`secoes.contato` (titulo, subtexto, 2 unidades, cta). validar: 2ª loja (nome/telefone da arte; **endereço ausente**) e a troca possível de nomes Centro/Manteiga. Horários: omitidos.
## 4. Layout
- **Referência:** Packhelp (menu de contato com linhas de canais e ícone) + V3 do catálogo.
- **Estrutura mobile:** título e subtexto → CTA principal largura total → **um cartão por unidade** (nome em `--text-h3`; linha com endereço; linha com telefone como `tel:`; "Ver no mapa" como link quando há endereço). Linhas com ícone e alvo ≥ 44 px.
- **Estrutura desktop:** 2 colunas: título, subtexto e CTA à esquerda (5/12); cartões das unidades à direita (7/12), empilhados.
- **Hierarquia:** CTA > nome da unidade > endereço > telefone.
- **Fundo:** `--color-bg`; cartões `--color-surface`, `--shadow-1`, `--radius-xl`.
- **Mapa:** **sem embed** (só link para o Google Maps montado a partir do endereço); evita cookie de terceiros e peso.
- **Campo ausente:** `endereco: null` esconde a linha, sem texto de aviso.
- **`validar` (build T2.7):** a Loja Manteiga é `validar: true` e **só aparece no modo revisão** (`NEXT_PUBLIC_EXIBIR_ITENS_VALIDAR=1`), com a marca "A validar"; em produção a seção mostra só a Loja Centro. Cada cartão mostra "Ver no mapa" só se houver endereço (link do Google Maps montado por `mapaHref`, em nova aba com `rel="noopener"`) e o telefone em `tel:+55…` (`telHref`). Sem horários: o subtexto manda confirmar o horário pelo WhatsApp. O `aria-label` do telefone é "Ligar para (75) …" (`microcopy.contato`).
- **Herdar:** linhas de contato com ícone e valor. **Não copiar:** horário comercial (não há), chat ao vivo, formulário de reclamação.
## 5. Componentes
- Secao (padrao, id `contato`)
- Botao/primario
- CartaoUnidade (×2)
- Botao/link
- Icone (WhatsApp, telefone, localização)
- Novos componentes a especificar? não (specs em `docs/componentes.md`)

## 6. Jornada UX
- **Vê:** Título, subtexto, o botão do WhatsApp e um cartão por loja.
- **Faz:** Toca no CTA, liga ou abre o mapa.
- **Reage:** WhatsApp em nova aba; o telefone abre o discador; "Ver no mapa" abre o Google Maps.
- **Sente/entende:** "Sei como falar e onde ir."
- **Atrito → mitigação:** Horários e endereço da 2ª loja ausentes → o subtexto manda confirmar o horário pelo WhatsApp; a linha do endereço some quando é `null`.
- **Saída:** WhatsApp.
- **Evento de analytics:** `cta_principal_click` (origem `contato`), `telefone_click`, `mapa_click`.
- **No mobile:** Telefone com `tel:`; botões de 48 px.

## 7. Motion
- Nível declarado: N1 · Biblioteca: CSS
- Elementos animados e receita (`09-MOTION`): Título e cartões: R1/R2.
- **Desktop:** Reveal dos 2 cartões com `--stagger-step`.
- **Mobile:** Mais curto.
- **Reduced-motion:** Visível.
- Fallback se o JS falhar: Visível.
- Só `transform` e `opacity`; conteúdo da 1ª dobra nunca fica oculto esperando a animação.

## 8. Mobile
- Layout em 360–430 px: descrito primeiro no item 4.
- Diferenças em relação ao desktop: Cartões empilhados em largura total.
- Alvos de toque, gestos, teclado: Linhas de contato com ≥ 44 px.
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
- [ ] Telefone em `tel:` · [ ] "Ver no mapa" abre em nova aba com `rel="noopener"` · [ ] seção funciona com 1 unidade só
## 11. Status
completa (pronta para o build; depende dos itens `validar` e dos ativos pendentes)
