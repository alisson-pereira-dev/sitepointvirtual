# Ficha — S23 Footer
## 1. Identificação
slug `footer` · Ordem 12 · completo · âncora: —
## 2. Função
Fechar, repetir contatos e dar segurança legal. Papel: confiança.
## 3. Conteúdo
`secoes.footer`, `site.redes`, `site.logo`. Faltando: logo em vetor. Páginas de Privacidade e Termos (**rascunho técnico; exigem revisão jurídica**).
## 4. Layout
- **Referência:** Packhelp (rodapé: logo à esquerda, colunas de links à direita, linha final) + V1 do catálogo.
- **Estrutura mobile:** logo → descrição curta → ícone do Instagram → colunas **em 2 colunas** (Serviços, Contato) → links legais e copyright, empilhados.
- **Estrutura desktop:** logo, descrição e Instagram à esquerda (4/12); 2 colunas de links à direita; linha inferior com links legais à esquerda e copyright à direita.
- **Fundo:** `--color-bg-alt`; títulos das colunas em `--text-small` e `--color-text-muted`; links em `--color-text`.
- **Build (T3.1):** o Footer (e o Header) vivem em `app/layout.tsx`, então valem para a home, as páginas legais e o 404. Âncoras viram `/#seção` (funcionam fora da home). O link "WhatsApp" usa o mesmo destino do CTA principal (`hrefDoCta`: passa a `wa.me` com mensagem quando houver número); o Instagram dispara `instagram_click`; links externos abrem em nova aba com `rel="noopener"`. Links para seções que não são renderizadas (validar, sem fotos, poucas perguntas) não entram (`ancoraVisivel`). Links legais: `/privacidade` e `/termos`. Alvos ≥ 44 px.
- **Herdar:** títulos pequenos em cinza sobre colunas de links. **Não copiar:** newsletter com desconto, selos FSC/ESG, 5 colunas, seletor de país.
## 5. Componentes
- Footer
- Icone (Instagram)
- Midia (logo)
- Novos componentes a especificar? não (specs em `docs/componentes.md`)

## 6. Jornada UX
- **Vê:** Logo, descrição, links, contatos e links legais.
- **Faz:** Toca em um link.
- **Reage:** Âncora, WhatsApp, Instagram ou página legal.
- **Sente/entende:** "É um negócio sério e achei o que precisava."
- **Atrito → mitigação:** Páginas de Privacidade e Termos sem texto final → rascunho técnico e revisão jurídica.
- **Saída:** Topo, WhatsApp ou Instagram.
- **Evento de analytics:** `instagram_click`.
- **No mobile:** 2 colunas de links.

## 7. Motion
- Nível declarado: N0 · Biblioteca: —
- Elementos animados e receita (`09-MOTION`): Sem animação.
- **Desktop:** Estático.
- **Mobile:** Estático.
- **Reduced-motion:** Estático.
- Fallback se o JS falhar: Estático.
- Só `transform` e `opacity`; conteúdo da 1ª dobra nunca fica oculto esperando a animação.

## 8. Mobile
- Layout em 360–430 px: descrito primeiro no item 4.
- Diferenças em relação ao desktop: 2 colunas de links; legais empilhados.
- Alvos de toque, gestos, teclado: Links com ≥ 44 px de altura.
- Mídia: Logo em SVG.
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
- [ ] Links legais sempre visíveis · [ ] áreas de toque ≥ 44 px nos links do mobile · [ ] `lang="pt-BR"`
## 11. Status
completa (pronta para o build; depende dos itens `validar` e dos ativos pendentes)
