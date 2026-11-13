# Jornada UX — Point Virtual (fase 8)

## Macro
| Estágio | Pergunta do visitante | Seções | Sinal de sucesso |
|---|---|---|---|
| Descoberta | "Onde estou? É pra mim?" | Header, Hero, Faixa | Continua rolando |
| Interesse | "O que vocês fazem?" | Serviços, Painel de LED, Como funciona | Chega a 50% do scroll; troca de aba |
| Confiança | "Posso confiar?" | Trabalhos, Sobre | Chega até Trabalhos/Sobre |
| Decisão | "Como peço? E se eu tiver dúvida?" | Contato, FAQ | Abre uma pergunta do FAQ |
| Ação | "Como faço agora?" | CTA final, Contato | Clica no CTA principal |

A ordem segue entrada → convencimento → conversão. Não há seção de depoimentos nem de preços; a confiança vem do portfólio real e do "Sobre".

## CTA principal
- **Onde aparece:** header (sempre), hero, painel de LED (meio), contato e CTA final.
- **Destino e ação:** abre o WhatsApp da Point Virtual em nova aba (`site.ctas.principal`, hoje o link `https://wa.link/kww6uf`). Quando o número for confirmado, o link passa a ser `https://wa.me/55<número>?text=<mensagem_padrao>` e a mensagem chega preenchida.
- **Decisão: um CTA = uma ação, rótulo varia por origem.** Mesmo destino (WhatsApp), estilo (vermelho, ícone do WhatsApp) e comportamento (nova aba) em todos os botões; o rótulo e a mensagem pré-preenchida mudam conforme o ponto da jornada (`site.ctas.variantes`): header/404 "Pedir orçamento" · hero "Pedir orçamento no WhatsApp" · painel "Anunciar no painel de LED" (mensagem sobre o painel) · contato "Chamar no WhatsApp" · final "Quero o meu orçamento". Assim quem chega ao WhatsApp já diz de onde veio. `cta_principal_click` continua com a mesma `origem`; o `menu` (mobile) usa o texto e a mensagem padrão.
- **Decisão (fase 8): sem botão flutuante de WhatsApp.** O header fixo já mantém o CTA visível em todas as telas e o site repete o botão em 4 seções; um botão flutuante cobriria conteúdo e rodapé. Pode ser testado depois, se os dados mostrarem que falta.

## Micro (por seção)

### S00 Header
- **Vê:** Logo, 5 links e o botão "Pedir orçamento" (desktop). No mobile: logo, CTA compacto e botão de menu.
- **Faz:** Toca no CTA, em um link ou no menu.
- **Reage:** O CTA abre o WhatsApp em nova aba. O link rola até a seção (com `scroll-margin-top`). O header ganha fundo e borda depois de rolar.
- **Sente/entende:** "Sei onde estou e como pedir."
- **Atrito → mitigação:** Menu esconder o CTA no mobile → o CTA fica fora do menu e também dentro dele.
- **Saída:** Hero, âncoras das seções ou WhatsApp.
- **Evento analytics:** `cta_principal_click` (origem `header`), `menu_open`.
- **Mobile:** CTA sempre visível no topo, sem botão flutuante extra.

### S01 Hero
- **Vê:** Etiqueta, headline grande com 3 miniaturas dentro da frase, subheadline e o botão principal na primeira dobra.
- **Faz:** Toca no CTA principal, no secundário, ou rola.
- **Reage:** O principal abre o WhatsApp em nova aba. O secundário rola até `#servicos`. No desktop, a miniatura sob o ponteiro se endireita.
- **Sente/entende:** "É uma gráfica daqui e é fácil pedir."
- **Atrito → mitigação:** "Do arquivo à instalação" e "+ de 15 anos" sem confirmação → ambos marcados `validar`; texto neutro se o cliente não confirmar.
- **Saída:** CTA principal ou a faixa/serviços logo abaixo.
- **Evento analytics:** `cta_principal_click` (origem `hero`), `cta_secundario_click`.
- **Mobile:** CTA na primeira dobra, largura total.

