# Ficha — S08 Painel de LED
## 1. Identificação
slug `painel_led` · Ordem 5 · completo · âncora `#painel-led`
## 2. Função
Apresentar o painel de LED da Praça do Manteiga como oferta própria e local. Papel: interesse/decisão. CTA: principal repetido no meio da narrativa.
## 3. Conteúdo
`secoes.painel_led` (titulo, descricao, midia, 3 destaques, cta). validar: os 3 destaques (valores vêm de uma arte; parte do texto estava cortada). Mídia: **vídeo** vertical 9:16 (`painelled.mp4`, 720×1280, 20 s, com áudio, ~3 MB) + capa `painelled-capa.jpg` (quadro em 1 s). Sem autoplay e `preload="none"`: só baixa quando a pessoa aperta o play. Pendente: legenda/transcrição do áudio e autorização do cliente que aparece no vídeo.
## 4. Layout
- **Referência:** Packhelp (painel escuro "At any scale": título, lista com ✓ e botão azul) + V1 do catálogo.
- **Mídia (decisão):** o vídeo é vertical (9:16), mas ocupa o mesmo espaço 4:3 da foto (`--aspect-4-3`, `--radius-lg`), ampliado até cobrir (`object-fit: cover`, `object-position: 50% 40%`). Isso corta ~58% da altura (legendas e botão "Quero anunciar" do story ficam de fora); controles nativos.
- **Estrutura mobile:** painel escuro (`data-surface="dark"`), `--radius-xl`, margem lateral `--space-3`. Título (`--text-h2`) → descrição → **vídeo** (4:3, ver acima) → lista dos 3 destaques com ✓ → CTA principal largura total.
- **Estrutura desktop:** painel inset com `--radius-2xl`; 2 colunas: texto e lista à esquerda (5/12), foto/vídeo à direita (7/12), alinhadas ao centro vertical.
- **Hierarquia:** título > foto > destaques > CTA.
- **Fundo:** `--color-bg-dark`; texto `--color-text`; destaques em `--color-text-muted`; ✓ em `--color-accent`.
- **Herdar:** painel escuro arredondado com lista de checks e botão logo abaixo. **Não copiar:** grupo de avatares no botão, os 3 cartões de foto com pílulas flutuantes e bolha de chat.
## 5. Componentes
- Secao (escura, formato painel, id `painel-led`)
- ListaCheck
- Midia (`4-3`)
- Botao/primario
- Novos componentes a especificar? não (specs em `docs/componentes.md`)

## 6. Jornada UX
- **Vê:** Painel escuro com título, a foto real do painel, 3 destaques e o botão.
- **Faz:** Lê e toca no CTA.
- **Reage:** O CTA abre o WhatsApp (mesmo estilo do hero). O painel entra com reveal.
- **Sente/entende:** "Posso anunciar no painel da praça."
- **Atrito → mitigação:** Números vindos de uma arte (parte do texto cortada) → `validar`; em produção entram os textos neutros (`descricao_neutra`, `alt_neutro`, `destaques_neutros`), sem tamanho, local exato, nº de exibições nem duração do VT. Os originais só aparecem no modo revisão, com a marca "A validar".
- **Saída:** WhatsApp ou a próxima seção.
- **Evento de analytics:** `cta_principal_click` (origem `painel`).
- **No mobile:** Foto antes dos destaques; botão em largura total.

## 7. Motion
- Nível declarado: N1 · Biblioteca: CSS
- Elementos animados e receita (`09-MOTION`): Painel, foto e lista: reveal (R1/R2). Botão: R10.
- **Desktop:** Reveal por bloco (texto, foto, lista) com `--stagger-step`; botão sobe 1 px no hover.
- **Mobile:** Reveal único do painel inteiro, mais curto; sem hover.
- **Reduced-motion:** Tudo visível, sem deslocamento.
- Fallback se o JS falhar: Painel visível e legível.
- Só `transform` e `opacity`; conteúdo da 1ª dobra nunca fica oculto esperando a animação.

## 8. Mobile
- Layout em 360–430 px: descrito primeiro no item 4.
- Diferenças em relação ao desktop: Uma coluna; margem lateral `--space-3`.
- Alvos de toque, gestos, teclado: Botão de 56 px.
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
- [ ] CTA vermelho legível sobre o escuro (3,56:1 do componente contra o fundo, já verificado) · [ ] anel de foco amarelo · [ ] se os números mudarem, só o `content.json` muda
## 11. Status
completa (pronta para o build; depende dos itens `validar` e dos ativos pendentes)

- **Etiqueta "Novidade" (`secoes.painel_led.etiqueta`):** acima do título, amarela (`--color-accent`; o vermelho é só do CTA), maior que a `Etiqueta` comum (`--text-body-lg`, bold, caixa alta com `--tracking-label`) e inclinada em −3° (`--tilt × −0,375`, vira 0° em reduced-motion). Fonte do fato: informação do cliente de que o painel é um serviço novo. Remover quando deixar de ser novidade (não manter "novo" como urgência falsa).
- **Animação no topo (`secoes.painel_led.ilustracao`: `alt`, `src`, `capa`):** um só vídeo, `video_led-alpha.webm` (VP9 com fundo transparente, 512×300, ~0,5 MB), **gerado do `.mov` com alfa**: `ffmpeg -i "video_led _covnert_webp.mov" -an -c:v libvpx-vp9 -pix_fmt yuva420p -b:v 0 -crf 34 -auto-alt-ref 0 -row-mt 1 -metadata:s:v:0 alpha_mode=1 video_led-alpha.webm`. **Só no mobile (< 768 px)**; do tablet para cima o bloco some (`display: none`, o vídeo nunca baixa nem toca). Fica **acima** da seção, centralizado (até 512 px), direto sobre o fundo claro da página, com a base encostada no topo do painel (0 px). Recorte `--aspect-palco-led` (25/12) tira as faixas vazias do quadro. Componente `VideoLedTopo` (client): sem som (`muted`), em loop, só enquanto está na tela e nunca com `prefers-reduced-motion` (fica a capa transparente `video_led-capa.webp`). Sem botão de pausa (decisão do cliente). Onde o navegador ignora a transparência do WebM (Safari/iOS), o componente detecta pelo canto do 1º quadro e mostra só a capa. **Atenção:** os `.webm` exportados pelo editor (`video_led-_covnert_webp.webm`/`mobile_led.webm`, `desktopled.webm`) vêm com fundo preto (sem alfa): não servem para este layout.
