# Point Virtual — Pacote de handoff

Pacote para o Claude Code construir o site da Point Virtual (gráfica e comunicação visual, Muritiba/BA). Tudo em pt-BR. O boilerplate do projeto ainda será definido; os caminhos abaixo são a sugestão do framework.

## Por onde começar
1. Leia `CLAUDE.md` (regras e decisões).
2. Leia `docs/PRD.md` e `docs/tasks.md`.
3. Execute T0 e T1 (fatia vertical) e **pare para validação**.

## Conteúdo do pacote
| Caminho | O que é |
|---|---|
| `CLAUDE.md` | Regras do projeto e decisões |
| `docs/PRD.md` | Visão, escopo, requisitos e riscos |
| `docs/tasks.md` | Backlog com critérios de aceite |
| `docs/dossie.md` | Fatos do negócio e fontes |
| `docs/marca.md` | Leitura da marca e do logo |
| `docs/direcao-de-arte.md` | Intenção visual e referência (Packhelp) |
| `docs/mapa-do-site.md` | Ordem e função das seções |
| `docs/design-system.md` | Regras do design system e contrastes |
| `docs/componentes.md` | 19 componentes |
| `docs/jornada-ux.md` | Macro, micro por seção e eventos |
| `docs/assets-needed.md` | O que falta o cliente enviar |
| `docs/sections/*.md` | 12 fichas de seção (layout, jornada, motion nas 3 versões, DoD) |
| `content/content.json` | Todo o texto do site (fonte única) |
| `styles/design-tokens.css` / `.json` | Tokens |
| `assets/provisorio/` | Logo PNG enviado pelo cliente (provisório) |

## Atenção
- `content.json` tem `validar: true` e `meta.pendencias_validar` (13 itens): não apresentar como fato confirmado.
- Não usar o conteúdo de demonstração do design system original (preços, estrelas).
- Páginas legais e banner de cookies são rascunho técnico: exigem revisão jurídica (LGPD).
