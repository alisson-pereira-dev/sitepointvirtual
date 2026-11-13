# Direção de Arte — Point Virtual

## Conceito em uma frase
**Gráfica de bairro com cara de plataforma:** a clareza e a ordem do Packhelp, com o calor, a cor e a prova local da Point Virtual.

## Palavras-chave de estilo
vermelho · vivo · tátil · local · claro · acabamento · direto

## Paleta (tendência)
- **Fundo:** misto. Base clara e quente (`paper`), seção em creme e duas seções escuras de ritmo.
- **Contraste:** alto, com muito espaço em branco.
- **Cor de destaque:** vermelho da marca como cor de ação (só CTA e acentos). Amarelo só em detalhes e sobre fundo escuro.
- **Gradiente/textura:** nenhum no fundo. O degradê existe só no logo.

## Tipografia (tendência)
- **Títulos:** sans geométrica larga (Sora), tamanho **grande**, espaçamento de letras fechado.
- **Corpo:** sans neutra e legível (Inter).
- **Personalidade:** confiante e acessível, sem ser corporativa.

## Densidade e ritmo
- **Equilibrado:** seção densa (serviços, portfólio) alternando com seção arejada (manifesto, FAQ).
- **Alternância:** claro → faixa inclinada → claro → **escuro (painel de LED)** → creme → claro → creme → claro → **escuro (CTA final)** → rodapé creme.

## Forma e superfície
- **Raios:** arredondados. Botões em pílula, cartões de foto em 16–24 px, miniaturas inline em 8 px e levemente inclinadas.
- **Sombras/bordas:** sombras suaves de duas camadas; borda de 1 px nos cartões. Sem vidro/blur.
- **Imagens:** só **fotos reais do trabalho**, com a mesma máscara e o mesmo raio. Sem banco de imagens. Enquanto não chegam, placeholder honesto.

## Movimento
- **Nível geral: N1, só CSS.** Sem GSAP, sem Lenis, sem 3D. (O Packhelp também é todo CSS: o ciclo das miniaturas é uma animação CSS e não há scroll suave por biblioteca.)
- **Tipo:** reveal curto no scroll, faixa em marquee lento, cartões com elevação, abas com transição curta.
- **Momento de destaque (1 ponto):** o hero, com miniaturas de produto **dentro da frase**: entram escalonadas, alternam entre 2–3 fotos (CSS) e se endireitam no hover. No mobile a alternância também roda (sem o hover). Em `prefers-reduced-motion`, tudo parado. A headline em si **não anima**, para o texto ser o LCP.
- **Sem:** 3D, scroll suave por biblioteca, pin/scrub.

## Como o site deve fazer o visitante se sentir
Que a Point faz exatamente o que ele precisa, perto dele. Que dá para ver trabalho real e conhecido da cidade. Que o próximo passo é fácil e está sempre a um toque.

## O que evitar
Cara de e-commerce (carrinho, cupom, login). Números, preços e prazos inventados. Botão verde de WhatsApp (o CTA é sempre vermelho). Amarelo como fundo. Excesso de efeito. Foto de banco passando por trabalho da empresa.

## Referências consideradas
| Ref | Papel na direção |
|---|---|
| Packhelp (packhelp.com), visto no Chrome do usuário | Estrutura da home: hero tipográfico com imagens na frase, abas por necessidade, cartões grandes só de foto, accordions de diferenciais, faixa inclinada em marquee, seção escura com 3 cartões, CTA final com os mesmos botões do hero. Visto: H1 72 px, peso 500, espaçamento −0,06 em, miniaturas de 8 px de raio com animação de ciclo em CSS, sem GSAP e sem Lenis |
| Instagram da Point Virtual | Tom de voz, vocabulário, lista de serviços e portfólio |

**Não copiar do Packhelp:** editor 3D, carrinho, login, preços, selos ESG/FSC, faixa de logos de grandes marcas, newsletter com desconto.
