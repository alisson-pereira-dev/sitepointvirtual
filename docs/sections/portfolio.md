# Ficha — S09 Trabalhos
## 1. Identificação
slug `portfolio` · Ordem 7 · completo · âncora `#trabalhos`
## 2. Função
Provar com trabalho real e local. Papel: confiança. CTA: nenhum botão (o CTA principal está antes e depois).
## 3. Conteúdo
`secoes.portfolio` (titulo, subtitulo, 6 itens). validar: os 6 itens (foto em alta e autorização do cliente). Mídia: 6 fotos (pendentes).
## 4. Layout
- **Referência:** Packhelp (cartões de foto com legenda abaixo) + V1 do catálogo.
- **Estrutura mobile:** título e subtítulo à esquerda → grade de **2 colunas**, fotos `--aspect-1-1` com `--radius-lg`, legenda abaixo (nome em 15 px + categoria em `--color-text-muted`), sem ícone de hover; 6 itens = 3 linhas.
- **Estrutura desktop:** **3 colunas**, fotos `--radius-xl`, legenda abaixo; 2 linhas.
- **Hierarquia:** foto > nome > categoria.
- **Fundo:** `--color-bg`.
- **Herdar:** foto grande com legenda fora, sem moldura. **Não copiar:** carrossel horizontal.
- **Regra de nomes:** legendas genéricas; nome de cliente só com autorização.
- **Publicação (build T2.5):** a seção **só existe em produção com os 6 itens com foto real** (`src` ≠ `"pendente"`) e `validar: false` (foto em alta + autorização). Enquanto houver item pendente ela não é renderizada e o link "Trabalhos" sai do menu (`portfolioPublicavel()` / `menuVisivel()` em `lib/content.ts`). No modo revisão (`NEXT_PUBLIC_EXIBIR_ITENS_VALIDAR=1`) aparece com o placeholder "foto em breve" e a marca "A validar" em cada legenda. Quando as fotos chegarem: trocar `src` e pôr `validar: false` item a item. Registrado em T6.4.
- **Ajuste de tokens:** o nome do trabalho usa `--text-body` (16 px) em semibold, em vez dos 15 px literais da spec, porque não existe token de 15 px. O 3 colunas começa em 768 px.
## 5. Componentes
- Secao (padrao, id `trabalhos`)
- CartaoTrabalho (×6)
- Midia (`1-1`)
- Novos componentes a especificar? não (specs em `docs/componentes.md`)

## 6. Jornada UX
- **Vê:** Título e 6 fotos de trabalhos com legenda.
- **Faz:** Rola e olha.
- **Reage:** Cartões entram em sequência; no desktop a foto dá zoom leve no hover.
- **Sente/entende:** "É trabalho real, feito perto de mim."
- **Atrito → mitigação:** Sem fotos reais a seção perde o sentido → **bloqueia a publicação** (ver `assets-needed.md`); legendas genéricas, sem nomes de clientes sem autorização.
- **Saída:** Sobre.
- **Evento de analytics:** —.
- **No mobile:** Grade de 2 colunas.

## 7. Motion
- Nível declarado: N1 · Biblioteca: CSS
- Elementos animados e receita (`09-MOTION`): Cartões: R2. Hover da foto: R10.
- **Desktop:** Stagger de 6 itens; zoom 1,03 em `--dur-base`.
- **Mobile:** Reveal por linha; sem zoom.
- **Reduced-motion:** Tudo visível; sem zoom.
- Fallback se o JS falhar: Grade visível.
- Só `transform` e `opacity`; conteúdo da 1ª dobra nunca fica oculto esperando a animação.

## 8. Mobile
- Layout em 360–430 px: descrito primeiro no item 4.
- Diferenças em relação ao desktop: 2 colunas (3 no desktop); legenda sempre visível.
- Alvos de toque, gestos, teclado: Não clicável.
- Mídia: Fotos 1:1 de 480×480 (mobile) a 720×720 (desktop), WebP/AVIF, lazy.
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
- [ ] `alt` descreve o trabalho, não "foto" · [ ] sem nomes de clientes não autorizados · [ ] fotos 1:1 recortadas por `object-fit`, sem distorcer
## 11. Status
completa (pronta para o build; depende dos itens `validar` e dos ativos pendentes)
