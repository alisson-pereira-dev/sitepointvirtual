import type { ReactNode } from "react";
import { Icone } from "./Icone";
import estilos from "./ListaCheck.module.css";

type Props = {
  /** `rotulo` é o texto; `marca` é um adereço opcional (ex.: marca "A validar"). */
  itens: { rotulo: string; marca?: ReactNode }[];
  className?: string;
};

/** Lista curta com ✓. O ícone é decorativo; a cor do texto é herdada do contêiner. */
export function ListaCheck({ itens, className }: Props) {
  return (
    <ul className={[estilos.lista, className].filter(Boolean).join(" ")}>
      {itens.map((item) => (
        <li key={item.rotulo} className={estilos.item}>
          <span className={estilos.check}>
            <Icone nome="check" tamanho="md" />
          </span>
          <span>
            {item.rotulo}
            {item.marca}
          </span>
        </li>
      ))}
    </ul>
  );
}
