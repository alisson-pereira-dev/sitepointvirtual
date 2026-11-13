# Ficha — S19 CTA final
## 1. Identificação
slug `cta_final` · Ordem 11 · completo · âncora `#orcamento`
## 2. Função
Último convite, sem informação nova. Papel: conversão. CTA: principal.
## 3. Conteúdo
`secoes.cta_final` (headline, subtexto, miniatura, cta). A `miniatura` é `{ fotos: [5] }`: as mesmas 5 fotos do hero (`hero_image_gif00–04.jpg`), começando em outra (`gif01`), alternando no desktop como no hero (1,5 s cada; no mobile, só a 1ª, parada).
## 4. Layout
- **Referência:** Packhelp ("Everything in the box. And the [imagem] box.") + V3 do catálogo.
- **Estrutura mobile:** painel escuro `data-surface="dark"`, `--radius-xl`, tudo **centralizado**: headline em `--text-h1` com **uma miniatura** inserida depois de "marca" (~44 px, inclinada) → subtexto → CTA principal largura total.
- **Estrutura desktop:** mesmo painel, container estreito, headline em 2 linhas (`--text-display`), CTA centralizado.
- **Hierarquia:** headline > CTA > subtexto.
- **Fundo:** `--color-bg-dark`; margem de `--space-section` acima e abaixo.
- **Build (T2.9):** mesma margem lateral do painel de LED (`--space-3` no mobile, `--gutter-desktop` a partir de 768 px). A headline do JSON tem o marcador `{1}` depois de "marca", onde entra a miniatura única (alterna as 5 fotos, em todas as larguras; `prioridade` desligada, pois está abaixo da dobra). Ordem: headline → subtexto → CTA principal, sem segundo botão e sem informação nova. O espaço de `--section` abaixo do painel separa o CTA do rodapé. A miniatura tem 1 em de altura (≈ 37–39 px no mobile, abaixo dos ~44 px da spec).
- **Herdar:** headline em duas linhas com imagem no meio e botão logo abaixo. **Não copiar:** segundo botão.
## 5. Componentes
- Secao (escura, formato painel, id `orcamento`)
- MiniaturaInline (×1)
- Botao/primario (lg)
- Novos componentes a especificar? não (specs em `docs/componentes.md`)

## 6. Jornada UX
- **Vê:** Frase grande com uma miniatura no meio e o botão.
- **Faz:** Toca no CTA.
- **Reage:** Abre o WhatsApp; no desktop a miniatura se endireita no hover.
- **Sente/entende:** "É só chamar."
- **Atrito → mitigação:** Nenhum; sem informação nova nem segundo botão.
- **Saída:** WhatsApp.
- **Evento de analytics:** `cta_principal_click` (origem `final`).
- **No mobile:** Botão em largura total perto do polegar.

## 7. Motion
- Nível declarado: N1 · Biblioteca: CSS
- Elementos animados e receita (`09-MOTION`): Painel e frase: R1. Miniatura: entrada, ciclo de fotos e hover como no hero. Botão: R10.
- **Desktop:** Reveal do painel; miniatura endireita no hover.
- **Mobile:** Reveal curto; a miniatura alterna as fotos (como no desktop).
- **Reduced-motion:** Visível, sem inclinação.
- Fallback se o JS falhar: Frase e botão visíveis.
- Só `transform` e `opacity`; conteúdo da 1ª dobra nunca fica oculto esperando a animação.

## 8. Mobile
- Layout em 360–430 px: descrito primeiro no item 4.
- Diferenças em relação ao desktop: Frase em `--text-h1`, centralizada; miniatura de ~44 px.
- Alvos de toque, gestos, teclado: Botão de 56 px.
- Mídia: Miniatura quadrada 160×160, WebP.
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
- [ ] Um único botão, igual ao do hero · [ ] miniatura com `alt`; sem ela a frase lê normalmente
## 11. Status
completa (pronta para o build; depende dos itens `validar` e dos ativos pendentes)