### Faixa (marquee)
- **Vê:** Faixa inclinada com os 3 textos passando devagar.
- **Faz:** Nada (opcionalmente toca para pausar).
- **Reage:** Com o mouse em cima, desacelera (30%, nunca para); pausa ao toque e fora da viewport.
- **Sente/entende:** "Atendem a minha região e fazem o que eu preciso."
- **Atrito → mitigação:** Movimento contínuo cansar ou atrapalhar leitura → velocidade baixa, pausa e versão estática.
- **Saída:** Serviços.
- **Evento analytics:** —.
- **Mobile:** Mesma faixa, texto de 13–14 px.

### S06 Serviços
- **Vê:** Título, subtítulo, abas em pílula e os cartões do 1º grupo.
- **Faz:** Toca numa aba; arrasta o carrossel (mobile); lê os cartões.
- **Reage:** O painel troca com fade curto; a aba ativa ganha o fundo claro e a sombra.
- **Sente/entende:** "Eles fazem exatamente o que eu procuro."
- **Atrito → mitigação:** Abas ou cartões fora da tela no mobile → a barra mostra a próxima aba cortada; o carrossel tem a ponta do próximo cartão, a seta e o indicador.
- **Saída:** Painel de LED, ou o CTA do header/subtítulo para pedir pelo WhatsApp.
- **Evento analytics:** `servico_aba_change` (grupo).
- **Mobile:** Carrossel com snap; nada fica escondido sem aviso.

### S08 Painel de LED
- **Vê:** Painel escuro com título, a foto real do painel, 3 destaques e o botão.
- **Faz:** Lê e toca no CTA.
- **Reage:** O CTA abre o WhatsApp (mesmo estilo do hero). O painel entra com reveal.
- **Sente/entende:** "Posso anunciar no painel da praça."
- **Atrito → mitigação:** Números vindos de uma arte (parte do texto cortada) → `validar`; se não confirmados, trocar por texto neutro.
- **Saída:** WhatsApp ou a próxima seção.
- **Evento analytics:** `cta_principal_click` (origem `painel`).
- **Mobile:** Foto antes dos destaques; botão em largura total.

### S07 Como funciona
- **Vê:** Título e 3 passos numerados.
- **Faz:** Rola e lê.
- **Reage:** Os passos entram em sequência curta.
- **Sente/entende:** "É simples pedir."
- **Atrito → mitigação:** Parecer burocrático → 3 passos curtos, sem botão; `validar` até o cliente confirmar o processo.
- **Saída:** Trabalhos.
- **Evento analytics:** —.
- **Mobile:** Passos empilhados com a linha vertical.

### S09 Trabalhos
- **Vê:** Título e 6 fotos de trabalhos com legenda.
- **Faz:** Rola e olha.
- **Reage:** Cartões entram em sequência; no desktop a foto dá zoom leve no hover.
- **Sente/entende:** "É trabalho real, feito perto de mim."
- **Atrito → mitigação:** Sem fotos reais a seção perde o sentido → **bloqueia a publicação** (ver `assets-needed.md`); legendas genéricas, sem nomes de clientes sem autorização.
- **Saída:** Sobre.
- **Evento analytics:** —.
- **Mobile:** Grade de 2 colunas.

### S04 Sobre
- **Vê:** Foto e título, texto curto e 3 pontos.
- **Faz:** Lê.
- **Reage:** Texto e foto entram com reveal.
- **Sente/entende:** "É gente da região e cuida de tudo."
- **Atrito → mitigação:** Texto longo → no máximo 2 parágrafos; "+ de 15 anos" **não** está neste texto.
- **Saída:** Contato.
- **Evento analytics:** —.
- **Mobile:** Foto primeiro.

### S17 Contato
- **Vê:** Título, subtexto, o botão do WhatsApp e um cartão por loja.
- **Faz:** Toca no CTA, liga ou abre o mapa.
- **Reage:** WhatsApp em nova aba; o telefone abre o discador; "Ver no mapa" abre o Google Maps.
- **Sente/entende:** "Sei como falar e onde ir."
- **Atrito → mitigação:** Horários e endereço da 2ª loja ausentes → o subtexto manda confirmar o horário pelo WhatsApp; a linha do endereço some quando é `null`.
- **Saída:** WhatsApp.
- **Evento analytics:** `cta_principal_click` (origem `contato`), `telefone_click`, `mapa_click`.
- **Mobile:** Telefone com `tel:`; botões de 48 px.

