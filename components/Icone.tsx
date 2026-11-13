import estilos from "./Icone.module.css";

export type NomeIcone =
  | "whatsapp"
  | "menu"
  | "fechar"
  | "seta"
  | "check"
  | "telefone"
  | "localizacao"
  | "instagram";

type Props = {
  nome: NomeIcone;
  tamanho?: "sm" | "md" | "lg" | "xl";
  /** Só para `seta`. */
  direcao?: "direita" | "esquerda" | "baixo" | "cima";
  /** Ícone sozinho no conteúdo? Passe o rótulo. Decorativo (padrão): aria-hidden. */
  rotulo?: string;
  className?: string;
};

const caminhos: Record<NomeIcone, React.ReactNode> = {
  whatsapp: (
    <>
      <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
      <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
    </>
  ),
  menu: <path d="M4 6h16M4 12h16M4 18h16" />,
  fechar: <path d="M18 6L6 18M6 6l12 12" />,
  seta: <path d="M5 12h14M13 6l6 6-6 6" />,
  check: <path d="M5 12l5 5L20 7" />,
  telefone: (
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
  ),
  localizacao: (
    <>
      <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.5 6.5h.01" />
    </>
  ),
};

export function Icone({ nome, tamanho = "lg", direcao = "direita", rotulo, className }: Props) {
  const classes = [estilos.icone, estilos[tamanho], nome === "seta" ? estilos[direcao] : "", className]
    .filter(Boolean)
    .join(" ");
  return (
    <svg
      className={classes}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={rotulo ? "img" : undefined}
      aria-label={rotulo}
      aria-hidden={rotulo ? undefined : true}
      focusable="false"
    >
      {caminhos[nome]}
    </svg>
  );
}
