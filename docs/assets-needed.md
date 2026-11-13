# Ativos necessários — Point Virtual

| Ativo | Onde é usado | Situação | Prioridade | Observação |
|---|---|---|---|---|
| Logo em SVG/PNG transparente (horizontal, símbolo, versão negativa) | Header, footer, OG, favicon | recebido em imagem (raster, fundo branco) | **bloqueia** | pedir o arquivo original (AI/CDR/SVG) |
| Fotos de fachadas, letreiros, lona e ACM | Hero, Serviços, Portfólio | Serviços "Letreiros e fachadas": **recebida** (`posn_00.jpg`, fachada VIP Academia); Portfólio pendente | melhora | mín. 1600 px de largura; confirmar autorização de uso do nome do cliente na fachada |
| Fotos de acrílico (troféus, chaveiros, calendários, placas) | Serviços, Portfólio | pendente | melhora | |
| Fotos de plotagem veicular | Serviços, Portfólio | Serviços: **recebida** (`posn_pplotagem_03.jpg`, van); Portfólio pendente | melhora | confirmar que é trabalho real da Point (ver nota abaixo) |
| Fotos dos 8 serviços (letreiro, adesivos, placas, veículo, troféu, copos, chaveiros, mini 3D) | Serviços (3 grupos) | **recebidas** (8 fotos 2400×1792, 4:3, em `public/assets/posn_*.jpg`; ~2,5–4,2 MB cada, o `next/image` entrega versões menores) | melhora | **confirmar que são trabalhos reais da Point**: veículo, troféu e chaveiros mostram a marca "360eco Global" e `posn_adesivo_01`/`posn_mini3d_07` parecem mockups ou imagens geradas; os copos mostram um nome de pessoa (autorização). A fachada mostra "VIP Academia" (autorização) |
| Vídeo do painel de LED | Seção Painel de LED | **recebido** (`public/assets/painelled.mp4`, 720×1280, 20 s, com áudio; capa `painelled-capa.jpg` gerada do vídeo) | melhora | mostra o perfil de um cliente (@imperiogold_burguer): confirmar autorização; o vídeo não prova local, tamanho nem nº de exibições (esses textos seguem `validar`); falta legenda/transcrição do áudio (WCAG 1.2.2) |
| 3 fotos quadradas para as miniaturas da frase do hero (alternam 2–3 fotos cada, se houver) | Hero | **recebidas** (5 fotos 1024×1024 em `public/assets/hero_image_gif00–04.jpg`, informadas como trabalhos reais) | melhora | confirmar autorização de uso (a caneca mostra um nome de pessoa); alt conferido com a foto |
| Imagem Open Graph (1200×630) para as prévias de link (WhatsApp, Instagram, redes) | Metadados (`seo.home.og_imagem`) | pendente; o site sai sem `og:image` | melhora | trabalho real ou arte da marca; quando existir, trocar `src` no JSON (precisa de domínio para a URL absoluta) |
| Favicon final (a partir do logo vetorial) | Metadados | provisório (`icon.svg`, `favicon.ico`, `apple-icon.png` derivados do SVG provisório) | melhora | depende do logo vetorial |
| 1 foto quadrada para a miniatura do CTA final | CTA final | **aplicada**: reaproveita as 5 fotos do hero (alternam no desktop) | melhora | trocar só se o cliente quiser fotos próprias para o CTA final |
| Depoimentos autorizados (nome + autorização) | Depoimentos | pendente | melhora | o destaque "Feedback" do Instagram é a fonte; sem autorização, a seção fica oculta |
| Autorização de uso dos nomes/fachadas de clientes | Portfólio | pendente | melhora | sem autorização, legenda genérica (as fotos reais, acima, bloqueiam a publicação) |
| Horários completos (grade semanal) | Contato, schema | o Google só mostra "abre às 14:00" de um dia | melhora | até ter, o site manda confirmar o horário pelo WhatsApp |
| Endereço da 2ª loja | Contato | pendente | melhora | a loja do Centro (R. Otávio Tosta) já tem endereço |
| Número do WhatsApp (e confirmar o link wa.link) | CTA principal | link recebido via bio; número pendente | **bloqueia** | |
| Telefone da 2ª loja (confirmar) | Contato | inferido da arte | melhora | 75 98122-9911; o 98136-4285 está confirmado no Google |
| Confirmar "+ de 15 anos" | Prova rápida | alegação da bio | melhora | |
| Confirmar processo de atendimento (3 passos) | Como funciona | deduzido do padrão de atendimento | melhora | a seção inteira é `validar`: só aparece em produção depois da confirmação (ver `meta.pendencias_validar`) |
| Foto da Sobre (`feita_pra.jpg`) | Sobre | foto aplicada | melhora | confirmar autorização de imagem de todas as pessoas (inclui uma criança) e se o grupo é a equipe; a foto tem máscaras, então é de 2020–2021 e pode parecer datada |
| Ilustrações dos 3 pontos da Sobre (`ilus_Da arte_00.png`, `ilus_Atendimento direto_01.png`, `ilus_Perto_De_vc_02.png`) | Sobre | recebidas e aplicadas | melhora | PNGs de 1,7 a 3,4 MB (1416×1792): o `next/image` já serve versões leves, mas vale exportar em ~1000 px de largura para aliviar o repositório; confirmar que a autoria/licença é do projeto |
| Fotos dos 6 trabalhos do portfólio (`ant_*.jpg/png`) + autorização de uso | Trabalhos | recebidas e aplicadas em `secoes.portfolio.itens[].imagem` (itens seguem `validar: true`) | **bloqueia** | sem autorização de uso dos clientes e conferência das descrições a seção não é publicada (fica oculta em produção). Pendências: Placas Pix mostram nomes completos e telefones/chaves Pix de pessoas; chaveiro parece estampado, não gravado; material do letreiro (PVC) e do calendário (acrílico) não dá para confirmar pela foto; o calendário (471×669) e a plotagem (502×789) têm resolução baixa para telas grandes |
| Política de Privacidade / Termos | Páginas legais | rascunho técnico pronto (`noindex`), com campos `[A PREENCHER]` | **bloqueia** | revisão humana/jurídica (LGPD); não publicar antes |
| Dados da empresa para as páginas legais: razão social, CNPJ, endereço da sede, encarregado de dados e canal LGPD, foro | Privacidade, Termos | pendente | **bloqueia** | não inventar; preencher os `[A PREENCHER]` em `paginas_legais` |
| Domínio e hospedagem | Publicação | pendente | **bloqueia** | |
| Decisão sobre analytics e cookies | Analytics | pendente | melhora | define se entra banner |

Prioridade: **bloqueia** (não publica sem isso) · **melhora** · **opcional**
