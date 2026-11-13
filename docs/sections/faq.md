# Ficha — S16 FAQ
## 1. Identificação
slug `faq` · Ordem 10 · completo · âncora `#perguntas`
## 2. Função
Remover as últimas objeções (cidades, arte, orçamento, prazo, instalação). Papel: decisão.
## 3. Conteúdo
`secoes.faq` (titulo, 5 perguntas). validar: 3 respostas (arte pronta, prazo, instalação).
## 4. Layout
- **Referência:** Packhelp ("Why Packhelp": título à esquerda, accordion à direita) + V2 do catálogo.
- **Estrutura mobile:** título → accordion de largura total. Cada linha: bloco arredondado `--radius-lg`, fundo `--color-bg-alt`, pergunta em semibold e seta à direita, **altura mínima 56 px**; aberta mostra a resposta com `--text-body`.
- **Estrutura desktop:** título à esquerda (5/12, fixo no topo ao rolar com `position: sticky`); accordion à direita (7/12).
- **`validar` (build T2.8):** as respostas de "arte pronta" e "prazo" têm `resposta_neutra`. **Em produção entra a neutra** (prazo: "O prazo depende do serviço e da quantidade. Chame no WhatsApp: confirmamos junto com o orçamento."; arte: "A Point também cria a arte. Conte o que você precisa pelo WhatsApp e combine os detalhes."); a original só aparece no modo revisão, com a marca "A validar". Pergunta `validar` sem `resposta_neutra` não entra em produção. **Com menos de 3 perguntas em produção a seção não é renderizada** e o link `#perguntas` sai do menu (`faqPublicavel()` / `menuVisivel()`; hoje o menu não tem link para o FAQ). Os textos das perguntas foram revisados: nenhum afirma fato sem fonte ("Vocês criam a arte…" tem fonte no dossiê §2, criação de artes confirmada).
- **Acessibilidade (build):** as respostas ficam sempre no HTML (`forceMount`, úteis para o fallback sem JS e para leitura); o Radix só emite `aria-controls` com o painel aberto, então o `Accordion` define o `id` da resposta e o `aria-controls` de cada botão. Fechadas, ficam `visibility: hidden`.
- **Dados estruturados:** quando o JSON-LD `FAQPage` entrar (T4.2), usar só a resposta efetivamente publicada (a neutra em produção).
- **Abertura:** uma por vez, primeira fechada; transição de altura por `grid-template-rows` (`--dur-base`, `--ease-standard`).
- **Hierarquia:** título > pergunta > resposta.
- **Herdar:** linhas cinza arredondadas com seta. **Não copiar:** os 2 botões ao lado do título (o CTA principal já tem lugar).
## 5. Componentes
- Secao (padrao, id `perguntas`)
- Accordion (Radix Accordion)
- Novos componentes a especificar? não (specs em `docs/componentes.md`)

## 6. Jornada UX
- **Vê:** Título e 5 perguntas fechadas.
- **Faz:** Toca numa pergunta.
- **Reage:** A resposta abre com transição de altura; a seta gira.
- **Sente/entende:** "As minhas dúvidas estão respondidas."
- **Atrito → mitigação:** Respostas deduzidas (arte pronta, prazo, instalação) → `validar`; nada de prazo numérico.
- **Saída:** CTA final.
- **Evento de analytics:** `faq_open` (pergunta).
- **No mobile:** Linhas de 56 px.

## 7. Motion
- Nível declarado: N1 · Biblioteca: CSS (+ Radix Accordion)
- Elementos animados e receita (`09-MOTION`): Abertura: R17. Entrada da lista: R1.
- **Desktop:** `grid-template-rows` 0fr→1fr em `--dur-base`, `--ease-standard`.
- **Mobile:** Igual.
- **Reduced-motion:** Abre sem transição.
- Fallback se o JS falhar: Respostas visíveis abertas (sem JS, `details`/`summary` ou todas abertas).
- Só `transform` e `opacity`; conteúdo da 1ª dobra nunca fica oculto esperando a animação.

## 8. Mobile
- Layout em 360–430 px: descrito primeiro no item 4.
- Diferenças em relação ao desktop: Título acima do accordion; sem coluna fixa.
- Alvos de toque, gestos, teclado: Linha inteira clicável, ≥ 56 px.
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
- [ ] Botão com `aria-expanded` e `aria-controls`, Enter/Espaço · [ ] resposta abre sem estourar o layout · [ ] dados estruturados de FAQ só com respostas confirmadas
## 11. Status
completa (pronta para o build; depende dos itens `validar` e dos ativos pendentes)
