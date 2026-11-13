# Ficha — S00 Header
## 1. Identificação
slug `header` · Ordem 1 · completo · âncora: —
## 2. Função
Orientar e manter o CTA principal sempre à mão. Papel: entrada. CTA: aparece aqui em todas as telas.
## 3. Conteúdo
`site.menu`, `site.logo`, `site.ctas.principal`. Faltando: logo em vetor. validar: —. Mídia: logo (ver `assets-needed.md`).
## 4. Layout
- **Referência:** Packhelp (barra de topo) + V1 do catálogo.
- **Estrutura mobile:** barra de `--header-h` (64 px no mobile; 72 px no desktop via `--header-h-desktop`): logo à esquerda, CTA principal compacto ("Pedir orçamento") e botão de menu à direita. Menu abre em painel de tela cheia com os 5 links grandes (Sora) e o CTA ao fim; foco preso, fecha com Esc e ao navegar.
- **Estrutura desktop:** logo à esquerda, 5 links no centro, CTA principal (pílula) à direita. *Ajuste do build:* o texto longo do CTA só entra a partir de 1280 px; em 1024–1279 px o CTA usa o texto curto (`texto_curto`), porque logo + 5 links + frase inteira não cabem em 928 px úteis e quebravam em duas linhas. Fixo; ganha fundo `--color-bg` e borda `--color-border` depois de rolar ~8 px.
- **Hierarquia:** logo > CTA > links.
- **Herdar:** barra limpa, texto de 15–16 px, muito ar. **Não copiar:** barra de promoção marrom, busca central, login, carrinho, seletor de região, mega menu.
## 5. Componentes
- Header (fixo)
- MenuMobile (Radix Dialog)
- Botao/primario (compacto no mobile)
- Icone (menu, fechar, WhatsApp)
- Midia (logo)
- Novos componentes a especificar? não (specs em `docs/componentes.md`)

## 6. Jornada UX
- **Vê:** Logo, 5 links e o botão "Pedir orçamento no WhatsApp" (desktop). No mobile: logo, CTA compacto e botão de menu.
- **Faz:** Toca no CTA, em um link ou no menu.
- **Reage:** O CTA abre o WhatsApp em nova aba. O link rola até a seção (com `scroll-margin-top`). O header ganha fundo e borda depois de rolar.
- **Sente/entende:** "Sei onde estou e como pedir."
- **Atrito → mitigação:** Menu esconder o CTA no mobile → o CTA fica fora do menu e também dentro dele.
- **Saída:** Hero, âncoras das seções ou WhatsApp.
- **Evento de analytics:** `cta_principal_click` (origem `header`), `menu_open`.
- **No mobile:** CTA sempre visível no topo, sem botão flutuante extra.

## 7. Motion
- Nível declarado: N1 · Biblioteca: CSS
- Elementos animados e receita (`09-MOTION`): Header ao rolar: R13. Painel do menu: R11.
- **Desktop:** Fundo e borda entram em `--dur-base` depois de ~8 px de scroll.
- **Mobile:** Igual. O painel do menu entra em ≤ 300 ms (opacidade + `translateY` curto) e sai de forma simétrica.
- **Reduced-motion:** Troca de estado instantânea; o painel aparece sem transição.
- Fallback se o JS falhar: Header já renderiza com fundo e todos os links; o menu mobile funciona como lista de links ancorados se o JS falhar.
- Só `transform` e `opacity`; conteúdo da 1ª dobra nunca fica oculto esperando a animação.

## 8. Mobile
- Layout em 360–430 px: descrito primeiro no item 4.
- Diferenças em relação ao desktop: Menu em tela cheia no lugar da barra de links; CTA compacto no topo.
- Alvos de toque, gestos, teclado: Botões e links ≥ 44 px (menu ≥ 48 px). Fecha com toque no fundo e com Esc.
- Mídia: Logo em SVG, altura ~28–32 px; versão horizontal.
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
- [ ] Alvos de toque ≥ 44 px · [ ] "Pular para o conteúdo" é o 1º foco · [ ] logo com `alt` e link para o topo
## 11. Status
completa (pronta para o build; depende dos itens `validar` e dos ativos pendentes)