### S16 FAQ
- **Vê:** Título e 5 perguntas fechadas.
- **Faz:** Toca numa pergunta.
- **Reage:** A resposta abre com transição de altura; a seta gira.
- **Sente/entende:** "As minhas dúvidas estão respondidas."
- **Atrito → mitigação:** Respostas deduzidas (arte pronta, prazo, instalação) → `validar`; nada de prazo numérico.
- **Saída:** CTA final.
- **Evento analytics:** `faq_open` (pergunta).
- **Mobile:** Linhas de 56 px.

### S19 CTA final
- **Vê:** Frase grande com uma miniatura no meio e o botão.
- **Faz:** Toca no CTA.
- **Reage:** Abre o WhatsApp; no desktop a miniatura se endireita no hover.
- **Sente/entende:** "É só chamar."
- **Atrito → mitigação:** Nenhum; sem informação nova nem segundo botão.
- **Saída:** WhatsApp.
- **Evento analytics:** `cta_principal_click` (origem `final`).
- **Mobile:** Botão em largura total perto do polegar.

### S23 Footer
- **Vê:** Logo, descrição, links, contatos e links legais.
- **Faz:** Toca em um link.
- **Reage:** Âncora, WhatsApp, Instagram ou página legal.
- **Sente/entende:** "É um negócio sério e achei o que precisava."
- **Atrito → mitigação:** Páginas de Privacidade e Termos sem texto final → rascunho técnico e revisão jurídica.
- **Saída:** Topo, WhatsApp ou Instagram.
- **Evento analytics:** `instagram_click`.
- **Mobile:** 2 colunas de links.

## Mapa de eventos (analytics)
Implementar como `trackEvent(nome, parametros)`; **sem ferramenta definida, o helper não faz nada** (nenhum cookie). Se o cliente escolher uma ferramenta, decidir o consentimento antes (ver `BannerCookies`).

| Evento | Gatilho | Seção | Parâmetros |
|---|---|---|---|
| `cta_principal_click` | clique no CTA principal | header, hero, painel, contato, final | `origem` |
| `cta_secundario_click` | clique em "Ver o que fazemos" | hero | — |
| `menu_open` | abre o menu mobile | header | — |
| `servico_aba_change` | troca de aba | serviços | `grupo` |
| `telefone_click` | toque no telefone | contato | `unidade` |
| `mapa_click` | toque em "Ver no mapa" | contato | `unidade` |
| `faq_open` | abre uma pergunta | FAQ | `pergunta` |
| `instagram_click` | clique no Instagram | footer | — |
| `scroll_depth` | 25/50/75/100% | home | `percentual` |

Não há `form_submit`: o site não tem formulário (a conversão é o WhatsApp).

### Implementação (T4.3)
- `trackEvent` (`lib/analytics.ts`) **não faz nada**: sem ferramenta, sem cookie, sem armazenamento, sem requisição. Os cliques passam por um único ouvinte (`RastreadorEventos`, via `data-evento`/`data-origem`/`data-unidade`); aba, FAQ e `scroll_depth` chamam o helper direto.
- Origens de `cta_principal_click`: `header`, `hero`, `painel`, `contato`, `final` e também `menu` (o CTA dentro do menu mobile). O "Voltar ao início" do 404 **não** dispara evento.
- `scroll_depth`: marcos 25/50/75/100 (`percentual`), uma vez por marco; é a posição da borda de baixo da tela sobre a altura do documento. **Só na home** (`ProfundidadeScroll` é montado em `app/page.tsx`, não no layout): `/privacidade`, `/termos` e 404 não disparam.
- Conferência: com `NEXT_PUBLIC_DEBUG_EVENTOS=1` (build só de depuração) cada chamada é escrita em `console.debug`. Foi assim que os 9 eventos e seus parâmetros foram verificados no navegador.
- Ferramenta de analytics e consentimento continuam dependendo de decisão do cliente (T3.4 só entra se houver analytics ou embed).

## Verificação da fase
- [x] Macro cobre descoberta → ação
- [x] Toda seção tem micro completo (12 de 12)
- [x] Todo hover tem equivalente no toque (`:active` e informação sempre visível)
- [x] CTA principal no início (header, hero), no meio (painel) e no fim (contato, CTA final)
- [x] Nenhuma seção com dois objetivos
- [x] Eventos definidos para as ações-chave
