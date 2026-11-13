# Ficha — S07 Como funciona
## 1. Identificação
slug `como_funciona` · Ordem 6 · completo · âncora `#como-funciona`
## 2. Função
Mostrar que pedir é simples (3 passos). Papel: confiança. CTA: nenhum botão aqui (o CTA volta no contato).
## 3. Conteúdo
`secoes.como_funciona` (titulo, 3 passos). validar: a seção inteira (processo deduzido).
## 4. Layout
- **Referência:** Packhelp (painel arredondado de fundo suave do editor) + V1 do catálogo.
- **Estrutura mobile:** título à esquerda → painel `--color-bg-alt` com `--radius-xl` → 3 passos **empilhados**, cada um com numeral grande (`--text-h1`, Sora 700) e uma linha vertical fina ligando os números.
- **Estrutura desktop:** painel de largura do container; 3 colunas iguais com os numerais e uma linha horizontal ligando-os.
- **Hierarquia:** numeral > título do passo > descrição.
- **Fundo:** seção em `--color-bg-alt`; cartões em `--color-surface` com `--shadow-1`. *Build:* não há painel interno separado, porque seria da mesma cor da seção; o "painel arredondado" é a própria faixa creme da seção.
- **Numeral:** fora do cartão. Mobile: coluna à esquerda com a linha vertical descendo até o próximo numeral. Desktop (≥ 1024 px): numerais em linha, ligados por uma linha horizontal, com os 3 cartões de mesma altura abaixo.
- **`validar`:** a seção inteira é `validar`. Em produção ela **não é renderizada** e o link "Como funciona" sai do menu; no modo revisão (`NEXT_PUBLIC_EXIBIR_ITENS_VALIDAR=1`) aparece com a marca "A validar" no título.
- **Herdar:** painel arredondado de fundo suave. **Não copiar:** vídeo/captura do editor 3D.
## 5. Componentes
- Secao (alt, id `como-funciona`)
- Passo (×3)
- Novos componentes a especificar? não (specs em `docs/componentes.md`)

## 6. Jornada UX
- **Vê:** Título e 3 passos numerados.
- **Faz:** Rola e lê.
- **Reage:** Os passos entram em sequência curta.
- **Sente/entende:** "É simples pedir."
- **Atrito → mitigação:** Parecer burocrático → 3 passos curtos, sem botão; `validar` até o cliente confirmar o processo.
- **Saída:** Trabalhos.
- **Evento de analytics:** —.
- **No mobile:** Passos empilhados com a linha vertical.

## 7. Motion
- Nível declarado: N1 · Biblioteca: CSS
- Elementos animados e receita (`09-MOTION`): Passos: R2 (stagger). A linha de ligação é **estática** (sem desenho por scroll).
- **Desktop:** Reveal escalonado de 3 itens.
- **Mobile:** Mesmo, mais curto.
- **Reduced-motion:** Tudo visível.
- Fallback se o JS falhar: Os passos aparecem em lista numerada.
- Só `transform` e `opacity`; conteúdo da 1ª dobra nunca fica oculto esperando a animação.

## 8. Mobile
- Layout em 360–430 px: descrito primeiro no item 4.
- Diferenças em relação ao desktop: Vertical; linha à esquerda dos numerais.
- Alvos de toque, gestos, teclado: Sem interação.
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
- [ ] Ordem de leitura 1→2→3 no leitor de tela (lista ordenada) · [ ] linha de ligação é decorativa
## 11. Status
completa (pronta para o build; depende dos itens `validar` e dos ativos pendentes)
