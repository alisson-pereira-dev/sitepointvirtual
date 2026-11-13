# Mapa do Site — Point Virtual

**Tipo:** serviço local com portfólio · **Narrativa:** AIDA + prova local · **Nível:** completo · **CTA principal:** "Pedir orçamento no WhatsApp" (`@ctas.principal`)
**Fluxo:** entrada (hero e faixa) → convencimento (serviços, painel, como funciona, trabalhos, sobre) → conversão (contato, FAQ, CTA final).

## Ordem das seções
| # | Slug (`content.json`) | Catálogo | Função | Superfície | Variação (1ª proposta) | CTA | Motion |
|---|---|---|---|---|---|---|---|
| 1 | `site.menu` + logo | S00 Header | Orientar e manter o CTA à mão | claro | V1 fixo, ganha fundo ao rolar | principal | N1 |
| 2 | `hero` | S01 Hero | "O que é, para quem e o que faço agora" + prova rápida | claro | V3 tipográfico com miniaturas na frase | principal + secundário | N1 (momento de destaque, só CSS) |
| 3 | `faixa` | (decorativa, S02) | Ritmo e reforço do que é verificável | creme/primário suave | Faixa inclinada em marquee | — | N1 |
| 4 | `servicos` | S06 Serviços | O que é oferecido, por necessidade | claro | V4 abas por grupo + cartões de foto | secundário (âncora) | N1 |
| 5 | `painel_led` | S08 Showcase | Carro-chefe diferenciado e local | **escuro** | V1 mídia + 3 destaques | principal | N1 |
| 6 | `como_funciona` | S07 Passos | Reduzir o medo do desconhecido (3 passos) | creme | V1 linha numerada (vertical no mobile) | — | N1 |
| 7 | `portfolio` | S09 Trabalhos | Prova com trabalho real | claro | V1 grade de imagens | — | N1 |
| 8 | `sobre` | S04 Sobre | Humanizar e confiar | claro | V1 imagem + texto lado a lado (mudou na fase 6: o texto tem foto real própria e a frase com miniaturas já está no hero e no CTA final) | — | N1 |
| 9 | `contato` | S17 Contato | Lojas e canais | claro | V3 lista por unidade | principal | N0–N1 |
| 10 | `faq` | S16 FAQ | Remover objeções finais | claro | V2 título + accordion | — | N1 |
| 11 | `cta_final` | S19 CTA final | Último convite, sem informação nova | **escuro** | V3 tipográfico com miniatura | principal | N1 |
| 12 | `footer` | S23 Footer | Fechar, contatos e links legais | creme | V1 colunas | — | N0 |

CTA principal aparece no header, hero, painel, contato e CTA final (hero, meio e fim). Superfícies: claro → faixa → claro → **escuro** → creme → claro → claro → claro → claro → **escuro** → creme.

## Seções avaliadas e não incluídas
| Seção | Motivo |
|---|---|
| S10 Depoimentos | Sem depoimentos reais autorizados. O destaque "Feedback" do Instagram é a fonte provável. Entra quando houver prints autorizados (nome + consentimento) |
| S11 Números | Sem números com fonte |
| S12 Preços | Preços não são públicos; o DS enviado tinha preços de exemplo, descartados |
| S03 Problema, S13 Equipe, S14 Antes/depois, S15 Galeria | Sem conteúdo real ou função duplicada (o portfólio cobre a galeria) |
| S18 Formulário | O CTA é o WhatsApp; formulário duplicaria a ação |
| S20 Garantia, S21 Parceiros, S22 Blog | Sem política, direito de uso ou conteúdo |

## Páginas de sistema
404 (microcopy pronta) · Política de Privacidade e Termos (**rascunho técnico, exige revisão jurídica/LGPD**) · Banner de cookies (só se houver analytics ou mapa embutido).

## Fichas iniciadas (conteúdo → ficha completa nas fases 6–9)
Uma ficha por chave de `secoes` (hero, faixa, servicos, painel_led, como_funciona, portfolio, sobre, contato, faq, cta_final, footer) mais header. Cada uma já tem: slug, função, campos do `content.json`, superfície, variação sugerida e CTA. Layout, jornada e motion (3 versões) entram nas fases 6, 8 e 9.

## Decisões pendentes de layout (fase 6)
- Serviços: abas (V4) ou grade única com filtro, se as fotos chegarem em número pequeno.
- Hero: quantas miniaturas (2 ou 3) e se alternam fotos. Depende do material.
- Botão fixo de WhatsApp no mobile: **decidido na fase 8: não há** (o header fixo mantém o CTA visível).
