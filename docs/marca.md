# Marca e Ativos — Point Virtual

## Decisão de identidade
**Evoluir:** manter o logo e o vermelho reconhecíveis e refinar a interface. O logo não muda. O vermelho de interface é o `#DB050F`, na mesma família do vermelho do logo e com contraste AA (ver `design-system.md`).
> A confirmar com o cliente: aceitar esse ajuste de interface.

## Logo (recebido: `Logo_POINT_VIRTUAL_Colorido.png`)
- **Formato:** PNG 1254 × 1254, RGB, **sem transparência** (fundo branco `#FEFEFE`). Não é vetor.
- **Conteúdo útil:** ocupa só da coluna 70 à 1182 e da linha 399 à 858. Ou seja, cerca de 46% da altura; o resto é margem branca. Precisa de recorte.
- **Composição:** "POINT" em vermelho com degradê; o "O" é um símbolo CMYK em espiral (diafragma). Abaixo, "VIRTUAL" em branco numa pílula vermelha.
- **Versões:** colorida (esta). A versão negativa existe no avatar do Instagram (círculo vermelho com texto branco), mas sem arquivo.
- **Problemas:**
  1. Sem transparência e com margem, não serve para o header, o OG nem o favicon.
  2. Em fundo vermelho ou escuro, o "POINT" vermelho perde contraste. Usar a versão negativa.
  3. O símbolo CMYK isolado precisa ser testado a 32 px antes de virar favicon.
- **Ação necessária (bloqueia o visual final):** pedir o arquivo original (AI, CDR ou SVG) e as versões: horizontal, só o símbolo, negativa. Provisório: recortar o PNG e remover o fundo.

## Cores (medidas no PNG do logo; `design-tokens.css` tem as de interface)
| Papel | Hex | Origem |
|---|---|---|
| Vermelho do logo (topo → base do degradê) | `#E9010C` → `#C50107` | extraída do logo |
| Pílula "VIRTUAL" | `#D6010A` – `#EB010D` | extraída |
| Vermelho de interface (primário) | `#DB050F` | proposta |
| Ciano / Magenta / Amarelo / Preto (símbolo CMYK) | `#01A4EC` / `#E7029B` / `#FEDF07` / `#212221` | extraída; **uso só no logo** |
| Acento de interface | `#FFC21A` | proposta (design system recebido) |
| Neutros | `#141318`, `#6B6873`, `#FFFBF7`, `#FFF4E6` | design system recebido |

Contraste: `#E9010C` com texto branco dá 4,69:1 (passa AA, mas com pouca folga); por isso o primário de interface é um pouco mais escuro.

## Tipografia
- **Do logo:** sans arredondada e pesada, sem arquivo de fonte.
- **Do site:** Sora (títulos) e Inter (corpo).

## Mood
vivo, tátil, local, direto, acabamento, confiável. **Evitar:** cara de e-commerce, números e prazos inventados, amarelo como fundo.

## Imagens e mídia
| Ativo | Situação | Uso previsto | Qualidade |
|---|---|---|---|
| Logo | recebido (PNG, fundo branco) | header, footer, OG, favicon | insuficiente para uso final |
| Fotos de fachadas, letreiros, lona e ACM | **pendente** (o cliente envia depois) | hero, serviços, portfólio | — |
| Fotos de acrílico, troféus e brindes | pendente | serviços, portfólio, hero | — |
| Fotos de plotagem veicular | pendente | serviços, portfólio | — |
| Foto do painel de LED | pendente | seção Painel de LED | — |
| Vídeos curtos de produção | pendente (opcional) | Como funciona | — |

## Estratégia de imagens
1. **Do cliente (prioridade):** originais, mínimo 1600 px de largura. Capturas de tela do Instagram não servem.
2. **Placeholder honesto** (bloco com legenda "foto em breve") até as fotos chegarem, com as proporções e o raio finais, para o layout não mudar depois.
3. Sem banco de imagens passando por trabalho da empresa.
